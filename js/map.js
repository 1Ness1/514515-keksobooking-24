import {formAddress} from './form.js';
import {createOfferCard} from './popup.js';
const mapCanvas = document.querySelector('#map-canvas');
const tokyoCoordinates = {
  lat: 35.67555,
  lng: 139.75333,
};

const ZOOM_LEVEL = 12;

let map, markerGroup;


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor: [26, 52],
});

const commonIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: 35.67555,
    lng: 139.75333,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const initMap = (offers, onMapLoad) => {
  map = L.map(mapCanvas)
    .on('load', onMapLoad)
    .setView(tokyoCoordinates, ZOOM_LEVEL);
  formAddress.value = `${tokyoCoordinates.lat}; ${tokyoCoordinates.lng}`;

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    const point = evt.target.getLatLng();
    formAddress.value = `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`;
  });

  markerGroup = L.layerGroup().addTo(map);
};


const createMarker = (offer) => L.marker(
  {
    lat: offer.location.lat,
    lng: offer.location.lng,
  },
  {
    icon: commonIcon,
  },
).addTo(markerGroup)
  .bindPopup(((createOfferCard(offer))),
    { keepInView: true },
  );


const createMarkers = (offers) => {
  markerGroup.clearLayers();
  offers.forEach(createMarker);
};

export {
  initMap,
  map,
  createMarkers,
  tokyoCoordinates
};
