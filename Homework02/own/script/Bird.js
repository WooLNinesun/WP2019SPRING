class Bird {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.velocityY = 0;
        this.velocityLift = -8;
        this.acceleration = 0.5;
        this.angular = 0;
        this.angularVelocity = 2;
        this.color = "blue";
        this.isSmokeCannabis = false;
        this.easyMode = {
            enable: false,
            konamiCode: [38, 38, 40, 40, 37, 39, 37, 39, 65, 66],
            index: 0
        }
        this.sprites = {
            red: [
                loadImage("assets/sprites/redbird-upflap.png"),
                loadImage("assets/sprites/redbird-midflap.png"),
                loadImage("assets/sprites/redbird-downflap.png")
            ],
            blue: [
                loadImage("assets/sprites/bluebird-upflap.png"),
                loadImage("assets/sprites/bluebird-midflap.png"),
                loadImage("assets/sprites/bluebird-downflap.png")
            ],
            yellow: [
                loadImage("assets/sprites/yellowbird-upflap.png"),
                loadImage("assets/sprites/yellowbird-midflap.png"),
                loadImage("assets/sprites/yellowbird-downflap.png")
            ],
        };
        this.sound = {
            die: loadSound("assets/audio/die.ogg"),
            hit: loadSound("assets/audio/hit.ogg"),
            flap: loadSound("assets/audio/wing.ogg")
        }
    }

    initColor() {
        this.color = (["red", "blue", "yellow"])[$randomInt(3)];
    }

    get image() {
        if (this.isSmokeCannabis) { this.initColor(); }
        return this.sprites[this.color][(stage != "OVER") ? parseInt(timer / 8) % 3 : 1];
    }

    init() {
        this.initColor();
        this.position = {
            x: width / 2 - this.image.width / 2,
            y: height / 2 - this.image.height / 2
        };
        this.velocityY = 0;
        this.angular = 0;
    }

    isCollision() {
        const collisionBox = {
            center: {
                x: this.position.x + this.image.width / 2,
                y: this.position.y + this.image.height / 2
            },
            radius: (this.image.height + this.image.width) / 4
        };

        if (collisionBox.center.y - collisionBox.radius < 0) {
            return true;
        }
        if (floor.position.y - (collisionBox.center.y + collisionBox.radius) < 0) {
            return true;
        }

        for (let index = 0; index < pipes.current.length; index++) {
            const pipe = pipes.current[index];

            if (pipe.afterBird) { continue; }

            const upperPipeCoordinateByBird = {
                x1: pipe.positionX - collisionBox.center.x,
                y1: 0 - collisionBox.center.y,
                x2: pipe.positionX + pipe.images.upper.width - collisionBox.center.x,
                y2: pipe.upperPositionY + pipe.images.upper.height - collisionBox.center.y
            };
            const lowerPipeCoordinateByBird = {
                x1: pipe.positionX - collisionBox.center.x,
                y1: pipe.lowerPositionY - collisionBox.center.y,
                x2: pipe.positionX + pipe.images.upper.width - collisionBox.center.x,
                y2: floor.position.y - collisionBox.center.y
            };

            if (this.isCollisionRectange(collisionBox, upperPipeCoordinateByBird)) {
                return true;
            }
            if (this.isCollisionRectange(collisionBox, lowerPipeCoordinateByBird)) {
                return true;
            }
        }
        return false;
    }

    isCollisionRectange(circle, rectange) {
        if (this.isSameQuadrant(rectange)) {
            const dx1 = Math.abs(rectange.x1), dy1 = Math.abs(rectange.y1);
            const dx2 = Math.abs(rectange.x1), dy2 = Math.abs(rectange.y2);
            const dx3 = Math.abs(rectange.x2), dy3 = Math.abs(rectange.y2);
            const dx4 = Math.abs(rectange.x2), dy4 = Math.abs(rectange.y1);

            const pow2radius = $pow2(circle.radius);
            if ($pow2(dx1) + $pow2(dy1) <= pow2radius) { return true; }
            if ($pow2(dx2) + $pow2(dy2) <= pow2radius) { return true; }
            if ($pow2(dx3) + $pow2(dy3) <= pow2radius) { return true; }
            if ($pow2(dx4) + $pow2(dy4) <= pow2radius) { return true; }
            return false;
        } else {
            const rectangeCenterX = Math.abs((rectange.x1 + rectange.x2)) / 2;
            const rectangeCenterY = Math.abs((rectange.y1 + rectange.y2)) / 2;
            const rectangeWidth = Math.abs(rectange.x1 - rectange.x2);
            const rectangeHeight = Math.abs(rectange.y1 - rectange.y2);
            if (rectangeCenterX > circle.radius + rectangeWidth / 2) { return false; }
            if (rectangeCenterY > circle.radius + rectangeHeight / 2) { return false; }
            return true;
        }
    }

    isSameQuadrant(rect) {
        if (rect.x1 < 0 && rect.x2 < 0 && rect.y1 < 0 && rect.y2 < 0) { return true; }
        if (rect.x1 < 0 && rect.x2 < 0 && rect.y1 > 0 && rect.y2 > 0) { return true; }
        if (rect.x1 > 0 && rect.x2 > 0 && rect.y1 < 0 && rect.y2 < 0) { return true; }
        if (rect.x1 > 0 && rect.x2 > 0 && rect.y1 > 0 && rect.y2 > 0) { return true; }
        return false;
    }

    mousePressed() {
        switch (stage) {
            case "MENU":
                this.velocityY = -10;
                this.angular = -45;
                break;
            case "GAME":
                this.velocityY = this.velocityLift;
                this.angular = -45;
                this.sound.flap.play();
                break;
            case "OVER":
                this.init();
                break;
        }
    }

    keyPressed() {
        if (keyCode == 82) { this.isSmokeCannabis = !this.isSmokeCannabis; }

        switch (stage) {
            case "MENU":
                if (keyCode == 32) {
                    this.velocityY = -10;
                    this.angular = -45;
                }
                if (keyCode == this.easyMode.konamiCode[this.easyMode.index]) {
                    this.easyMode.index += 1;
                } else { this.easyMode.index = 0; }
                if (this.easyMode.konamiCode.length === this.easyMode.index) {
                    this.easyMode.enable = true;
                    this.easyMode.index = 0;
                }
                break;
            case "GAME":
                if (keyCode == 32) {
                    this.velocityY = this.velocityLift;
                    this.angular = -45;
                    this.sound.flap.play();
                }
                break;
            case "OVER":
                if (keyCode == 32) {
                    this.init();
                }
                break;
        }
    }

    update() {
        if (stage == "GAME") {
            if (!this.easyMode.enable) {
                this.velocityY += this.acceleration;
                this.position.y += this.velocityY;

                this.angular += this.angularVelocity;
                if (this.angular > 90) { this.angular = 90; }

                if (this.isCollision()) {
                    stage = "OVER";
                    level = 0;
                    this.sound.hit.play();
                    this.sound.die.play();
                }
            } else {
                this.position.y = mouseY;
                this.angular = 0;
            }
        }
        if (stage == "OVER") {
            if (floor.position.y - this.position.y - this.image.height >= 0) {
                this.velocityY = 7;
                this.position.y += this.velocityY;
                this.angular += this.angularVelocity;
                if (this.angular > 90) { this.angular = 90; }
            }
        }
    }

    draw() {
        push();
        translate(this.position.x + this.image.width / 2, this.position.y + this.image.height / 2);
        rotate(radians(this.angular));

        let birdPositionX = -this.image.width / 2,
            birdPositionY = -this.image.height / 2;
        if (this.isSmokeCannabis) {
            birdPositionX += $randomInt(9) - 4;
            birdPositionY += $randomInt(9) - 4;
        }
        image(this.image, birdPositionX, birdPositionY);
        pop();
    }
}
