import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/svg/error.svg';
import successIcon from '../img/svg/circle.svg';

const createForm = document.querySelector('form');

createForm.addEventListener('submit', event => {
  event.preventDefault();
  const delay = event.currentTarget.elements.delay.value;
  const radioChecked = document.querySelector('input[name="state"]:checked');

  // ==================== Створення проміса ====================

  const promise = new Promise((resolve, reject) => {
    if (radioChecked.value === 'fulfilled') {
      resolve(delay);
    } else {
      reject(delay);
    }
  });

  // ==================== Виконання проміса ====================

  promise
    .then(delay => {
      setTimeout(() => {
        izitoast.success({
          title: 'OK',
          message: `Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          iconUrl: `${successIcon}`,
          backgroundColor: '#59A10D',
          titleColor: '#fff',
          messageColor: '#fff',
          messageSize: '16px',
          progressBarColor: '#B5EA7C',
        });
      }, delay);
    })
    .catch(delay => {
      setTimeout(() => {
        izitoast.error({
          title: 'Error',
          message: `Rejected promise in ${delay}ms`,
          position: 'topRight',
          iconUrl: `${errorIcon}`,
          backgroundColor: '#EF4040',
          titleColor: '#fff',
          messageColor: '#fff',
          messageSize: '16px',
          progressBarColor: '#FFBEBE',
        });
      }, delay);
    });
  createForm.reset();
});