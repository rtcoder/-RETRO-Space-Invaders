const BULLET = 1;
const BOMB = 2;

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
(function () {
    function openView(view) {
        let menu = document.getElementById('menu');
        menu.classList.add('hidden');

        viewDiv = document.getElementById(view);
        viewDiv.classList.add('visible');
    }

    function backToMenu() {
        let menu = document.getElementById('menu');
        menu.classList.remove('hidden');

        viewDivs = document.getElementsByClassName('view');
        for (let div of viewDivs) {
            div.classList.remove('visible');
        }
    }

    function startGame() {
        let menu = document.getElementById('menu');
        menu.classList.add('hidden');
        Game.startGame();
    }

    const controlsBtns = document.getElementsByClassName('set-control-type');
    for (let btn of controlsBtns) {
        btn.addEventListener('click', () => controls.set(btn.dataset.type));
    }
    document.getElementById('startGame').addEventListener('click', startGame);
    let menuListElements = document.getElementsByClassName('open-view');
    for (let btn of menuListElements) {
        let id = btn.dataset.id;
        btn.addEventListener('click', function () {
            openView(id);
        });
    }
    let backButtons = document.getElementsByClassName('back');
    for (let btn of backButtons) {
        btn.addEventListener('click', function () {
            backToMenu();
        });
    }
})();