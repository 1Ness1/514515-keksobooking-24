import {showErrorMessage, showSuccessMessage, sendData} from './load.js';
import { createMarkers} from './map.js';
import {offers} from './main.js';
const mainForm = document.querySelector('.ad-form');
const getFields = mainForm.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const inputs = mapForm.querySelector('.map__features');
const form = document.querySelector('.ad-form');
const formAddress = form.querySelector('#address');
const formTitle = form.querySelector('#title');
const formPrice = form.querySelector('#price');
const selectCheckIn = form.querySelector('#timein');
const selectCheckOut = form.querySelector('#timeout');
const formRoomNumber = form.querySelector('#room_number');
const formGuestNumber = form.querySelector('#capacity');
const inputPrice = form.querySelector('#price');
const selectType = form.querySelector('#type');
const formReset = form.querySelector('.ad-form__reset');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;

function deactivateFilter( ) {
  mainForm.classList.add('ad-form--disabled');
  getFields.forEach((item) => {
    item.setAttribute('disabled', '');
  });
}

function deactivateForm() {
  deactivateFilter();
  mapForm.classList.add('map__filter--disabled');
  for (const item of mapForm.children) {
    item.setAttribute('disabled', '');
  }
  for (const input of inputs.children) {
    input.setAttribute('disabled', '');
  }
}

function activateFilter() {
  mainForm.classList.remove('ad-form--disabled');
  getFields.forEach((item) => {
    item.removeAttribute('disabled', '');
  });
}

function activateForm() {
  mapForm.classList.remove('map__filter--disabled');
  for (const item of mapForm.children) {
    item.removeAttribute('disabled', '');
  }
  for (const input of inputs.children) {
    input.removeAttribute('disabled', '');
  }
}

formTitle.addEventListener('input', () => {
  const valueLength = formTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(
      `Удалите лишние ${MAX_TITLE_LENGTH - valueLength} симв.`);
  } else {
    formTitle.setCustomValidity('');
  }
});

formPrice.addEventListener('input', () => {
  const valuePrice = formPrice.value;
  valuePrice > MAX_PRICE_LENGTH
    ? formPrice.setCustomValidity(
      `Удалите лишние ${MAX_PRICE_LENGTH - valuePrice} симв.`)
    : formPrice.setCustomValidity('');
});

const capacityValidValues = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const setFormCapacity = () => {
  const rooms = formRoomNumber.value;
  const options = formGuestNumber.querySelectorAll('option');
  options.forEach((option) => {
    option.disabled = capacityValidValues[rooms].indexOf(option.value) === -1;
  });
  if (options[formGuestNumber.selectedIndex].disabled) {
    formGuestNumber.querySelector('option:not([disabled])').selected = true;
  }
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(
    showSuccessMessage,
    showErrorMessage,
    new FormData(evt.target));
});

formReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  createMarkers(offers.slice(0, 10));
});

setFormCapacity();

const onFormRoomNumberChange = () => {
  setFormCapacity();
};

formRoomNumber.addEventListener('change', onFormRoomNumberChange);

const validityListMap = ({
  valueMissing: 'Обязательное поле',
  badInput: 'Пожалуйста, введите число',
  rangeUnderflow: `Пожалуйста, не меньше ${inputPrice.min}`,
  rangeOverflow: `Пожалуйста, не больше ${inputPrice.max}`,
});

const validationPrice = () => {

  const errorKey = Object.keys(validityListMap).find((key) => inputPrice.validity[key]);
  inputPrice.setCustomValidity(errorKey ? validityListMap[errorKey] : '');
};

const onInputPriceCheckValidity = () => {
  validationPrice();
};

const onInputPriceSetCustomValidity = () => {
  validationPrice();
};

const minPriceForType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const setMinPrice = (minPrice) => {
  inputPrice.setAttribute('min', minPrice);
  inputPrice.setAttribute('placeholder', minPrice);
};


const onSelectTypeChange = () => {
  setMinPrice(minPriceForType[selectType.value]);
};

const onSelectCheckInChange = () => {
  selectCheckOut.value = selectCheckIn.value;
};

const onSelectCheckOutChange = () => {
  selectCheckIn.value = selectCheckOut.value;
};

inputPrice.addEventListener('invalid', onInputPriceCheckValidity);
inputPrice.addEventListener('input', onInputPriceSetCustomValidity);
selectType.addEventListener('change', onSelectTypeChange);
selectCheckIn.addEventListener('change', onSelectCheckInChange);
selectCheckOut.addEventListener('change', onSelectCheckOutChange);

export  {
  deactivateForm,
  activateForm,
  formAddress,
  deactivateFilter,
  activateFilter,
  form
};
