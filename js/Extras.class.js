class Extras {
    constructor() {
        this.types = [
            {
                name: 'doubleShoot',
                remaningTime: 10000,
                color: 'yellow'
            },
            {
                name: 'largeShip',
                remaningTime: 15000,
                color: 'red'
            },
            {
                name: 'superSpeed',
                remaningTime: 10000,
                color: 'yellow'
            }
        ];
        this.activeExtras = [];
        this.interval = 1000;
        this.list = [];
        this.lastDropTime = null;
        this.step = 1;
    }

    move() {
        let el = this.list;
        for (let i in el) {
            el[i].y += this.step;
            if (el[i].y > canvas.height) {
                el.splice(i, 1);
            }
        }
    }

    addPackage() {
        if (!this.lastDropTime || new Date().getTime() - this.lastDropTime > this.interval) {
            let count = 0;
            let c = 0;
            let x = getRandomInt(1, canvas.width);
            let y = getRandomInt(1, canvas.height / 3);
            let p = new Package(x, y);
            this.list.push(p);
            this.lastDropTime = new Date().getTime();
        }
    }
    countDown() {
        let ae = this.activeExtras;
        for (let i in ae) {
            if (ae[i].remaningTime <= 0) {
                delete ae[i];
                document.getElementById(i + 'Container').style = 'display:none';
            } else {
                ae[i].remaningTime -= Game.loopMilisconds;
                document.getElementById(i).innerHTML = Math.floor(ae[i].remaningTime / 1000) + 's';
                document.getElementById(i + 'Container').style = 'display:inline';
            }
        }
    }
}