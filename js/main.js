const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (min - max - 1) + max);
};

function getRandomCoordinate(min, max, decimalPlaces) {
  return (Math.random() * (min - max - 1) + max).toFixed(decimalPlaces);
}

getRandomInteger(-1, 20);

getRandomCoordinate(-10, 40, 5);
