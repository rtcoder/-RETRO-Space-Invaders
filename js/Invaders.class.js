const BULLET = 1;
const BOMB = 2;
class Invaders {
    constructor() {
        this.isPaused = false;
        this.isFinished = false;
        this.isBombEnabled = false;
        this.gameLoop = null;
        this.level = 0;
    }
    startGame() {
        this.isPaused = false;
        this.isFinished = false;
        Collisions = new Collisions();
        Draw = new Draw();
        Enemies = new Enemies();
        Missiles = new Missiles();
        Player = new Player();
        Keys = new Keys();
        this.set();
        this.gameLoop = setInterval(this.loop, 3);
    }
    set() {
        Enemies.cols = levels[this.level].cols;
        Enemies.rows = levels[this.level].rows;
        Enemies.shootInterval = levels[this.level].enemiesShootInterval;
        Enemies.color = levels[this.level].enemiesColor;
        Player.shootInterval = levels[this.level].playerShootInterval;
        if (this.level > 1) {
            this.isBombEnabled = true;
        }
        document.getElementById('level').innerHTML = this.level + 1;
        Enemies.generate();
    }
    finish(arg) {
        if (arg === 'fail') {
            this.level = 0;
        } else if (arg === 'next') {
            this.level++;
        }
        this.set();
    }
    delLives(val) {
        Player.lives -= val;
        if (Player.lives <= 0) {
            Player.lives = 0;
            this.finish("fail");
        }
    }
    addLives(val) {
        Player.lives += val;
        if (Player.lives > Player.maxLives) {
            Player.lives = Player.maxLives;
        }
    }
    loop() {
        if (!Game.isPaused && !Game.isFinished && document.hasFocus()) {
            Collisions.Missiles();
            Collisions.Explodes();

            Enemies.move();
            Missiles.move();
            Enemies.shoot();

            if (Keys.left) {
                Player.moveLeft();
            }
            if (Keys.right) {
                Player.moveRight();
            }
            if (Keys.ctrl) {
                Player.shoot(BULLET);
            }
            if (Keys.Z && Game.isBombEnabled) {
                Player.shoot(BOMB);
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            Draw.All();
        }

    }
}

var Game = new Invaders();
Game.startGame();