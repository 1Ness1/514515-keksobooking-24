const DATA_SERVER_GET = 'https://24.javascript.pages.academy/keksobooking/data';
const DATA_SERVER_POST = 'https://24.javascript.pages.academy/keksobooking';

const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeErrorButton = errorMessage.querySelector('.error__button');
const ESC_BROWSERS = 'Escape';
const ESC_IE = 'Esc';

const isEscapeKey = (evt) => evt.key === ESC_BROWSERS || evt.key === ESC_IE;


const showErrorMessage = () => {
  document.body.appendChild(errorMessage);
  const keyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessage.remove();
      document.removeEventListener('keydown', keyDownHandler);
    }
  };

  document.addEventListener('keydown', keyDownHandler);

  closeErrorButton.addEventListener('click', () => {
    errorMessage.remove();
    document.removeEventListener('keydown', keyDownHandler);
  });

  errorMessage.addEventListener('click', () => {
    errorMessage.remove();
    document.removeEventListener('keydown', keyDownHandler);
  });
};


const showSuccessMessage = () => {
  document.body.appendChild(successMessage);
  const keyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessage.remove();
      document.removeEventListener('keydown', keyDownHandler);
    }
  };

  document.addEventListener('keydown', keyDownHandler);

  successMessage.addEventListener('click', () => {
    successMessage.remove();
    document.removeEventListener('keydown', keyDownHandler);
  });
};

const showServerError = () => {
  const errorServerMessage = document.createElement('div');
  errorServerMessage.style.zIndex = '20';
  errorServerMessage.style.textAlign = 'center';
  errorServerMessage.style.position = 'fixed';
  errorServerMessage.style.top = '0';
  errorServerMessage.style.left = '0';
  errorServerMessage.style.width = '100%',
  errorServerMessage.style.fontSize = '48px';
  errorServerMessage.style.padding = '20px 0',
  errorServerMessage.style.fontWeight = '600';
  errorServerMessage.style.color = '#000';
  errorServerMessage.style.backgroundColor = '#f0f0ea';
  errorServerMessage.textContent = 'Не удалось получить данные с сервера';

  document.body.append(errorServerMessage);
};

const getData = (success) => {
  fetch(DATA_SERVER_GET)
    .then((response) => response.json())
    .then((offers) => success(offers))
    .catch(() => showServerError());
};

const sendData = (success, fail, body) => {
  fetch(DATA_SERVER_POST,
    {method: 'POST',
      body},
  )
    .then((response) => {
      if (response.ok) {
        success(showSuccessMessage);
      } else {
        fail(showErrorMessage);
      }
    })
    .catch(() => fail());
};

export { getData, sendData, showErrorMessage, showSuccessMessage};
