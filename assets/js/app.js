// Get elements
const main = document.querySelector("main");
const block = document.querySelector("#block");
const hole = document.querySelector("#hole");
const mac = document.querySelector("#mac");

// Variables
let jumping = 0;
let counter = 0;

// Event listner that runs every time the animation runs
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
    console.log(macTop);
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
    alert(`Game Over! Score: ${counter - 1}`);
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
