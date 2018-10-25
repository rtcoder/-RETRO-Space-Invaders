import Invaders from './Invaders.class.js'
import {controls} from "./Controls.class.js";
import {Keys} from "./Keys.class.js";

export const BULLET = 1;
export const BOMB = 2;

export const Game = new Invaders();
export const keys = new Keys();

export const startGameBtn = document.getElementById('startGame');
export const resumeGameBtn = document.getElementById('resumeGame');
export const menu = document.getElementById('menu');
export const controlsBtns = document.getElementsByClassName('set-control-type');
export const menuListElements = document.getElementsByClassName('open-view');
export const backButtons = document.getElementsByClassName('back');
export const viewDivs = document.getElementsByClassName('view');


export const startGame = () => {
    menu.classList.add('hidden');
    Game.startGame();
};

export const resumeGame = () => {
    menu.classList.add('hidden');
    Game.resumeGame();
};

export const openView = (view) => {
    menu.classList.add('hidden');
    const viewDiv = document.getElementById(view);
    viewDiv.classList.add('visible');
};

export const backToMenu = () => {
    menu.classList.remove('hidden');
    for (const div of viewDivs) {
        div.classList.remove('visible');
    }
};
(() => {
    for (const btn of controlsBtns) {
        btn.addEventListener('click', () => {
            for (const b of controlsBtns) {
                b.classList.remove('active');
            }
            btn.classList.add('active');
            controls.set(btn.dataset.type);
        });
        if (controls.hasOwnProperty(btn.dataset.type) && !!controls[btn.dataset.type]) {
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