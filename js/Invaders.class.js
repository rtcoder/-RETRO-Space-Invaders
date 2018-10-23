class Invaders {
    constructor() {
        this.isPaused = false;
        this.isFinished = false;
        this.level = 0;
        this.isBombEnabled = false;
        this.loopMilisconds = 3;
        this.gameLoop = null;
    }

    startGame() {
        this.isPaused = false;
        this.isFinished = false;
        this.setGame();
        this.gameLoop = setInterval(()=>this.loop(), this.loopMilisconds);
    }

    pauseGame() {
        this.isPaused = true;
        resumeGameBtn.classList.remove('hidden');
        menu.classList.remove('hidden');
        clearInterval(this.gameLoop);
    }

    resumeGame() {
        this.isPaused = false;
        this.isFinished = false;
        menu.classList.add('hidden');
        this.gameLoop = setInterval(()=>this.loop(), this.loopMilisconds);
    }

    setGame() {
        enemies.cols = levels[this.level].cols;
        enemies.rows = levels[this.level].rows;
        enemies.shootInterval = levels[this.level].enemiesShootInterval;
        enemies.color = levels[this.level].enemiesColor;
        player.shootInterval = levels[this.level].playerShootInterval;
        extras.list = new List();
        extras.activeExtras = new List();
        for (let i in extras.types) {
            document.getElementById(extras.types[i].name + 'Container').style = 'display:none';
        }

        this.isBombEnabled = levels[this.level].isBombEnabled;
        document.getElementById('level').innerHTML = this.level + 1;
        enemies.generate();
    }

    finish(arg) {
        if (arg === 'fail') {
            this.level = 0;
            resumeGameBtn.classList.add('hidden');
            menu.classList.remove('hidden');
        } else if (arg === 'next') {
            this.level++;
        }
        this.setGame();
    }

    loop() {
        if (!Game.isPaused && !this.isFinished && document.hasFocus()) {
            collisions.Missiles();
            collisions.Explodes();
            collisions.Packages();

            enemies.move();
            missiles.move();
            extras.addPackage();
            extras.move();
            extras.countDown();
            enemies.shoot();

            if (controls.keysControl) {
                if (keys.AltLeft) {
                    player.moveLeft();
                }
                if (keys.AltRight) {
                    player.moveRight();
                }
                if (keys.ctrl) {
                    player.shoot(BULLET);
                }
            }
            if (controls.mouseControl) {
                player.moveTo({x: mouse.xPos});

                if (mouse.left) {
                    player.shoot(BULLET);
                }
                if (mouse.right && Game.isBombEnabled) {
                    player.shoot(BOMB);
                }
            }
            if (controls.mouseControl || controls.keysControl) {
                if (keys.Escape) {
                    this.pauseGame();
                }
                if (keys.KeyZ && Game.isBombEnabled) {
                    player.shoot(BOMB);
                }
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            draw.All();
        }

    }
}