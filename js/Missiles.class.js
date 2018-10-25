import List from "./List.class.js";

export class Missiles {
    constructor() {
        this.size = 5;
        this.step = 5;
        this.explodes = new List();
        this.explodeRadius = 50;
        this.playerMissiles = new List();
        this.enemiesMissiles = new List();
    }

    move() {
        this.playerMissiles.forEach((pb, i) => {
            pb.y -= this.step;
            if (pb.y < 0) {
                this.playerMissiles.remove(i);
            }
        });
        this.enemiesMissiles.forEach((eb, i) => {
            eb.y += this.step;
            if (eb.y > canvas.height) {
                this.enemiesMissiles.remove(i);
            }
        });
    }
}

export const missiles = new Missiles();