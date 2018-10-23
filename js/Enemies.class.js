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
        this.list = [];
        this.generate();
    }

    generate() {
        this.list = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const x = (this.width + this.space) * j;
                const y = (this.height + this.space) * i;
                this.list.push(new Enemy(x, y, 30, 30));
            }
        }
    }

    move() {
        for (const enemy of this.list) {
            enemy.x += this.moveBack ? -this.step : this.step;
        }
        if ((!this.moveBack && this.list[this.list.length - 1].x + this.width > canvas.width)
            || (this.moveBack && this.list[0].x < 0)) {
            this.moveBack = !this.moveBack;
            for (const enemy of this.list) {
                enemy.y += this.height / 2;
            }
        }
    }

    shoot() {
        if (new Date().getTime() - this.lastShootTime > this.shootInterval || !this.lastShootTime) {
            let count = this.list.filter(e => e.isKilled === false).length;
            let c = 0;
            let random = getRandomInt(1, count);
            for (let i in this.list) {
                if (!this.list[i].isKilled) {
                    c++;
                    if (c === random) {
                        this.list[i].shoot();
                        this.lastShootTime = new Date().getTime();
                    }
                }
            }
        }
    }

    countAlive() {
        if (this.list.filter(e => e.isKilled === false).length === 0) {
            Game.finish('next');
        }
    }
}