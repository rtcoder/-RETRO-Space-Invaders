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
        let pb = this.playerMissiles;
        let eb = this.enemiesMissiles;
        for (let i in pb) {
            pb[i].y -= this.step;
            if (pb[i].y < 0) {
                pb.splice(i, 1);
            }
        }
        for (let i in eb) {
            eb[i].y += this.step;
            if (eb[i].y > canvas.height) {
                eb.splice(i, 1);
            }
        }
    }
}