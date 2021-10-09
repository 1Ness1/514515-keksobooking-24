function getRandomCoordinate(min, max, decimalPlaces = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(decimalPlaces);
}

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

function getRandomElementsFromArray(array) {
  const randomElements = getRandomInteger(1, array.length - 1);
  const result = [];

  if (randomElements === array.length - 1) {
    return [...array];
  }

  while (result.length < randomElements) {
    const randomElement = getRandomArrayElement(array);
    if (!result.includes(randomElement)) {
      result.push(randomElement);
    }
  }

  return result;
}

export {
  getRandomCoordinate,
  getRandomInteger,
  getRandomArrayElement,
  getRandomElementsFromArray,
};
