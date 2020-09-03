const canvas = document.getElementById("canvas");
const background = document.getElementById("background");
const ball = document.getElementById("ball");
const goalYes = document.getElementById("goalYes");
const goalNo = document.getElementById("goalNo");
const answer = [];
const timerate = 50;
let velocityX = 0.0;
let velocityY = 0.0;
let t = 0;
let speed = 30.0;
let ballPosX = screen.width * 0.5;
let ballPosY = screen.height * 0.5;
let ballRad = 30;
const DEG_TO_RAD = 0.0174532925;

let goalYesPosX = screen.width * 0.4;
let goalYesPosY = 0;
let goalNoPosX = screen.width * 0.4;
let goalNoPosY = screen.height - screen.width * 0.05;
let goalArea = (screen.width * 0.2) * screen.width * 0.05;

let text = document.getElementById('text');
text.innerHTML = "";

goalYes.setAttribute('x', goalYesPosX);
goalYes.setAttribute('width', screen.width * 0.2);
goalYes.setAttribute('height', screen.width * 0.05);

goalNo.setAttribute('x', goalNoPosX);
goalNo.setAttribute('y', goalNoPosY);
goalNo.setAttribute('width', screen.width * 0.2);
goalNo.setAttribute('height', screen.width * 0.05);

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

    if (getDistanceYes(ballPosX, ballPosY, goalYesPosX, goalYesPosY) < ballRad + screen.width * 0.052) {
        answer.push ('Yes');
        nextPage();
    }

    if (getDistanceNo(ballPosX, ballPosY, goalNoPosX, goalNoPosY) < ballRad + screen.width * 0.052) {
        answer.push ('No');
        nextPage();
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

      window.location.href = "pooltable.html";

}, 800);
}

function updateOrientation(event) {
    velocityX = event.gamma * DEG_TO_RAD;
    velocityY = event.beta * DEG_TO_RAD;

    //text.innerHTML = "(" + (velocityX) + ", " + (velocityY) + ")";

}
function getDistanceYes(ballPosX, ballPosY, goalYesPosX, goalYesPosY) {
    let xDistance = (goalYesPosX + screen.width * 0.1) - ballPosX;
    let yDistance = goalYesPosY - ballPosY;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function getDistanceNo(ballPosX, ballPosY, goalNoPosX, goalNoPosY) {
    let xDistance = (goalNoPosX + screen.width * 0.1) - ballPosX;
    let yDistance = goalNoPosY - ballPosY;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function setup() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') // IOS
	{
        document.getElementById('startButton').style.display = "none";
        DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
            if (permissionState === 'granted') 
            {
                window.addEventListener('deviceorientation', updateOrientation, false);

            }
        })
        .catch(err => {text.innerHTML = "failed to access device orientation"});
    } 
    else // other
    {
        document.getElementById('startButton').style.display = "none";
        window.addEventListener('deviceorientation', updateOrientation, false);
    }
    setInterval(update, timerate);
}

document.getElementById('startButton').onclick = e => {setup();};