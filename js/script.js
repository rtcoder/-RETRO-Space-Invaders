var Game;
(function () {
    function startGame() {
        var menu = document.getElementById('menu');
        menu.classList.add('hidden');
        Game = new Invaders();
        Game.startGame();
    }
    document.getElementById('startGame').addEventListener('click', startGame)
})();