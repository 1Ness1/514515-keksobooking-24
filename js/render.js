import { createOffers } from './data.js';
const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const mapCanvas = document.querySelector('#map-canvas');
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

const map = L.map(mapCanvas).setView({
  lat: 59.96831,
  lng: 30.31748,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const mainPinMarker = L.marker(
  {
    lat: 59.96831,
    lng: 30.31748,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});


const points = [
  {
    title: 'Футура',
    lat: 59.96925,
    lng: 30.31730,
  },
  {
    title: 'Шаверма',
    lat: 59.96783,
    lng: 30.31258,
  },
  {
    title: 'Франк',
    lat: 59.95958,
    lng: 30.30228,
  },
  {
    title: 'Ginza',
    lat: 59.97292,
    lng: 30.31982,
  },
];

// console.log(createCard);

// Array.from(createOffers, 5).forEach(({lon, lat}) => {
//   const {lon, lat} = location
//   const icon = L.icon({
//     iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//   });
//   const marker = L.marker({
//     lot,
//     lat,
//   });

//   marker.addTo(map);
// });

// mapCanvas.appendChild(cardElement);
