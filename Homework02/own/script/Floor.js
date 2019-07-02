class Floor {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.sprites = {
            base: loadImage("assets/sprites/base.png")
        };
    }

    get image() {
        return this.sprites.base;
    }

    init() {
        this.position = {
            x: 0,
            y: height - this.image.height
        };
    }

    update() {
        if (stage == "GAME" || stage == "MENU") {
            this.position.x = -timer * speed % width;
        }
    }

    draw() {
        image(this.image, this.position.x, this.position.y, width);
        image(this.image, this.position.x + width, this.position.y, width);
    }
}
