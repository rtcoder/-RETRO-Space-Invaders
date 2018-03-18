class Draw {
    constructor() {
        this.backgroundColor = '#000';
    }
    player() {
        let width = player.width;
        if (typeof extras.activeExtras.largeShip !== 'undefined') {
            width = player.largeWidth;
        }
        ctx.beginPath();
        ctx.rect(player.x, player.y, width, player.height);
        ctx.rect(player.x + width / 2 - 5, player.y - 10, 10, 10);
        ctx.fillStyle = player.color;
        ctx.strokeStyle = 'transparent';
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
        let e = enemies.list;
        for (let i in e) {
            if (!e[i].isKilled) {
                ctx.beginPath();
                ctx.strokeStyle = 'transparent';
                ctx.rect(e[i].x, e[i].y, enemies.width, enemies.height / 2);
                ctx.rect(e[i].x + enemies.width / 2 - 5, e[i].y + 10, 10, enemies.height / 2);
                ctx.fillStyle = enemies.color;
                ctx.fill();
                ctx.stroke();
            }
        }
    }
    missiles() {
        let pb = missiles.playerMissiles;
        for (let i in pb) {
            ctx.beginPath();
            let x = pb[i].x;
            let y = pb[i].y;
            let size = missiles.size;
            ctx.moveTo(x, y);
            ctx.strokeStyle = 'transparent';
            if (pb[i].type === BULLET) {
                ctx.fillStyle = '#fff';
            } else if (pb[i].type === BOMB) {
                ctx.fillStyle = '#00f';
                size *= 2;
            }
            ctx.arc(x, y, size / 2, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        let eb = missiles.enemiesMissiles;
        for (let i in eb) {
            ctx.beginPath();
            let x = eb[i].x;
            let y = eb[i].y;
            ctx.moveTo(x, y);
            ctx.arc(x, y, missiles.size / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    packages() {
        let e = extras.list;
        for (let i in e) {
            ctx.beginPath();
            let x = e[i].x;
            let y = e[i].y;
            ctx.moveTo(x, y);
            ctx.arc(x, y, e[i].size / 2, 0, 2 * Math.PI, false);
            ctx.strokeStyle = "#fff";
            ctx.fillStyle = e[i].color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    explodes() {
        ctx.beginPath();
        let ex = missiles.explodes;
        for (let i in ex) {
            ctx.moveTo(ex[i].x, ex[i].y);
            ctx.arc(ex[i].x, ex[i].y, missiles.explodeRadius, 0, 2 * Math.PI, false);
        }
        ctx.lineWidth = 1;
        ctx.fillStyle = '#00f';
        ctx.strokeStyle = 'transparent';
        ctx.fill();
        ctx.stroke();
    }
    All() {
        this.background();
        this.packages();
        this.enemies();
        this.missiles();
        this.explodes();
        this.player();
    }
}