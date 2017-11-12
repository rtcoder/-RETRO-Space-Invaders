class Player {
    constructor() {
        this.allowMoveLeft = true;
        this.allowMoveRight = true;
        this.color = '#fff';
        this.lastShootTime = null;
        this.shootInterval = 1000;
        this.step = 3;
        this.width = 30;
        this.height = 15;
        this.x = 0;
        this.y = canvas.height - this.height;
        this.lives = 30;
    }
    moveLeft() {
        if (this.allowMoveLeft) {
            var step = this.step;
            if (this.x >= step) {
                this.x -= step;
            }
        }
    }
    moveRight() {
        if (this.allowMoveRight) {
            var step = this.step;
            if (this.x <= canvas.width - this.width - step) {
                this.x += step;
            }
        }
    }

    shoot(type) {
        if (new Date().getTime() - this.lastShootTime > this.shootInterval || !this.lastShootTime) {
            let arr = {
                x: this.x + this.width / 2,
                y: this.y - this.height,
                type: type
            };

            Missiles.playerMissiles.push(arr);
            this.lastShootTime = new Date().getTime();
        }
    }
}