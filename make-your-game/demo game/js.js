const gameBox = document.getElementById("gBox")
let isPaused = false

pauseButton = document.getElementById("pause")
pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? "Resume" : "Pause";
    if (!isPaused) {
        requestAnimationFrame(moveCats);
    }
});

function createCat() {
    const cat = document.createElement("div");
    cat.classList.add("cat");
    gameBox.appendChild(cat);

    let ranNum = Math.random();
    let topPos = ranNum * (gameBox.clientHeight - cat.clientHeight); 
    
    cat.style.top = `${topPos}px`;
    cat.style.left = "0px"; 

    // Click to "shoot" the duck
   
        cat.addEventListener("click", () => {
            if (!isPaused){
            cat.style.transform = "rotate(90deg)"; 
            setTimeout(() => cat.remove(), 500);
            }
        });
    
   
}

function moveCats() {

    const cats = document.querySelectorAll(".cat");
    const maxRight = gameBox.clientWidth - 80;

    cats.forEach((cat) => {
    let currentLeft = parseInt(cat.style.left);

    if (!isPaused){
        if (currentLeft < maxRight) {
            cat.style.left = `${currentLeft + 3}px`;
        } else {
            cat.remove();
        }
    }})
    
    if (!isPaused) {
        requestAnimationFrame(moveCats);
    }
}

function main(){
    setInterval(() => {
        if (!isPaused) createCat();
    }, 2000);

    requestAnimationFrame(moveCats)
}

main()