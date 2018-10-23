class Collisions {
    Explodes() {
        let e = enemies.list;
        let ex = missiles.explodes;
        for (let j in ex) {
            for (let i in e) {
                let r = {
                    x: e[i].x,
                    y: e[i].y,
                    w: enemies.width,
                    h: enemies.height
                };
                let c = {
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
        const pb = missiles.playerMissiles;
        for (const e of enemies.list) {
            for (const j in pb) {
                if (enemies.list.length > i && pb.length > j
                    && pb[j].x + missiles.size >= e.x
                    && pb[j].x <= e.x + enemies.width
                    && pb[j].y + missiles.size >= e.y
                    && pb[j].y <= e.y + enemies.height
                    && !e.isKilled) {
                    if (pb[j].type === BULLET) {
                        e.isKilled = true;
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

        const playerWidth = player.getSize().width;
        for (const eb of missiles.enemiesMissiles) {
            if (missiles.enemiesMissiles.length > j
                && eb.x + missiles.size >= player.x
                && eb.x <= player.x + playerWidth
                && eb.y + missiles.size >= player.y
                && eb.y <= player.y + player.height) {
                Game.finish('fail');
            }
        }
    }

    Packages() {
        let ex = extras.list;
        let playerWidth = player.getSize().width;
        for (let j in ex) {
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
        let distX = Math.abs(circle.x - rect.x - rect.w / 2);
        let distY = Math.abs(circle.y - rect.y - rect.h / 2);

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

        let dx = distX - rect.w / 2;
        let dy = distY - rect.h / 2;
        return (dx * dx + dy * dy <= (circle.r * circle.r));
    }
}