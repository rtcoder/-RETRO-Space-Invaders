const BULLET = 1;
const BOMB = 2;

const Database = new DB();
const Game = new Invaders();
const draw = new Draw();
const enemies = new Enemies();
const missiles = new Missiles();
const player = new Player();
const extras = new Extras();
const keys = new Keys();
const mouse = new Mouse();
const controls = new Controls();
const collisions = new Collisions();

const startGameBtn = document.getElementById('startGame');
const resumeGameBtn = document.getElementById('resumeGame');
const menu = document.getElementById('menu');
const controlsBtns = document.getElementsByClassName('set-control-type');
const menuListElements = document.getElementsByClassName('open-view');
const backButtons = document.getElementsByClassName('back');
const viewDivs = document.getElementsByClassName('view');
(function () {

    function openView(view) {
        menu.classList.add('hidden');
        const viewDiv = document.getElementById(view);
        viewDiv.classList.add('visible');
    }

    function backToMenu() {
        menu.classList.remove('hidden');
        for (const div of viewDivs) {
            div.classList.remove('visible');
        }
    }

    function startGame() {
        menu.classList.add('hidden');
        Game.startGame();
    }

    function resumeGame() {
        menu.classList.add('hidden');
        Game.resumeGame();
    }

    for (const btn of controlsBtns) {
        btn.addEventListener('click', () => {
            for (const b of controlsBtns) {
                b.classList.remove('active');
            }
            btn.classList.add('active');
            controls.set(btn.dataset.type);
        });
        if(controls.hasOwnProperty(btn.dataset.type) && !!controls[btn.dataset.type]){
            btn.click();
        }
    }
    startGameBtn.addEventListener('click', startGame);
    resumeGameBtn.addEventListener('click', resumeGame);
    for (const btn of menuListElements) {
        const id = btn.dataset.id;
        btn.addEventListener('click', function () {
            openView(id);
        });
    }
    for (const btn of backButtons) {
        btn.addEventListener('click', function () {
            backToMenu();
        });
    }
})();