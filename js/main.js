import { createOffers } from './data.js';
import {activateForm, deactivateForm} from './form.js';
import { initMap } from './map.js';

const offers = createOffers(5);

deactivateForm();

initMap(offers, () => {
  activateForm();
});
