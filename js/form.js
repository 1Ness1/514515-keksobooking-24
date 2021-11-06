const mapCanvas = document.querySelector('.map__canvas');
const popup = mapCanvas.querySelector('.popup');
const mainForm = document.querySelector('.ad-form');
const getFields = mainForm.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const inputs = mapForm.querySelector('.map__features');
const form = document.querySelector('.ad-form');
const formTitle = form.querySelector('#title');
const formPrice = form.querySelector('#price');

function deactivateForm() {
  popup.classList.add('popup--disabled');
  mainForm.classList.add('ad-form--disabled');
  getFields.forEach((item) => {
    item.setAttribute('disabled', '');
  });
  mapForm.classList.add('map__filter--disabled');
  for (const item of mapForm.children) {
    item.setAttribute('disabled', '');
  }
  for (const input of inputs.children) {
    input.setAttribute('disabled', '');
  }
}

function activateForm() {
  popup.classList.remove('popup--disabled');
  mainForm.classList.remove('ad-form--disabled');
  getFields.forEach((item) => {
    item.removeAttribute('disabled', '');
  });
  mapForm.classList.remove('map__filter--disabled');
  for (const item of mapForm.children) {
    item.removeAttribute('disabled', '');
  }
  for (const input of inputs.children) {
    input.removeAttribute('disabled', '');
  }
}

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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


const MAX_PRICE_LENGTH = 1000000;

formPrice.addEventListener('input', () => {
  const valuePrice = formPrice.value;
  valuePrice > MAX_PRICE_LENGTH
    ? formPrice.setCustomValidity(
      `Удалите лишние ${MAX_PRICE_LENGTH - valuePrice} симв.`)
    : formPrice.setCustomValidity('');
});

// Зависимость кол-ва гостей от кол-ва комнат
const formRoomNumber = form.querySelector('#room_number');
const formGuestNumber = form.querySelector('#capacity');

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

setFormCapacity();

const onFormRoomNumberChange = () => {
  setFormCapacity();
};

formRoomNumber.addEventListener('change', onFormRoomNumberChange);


const inputPrice = form.querySelector('#price');

const getValidityListMap = () => ({
  valueMissing: 'Обязательное поле',
  badInput: 'Пожалуйста, введите число',
  rangeUnderflow: `Пожалуйста, не меньше ${inputPrice.min}`,
  rangeOverflow: `Пожалуйста, не больше ${inputPrice.max}`,
});
const validationPrice = () => {
  const validityListMap = getValidityListMap();
  const errorKey = Object.keys(validityListMap).find((key) => inputPrice.validity[key]);
  inputPrice.setCustomValidity(errorKey ? validityListMap[errorKey] : '');
};

const onInputPriceCheckValidity = () => {
  validationPrice();
};

const onInputPriceSetCustomValidity = () => {
  validationPrice();
};

const mapTypeToPrice = {
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

const selectType = form.querySelector('#type');

let minCost = mapTypeToPrice[selectType.value];

setMinPrice(minCost);


const onSelectTypeChange = () => {
  minCost = mapTypeToPrice[selectType.value];
  setMinPrice(minCost);
};


const selectCheckIn = form.querySelector('#timein');
const selectCheckOut = form.querySelector('#timeout');

const changeCheckIn = (checkIn) => {
  selectCheckIn.value = checkIn;
};
const changeCheckOut = (checkOut) => {
  selectCheckOut.value = checkOut;
};
const onSelectCheckInChange = () => {
  changeCheckOut(selectCheckIn.value);
};

const onSelectCheckOutChange = () => {
  changeCheckIn(selectCheckOut.value);
};
inputPrice.addEventListener('invalid', onInputPriceCheckValidity);
inputPrice.addEventListener('input', onInputPriceSetCustomValidity);
selectType.addEventListener('change', onSelectTypeChange);
selectCheckIn.addEventListener('change', onSelectCheckInChange);
selectCheckOut.addEventListener('change', onSelectCheckOutChange);


deactivateForm();
activateForm();
