// Main element
const main = document.querySelector("main");

// Create game div
const gameDiv = document.createElement("div");
gameDiv.setAttribute("id", "game");
gameDiv.style.cssText = `width: 100vw;
height: 100vh;
border: 1px solid blue;
margin:auto;
overflow: hidden`;
main.append(gameDiv);

// Window Height and Width
const windowWidth = document.documentElement.clientWidth;
const windowHeight = document.documentElement.clientHeight;
console.log(windowWidth);
console.log(windowHeight);

// Create Block
const block = document.createElement("div");
block.setAttribute("id", "block");
block.style.cssText = `width:50px;
height:100%;
background-color:green;
position:relative;
left:${windowWidth}px;
`;
let blockMoving = [{ left: windowWidth + "px" }, { left: "-50px" }];
const aliceTiming = {
  duration: 4000,
  iterations: Infinity,
};
block.animate(blockMoving, aliceTiming);
gameDiv.append(block);

// Create Hole
const hole = document.createElement("div");
hole.setAttribute("id", "hole");
hole.style.cssText = `width: 50px;
   height: 300px;
   background-color: gainsboro;
   position: relative;
   left: ${windowWidth}px;
   top: -500px;
   animation: block 2s infinite linear;`;
hole.animate(blockMoving, aliceTiming);
gameDiv.append(hole);

// Mac start height
const macStart = windowHeight * 0.75;

// Create Mac
const mac = document.createElement("div");
mac.setAttribute("id", "mac");
mac.style.cssText = `width: 50px;
height: 50px;
position: absolute;
top: ${macStart}px;
border-radius: 50%;`;
gameDiv.append(mac);

// Create Mac Image
const macImg = document.createElement("img");
macImg.src = "./assets/images/head.png";
macImg.style.width = "100%";
macImg.style.height = "100%";
mac.append(macImg);

// Variables
let jumping = 0;
let counter = 0;

// Event listener that runs every time the animation runs
hole.addEventListener("animationiteration", () => {
  // Random number between -150 and 550
  const random = -(Math.random() * 400 + 150);
  hole.style.top = `${random}px`;
  counter++;
});

//  Gravity function
setInterval(function () {
  let macTop = parseInt(window.getComputedStyle(mac).getPropertyValue("top"));
  if (jumping === 0) {
    mac.style.top = `${macTop + 3}px`;
    // console.log(macTop);
  }
  //   Variables for the postion of the gap
  const blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  const holeTop = parseInt(
    window.getComputedStyle(hole).getPropertyValue("top")
  );
  const cTop = -(500 - macTop);
  //   Game over if below bottom or hits the block
  if (
    macTop > 520 ||
    (blockLeft < 20 &&
      blockLeft > -50 &&
      (cTop < holeTop || cTop > holeTop + 130))
  ) {
    // alert(`Game Over! Score: ${counter - 1}`);
    mac.style.top = `${100}px`;
    block.style.left = `${500}px`;
    counter = 0;
  }
}, 10);

//  Jump function
const jump = () => {
  jumping = 1;
  let jumpCount = 0;
  const jumpInterval = setInterval(() => {
    let macTop = parseInt(window.getComputedStyle(mac).getPropertyValue("top"));
    // Stop mac getting too high
    if (macTop > 6 && jumpCount < 15) {
      mac.style.top = `${macTop - 5}px`;
    }
    // Stop jumping after 20 interations
    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10);
};

// Event Listener to Jump
main.addEventListener("click", jump);
