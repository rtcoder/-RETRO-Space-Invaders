class Draw {
    constructor() {
        this.backgroundColor = '#000';
    }
    player() {
        ctx.beginPath();
        ctx.rect(Player.x, Player.y, Player.width, Player.height);
        ctx.rect(Player.x + Player.width / 2 - 5, Player.y - 10, 10, 10);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.stroke();
    }
    background() {
        ctx.beginPath();
        ctx.strokeStyle = 'transparent';
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = this.backgroundColor;
        ctx.fill();
        ctx.stroke();
    }
    enemies() {
        let e = Enemies.list;
        for (let i = 0; i < e.length; i++) {
            if (!e[i].isKilled) {
                ctx.beginPath();
                ctx.rect(e[i].x, e[i].y, Enemies.width, Enemies.height / 2);
                ctx.rect(e[i].x + Enemies.width / 2 - 5, e[i].y + 10, 10, Enemies.height / 2);
                ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
                ctx.fill();
                ctx.stroke();
            }
        }
    }
    missiles() {
        ctx.beginPath();
        let pb = Missiles.playerMissiles;
        for (let i = 0; i < pb.length; i++) {
            let x = pb[i].x;
            let y = pb[i].y;
            ctx.moveTo(x, y);
            ctx.arc(x, y, Missiles.size / 2, 0, 2 * Math.PI, false);
            if (pb[i].type === BULLET) {
                ctx.fillStyle = '#fff';
            } else if (pb[i].type === BOMB) {
                ctx.fillStyle = '#00f';
            }
            ctx.fill();
        }
        let eb = Missiles.enemiesMissiles;
        for (let i = 0; i < eb.length; i++) {
            let x = eb[i].x;
            let y = eb[i].y;
            ctx.moveTo(x, y);
            ctx.arc(x, y, Missiles.size / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#fff';
            ctx.fill();
        }
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    explodes() {
        ctx.beginPath();
        let ex = Missiles.explodes;
        for (let i in ex) {
            ctx.moveTo(ex[i].x, ex[i].y);
            ctx.arc(ex[i].x, ex[i].y, Missiles.explodeRadius, 0, 2 * Math.PI, false);
        }
        ctx.lineWidth = 1;
        ctx.fillStyle = '#00f';
        ctx.fill();
        ctx.stroke();
    }
    All() {
        this.background();
        this.enemies();
        this.missiles();
        this.explodes();
        this.player();
    }
}