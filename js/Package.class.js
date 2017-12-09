class Package {
    constructor(x, y) {
        this.x = x;
        this.y = y ? y : 0;
        this.type = getRandomInt(1, Extras.types.length) - 1;
        this.size = 30;
        this.uid = getRandomString();
    }
    set() {
        if (typeof Extras.activeExtras[Extras.types[this.type].name] === "undefined") {
            Extras.activeExtras[Extras.types[this.type].name] = {
                remaningTime: Extras.types[this.type].remaningTime,
                uid: this.uid
            };
        } else {
            if (Extras.activeExtras[Extras.types[this.type].name].uid !== this.uid) {
                Extras.activeExtras[Extras.types[this.type].name].uid = this.uid;
                Extras.activeExtras[Extras.types[this.type].name].remaningTime += Extras.types[this.type].remaningTime;
            }
        }
    }
}