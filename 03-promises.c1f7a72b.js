function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i={},s={},o=t.parcelRequire7bc7;null==o&&((o=function(e){if(e in i)return i[e].exports;if(e in s){var t=s[e];delete s[e];var o={id:e,exports:{}};return i[e]=o,t.call(o.exports,o,o.exports),o.exports}var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){s[e]=t},t.parcelRequire7bc7=o);var n=o("eWCmQ");const r={formRef:document.querySelector(".form"),onResolve:function({position:t,delay:i}){e(n).Notify.success(`Fulfilled promise ${t} in ${i}ms`)},onReject:function({position:t,delay:i}){e(n).Notify.failure(`Rejected promise ${t} in ${i}ms`)}};new class{init(){this.addListeners()}addListeners(){this.formRef.addEventListener("submit",this.onSubmitForm.bind(this))}onSubmitForm(e){e.preventDefault();const{elements:{delay:t,step:i,amount:s}}=e.currentTarget,o=Number(t.value),n=Number(i.value),r=Number(s.value);setTimeout((()=>{this.sumDelay+=o,this.callCreatePromise(),this.intervalId=setInterval((()=>{this.position+=1,this.sumDelay+=n,this.position>r?this.clear():this.callCreatePromise()}),n)}),o)}callCreatePromise(){this.createPromise(this.position,this.sumDelay).then(this.onResolve.bind(this)).catch(this.onReject.bind(this))}createPromise(e,t){return new Promise(((i,s)=>{Math.random()>.3?i({position:e,delay:t}):s({position:e,delay:t})}))}clear(){clearInterval(this.intervalId),this.intervalId=null,this.sumDelay=0,this.position=1}constructor({formRef:e,onResolve:t,onReject:i}){this.formRef=e,this.onResolve=t,this.onReject=i,this.intervalId=null,this.sumDelay=0,this.position=1}}(r).init();
//# sourceMappingURL=03-promises.c1f7a72b.js.map