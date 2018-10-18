export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomFromArray = (list: number[]): number => {
  return list[Math.floor(Math.random() * list.length)];
};
