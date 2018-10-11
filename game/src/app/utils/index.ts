export default class Utils {
  static getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  static getRandomFromArray(list: number[]) {
    return list[Math.floor(Math.random() * list.length)];
  };
}
