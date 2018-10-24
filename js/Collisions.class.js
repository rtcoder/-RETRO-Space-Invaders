class Collisions {
    Explodes() {
        const e = enemies.list;
        const ex = missiles.explodes;
        for (const j in ex) {
            for (const i in e) {
                const r = {
                    x: e[i].x,
                    y: e[i].y,
                    w: enemies.width,
                    h: enemies.height
                };
                const c = {
                    x: ex[j].x,
                    y: ex[j].y,
                    r: missiles.explodeRadius
                };
                if (e.length > i && ex.length > j
                    && this.RectCircleColliding(c, r)
                    && !e[i].isKilled) {

                    e[i].isKilled = true;
                    enemies.countAlive();
                }
            }
            ex[j].t--;
            if (ex[j].t <= 0) {
                ex.remove(j);
            }
        }
    }

    Missiles() {
        const e = enemies.list;
        const pb = missiles.playerMissiles;
        for (const i in e) {
            for (const j in pb) {
                if (enemies.list.length > i && pb.length > j
                    && pb[j].x + missiles.size >= e[i].x
                    && pb[j].x <= e[i].x + enemies.width
                    && pb[j].y + missiles.size >= e[i].y
                    && pb[j].y <= e[i].y + enemies.height
                    && !e[i].isKilled) {
                    if (pb[j].type === BULLET) {
                        e[i].isKilled = true;
                    } else if (pb[j].type === BOMB) {
                        missiles.explodes.add({
                            x: pb[j].x,
                            y: pb[j].y,
                            t: 10
                        });
                    }
                    pb.remove(j);
                    enemies.countAlive();
                }
            }
        }

        const eb = missiles.enemiesMissiles;
        const playerWidth = player.getSize().width;
        for (const j in missiles.enemiesMissiles) {
            if (missiles.enemiesMissiles.length > j
                && eb[j].x + missiles.size >= player.x
                && eb[j].x <= player.x + playerWidth
                && eb[j].y + missiles.size >= player.y
                && eb[j].y <= player.y + player.height) {
                Game.finish('fail');
            }
        }
    }

    Packages() {
        const ex = extras.list;
        const playerWidth = player.getSize().width;
        for (const j in ex) {
            if (ex.length > j
                && ex[j].x + ex[j].size >= player.x
                && ex[j].x <= player.x + playerWidth
                && ex[j].y + ex[j].size >= player.y
                && ex[j].y <= player.y + player.height) {

                ex[j].set();
                ex.remove(j);
            }
        }
    }

    PointCircleColliding(circle, point) {
        return Math.pow(circle.x - point.x, 2) + Math.pow(circle.y - point.y, 2) < circle.r * circle.r;
    }

    RectCircleColliding(circle, rect) {
        const distX = Math.abs(circle.x - rect.x - rect.w / 2);
        const distY = Math.abs(circle.y - rect.y - rect.h / 2);

        if (distX > (rect.w / 2 + circle.r)) {
            return false;
        }
        if (distY > (rect.h / 2 + circle.r)) {
            return false;
        }

        if (distX <= (rect.w / 2)) {
            return true;
        }
        if (distY <= (rect.h / 2)) {
            return true;
        }

        const dx = distX - rect.w / 2;
        const dy = distY - rect.h / 2;
        return (dx * dx + dy * dy <= (circle.r * circle.r));
    }
}