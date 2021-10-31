const mapCanvas = document.querySelector('.map__canvas');
const popup = mapCanvas.querySelector('.popup');
const mainForm = document.querySelector('.ad-form');
const getFields = mainForm.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const inputs = mapForm.querySelector('.map__features');

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

deactivateForm();
activateForm();
