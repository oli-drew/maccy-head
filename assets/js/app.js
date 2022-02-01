// Get elements
const block = document.querySelector("#block");
const hole = document.querySelector("#hole");

// Event listner that runs every time the animation runs
hole.addEventListener("animationiteration", ()=> {
    // Random number between -150 and 450
    const random = -((Math.random()*300)+150);
    hole.style.top = `${random}px`;
})