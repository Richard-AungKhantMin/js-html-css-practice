const gameBox = document.getElementById("gBox")

function createDuck() {
    const duck = document.createElement("div");
    duck.classList.add("duck");

    const ranNum = Math.random()
    /* if (ranNum === 0){

    } */
    let topPos = ranNum * (gameBox.clientHeight - duck.clientHeight); // Random Y position
    
    duck.style.top = `${topPos}px`;
    duck.style.left = `${duck.clientWidth}px`; // Start off-screen

    document.body.appendChild(duck);

    // Move duck across the screen
    let moveDuck = setInterval(() => {
        let currentLeft = parseInt(duck.style.left);
        if (currentLeft > gameBox.clientWidth-duck.clientWidth-10) {
            clearInterval(moveDuck);
            duck.remove();
        } else {
            duck.style.left = `${currentLeft + 5}px`;
        }
    }, 30);

    // Click to "shoot" the duck
    duck.addEventListener("click", () => {
        clearInterval(moveDuck);
        duck.style.transform = "rotate(90deg)"; // Make it look like it falls
        setTimeout(() => duck.remove(), 500);
    });
}

// Spawn a new duck every 2 seconds
setInterval(createDuck, 5000);
