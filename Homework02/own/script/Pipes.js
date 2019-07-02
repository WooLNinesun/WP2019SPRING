class Pipes {
    constructor() {
        this.current = [];
        this.sprites = {
            red: {
                upper: loadImage("assets/sprites/pipe-red-upper.png", $scale(1.3)),
                lower: loadImage("assets/sprites/pipe-red-lower.png", $scale(1.3))
            },
            green: {
                upper: loadImage("assets/sprites/pipe-green-upper.png", $scale(1.3)),
                lower: loadImage("assets/sprites/pipe-green-lower.png", $scale(1.3))
            }
        };
        this.sound = {
            levelup: loadSound("assets/audio/point.ogg")
        };
    }

    init() {
        this.current = [];
    }

    get images() {
        return this.sprites[(["red", "green"])[(level <= 10) ? 1 : 0]];
    }

    newPipe() {
        let gap = $randomInt(Math.max(120, 230 - level), Math.max(100, 180 - level));
        let totalHeight = this.images.upper.height + this.images.lower.height + gap;
        let upperPositionY = $randomInt(totalHeight - (height - floor.image.height), 50);
        this.current.push({
            images: this.images,
            positionX: width,
            upperPositionY: -upperPositionY,
            lowerPositionY: this.images.lower.height - upperPositionY + gap,
            afterBird: false
        });
    }

    update() {
        if (stage == "MENU" && this.current.length != 0) {
            this.current = []; return;
        }
        if (stage == "GAME") {
            if (timer % parseInt(300 / speed) == 0) {
                this.newPipe();
            }

            let farLeftPipe = this.current[0];
            if (farLeftPipe && farLeftPipe.positionX < -this.images.upper.width) {
                this.current.splice(0, 1);
            }

            this.current.forEach(pipe => {
                pipe.positionX -= speed;
                if (pipe.afterBird == false) {
                    if (bird.position.x > pipe.positionX + pipe.images.upper.width) {
                        pipe.afterBird = true;
                        level += 1;
                        this.sound.levelup.play();
                    }
                }
            });
        }
    }

    draw() {
        if (stage == "MENU") { return }
        this.current.forEach(pipes => {
            image(pipes.images.upper, pipes.positionX, pipes.upperPositionY);
            image(pipes.images.lower, pipes.positionX, pipes.lowerPositionY);
        });
    }
}
