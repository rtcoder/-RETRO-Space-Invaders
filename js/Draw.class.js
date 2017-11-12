class Draw {
    constructor() {
        this.backgroundColor = '#000';
    }
    player() {
        let radiusHead = 10;
        let radiusEye = 2;
        let legsHeight = 25;

        ctx.beginPath();
        ctx.arc(Player.x + Player.width / 2, Player.y - Player.height, radiusHead, 0, 2 * Math.PI, false);
        ctx.fillStyle = Player.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'transparent';
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
                ctx.rect(e[i].x, e[i].y, Enemies.width, Enemies.height);
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
        }
        let eb = Missiles.enemiesMissiles;
        for (let i = 0; i < eb.length; i++) {
            let x = eb[i].x;
            let y = eb[i].y;
            ctx.moveTo(x, y);
            ctx.arc(x, y, Missiles.size / 2, 0, 2 * Math.PI, false);
        }
        ctx.lineWidth = 1;
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.stroke();
    }
    All() {
        this.background();
        this.enemies();
        this.missiles();
        this.player();
    }
}