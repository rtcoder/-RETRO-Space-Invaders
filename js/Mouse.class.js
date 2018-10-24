class Mouse {
    constructor() {
        this.right = false;
        this.left = false;
        this.wheelClick = false;
        this.scrollDown = false;
        this.scrollUp = false;
        this.xPos = 0;
        this.yPos = 0;

        this.setEvents();
    }

    setEvents() {
        (() => {
            window.addEventListener('mousedown', e => {
                this.onMousedown(e);
            });
            window.addEventListener('mouseup', e => {
                this.onMouseup(e);
            });
            window.addEventListener('mousemove', e => {
                this.onMousemove(e);
            });
            ['scroll', 'mousewheel', 'DOMMouseScroll'].map(e => {
                window.addEventListener(e, event => {
                    this.onScroll(event);
                });
            });

            window.addEventListener('contextmenu', e => {
                e.preventDefault();
            })
        })();
    }

    onScroll(e) {
        e = e || window.event;
        if (e.wheelDelta / 120 > 0) {
            this.scrollUp = true;
        } else {
            this.scrollDown = true;
        }

        if (timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            this.scrollDown = false;
            this.scrollUp = false;
        }, 150);
    }

    onMousemove(e) {
        e = e || window.event;
        this.xPos = e.pageX;
        this.yPos = e.pageY;
    }

    onMouse(e, valueToSet) {
        e = e || window.event;
        if ("buttons" in e) {
            if (e.buttons === 1) {
                this.left = valueToSet;
            }
            if (e.buttons === 2) {
                this.right = valueToSet;
            }
            if (e.buttons === 4) {
                this.wheelClick = valueToSet;
            }
        }
        const button = e.which || e.button;
        if (button === 1) {
            this.left = valueToSet;
        }
        if (button === 2) {
            this.right = valueToSet;
        }
        if (button === 4) {
            this.wheelClick = valueToSet;
        }
    }

    onMouseup(e) {
        this.onMouse(e, false);

        if (e.buttons === 0) {
            this.right = false;
        }
    }

    onMousedown(e) {
        this.onMouse(e, true);
    }
}

let timer = null;