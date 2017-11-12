class Missiles {
    constructor() {
        this.size = 5;
        this.step = 5;
        this.explodes = new Array();
        this.explodeRadius = 50;
        this.playerMissiles = new Array();
        this.enemiesMissiles = new Array();
    }
    move() {
        var pb = this.playerMissiles;
        var eb = this.enemiesMissiles;
        for (var i = 0; i < pb.length; i++) {
            pb[i].y -= this.step;
            if (pb[i].y < 0) {
                pb.splice(i, 1);
            }
        }
        for (var i = 0; i < eb.length; i++) {
            eb[i].y += this.step;
            if (eb[i].y > canvas.height) {
                eb.splice(i, 1);
            }
        }
    }
}