class Controls {
    constructor() {
        this.mouseControl = true;
        this.keysControl = false;
        this.gamepadControl = false;
    }

    set(type) {
        this.mouseControl = false;
        this.keysControl = false;
        this.gamepadControl = false;
        if (this.hasOwnProperty(type)) {
            this[type] = true;
        }
    }
}