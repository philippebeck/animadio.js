"use strict";

class Animadio {
  /**
   * @param {Object} input
   * @param {string} key
   * @param {Object} duration
   */
  constructor(input, key, duration = [5000, {}, {}]) {
    this.inputIds   = input;
    this.inputCount = input.length;
    this.input      = [];

    this.duration       = duration[0];
    this.durationBase   = duration[0];
    this.countValues    = duration[1];
    this.durationValues = duration[2];

    this.check  = document.getElementById(key + "-check");
    this.hub    = document.getElementById(key + "-hub");
    this.goal   = document.getElementById(key + "-goal");

    this.getValues();
    this.check.addEventListener("click", this.clickCheckBtn.bind(this));
  }

  getValues() {
    for (let i = 0; i < this.inputCount; i++) {
      this.input[i] = document.getElementById(this.inputIds[i]);
      this.input[i].addEventListener("input", this.getValue.bind(this, i));
    }
  }

  /**
   * @param {number} i
   * @returns {string}
   */
  getValue(i) {
    return this.input[i].value;
  }

  clickCheckBtn() {
    this.check.setAttribute("disabled", true);
    this.addClasses();
  }

  /**
   * @param {number} i
   */
  setDuration(i) {
    if (this.durationValues) {
      for (let [key, value] of Object.entries(this.durationValues)) {
        if (this.input[i].value.includes(key)) {
          this.duration = value;
        }
      }
    }
  }

  /**
   * @param {number} i
   */
  setCount(i) {
    if (this.countValues) {
      for (let [key, value] of Object.entries(this.countValues)) {
        if (this.input[i].value.includes(key)) {
          this.duration = this.duration * value;
        }
      }
    }
  }

  addClasses() {
    for (let i = 0; i < this.inputCount; i++) {

      if (this.input[i].value) {
        this.check.classList.add(this.input[i].value + "-check");
        this.hub.classList.add(this.input[i].value + "-hub");
        this.goal.classList.add(this.input[i].value + "-goal");
      }

      this.setDuration(i);
      this.setCount(i);
    }
    window.setTimeout(this.removeClasses.bind(this), this.duration);
  }

  removeClasses() {
    this.check.checked  = false;
    this.duration       = this.durationBase;

    for (let i = 0; i < this.inputCount; i++) {
      this.check.classList.remove(this.input[i].value + "-check");
      this.hub.classList.remove(this.input[i].value + "-hub");
      this.goal.classList.remove(this.input[i].value + "-goal");
    }
    this.check.removeAttribute("disabled");
  }
}
