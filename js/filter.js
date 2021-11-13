const filter = document.querySelector('.map__filters');
const guests = filter.querySelector('#housing-guests');
const price = filter.querySelector('#housing-price');
const dishwasher = filter.querySelector('#filter-dishwasher');
const washer = filter.querySelector('#filter-washer');
const conditioner = filter.querySelector('#filter-conditioner');
const wifi = filter.querySelector('#filter-wifi');
const elevator = filter.querySelector('#filter-elevator');
const parking = filter.querySelector('#filter-parking');
const type = filter.querySelector('#housing-type');
const rooms = filter.querySelector('#housing-rooms');

const priceRange = {
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, 1000000],
};

const filterOffers = (offers) => offers.filter(({ offer }) => {
  if (type.value !== 'any' && offer.type !== type.value) {
    return false;
  }
  if (price.value !== 'any') {
    const [from, to] = priceRange[price.value];
    if (offer.price < from || offer.price > to) {
      return false;
    }
  }
  if (wifi.checked && (!offer.features || !offer.features.includes('wifi'))) {
    return false;
  }
  if (dishwasher.checked && (!offer.features || !offer.features.includes('dishwasher'))) {
    return false;
  }
  if (parking.checked && (!offer.features || !offer.features.includes('parking'))) {
    return false;
  }
  if (washer.checked && (!offer.features || !offer.features.includes('washer'))) {
    return false;
  }
  if (elevator.checked && (!offer.features || !offer.features.includes('elevator'))) {
    return false;
  }
  if (conditioner.checked && (!offer.features || !offer.features.includes('conditioner'))) {
    return false;
  }

  if (rooms.value !== 'any' && offer.rooms !== Number(rooms.value)) {
    return false;
  }
  if (guests.value !== 'any' && offer.guests !== Number(guests.value)) {
    return false;
  }
  return true;
});

const initFilter = (onFilterChange) => {
  filter.addEventListener('change', onFilterChange);
};

export {initFilter, filterOffers};
