const BULLET = 1;
const BOMB = 2;
var Game = {
    isPaused: false,
    isFinished: false,
    isBombEnabled: false,
    gameLoop: null,
    level: 0,
    startGame: function () {
        Game.isPaused = false;
        Game.isFinished = false;
        Collisions = new Collisions();
        Draw = new Draw();
        Enemies = new Enemies();
        Missiles = new Missiles();
        Player = new Player();
        Keys = new Keys();
        Game.set();
        Game.gameLoop = setInterval(loop, 3);
    },
    set: function () {
        Enemies.cols = levels[Game.level].cols;
        Enemies.rows = levels[Game.level].rows;
        Enemies.shootInterval = levels[Game.level].enemiesShootInterval;
        Enemies.color = levels[Game.level].enemiesColor;
        Player.shootInterval = levels[Game.level].playerShootInterval;
        if (Game.level > 1) {
            Game.isBombEnabled = true;
        }
        Enemies.generate();
    },
    finish: function (arg) {
        if (arg === 'fail') {
            Game.level = 0;
        } else if (arg === 'next') {
            Game.level++;
        }
        Game.set();
    },
    delLives: function (val) {
        Player.lives -= val;
        if (Player.lives <= 0) {
            Player.lives = 0;
            Game.finish("fail");
        }
    },
    addLives: function (val) {
        Player.lives += val;
        if (Player.lives > Player.maxLives) {
            Player.lives = Player.maxLives;
        }
    }
};

function loop() {
    if (!Game.isPaused && !Game.isFinished) {
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

Game.startGame();