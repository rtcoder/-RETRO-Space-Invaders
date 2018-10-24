class Enemy {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isKilled = false;
    }

    shoot() {
        const arr = {
            x: this.x + missiles.size / 2,
            y: this.y + missiles.size
        };
        missiles.enemiesMissiles.add(arr);
    }

    moveLeft(){

    }
}