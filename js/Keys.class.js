class Keys {
    constructor() {
        this.ShiftLeft = false;
        this.ShiftRight = false;
        this.AltLeft = false;
        this.AltRight = false;
        this.ControlLeft = false;
        this.ControlRight = false;
        this.ArrowUp = false;
        this.ArrowDown = false;
        this.ArrowRight = false;
        this.ArrowLeft = false;
        this.Space = false;
        this.KeyZ = false;
        this.Escape = false;
    }

    get ctrl() {
        return this.ControlLeft || this.ControlRight;
    }

    get alt() {
        return this.AltLeft || this.AltRight;
    }

    get shift() {
        return this.ShiftLeft || this.ShiftRight;
    }

}

document.onkeydown = e => {
    e = e || window.event;
    if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = true;
    }
};
document.onkeyup = e => {
    e = e || window.event;
    if (keys.hasOwnProperty(e.code)) {
        keys[e.code] = false;
    }
};