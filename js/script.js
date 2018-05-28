const BULLET = 1;
const BOMB = 2;

var Game = new Invaders();
var draw = new Draw();
var enemies = new Enemies();
var missiles = new Missiles();
var player = new Player();
var extras = new Extras();
var keys = new Keys();
var mouse = new Mouse();
var controls = new Controls();
var collisions = new Collisions();
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