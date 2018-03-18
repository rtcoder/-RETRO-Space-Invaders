class Player {
    constructor() {
        this.allowMoveLeft = true;
        this.allowMoveRight = true;
        this.color = '#fff';
        this.lastShootTime = null;
        this.shootInterval = 1000;
        this.step = 3;
        this.width = 50;
        this.largeWidth = 100;
        this.height = 15;
        this.x = 0;
        this.y = canvas.height - this.height;
        this.lives = 30;
    }
    moveLeft() {
        if (this.allowMoveLeft) {
            let step = this.step;
            if (typeof extras.activeExtras.superSpeed !== 'undefined') {
                step *= 2;
            }
            if (this.x >= step) {
                this.x -= step;
            }
        }
    }
    moveRight() {
        if (this.allowMoveRight) {
            let width = this.width;
            if (typeof extras.activeExtras.largeShip !== 'undefined') {
                width = this.largeWidth;
            }
            let step = this.step;
            if (typeof extras.activeExtras.superSpeed !== 'undefined') {
                step *= 2;
            }
            if (this.x <= canvas.width - width - step) {
                this.x += step;
            }
        }
    }

    shoot(type) {
        if (new Date().getTime() - this.lastShootTime > this.shootInterval || !this.lastShootTime) {
            let width = this.width;
            if (typeof extras.activeExtras.largeShip !== 'undefined') {
                width = this.largeWidth;
            }
            if (typeof extras.activeExtras.doubleShoot !== 'undefined') {
                let obj1 = {
                    x: this.x,
                    y: this.y - this.height,
                    type: type
                };
                let obj2 = {
                    x: this.x + width,
                    y: this.y - this.height,
                    type: type
                };

                missiles.playerMissiles.push(obj1);
                missiles.playerMissiles.push(obj2);
            } else {
                let obj = {
                    x: this.x + width / 2,
                    y: this.y - this.height,
                    type: type
                };

                missiles.playerMissiles.push(obj);
            }
            this.lastShootTime = new Date().getTime();
        }
    }
}