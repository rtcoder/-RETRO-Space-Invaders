export class Mouse {
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
            });
        })();
    }

    onScroll(e) {
        const event = e || window.event;
        if (event.wheelDelta / 120 > 0) {
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
        const event = e || window.event;
        this.xPos = event.pageX;
        this.yPos = event.pageY;
    }

    onMouse(e, valueToSet) {
        const event = e || window.event;
        if ("buttons" in event) {
            if (event.buttons === 1) {
                this.left = valueToSet;
            }
            if (event.buttons === 2) {
                this.right = valueToSet;
            }
            if (event.buttons === 4) {
                this.wheelClick = valueToSet;
            }
        }
        const button = event.which || event.button;
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
        const event = e || window.event;
        this.onMouse(event, false);

        if (event.buttons === 0) {
            this.right = false;
        }
    }

    onMousedown(e) {
        const event = e || window.event;
        this.onMouse(event, true);
    }
}

let timer = null;
export const mouse = new Mouse();