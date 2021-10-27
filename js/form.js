document.addEventListener('DOMContentLoaded', () => {
  const mapCanvas = document.querySelector('.map__canvas');
  const mainForm = document.querySelector('.ad-form');
  const getFieldsets = mainForm.querySelectorAll('.ad-form__element');
  const mapForm = document.querySelector('.map__filters');
  const inputs = mapForm.querySelector('.map__features');
  function getDisabledForm(disable) {
    if (disable) {
      mapCanvas.innerHTML = '';
      mainForm.classList.add('ad-form--disabled');
      getFieldsets.forEach((item) => {
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
  }

  getDisabledForm(true);
});
