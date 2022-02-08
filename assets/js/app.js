// Main element
const main = document.querySelector("main");

// Window Height and Width
// const windowWidth = document.documentElement.clientWidth;
const windowWidth = "500px";
// const windowHeight = document.documentElement.clientHeight;
const windowHeight = "500px";
console.log(windowWidth);
console.log(windowHeight);

// Create game div
const gameDiv = document.createElement("div");
gameDiv.setAttribute("id", "game");
gameDiv.style.width = windowWidth;
gameDiv.style.height = windowHeight;
gameDiv.style.border = "1px solid blue";
gameDiv.style.margin = "auto";
gameDiv.style.overflow = "hidden;";
main.append(gameDiv);

// Create Block
const block = document.createElement("div");
block.setAttribute("id", "block");
block.style.width = "50px";
block.style.height = windowHeight;
block.style.backgroundColor = "green";
block.style.position = "relative";
block.style.left = "400px";
block.style.animation = "block 2s infinite linear";
gameDiv.append(block);

// Create Hole
const hole = document.createElement("div");
hole.setAttribute("id", "hole");
hole.style.cssText = `width: 50px;
   height: 150px;
   background-color: gainsboro;
   position: relative;
   left: 400px;
   top: -500px;
   animation: block 2s infinite linear;`;
gameDiv.append(hole);

// Create Mac
const mac = document.createElement("div");
mac.setAttribute("id", "mac");
mac.style.cssText = `width: 20px;
height: 20px;
position: absolute;
top: 100px;
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
