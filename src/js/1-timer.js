import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/svg/error.svg';

let userSelectedDate;
const buttonStart = document.querySelector('[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1,
  },
  onOpen: function daysNames() {
    document.querySelectorAll('.flatpickr-weekday').forEach(el => {
      el.textContent = el.textContent.trim().slice(0, 2);
    });
  },
  onClose: function (selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate >= Date.now()) {
      buttonStart.removeAttribute('disabled');
      buttonStart.classList.add('button-enabled');
    } else {
      izitoast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        iconUrl: `${errorIcon}`,
        backgroundColor: '#EF4040',
        titleColor: '#fff',
        messageColor: '#fff',
        messageSize: '16px',
        progressBarColor: '#B51B1B',
      });
      buttonStart.setAttribute('disabled', true);
      buttonStart.classList.remove('button-enabled');
    }
  },
};
const dateTimeInput = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

buttonStart.addEventListener('click', () => {
  buttonStart.setAttribute('disabled', true);
  buttonStart.classList.remove('button-enabled');
  setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;
    const time = convertMs(deltaTime);
    const { days, hours, minutes, seconds } = time;

    if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) {
      document.querySelector('[data-days').textContent = days
        .toString()
        .padStart(2, '0');
      document.querySelector('[data-hours]').textContent = hours
        .toString()
        .padStart(2, '0');
      document.querySelector('[data-minutes]').textContent = minutes
        .toString()
        .padStart(2, '0');
      document.querySelector('[data-seconds]').textContent = seconds
        .toString()
        .padStart(2, '0');
    }
  }, 1000);
});