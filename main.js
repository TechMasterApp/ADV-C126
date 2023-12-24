var leftX = 0
var leftY = 0
var rightX = 0
var rightY = 0
var song = ""
var isPlaying = 0
var volume = 1
var rate = 1
var scoreLeft = 0
var scoreRight = 0

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(650, 500)
    canvas.position(525, 300)
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on("pose", acceptResult)
}

function draw() {
    image(video, 0, 0, 650, 500)
    fill("red")
    circle(leftX, leftY, 30)
    circle(rightX, rightY, 30)
    if (scoreLeft > 0.2) {
        volume = leftY / 500
        song.setVolume(volume)
        document.getElementById('volume').innerHTML = "<h3>Volume: " + volume.toFixed(2) + "</h3>"
    }
    if (scoreRight > 0.2) {
        if (rightY > 0 && rightY < 100) {
            rate = 0.5
        } else if (rightY > 100 && rightY < 200) {
            rate = 1
        } else if (rightY > 200 && rightY < 300) {
            rate = 1.5
        } else if (rightY > 300 && rightY < 400) {
            rate = 2
        } else if (rightY > 400 && rightY < 500) {
            rate = 2.5
        }
        song.rate(rate)
        document.getElementById('speed').innerHTML = "<h3>Speed: " + rate.toFixed(2) + "</h3>"
    }
}

function playSong() {
    if (isPlaying == 0) {
        song.play()
        song.rate(rate)
        song.setVolume(volume)
        isPlaying = 1
    } else {
        song.pause()
        isPlaying = 0
    }
}

function modelLoaded() {

}

function acceptResult(result) {
    if (result.length > 0) {
        scoreLeft = result[0].pose.keypoints[9].score
        scoreRight = result[0].pose.keypoints[10].score
        leftX = result[0].pose.leftWrist.x
        leftY = result[0].pose.leftWrist.y
        rightX = result[0].pose.rightWrist.x
        rightY = result[0].pose.leftWrist.y
    }
}