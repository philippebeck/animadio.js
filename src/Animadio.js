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

  /**
   * @param selector
   * @return
   */
  getElement(selector) {
    return document.querySelector(selector);
  }

  /**
   * @param selector
   * @param type
   * @param listener
   */
  installEventListener(selector, type, listener) {
    var element;
    element = document.querySelector(selector);
    element.addEventListener(type, listener);
  }
}
