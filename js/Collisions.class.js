class Collisions {
    Explodes() {
        let e = Enemies.list;
        let ex = Missiles.explodes;
        for (let j in ex) {
            for (let i in e) {
                let r = {
                    x: e[i].x,
                    y: e[i].y,
                    w: Enemies.width,
                    h: Enemies.height
                };
                let c = {
                    x: ex[j].x,
                    y: ex[j].y,
                    r: Missiles.explodeRadius
                };
                if (e.length > i && ex.length > j
                        && this.RectCircleColliding(c, r)
                        && !e[i].isKilled) {

                    e[i].isKilled = true;
                    Enemies.countAlive();
                }
            }
            ex[j].t--;
            if (ex[j].t <= 0) {
                ex.splice(j, 1);
            }
        }
    }
    Missiles() {
        let e = Enemies.list;
        let pb = Missiles.playerMissiles;
        for (let i in e) {
            for (let j in pb) {
                if (e.length > i && pb.length > j
                        && pb[j].x + Missiles.size >= e[i].x
                        && pb[j].x <= e[i].x + Enemies.width
                        && pb[j].y + Missiles.size >= e[i].y
                        && pb[j].y <= e[i].y + Enemies.height
                        && !e[i].isKilled) {
                    if (pb[j].type === BULLET) {
                        e[i].isKilled = true;
                    } else if (pb[j].type === BOMB) {
                        Missiles.explodes.push({
                            x: pb[j].x,
                            y: pb[j].y,
                            t: 10
                        });
                    }
                    pb.splice(j, 1);
                    Enemies.countAlive();
                }
            }
        }

        let eb = Missiles.enemiesMissiles;
        for (let j in eb) {
            if (eb.length > j
                    && eb[j].x + Missiles.size >= Player.x
                    && eb[j].x <= Player.x + Player.width
                    && eb[j].y + Missiles.size >= Player.y
                    && eb[j].y <= Player.y + Player.height) {
                Game.finish('fail');
            }
        }
    }
    Packages() {
        let extras = Extras.list;
        for (let j in extras) {
            if (extras.length > j
                    && extras[j].x + extras[j].size >= Player.x
                    && extras[j].x <= Player.x + Player.width
                    && extras[j].y + extras[j].size >= Player.y
                    && extras[j].y <= Player.y + Player.height) {

                extras[j].set();
                extras.splice(j, 1);
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