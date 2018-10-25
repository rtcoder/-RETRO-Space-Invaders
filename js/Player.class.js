import {extras} from "./Extras.class.js";
import {missiles} from "./Missiles.class.js";

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
        this.maxLives = 30;
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
            const width = this.getSize().width;
            let step = this.step;
            if (typeof extras.activeExtras.superSpeed !== 'undefined') {
                step *= 2;
            }
            if (this.x <= canvas.width - width - step) {
                this.x += step;
            }
        }
    }

    moveTo(pos) {
        if (pos.x) {
            this.x = pos.x;
        }
        if (pos.y) {
            this.y = pos.y;
        }
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
        }
        if (this.y < this.height) {
            this.y = this.height;
        }
        const width = this.getSize().width;
        if (this.x > canvas.width - width) {
            this.x = canvas.width - width;
        }
        if (this.x < 0) {
            this.x = 0;
        }
    }

    shoot(type) {
        if (new Date().getTime() - this.lastShootTime > this.shootInterval || !this.lastShootTime) {
            const width = this.getSize().width;
            if (typeof extras.activeExtras.doubleShoot !== 'undefined') {
                const obj1 = {
                    x: this.x,
                    y: this.y - this.height,
                    type: type
                };
                const obj2 = {
                    x: this.x + width,
                    y: this.y - this.height,
                    type: type
                };

                missiles.playerMissiles.add(obj1);
                missiles.playerMissiles.add(obj2);
            } else {
                const obj = {
                    x: this.x + width / 2,
                    y: this.y - this.height,
                    type: type
                };

                missiles.playerMissiles.add(obj);
            }
            this.lastShootTime = new Date().getTime();
        }
    }

    getSize() {
        return {
            width: typeof extras.activeExtras.largeShip !== 'undefined' ? this.largeWidth : this.width,
            height: this.height
        };
    }

    delLives(val) {
        this.lives -= val;
        if (this.lives <= 0) {
            this.lives = 0;
            Game.finish("fail");
        }
    }

    addLives(val) {
        this.lives += val;
        if (this.lives > this.maxLives) {
            this.lives = this.maxLives;
        }
    }
}
export const player = new Player();