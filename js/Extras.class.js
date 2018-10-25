import Package from "./Package.class.js";
import {getRandomInt} from "./custom.js";
import List from "./List.class.js";
import {Game} from './script.js'

export class Extras {
    constructor() {
        this.types = [
            {
                name: 'doubleShoot',
                remainingTime: 10000,
                color: 'yellow'
            },
            {
                name: 'largeShip',
                remainingTime: 15000,
                color: 'red'
            },
            {
                name: 'superSpeed',
                remainingTime: 10000,
                color: 'yellow'
            }
        ];
        this.activeExtras = new List();
        this.interval = 1000;
        this.list = new List();
        this.lastDropTime = null;
        this.step = 1;
    }

    move() {
        this.list.forEach((el, i) => {
            el.y += this.step;
            if (el.y > canvas.height) {
                this.list.remove(i);
            }
        });
    }

    addPackage() {
        if (!this.lastDropTime || new Date().getTime() - this.lastDropTime > this.interval) {
            const x = getRandomInt(1, canvas.width);
            const y = getRandomInt(1, canvas.height / 3);
            const p = new Package(x, y);
            this.list.add(p);
            this.lastDropTime = new Date().getTime();
        }
    }

    countDown() {
        this.activeExtras.forEach((ae, i) => {
            if (ae.remainingTime <= 0) {
                delete this.activeExtras[i];
                document.getElementById(i + 'Container').style.display = 'none';
            } else {
                ae.remainingTime -= Game.loopMilisconds;
                document.getElementById(i).innerHTML = Math.floor(ae.remainingTime / 1000) + 's';
                document.getElementById(i + 'Container').style.display = 'inline';
            }
        });
    }
}

export const extras = new Extras();