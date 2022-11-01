

class Colorswitcher {
    constructor({ btnStart, btnStop, bodyRef }) {
        this.btnStart = btnStart;
        this.btnStop = btnStop;
        this.bodyRef = bodyRef;
        this.timerId = null;
    }
    init() {
        this.addListeners();
        this.btnStop.setAttribute('disabled', true);
    }
    addListeners() {
        this.btnStart.addEventListener('click', this.start.bind(this));
        this.btnStop.addEventListener('click', this.stop.bind(this));
    }
    start() {
        this.changeColorBody();
        this.changeAttribute();
        this.timerId = setInterval(() => {
            this.changeColorBody();
        }, 1000);
    }
    stop() {
        clearInterval(this.timerId);
        this.changeAttribute();
    }
    changeAttribute() {
        this.btnStart.toggleAttribute('disabled');
        this.btnStop.toggleAttribute('disabled');
    }
    changeColorBody() {
        this.bodyRef.style.background = this.getRandomHexColor();
    }
    getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

}
let getRef = x => document.querySelector(x)
const refs = {
    btnStart: getRef('[data-start]'),
    btnStop: getRef('[data-stop]'),
    bodyRef: getRef('body'),
};

new Colorswitcher(refs).init();