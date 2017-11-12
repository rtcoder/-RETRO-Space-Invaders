class Keys {
    constructor() {
        this.right = false;
        this.left = false;
        this.space = false;
        this.ctrl = false;
        this.shift = false;
        this.C = false;
        this.X = false;
        this.Z = false;

    }

}
document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 16:
            Keys.shift = true;
            break;
        case 17:
            Keys.ctrl = true;
            break;
        case 27:
            Game.isPaused = !Game.isPaused;
            break;
        case 32:
            Keys.space = true;
            break;
        case 37:
            Keys.left = true;
            break;
        case 39:
            Keys.right = true;
            break;
        case 88:
            Keys.X = true;
            break;
        case 90:
            Keys.Z = true;
            break;
    }
};
document.onkeyup = function (e) {
    e = e || window.event;

    switch (e.keyCode) {
        case 16:
            Keys.shift = false;
            break;
        case 17:
            Keys.ctrl = false;
            break;
        case 32:
            Keys.space = false;
            break;
        case 37:
            Keys.left = false;
            break;
        case 39:
            Keys.right = false;
            break;
        case 88:
            Keys.X = false;
            break;
        case 90:
            Keys.Z = false;
            break;
    }
};