const gameBox = document.getElementById("gBox")
const timeHTML = document.getElementById("time")
const bat = document.getElementById("bonk")
const pauseSection = document.getElementById("pauseSection");
const resume = document.getElementById("resume");
const restart = document.getElementById("restart");
let isPaused = false
let time = 0
let reqAnimation = null
let reqBat = null
let speed = 3

let x = (gameBox.clientWidth - bat.clientWidth) / 2
let y = (gameBox.clientHeight - bat.clientHeight) / 2

bat.style.left = `${x}px`
bat.style.top = `${y}px`
let bonkSpeed = 5
 
function checkHit(){

    const cats = document.querySelectorAll(".cat");
    const batInfo = bat.getBoundingClientRect();

    cats.forEach((cat) => {
        const catInfo = cat.getBoundingClientRect();
        if (
            batInfo.left < catInfo.right &&
            batInfo.right > catInfo.left &&
            batInfo.top < catInfo.bottom &&
            batInfo.bottom > catInfo.top
        ) {
            cat.dispatchEvent(new Event("hit"));
        }
    });

    const timeInfo = timeHTML.getBoundingClientRect()
    if (
        batInfo.left < timeInfo.right &&
        batInfo.right > timeInfo.left &&
        batInfo.top < timeInfo.bottom &&
        batInfo.bottom > timeInfo.top
    ) {
        isPaused = !isPaused
        if (isPaused){
            cancelAnimationFrame(moveCats)
        }else{
            reqAnimation = requestAnimationFrame(moveCats)
        }
    }

} 

function moveBat() {
        bat.style.left = `${x}px`;
        bat.style.top = `${y}px`;
       reqBat = requestAnimationFrame(moveBat); 
    
}

function bonk(){

    document.addEventListener("keydown", (e)=>{
        if (e.key === "ArrowRight" && x < gameBox.clientWidth-bat.clientWidth) x += bonkSpeed;
    if (e.key === "ArrowLeft" && x > 0) x -= bonkSpeed;
    if (e.key === "ArrowDown" && y < gameBox.clientHeight-(bat.clientHeight/2)) y += bonkSpeed;
    if (e.key === "ArrowUp" && y > 0) y -= bonkSpeed;

        reqBat = requestAnimationFrame(moveBat)
     

    if (e.key === " ") {
        checkHit();
        bat.style.transition = "transform 0.1s ease";
                bat.style.transform = "rotate(-45deg)";
                setTimeout(() => {
                    bat.style.transform = "rotate(0deg)";
                }, 100);
    }
    })
}

function manageTime(){
    const timerID = setInterval(()=>{
        if (!isPaused){
            time++
        }
        if (time%5 === 0){
            speed++
        }
        timeHTML.innerHTML = `Time: ${time}s`
    }, 1000)
}

function pause(){
  
    resume.addEventListener("click", () => {
        isPaused = false
        pauseSection.style.display = "none"
        bat.style.display = "block";
        reqAnimation = requestAnimationFrame(moveCats)
    });

    document.addEventListener("visibilitychange", () =>{
        if (document.hidden){
            isPaused = true
            bat.style.display = "none";
            pauseSection.style.display = "block";
            cancelAnimationFrame(reqAnimation)
        }
    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (pauseSection.style.display === "block") {
                reqAnimation = requestAnimationFrame(moveCats);
                pauseSection.style.display = "none";
                bat.style.display = "block";
                isPaused = false; 
            } else {
                pauseSection.style.display = "block";
                bat.style.display = "none";
                isPaused = true; 
            }
        }
    });
}


function createCat() {
    const cat = document.createElement("div");
    cat.classList.add("cat");
    gameBox.appendChild(cat);

    let ranNum = Math.random();
    let topPos = ranNum * (gameBox.clientHeight - cat.clientHeight); 
    
    cat.style.top = `${topPos}px`;
    cat.style.left = "0px"; 

   
   cat.addEventListener("hit", () => {
    const pics = ["cry1.png", "cry2.png", "cry3.png"]
    const ranPic = pics[Math.floor(Math.random()*3)]
    cat.style.transition = "transform 0.5s"; 
    cat.style.backgroundImage = `url(${ranPic})`; 

    setTimeout(() => {
        cat.remove();
    }, 500);
});

cat.addEventListener("click", () => {
    if (!isPaused) {
        cat.dispatchEvent(new Event("hit")); 
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