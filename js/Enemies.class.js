class Enemies {
    constructor() {
        this.width = 30;
        this.height = 30;
        this.space = 20;
        this.step = 1;
        this.color = 'rgba(255, 0, 0, 0.7)';
        this.rows = 5;
        this.cols = 5;
        this.moveBack = false;
        this.shootInterval = 1000;
        this.lastShootTime = null;
        this.list = new Array();
        this.generate();
    }

    generate() {
        this.list = new Array();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.list.push({
                    x: (this.width + this.space) * j,
                    y: (this.height + this.space) * i,
                    isKilled: false
                });
            }
        }
    }

    move() {
        let e = this.list;
        for (let i in e) {
            e[i].x += this.moveBack ? -this.step : this.step;
        }
        if ((!this.moveBack && e[e.length - 1].x + this.width > canvas.width)
            || (this.moveBack && e[0].x < 0)) {
            this.moveBack = !this.moveBack;
        }
    }

    shoot() {
        if (new Date().getTime() - this.lastShootTime > this.shootInterval || !this.lastShootTime) {
            let count = 0;
            let c = 0;
            for (let i in this.list) {
                if (!this.list[i].isKilled) {
                    count++;
                }
            }
            let random = getRandomInt(1, count);
            for (let i in this.list) {
                if (!this.list[i].isKilled) {
                    c++;
                    if (c === random) {
                        let arr = {
                            x: this.list[i].x + missiles.size / 2,
                            y: this.list[i].y + missiles.size
                        };
                        missiles.enemiesMissiles.push(arr);
                        this.lastShootTime = new Date().getTime();
                    }
                }
            }
        }
    }

    countAlive() {
        let c = 0;
        for (let k in this.list) {
            if (!this.list[k].isKilled) {
                c++;
            }
        }
        if (c === 0) {
            Game.finish('next');
        }
    }
}