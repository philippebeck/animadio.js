"use strict";

class Animadio {
  /**
   * @param {Object} inputIds
   * @param {number} duration
   * @param {string} countId
   * @param {string} durationId
   */
  constructor(inputIds, duration = 0, countId = null, durationId = null) {
    this.inputIds   = inputIds;
    this.inputCount = inputIds.length;
    this.input      = [];

    this.durationId = durationId;
    this.countId    = countId;
    this.duration   = duration;

    this.check  = document.getElementById("check");
    this.hub    = document.getElementById("hub");
    this.goal   = document.getElementById("goal");

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
   * @returns {*}
   */
  getValue(i) {
    return this.input[i].value;
  }

  clickCheckBtn() {
    this.check.setAttribute("disabled", true);
    this.setDuration();
    this.addClasses();
  }

  addClasses() {
    for (let i = 0; i < this.inputCount; i++) {
      this.check.classList.add(this.input[i].value + "-check");
      this.hub.classList.add(this.input[i].value + "-hub");
      this.goal.classList.add(this.input[i].value + "-goal");
    }
    window.setTimeout(this.removeClasses, this.duration);
  }

  removeClasses() {
    this.check.checked = false;

    for (let i = 0; i < this.inputCount; i++) {
      this.check.classList.remove(this.input[i].value + "-check");
      this.hub.classList.remove(this.input[i].value + "-hub");
      this.goal.classList.remove(this.input[i].value + "-goal");
    }
    this.check.removeAttribute("disabled");
  }

  /**
   * @returns {number}
   */
  setDuration() {
    if (this.durationId) {
      // TODO
    }

    if (this.countId) {
      // TODO
    }

    return this.duration;
  }
}
