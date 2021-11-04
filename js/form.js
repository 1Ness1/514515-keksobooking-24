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

const onAdFormRoomNumberChange = () => {
  setFormCapacity();
};

formRoomNumber.addEventListener('change', onAdFormRoomNumberChange);

deactivateForm();
activateForm();
