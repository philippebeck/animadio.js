"use strict";

class Animadio {
  /**
   * @param {Object} inputs
   * @param {string} key
   * @param {Object} duration
   */
  constructor(inputs, key, duration = [5000, {}, {}]) {
    this.inputIds   = inputs;
    this.inputCount = inputs.length;
    this.inputs     = [];

    this.duration       = duration[0];
    this.durationBase   = duration[0];
    this.countValues    = duration[1];
    this.durationValues = duration[2];

    this.check  = document.getElementById(key + "-check");
    this.hub    = document.getElementById(key + "-hub");
    this.goal   = document.getElementById(key + "-goal");

    this.getAllValues();
    this.check.addEventListener("click", this.clickCheckBtn.bind(this));
  }

  getAllValues() {
    for (let i = 0; i < this.inputCount; i++) {
      this.inputs[i] = document.getElementById(this.inputIds[i]);
      this.inputs[i].addEventListener("input", this.getValue.bind(this, i));
    }
  }

  /**
   * @param {number} index
   * @returns {string}
   */
  getValue(index) {
    return this.inputs[index].value;
  }

  clickCheckBtn() {
    this.check.setAttribute("disabled", true);

    for (let i = 0; i < this.inputCount; i++) {
      this.inputs[i].setAttribute("disabled", true);
    }
    this.AddAllClasses();
  }

  AddAllClasses() {
    for (let i = 0; i < this.inputCount; i++) {
      if (this.inputs[i].value) {
        this.addClass(i);
      }

      if (this.durationValues) {
        this.setDuration(i);
      }

      if (this.countValues) {
        this.setCount(i);
      }
    }
    window.setTimeout(this.removeAllClasses.bind(this), this.duration);
  }

  /**
   * @param {number} index
   */
  addClass(index) {
    this.check.classList.add(this.inputs[index].value + "-check");
    this.hub.classList.add(this.inputs[index].value + "-hub");
    this.goal.classList.add(this.inputs[index].value + "-goal");
  }

  /**
   * @param {number} index
   */
  setDuration(index) {
    for (let [key, value] of Object.entries(this.durationValues)) {
      if (this.inputs[index].value.includes(key)) {
        this.duration = value;
      }
    }
  }

  /**
   * @param {number} index
   */
  setCount(index) {
    for (let [key, value] of Object.entries(this.countValues)) {
      if (this.inputs[index].value.includes(key)) {
        this.duration = this.duration * value;
      }
    }
  }

  removeAllClasses() {
    this.check.checked  = false;
    this.duration       = this.durationBase;

    for (let i = 0; i < this.inputCount; i++) {
      if (this.inputs[i].value) {
        this.removeClass(i);
      }
      this.inputs[i].removeAttribute("disabled");
    }
    this.check.removeAttribute("disabled");
  }

  /**
   * @param {number} index
   */
  removeClass(index) {
    this.check.classList.remove(this.inputs[index].value + "-check");
    this.hub.classList.remove(this.inputs[index].value + "-hub");
    this.goal.classList.remove(this.inputs[index].value + "-goal");
  }
}
