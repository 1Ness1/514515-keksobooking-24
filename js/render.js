import { createOffers } from './data.js';
const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');


const createCard = createOffers();

const offerType = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const cardElement = cardTemplate.cloneNode(true);

createCard.forEach((card) => {
  const offer = card.offer;
  const author = card.author;

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent =
    offer.address;
  cardElement.querySelector(
    '.popup__text--price',
  ).textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerType[offer.type];
  cardElement.querySelector(
    '.popup__text--capacity',
  ).textContent = `${offer.rooms}, выезд до ${offer.guests} гостей`;
  cardElement.querySelector(
    '.popup__text--time',
  ).textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  cardElement.querySelector('.popup__features').innerHTML = '';
  offer.features.forEach((feature) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add(`popup__feature--${  feature}`);
    cardElement.querySelector('.popup__features').append(li);
  });
  cardElement.querySelector('.popup__description').textContent =
    offer.description;
  cardElement.querySelector('.popup__photos').innerHTML = '';

  offer.photos.forEach((photo) => {
    const photos = document.createElement('img');
    photos.classList.add('popup__photo');
    photos.src = photo;
    cardElement.querySelector('.popup__photos').appendChild(photos);
    cardElement.querySelector('.popup__avatar').src = author.avatar;
  });
});


export {
  createCard
};
