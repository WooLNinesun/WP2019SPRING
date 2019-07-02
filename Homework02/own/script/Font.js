
class Font {
    constructor() {
        this.position = {
            start: { x: 0, y: 0 },
            over: { x: 0, y: 0 }
        };
        this.level = 0;
        this.sprites = {
            start: loadImage("assets/sprites/message.png"),
            over: loadImage("assets/sprites/gameover.png"),
            number: []
        };
        for (let index = 0; index < 10; index++) {
            this.sprites.number.push(loadImage(`assets/sprites/${index}.png`));
        }
    }

    init() {
        this.position.start = {
            x: (width - this.sprites.start.width) / 2,
            y: (height - this.sprites.start.height) / 2 - 40
        }
        this.position.over = {
            x: (width - this.sprites.over.width) / 2,
            y: (height - this.sprites.over.height) / 2 - 100
        }
    }

    update() { }

    drawNumber(value, x, y) {
        const digits = value.toString().split('');
        let digitsData = [], fontWidth = 0;
        for (let index = 0; index < digits.length; index++) {
            const digitImg = this.sprites.number[parseInt(digits[index])];
            digitsData.push(digitImg);
            fontWidth += digitImg.width;
        }
        let positionX = x - fontWidth / 2;
        digitsData.forEach(digitImg => {
            image(digitImg, positionX, y);
            positionX += digitImg.width;
        });
    }

    draw() {
        if (stage == "MENU") {
            image(this.sprites.start, this.position.start.x, this.position.start.y);
        }
        if (stage == "GAME") {
            this.level = level;
            this.drawNumber(level, width / 2, 50);
        }
        if (stage == "OVER") {
            image(this.sprites.over, this.position.over.x, this.position.over.y);
            this.drawNumber(this.level, width / 2, this.position.over.y + 70);
        }
    }
}
