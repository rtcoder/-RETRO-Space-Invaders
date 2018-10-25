Object.size = obj => {
    let size = 0;
    for (const key in obj) {
        if (obj.hasOwnProperty(key))
            size++;
    }
    return size;
};

export const getRandomInt = (min, max) => {
    if (!min) {
        min = 1;
    }
    if (!max) {
        max = 100;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomString = length => {
    if (!length) {
        length = 10;
    }
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

export const resize = () => {
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight - document.getElementById('info').offsetHeight);
};

window.addEventListener('resize', resize);

export const log = () => {
    console.log.apply(this, arguments);
};

resize();