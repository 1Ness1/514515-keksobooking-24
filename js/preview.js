const IMAGE_TYPES = ['jpg','jpeg','png','svg', 'gif'];
const preview = document.querySelector('#avatar');
const image = document.querySelector('#images');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const previewImage = document.querySelector('.ad-form__photo');
const resetButton = document.querySelector('.ad-form__reset');


const changePriview = () => {
  preview.addEventListener('change', () => {
    const changeImage = preview.files[0];
    const fileNameAvatar = changeImage.name.toLowerCase();
    const coincidence = IMAGE_TYPES.some((type) => fileNameAvatar.endsWith(type));
    if(coincidence) {
      previewAvatar.src = URL.createObjectURL(changeImage);
    }
  });

  resetButton.addEventListener('click', () => {
    previewAvatar.src = 'img/muffin-grey.svg';
    previewImage.innerHTML = '';
  });

  image.addEventListener('change', () => {
    const fileImage = image.files[0];
    const fileNameImage = fileImage.name.toLowerCase();
    const matches = IMAGE_TYPES.some((type) => fileNameImage.endsWith(type));
    if(matches) {
      const file = document.createElement('img');
      file.style.width = '70px';
      file.style.height = '70px';
      file.alt = 'Фото жилья';
      file.src = URL.createObjectURL(fileImage);
      previewImage.appendChild(file);
    }
  });
};

export {changePriview, previewAvatar, previewImage};

