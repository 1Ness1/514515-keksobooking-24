import {
  getRandomCoordinate,
  getRandomInteger,
  getRandomArrayElement,
  getRandomElementsFromArray,
} from "./utils.js";

const housingTypes = ["palace", "flat", "house", "bungalow", "hotel"];

const textList = [
  "Mystery of the Scarred Mermaid",
  "Year of Menace",
  "Xeno Chaos",
  "The Blood Gate",
  "Unleash the Future",
  "The Yellow Piano",
  "Clue of the Absent Pyramid",
];

const featuresList = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner",
];

const photos = [
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg",
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg",
  "https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg",
];

function createOffer() {
  const location = {
    lon: getRandomCoordinate(35.65, 35.7, 5),
    lat: getRandomCoordinate(139.7, 139.8, 5),
  };

  return {
    author: {
      avatar: `img/avatars/user${getRandomInteger(1, 10)
        .toString()
        .padStart(2, "0")}.png`,
    },
    offer: {
      title: getRandomArrayElement(textList),
      address: `${location.lon}, ${location.lat}`,
      price: getRandomInteger(10000, 50000),
      type: getRandomArrayElement(housingTypes),
      rooms: getRandomInteger(1, 3),
      guests: getRandomInteger(1, 6),
      checkin: `${getRandomInteger(12, 14)}:00`,
      checkout: `${getRandomInteger(12, 14)}:00`,
      features: getRandomElementsFromArray(featuresList),
      description: getRandomArrayElement(textList),
      photos: getRandomElementsFromArray(photos),
    },
    location,
  };
}

export { createOffer };
