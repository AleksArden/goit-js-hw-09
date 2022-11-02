import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
let deadlineTime = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        deadlineTime = selectedDates[0].getTime();
        const currentTime = options.defaultDate.getTime();
        if (deadlineTime - currentTime > 0) {
            getRef('[data-start]').toggleAttribute('disabled');
        } else {
            Notiflix.Notify.failure('Please choose a date in the future');
        }
    },
};


class Timer {
    constructor({ btnStart, flatpickr, options, onShowTime }) {
        this.btnStart = btnStart;
        this.flatpickr = flatpickr;
        this.options = options;
        this.onShowTime = onShowTime;
        this.intervalId = null;
        this.deltaTime = 0;
    }
    init() {

        this.flatpickr('#datetime-picker', this.options);
        this.addListeners();
        this.btnStart.setAttribute('disabled', true);
    }
    addListeners() {
        this.btnStart.addEventListener('click', this.countdownTimer.bind(this));
    }
    countdownTimer() {
        this.btnStart.toggleAttribute('disabled');
        this.onGetTime();

        this.intervalId = setInterval(() => {
            this.onGetTime();

            if (this.deltaTime <= 0) {
                this.onStopTimer();
            }
        }, 1000);
    }
    onGetTime() {
        const currentTime = Date.now();
        this.deltaTime = deadlineTime - currentTime;
        const time = this.convertMs(this.deltaTime);
        this.onShowTime(time);
    }
    onStopTimer() {
        clearInterval(this.intervalId);
        this.onShowTime(this.convertMs(0));
    }
    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = this.addLeadingZero(Math.floor(ms / day));
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = this.addLeadingZero(
            Math.floor(((ms % day) % hour) / minute)
        );
        const seconds = this.addLeadingZero(
            Math.floor((((ms % day) % hour) % minute) / second)
        );
        return { days, hours, minutes, seconds };
    }
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    }
}

let getRef = x => document.querySelector(x);
const settings = {
    btnStart: getRef('[data-start]'),
    flatpickr,
    options,
    onShowTime,
};

new Timer(settings).init();

function onShowTime({ days, hours, minutes, seconds }) {
    getRef('[data-days]').textContent = days;
    getRef('[data-hours]').textContent = hours;
    getRef('[data-minutes]').textContent = minutes;
    getRef('[data-seconds]').textContent = seconds;
}

