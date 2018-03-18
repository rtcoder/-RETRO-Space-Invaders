const BULLET = 1;
const BOMB = 2;

var Game;
var collisions;
var draw;
var enemies;
var missiles;
var player;
var extras;
var keys;
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
        Game = new Invaders();
        draw = new Draw();
        enemies = new Enemies();
        missiles = new Missiles();
        player = new Player();
        extras = new Extras();
        keys = new Keys();
        collisions = new Collisions();

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