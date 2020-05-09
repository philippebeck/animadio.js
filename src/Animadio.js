"use strict";

class Animadio {
  /**
   * @param min
   * @param max
   * @return
   */
  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
