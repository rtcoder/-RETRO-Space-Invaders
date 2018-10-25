export class Gamepad {
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
            window.addEventListener("gamepadconnected", e => {
                console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                    e.gamepad.index, e.gamepad.id,
                    e.gamepad.buttons.length, e.gamepad.axes.length);
            });
        })();
    }
}

export const gamepad = new Gamepad();