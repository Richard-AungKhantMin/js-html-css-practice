const gameBox = document.getElementById("gBox")
const timeHTML = document.getElementById("time")
const bat = document.getElementById("bonk")
let isPaused = false
let time = 0
let reqAnimation = null
let speed = 3

function bonk(){
    let x = (gameBox.clientWidth - bat.clientWidth) / 2
    let y = (gameBox.clientHeight - bat.clientHeight) / 2
    
    bat.style.left = `${x}px`
    bat.style.top = `${y}px`
    let bonkSpeed = 50

    document.addEventListener("keydown", (e)=>{
        if (e.key === "ArrowRight" && x < gameBox.clientWidth) x += bonkSpeed;
    if (e.key === "ArrowLeft" && x > 0) x -= bonkSpeed;
    if (e.key === "ArrowDown" && y < gameBox.clientHeight) y += bonkSpeed;
    if (e.key === "ArrowUp" && y > 0) y -= bonkSpeed;

     bat.style.left = `${x}px`
    bat.style.top = `${y}px`
    })

   
}

function manageTime(){
    const timerID = setInterval(()=>{
        if (!isPaused){
            time++
        }
        
        timeHTML.innerHTML = `Time: ${time}s`
    }, 1000)
}

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
            isPaused = true
            cancelAnimationFrame(reqAnimation)
        }else{
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
            cat.style.left = `${currentLeft + speed}px`;
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
    bonk()
    setInterval(() => {
        if (!isPaused) createCat();

    }, 3000);
    pause()
    manageTime()
    reqAnimation = requestAnimationFrame(moveCats)
}

main()