const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;

const roomTypesAdapter = {
  palace: 'дворец',
  flat: 'квартира',
  house: 'дом',
  bungalow: 'бунгало',
  hotel: 'отель',
};

const card = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createOfferCard = ({author, offer}) => {
  const cardElement = card.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price}${'₽/ночь'}`;
  cardElement.querySelector('.popup__type').textContent = roomTypesAdapter[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  const featuresList = cardElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  if (offer.features) {
    offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add(`popup__feature--${feature}`);
      featuresList.appendChild(featureElement);
    });
  }
  else {
    cardElement.removeChild(featuresList);
  }

  const featuresPhotos = cardElement.querySelector('.popup__photos');
  featuresPhotos.innerHTML = '';
  if (offer.photos) {
    offer.photos.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.src = photo;
      photoElement.width = PHOTO_WIDTH;
      photoElement.height = PHOTO_HEIGHT;
      featuresPhotos.appendChild(photoElement);
    });
  }
  else {
    cardElement.removeChild(featuresPhotos);
  }
  return cardElement;
};

export {createOfferCard};
