const gameBox = document.getElementById("gBox")
let isPaused = false
let timer = 60
let reqAnimation = null

function pause(){
    const pauseButton = document.getElementById("pause")
    pauseButton.addEventListener("click", () => {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? "Resume" : "Pause";
        if (isPaused) {
            cancelAnimationFrame(reqAnimation);
        }else{
            reqAnimation = requestAnimationFrame(moveCats)
        }
    });

    document.addEventListener("visibilitychange", () =>{
        if (document.hidden){
            console.log("Game paused")
            isPaused = true
            cancelAnimationFrame(reqAnimation)
        }else{
            console.log("Game not paused")
            isPaused = false
            reqAnimation = requestAnimationFrame(moveCats)
        }
    })
}


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
       reqAnimation = requestAnimationFrame(moveCats);
    }else{
        cancelAnimationFrame(reqAnimation)
    }
}

function main(){
    setInterval(() => {
        if (!isPaused) createCat();
    }, 5000);
    pause()
    reqAnimation = requestAnimationFrame(moveCats)
}

main()