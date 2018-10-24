class Missiles {
    constructor() {
        this.size = 5;
        this.step = 5;
        this.explodes = new List();
        this.explodeRadius = 50;
        this.playerMissiles = new List();
        this.enemiesMissiles = new List();
    }

    move() {
        const pb = this.playerMissiles;
        const eb = this.enemiesMissiles;
        for (const i in pb) {
            pb[i].y -= this.step;
            if (pb[i].y < 0) {
                pb.remove(i);
            }
        }
        for (const i in eb) {
            eb[i].y += this.step;
            if (eb[i].y > canvas.height) {
                eb.remove(i);
            }
        }
    }
}