class Draw {
    constructor() {
        this.backgroundColor = '#000';
    }

    player() {
        const width = player.getSize().width;
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
        for (const enemy of enemies.list) {
            if (!enemy.isKilled) {
                ctx.beginPath();
                ctx.strokeStyle = 'transparent';
                ctx.rect(enemy.x, enemy.y, enemies.width, enemies.height / 2);
                ctx.rect(enemy.x + enemies.width / 2 - 5, enemy.y + 10, 10, enemies.height / 2);
                ctx.fillStyle = enemies.color;
                ctx.fill();
                ctx.stroke();
            }
        }
    }

    missiles() {
        for (const playerMissile of missiles.playerMissiles) {
            ctx.beginPath();
            let x = playerMissile.x;
            let y = playerMissile.y;
            let size = missiles.size;
            ctx.moveTo(x, y);
            ctx.strokeStyle = 'transparent';
            if (playerMissile.type === BULLET) {
                ctx.fillStyle = '#fff';
            } else if (playerMissile.type === BOMB) {
                ctx.fillStyle = '#00f';
                size *= 2;
            }
            ctx.arc(x, y, size / 2, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        for (const enemyMissile of missiles.enemiesMissiles) {
            ctx.beginPath();
            let x = enemyMissile.x;
            let y = enemyMissile.y;
            ctx.moveTo(x, y);
            ctx.arc(x, y, missiles.size / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    packages() {
        for (const extra of extras.list) {
            ctx.beginPath();
            let x = extra.x;
            let y = extra.y;
            ctx.moveTo(x, y);
            ctx.arc(x, y, extra.size / 2, 0, 2 * Math.PI, false);
            ctx.strokeStyle = "#fff";
            ctx.fillStyle = extra.color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }

    explodes() {
        ctx.beginPath();
        for (const missilesExplode of missiles.explodes) {
            ctx.moveTo(missilesExplode.x, missilesExplode.y);
            ctx.arc(missilesExplode.x, missilesExplode.y, missiles.explodeRadius, 0, 2 * Math.PI, false);
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