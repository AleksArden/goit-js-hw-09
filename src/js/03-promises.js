import Notiflix from 'notiflix';

class Generator {
  constructor({ formRef, onResolve, onReject }) {
    this.formRef = formRef;
    this.onResolve = onResolve;
    this.onReject = onReject;
    this.intervalId = null;
    this.sumDelay = 0;
    this.position = 1;
  }
  init() {
    this.addListeners();
  }
  addListeners() {
    this.formRef.addEventListener('submit', this.onSubmitForm.bind(this));
  }
  onSubmitForm(event) {
    event.preventDefault();

    const {
      elements: { delay, step, amount },
    } = event.currentTarget;
    const firstDelay = Number(delay.value);
    const stepDelay = Number(step.value);
    const amountValue = Number(amount.value);

    setTimeout(() => {
      this.sumDelay += firstDelay;
      this.callCreatePromise()

      this.intervalId = setInterval(() => {
        this.position += 1;
        this.sumDelay += stepDelay;

        if (this.position > amountValue) {
          this.clear();
        } else {
          this.callCreatePromise();
        }
      }, stepDelay);
    }, firstDelay);
  }
  callCreatePromise() {
    this.createPromise(this.position, this.sumDelay)
      .then(this.onResolve.bind(this))
      .catch(this.onReject.bind(this));
  }
  createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    });
  }
  clear() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.sumDelay = 0;
    this.position = 1;
  }
}

const settings = {
  formRef: document.querySelector('.form'),
  onResolve,
  onReject,
};
new Generator(settings).init();


function onResolve({ position, delay }) {
  Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
};

function onReject({ position, delay }) {
  Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
};