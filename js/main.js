import { createOffers } from './data.js';
import {activateForm, deactivateForm, activateFilter} from './form.js';
import {initMap, createMarkers } from './map.js';
import {filterOffers, initFilter} from './filter.js';
import {getData} from './load.js';
import {changePriview} from './preview.js';

let offers = createOffers(5);

const setOffers = (data) => {
  offers = data;
};

getData ((data) => {
  offers = data;
  createMarkers(offers.slice(0, 5));
  setOffers(offers);
  activateFilter();
});

deactivateForm();

const debugging =  (callback, delay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), delay);
  };
};

const mapFilter = debugging(() => {
  const filteredOffers = filterOffers(offers);
  const newFilteredOffers = filteredOffers.slice(0, 5);
  createMarkers(newFilteredOffers);
});

initFilter(mapFilter);

initMap(offers, () => {
  activateForm();
});

changePriview();

export {offers};
