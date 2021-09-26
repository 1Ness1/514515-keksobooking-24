const getRandom = (from, to) => {
  if (from > to) {
    from = 0;
  }
  return Math.abs(Math.floor(Math.random() * (to - from - 1) + from));
};

const getRandomCoordinates = (from, to, digitsAfterDot) => {
  if (from > to) {
    from = 0;
  }
  const getRandomInt = Math.abs(Math.random() * (to - from - 1) + from);
  return getRandomInt.toFixed(digitsAfterDot);
};

getRandom(-1, 20);
getRandomCoordinates(-10, 40, 5);
