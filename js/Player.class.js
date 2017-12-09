class Player {
    constructor() {
        this.allowMoveLeft = true;
        this.allowMoveRight = true;
        this.color = '#fff';
        this.lastShootTime = null;
        this.shootInterval = 1000;
        this.step = 3;
        this.width = 30;
        this.largeWidth = 100;
        this.height = 15;
        this.x = 0;
        this.y = canvas.height - this.height;
        this.lives = 30;
    }
    moveLeft() {
        if (this.allowMoveLeft) {
            let step = this.step;
            if (typeof Extras.activeExtras.superSpeed !== 'undefined') {
                step *= 2;
            }
            if (this.x >= step) {
                this.x -= step;
            }
        }
    }
    moveRight() {
        if (this.allowMoveRight) {
            let step = this.step;
            if (typeof Extras.activeExtras.superSpeed !== 'undefined') {
                step *= 2;
            }
            if (this.x <= canvas.width - this.width - step) {
                this.x += step;
            }
        }
    }

    shoot(type) {
        if (new Date().getTime() - this.lastShootTime > this.shootInterval || !this.lastShootTime) {
            if (typeof Extras.activeExtras.doubleShoot !== 'undefined') {
                let obj1 = {
                    x: this.x,
                    y: this.y - this.height,
                    type: type
                };
                let obj2 = {
                    x: this.x + this.largeWidth,
                    y: this.y - this.height,
                    type: type
                };

                Missiles.playerMissiles.push(obj1);
                Missiles.playerMissiles.push(obj2);
            } else {
                let obj = {
                    x: this.x + this.width / 2,
                    y: this.y - this.height,
                    type: type
                };

                Missiles.playerMissiles.push(obj);
            }
            this.lastShootTime = new Date().getTime();
        }
    }
}