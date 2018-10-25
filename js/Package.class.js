import {getRandomInt, getRandomString} from "./custom.js";
import {extras} from "./Extras.class.js";

export default class Package {
    constructor(x, y) {
        this.x = x;
        this.y = y ? y : 0;
        this.type = getRandomInt(1, extras.types.length) - 1;
        this.size = 30;
        this.uid = getRandomString();
        this.color = extras.types[this.type].color;
    }

    set() {
        if (typeof extras.activeExtras[extras.types[this.type].name] === "undefined") {
            extras.activeExtras[extras.types[this.type].name] = {
                remainingTime: extras.types[this.type].remainingTime,
                uid: this.uid
            };
        } else {
            if (extras.activeExtras[extras.types[this.type].name].uid !== this.uid) {
                extras.activeExtras[extras.types[this.type].name].uid = this.uid;
                extras.activeExtras[extras.types[this.type].name].remainingTime += extras.types[this.type].remainingTime;
            }
        }
    }

    moveDown(){

    }
}