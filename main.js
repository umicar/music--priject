song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftwrist = 0;
scoreRightwrist = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(350, 300);
    canvas.position(500, 250);
    img = createCapture(VIDEO);
    img.hide();
    poseNet = ml5.poseNet(img, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightwrist = " + scoreRightwrist);
        console.log("scoreLeftwrist = " + scoreLeftwrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}


function draw() {
    image(img, 0, 0, 350, 300);
    fill("red");
    stroke("red");
    if (scoreRightwrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        song1.play();
        document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
    }

    if (scoreLeftwrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        song2.play();
        document.getElementById("song").innerHTML = "Playing - Peter Pan Theme Song";
    }
}