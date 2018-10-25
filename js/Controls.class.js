import {Database} from "./DB.class.js";

export class Controls {
    constructor() {
        this.mouseControl = false;
        this.keysControl = false;
        this.gamepadControl = false;
        const saved = Database.getValue('controls');
        if (saved && this.hasOwnProperty(saved)) {
            this[saved] = true;
        } else {
            this.mouseControl = true;
        }
    }

    set(type) {
        this.mouseControl = false;
        this.keysControl = false;
        this.gamepadControl = false;
        if (this.hasOwnProperty(type)) {
            this[type] = true;
            Database.setValue('controls', type);
        }
    }
}

export const controls = new Controls();