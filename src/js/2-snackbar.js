import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
const inputDelay = document.querySelector("input[type='number']");
inputDelay.classList.add('inputDelay');
const fullfilledButton = document.querySelector("input[value='fulfilled']");
fullfilledButton.classList.add('fullfilled');
const rejectedButton = document.querySelector("input[value='rejected']");
rejectedButton.classList.add('rejected');

const labels = document.querySelectorAll('label');
labels.forEach((label) => {
label.classList.add('labelStyle');
});
const fieldSet = document.querySelector('fieldset');
fieldSet.classList.add('fieldsetStyle');
const legend = document.querySelector('legend');
legend.classList.add('legendStyle');
const submitButton = document.querySelector('button');
submitButton.classList.add('buttonNotify');
let delay= 0;

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const delay = parseInt(inputDelay.value);
    const isFullfilled = fullfilledButton.checked;

    const makePromise = ({ delay, shouldResolve}) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldResolve) {
                    resolve();
                } else {
                    reject();
                }
            }, delay);
        });
    };

    makePromise({ delay, shouldResolve: isFullfilled })
        .then(() =>
            iziToast.success({
                // title: 'OK',
                position: 'topCenter',
                message: `✅ Fullfilled promise in ${delay}ms`,
            }))
        .catch(() =>
            iziToast.error({
                // title: 'Error',
                position: 'topCenter',
                message: `❌ Rejected promise in ${delay}ms`,
            }));

    inputDelay.value = '';
    fullfilledButton.checked = false;
    rejectedButton.checked = false;
});
