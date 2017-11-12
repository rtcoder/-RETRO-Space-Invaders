class Bullets {
    constructor() {
        this.size = 5;
        this.step = 5;
        this.explodes = new Array();
        this.playerBullets = new Array();
        this.enemiesBullets = new Array();
    }
    move() {
        var pb = this.playerBullets;
        var eb = this.enemiesBullets;
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