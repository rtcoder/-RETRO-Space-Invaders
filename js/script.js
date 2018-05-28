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

        var menu = document.getElementById('menu');
        menu.classList.add('hidden');

        viewDiv = document.getElementById(view);
        viewDiv.classList.add('visible');

    }
    function startGame() {
        var menu = document.getElementById('menu');
        menu.classList.add('hidden');
        Game.startGame();
    }
    document.getElementById('startGame').addEventListener('click', startGame);
    let buttons = document.getElementsByClassName('open-view');
    for (let btn of buttons) {
        let id = btn.dataset.id;
        btn.addEventListener('click', function () {
            openView(id);
        });
    }
    document.getElementById('equipment').addEventListener('click', function () {
        openView('equipment');
    });
})();