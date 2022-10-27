let getRef = selector => document.querySelector(selector)

class Colorpicker {
    constructor({ refs: { btnStart, btnStop, bodyRef } }) {
        this.btnStart = btnStart;
        this.btnStop = btnStop;
        this.bodyRef = bodyRef;
        this.timerId = null;
    }
    init() {
        this.addListeners();
    }
    addListeners() {
        this.btnStart.addEventListener('click', this.start.bind(this));
        this.btnStop.addEventListener('click', this.stop.bind(this));
    }
    start() {
        this.bodyRef.style.background = getRandomHexColor();
        this.btnStart.setAttribute('disabled', '');
        this.btnStop.removeAttribute('disabled');
        this.timerId = setInterval(() => {
            this.bodyRef.style.background = getRandomHexColor();
        }, 1000);
    }
    stop() {
        clearInterval(this.timerId);
        this.btnStop.setAttribute('disabled', '');
        this.btnStart.removeAttribute('disabled');
    }
}

const settings = {
    refs: {
        btnStart: getRef('[data-start]'),
        btnStop: getRef('[data-stop]'),
        bodyRef: getRef('body'),
    },

}

new Colorpicker(settings).init();




function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}