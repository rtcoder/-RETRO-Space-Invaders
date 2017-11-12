class Collisions {
    Explodes() {
        var e = Enemies.list;
        var ex = Missiles.explodes;
        for (var j = 0; j < ex.length; j++) {
            for (var i = 0; i < e.length; i++) {
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
                }
            }
        }
    }
    Missiles() {
        var e = Enemies.list;
        var pb = Missiles.playerMissiles;
        for (var i = 0; i < e.length; i++) {
            for (var j = 0; j < pb.length; j++) {
                if (e.length > i && pb.length > j
                        && pb[j].x + Missiles.size >= e[i].x
                        && pb[j].x <= e[i].x + Enemies.width
                        && pb[j].y + Missiles.size >= e[i].y
                        && pb[j].y <= e[i].y + Enemies.height
                        && !e[i].isKilled) {
                    e[i].isKilled = true;
                    pb.splice(j, 1);
                    let c = 0;
                    for (let k in Enemies.list) {
                        if (!Enemies.list[k].isKilled) {
                            c++;
                        }
                    }
                    if (c === 0) {
                        Game.finish('next');
                    }
                }
            }
        }

        var eb = Missiles.enemiesMissiles;
        for (var j = 0; j < eb.length; j++) {
            if (eb.length > j
                    && eb[j].x + Missiles.size >= Player.x
                    && eb[j].x <= Player.x + Player.width
                    && eb[j].y + Missiles.size >= Player.y
                    && eb[j].y <= Player.y + Player.height) {
                Game.finish('fail');
            }
        }
    }
    PointCircleColliding(circle, point) {
        return Math.pow(circle.x - point.x, 2) + Math.pow(circle.y - point.y, 2) < circle.r * circle.r;
    }
    RectCircleColliding(circle, rect) {
        var distX = Math.abs(circle.x - rect.x - rect.w / 2);
        var distY = Math.abs(circle.y - rect.y - rect.h / 2);

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

        var dx = distX - rect.w / 2;
        var dy = distY - rect.h / 2;
        return (dx * dx + dy * dy <= (circle.r * circle.r));
    }
}