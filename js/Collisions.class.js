import {enemies} from "./Enemies.class.js";
import {missiles} from "./Missiles.class.js";
import {player} from "./Player.class.js";
import {BOMB, BULLET, Game} from "./script.js";
import {extras} from "./Extras.class.js";

export class CollisionsClass {
    Explodes() {
        missiles.explodes.forEach((ex, j) => {
            enemies.list.forEach((e, i) => {
                const r = {
                    x: e.x,
                    y: e.y,
                    w: enemies.width,
                    h: enemies.height
                };
                const c = {
                    x: ex.x,
                    y: ex.y,
                    r: missiles.explodeRadius
                };
                if (enemies.list.length > i && ex.length > j
                    && this.RectCircleColliding(c, r)
                    && !e.isKilled) {

                    e.isKilled = true;
                    enemies.countAlive();
                }
            });
            ex.t--;
            if (ex.t <= 0) {
                ex.remove(j);
            }
        });
    }

    Missiles() {
        enemies.list.forEach((e, i) => {
            missiles.playerMissiles.forEach((pb, j) => {
                if (enemies.list.length > i && missiles.playerMissiles.length > j
                    && pb.x + missiles.size >= e.x
                    && pb.x <= e.x + enemies.width
                    && pb.y + missiles.size >= e.y
                    && pb.y <= e.y + enemies.height
                    && !e.isKilled) {
                    if (pb.type === BULLET) {
                        e.isKilled = true;
                    } else if (pb.type === BOMB) {
                        missiles.explodes.add({
                            x: pb.x,
                            y: pb.y,
                            t: 10
                        });
                    }
                    missiles.playerMissiles.remove(j);
                    enemies.countAlive();
                }
            });
        });

        const playerWidth = player.getSize().width;
        missiles.enemiesMissiles.forEach((eb, j) => {
            if (missiles.enemiesMissiles.length > j
                && eb.x + missiles.size >= player.x
                && eb.x <= player.x + playerWidth
                && eb.y + missiles.size >= player.y
                && eb.y <= player.y + player.height) {
                Game.finish('fail');
            }
        });
    }

    Packages() {
        const playerWidth = player.getSize().width;
        extras.list.forEach((ex, j) => {
            if (extras.list.length > j
                && ex.x + ex.size >= player.x
                && ex.x <= player.x + playerWidth
                && ex.y + ex.size >= player.y
                && ex.y <= player.y + player.height) {

                ex.set();
                ex.remove(j);
            }
        });
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

export const collisions = new CollisionsClass();