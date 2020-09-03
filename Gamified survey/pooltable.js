const canvas = document.getElementById("canvas");
const background = document.getElementById("background");
const ball = document.getElementById("ball");
const hole1 = document.getElementById("hole1");
const hole2 = document.getElementById("hole2");
const hole3 = document.getElementById("hole3");
const hole4 = document.getElementById("hole4");
const answer = [];
const timerate = 50;
let velocityX = 0.0;
let velocityY = 0.0;
let t = 0;
let speed = 30;

let ballPosX = screen.width * 0.5;
let ballPosY = screen.height * 0.5;
let ballRad = 25;
const DEG_TO_RAD = 0.0174532925;

let hole1X = screen.width - 10;
let hole1Y =screen.height - 10;
let holeRad = 60;


let text = document.getElementById('text');


hole1.setAttribute('r', holeRad);
hole1.setAttribute('cx', screen.width - 10);
hole1.setAttribute('cy', screen.height - 10);

hole2.setAttribute('r', holeRad);
hole2.setAttribute('cx', screen.width - 10);
hole2.setAttribute('cy', + 10);

hole3.setAttribute('r', holeRad);
hole3.setAttribute('cx', + 10);
hole3.setAttribute('cy', screen.height - 10);

hole4.setAttribute('r', holeRad);
hole4.setAttribute('cx', + 10);
hole4.setAttribute('cy', + 10);

canvas.setAttribute('width', screen.width);
canvas.setAttribute('height', screen.height);
background.setAttribute('width', screen.width);
background.setAttribute('height', screen.height);
ball.setAttribute('r', ballRad);

function update() {
    ball.setAttribute('cx', ballPosX);
    ball.setAttribute('cy', ballPosY);

    ballPosX += (velocityX <= 0.0 ? (ballPosX <= (ballRad * 0.5) ? 0.0 : velocityX) : (ballPosX >= (screen.width - ballRad * 0.5) ? 0.0 : velocityX)) * speed;
    ballPosY += (velocityY <= 0.0 ? (ballPosY <= (ballRad * 0.5) ? 0.0 : velocityY) : (ballPosY >= (screen.height - ballRad * 0.5) ? 0.0 : velocityY)) * speed;

    t += timerate;

    if (getDistanceYes(ballPosX, ballPosY, hole1X, hole1Y) < ballRad + holeRad) {
        answer.push ('Often');
        // nextPage();
    }
    
}

async function nextPage () {
    if (answer != null) {
        await sendMQTT(answer); 
        myTimer();
            
    } else {
        console.log(err)
    }
}

function myTimer() {
    setTimeout(function(){ 
      window.location.href = "foodball2.html";

}, 800);
}

function updateOrientation(event) {
    velocityX = event.gamma * DEG_TO_RAD;
    velocityY = event.beta * DEG_TO_RAD;
    // let degX = event.beta;
    // let degY = event.gamma;
    // let degZ = event.alpha - 180;
    // velocityX = Math.cos(degY);
    // velocityY = Math.cos(degX);
    //velocityY = Math.cos(degZ);

    //text.innerHTML = "(:" + degX + " " + degY + ")";

}

function getDistancehole1 (ballPosX, ballPosY, hole1X, hole1Y) {
    let xDistance = hole1X - ballPosX;
    let yDistance = hole1Y - ballPosY;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function setup() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') // IOS
    {
        document.getElementById('startButton').style.display = "none";
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', updateOrientation, false);

                }
            })
            .catch(err => { text.innerHTML = "failed to access device orientation" });
    }
    else // other
    {
        document.getElementById('startButton').style.display = "none";
        window.addEventListener('deviceorientation', updateOrientation, false);
    }
    setInterval(update, timerate);
}

document.getElementById('startButton').onclick = e => { setup(); };