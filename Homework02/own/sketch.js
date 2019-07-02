let timer = 0;
let level = 0;
let speed = 3;
let stage = "MENU";

let scenes, floor, bird, pipes, font;
function preload() {
    soundFormats('wav', 'ogg');
    // assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets
    scenes = new Scenes();
    font = new Font();
    pipes = new Pipes();
    floor = new Floor();
    bird = new Bird();
}

function setup() {
    // Game basic setup.
    // Mounting canvas onto div for convenient styling.
    let cvsWrapper = document.getElementById("canvasWrapper");
    const myCanvas = createCanvas(
        cvsWrapper.offsetWidth,
        cvsWrapper.offsetHeight
    );
    myCanvas.parent("canvasWrapper");

    // setup code below
    scenes.init();
    pipes.init();
    bird.init();
    font.init();
    floor.init();
}

function mousePressed() {
    bird.mousePressed();
    switch (stage) {
        case "MENU":
            stage = "GAME";
            break;
        case "OVER":
            stage = "MENU"; timer = 0;
            break;
    }
}

function keyPressed() {
    bird.keyPressed();
    switch (stage) {
        case "MENU":
            if (keyCode == 32) { stage = "GAME"; }
            break;
        case "GAME":
            if (keyCode == 80) {
                stage = "STOP";
                scenes.drawStop();
            }
            break;
        case "STOP":
            if (keyCode == 32 || keyCode == 80) { stage = "GAME"; }
            break;
        case "OVER":
            if (keyCode == 32) { stage = "MENU"; timer = 0; }
            break;
    }
}

function draw() {
    if (stage != "STOP") {
        timer += 1;
        scenes.update();
        pipes.update();
        bird.update();
        font.update();
        floor.update();

        scenes.draw();
        pipes.draw();
        bird.draw();
        font.draw();
        floor.draw();

        //FRAMERATE
        fill(0);
        text(`FPS:${int(frameRate())}`, 10, 20);
    }
}
