class Scenes {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.sprites = {
            day: loadImage("assets/sprites/background-day.png"),
            night: loadImage("assets/sprites/background-night.png")
        };
    }

    get image() {
        let now = (new Date()).getHours();
        return (now > 6 && now < 18) ? this.sprites.day : this.sprites.night;
    }

    init() { }

    update() {
        if (stage == "GAME" || stage == "MENU") {
            this.position.x = -timer * (speed / 2) % width;
        }
    }

    drawStop() {
        background('rgba(0, 0, 0, 0.3)');
    }

    draw() {
        image(this.image, this.position.x, 0, width, height);
        image(this.image, this.position.x + width, 0, width, height);
    }
}
