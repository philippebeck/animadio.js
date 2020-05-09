/*! animadio.js v0.1.5 | https://animadio.org | MIT License */

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

class Input extends Animadio {
  /**
   * @param {Object} inputs
   * @param {Object} elements
   * @param {Object} duration
   */
  constructor(inputs, elements = ["animadio", ["trigger"]], duration = [2000, {}, {}]) {
    super();

    this.inputIds   = inputs;
    this.inputCount = inputs.length;
    this.inputs     = [];

    this.mainElement  = elements[0];
    this.elements     = elements[1];
    this.elementCount = elements[1].length;

    this.mainClass  = null;
    this.classes    = [];

    this.duration       = duration[0];
    this.durationBase   = duration[0];
    this.countValues    = duration[1];
    this.durationValues = duration[2];

    this.getAllElements();
    this.getAllValues();
    this.mainClass.addEventListener("click", this.clickCheckBtn.bind(this));
  }

  getAllElements() {
    for (let elementIndex = 0; elementIndex < this.elementCount; elementIndex++) {
      this.classes[elementIndex] = document.querySelector("#" + this.mainElement + "-" + this.elements[elementIndex]);
    }
    this.mainClass = this.classes[0];
  }

  getAllValues() {
    for (let inputIndex = 0; inputIndex < this.inputCount; inputIndex++) {
      this.inputs[inputIndex] = document.querySelector("#" + this.inputIds[inputIndex]);
      this.inputs[inputIndex].addEventListener("input", this.getValue.bind(this, inputIndex));
    }
  }

  /**
   * @param {number} inputIndex
   * @returns {string}
   */
  getValue(inputIndex) {
    return this.inputs[inputIndex].value;
  }

  clickCheckBtn() {
    this.mainClass.setAttribute("disabled", true);

    for (let inputIndex = 0; inputIndex < this.inputCount; inputIndex++) {
      this.inputs[inputIndex].setAttribute("disabled", true);
    }
    this.AddClasses();
  }

  AddClasses() {
    for (let inputIndex = 0; inputIndex < this.inputCount; inputIndex++) {
      if (this.inputs[inputIndex].value) {
        this.toggleClass(inputIndex);
      }
      this.setAllDuration(inputIndex);
    }
    window.setTimeout(this.removeClasses.bind(this), this.duration);
  }

  /**
   * @param {number} inputIndex
   */
  toggleClass(inputIndex) {
    for (let elementIndex = 0; elementIndex < this.elementCount; elementIndex++) {
      this.classes[elementIndex].classList.toggle(this.inputs[inputIndex].value + "-" + this.elements[elementIndex]);
    }
  }

  /**
   * @param {number} inputIndex
   */
  setAllDuration(inputIndex) {
    if (this.durationValues) {
      this.setDuration(inputIndex);
    }

    if (this.countValues) {
      this.setCount(inputIndex);
    }
  }

  /**
   * @param {number} inputIndex
   */
  setDuration(inputIndex) {
    for (let [durationKey, durationValue] of Object.entries(this.durationValues)) {
      if (this.inputs[inputIndex].value.includes(durationKey)) {
        this.duration = durationValue;
      }
    }
  }

  /**
   * @param {number} inputIndex
   */
  setCount(inputIndex) {
    for (let [countKey, countValue] of Object.entries(this.countValues)) {
      if (this.inputs[inputIndex].value.includes(countKey)) {
        this.duration = this.duration * countValue;
      }
    }
  }

  removeClasses() {
    this.mainClass.checked  = false;
    this.duration           = this.durationBase;

    for (let inputIndex = 0; inputIndex < this.inputCount; inputIndex++) {
      if (this.inputs[inputIndex].value) {
        this.toggleClass(inputIndex);
      }
      this.inputs[inputIndex].removeAttribute("disabled");
    }
    this.mainClass.removeAttribute("disabled");
  }
}

class Slider extends Animadio {
  constructor() {
    super();

    this.index = 0;

    this.slider   = document.getElementById("slider");
    this.relay    = document.getElementById("slider-relay");

    this.autoTrigger    = document.getElementById("slider-check-auto");
    this.repeatTrigger  = document.getElementById("slider-check-repeat");
    this.randomTrigger  = document.getElementById("slider-check-random");

    this.auto   = document.getElementById("slider-auto");
    this.repeat = document.getElementById("slider-repeat");
    this.random = document.getElementById("slider-random");

    this.previous = document.getElementById("slider-previous");
    this.next     = document.getElementById("slider-next");

    this.allTriggers    = this.slider.querySelectorAll("input");
    this.slidesCount    = this.relay.querySelectorAll("figure").length;
    this.slidesTriggers = [];

    this.getTriggers();
    this.setControls();

    this.timer = window.setInterval(this.nextSlide.bind(this), 2000);
  }

  getTriggers() {
    let triggerCount = 0;
    for (let triggerIndex = 0; triggerIndex < this.allTriggers.length; triggerIndex++) {
      if (this.allTriggers[triggerIndex].getAttribute("type") === "radio") {
        this.slidesTriggers[triggerCount] = this.allTriggers[triggerIndex];
        triggerCount++;
      }
    }
  }

  setControls() {
    this.previous.addEventListener("click", this.previousSlide.bind(this));
    this.repeat.addEventListener("click", this.repeatSlide.bind(this));
    this.autoTrigger.addEventListener("click", this.autoSlide.bind(this));
    this.random.addEventListener("click", this.randomSlide.bind(this));
    this.next.addEventListener("click", this.nextSlide.bind(this));

    document.addEventListener("keydown", this.keyboardControls.bind(this));
  }

  refreshSlide() {
    let previousIndex = this.index - 1;

    if (previousIndex < 0) {
      previousIndex = this.slidesCount - 1;
    }
    if (previousIndex === this.slidesCount) {
      previousIndex = 0;
    }

    this.slidesTriggers[this.index].setAttribute("checked", true);
    this.slidesTriggers[previousIndex].removeAttribute("checked");
  }

  previousSlide() {
    this.index--;

    if (this.index < 0) {
      this.index = this.slidesCount - 1;
    }

    this.refreshSlide();
  }

  repeatSlide() {
    this.repeatTrigger.toggleAttribute("checked");
  }

  autoSlide() {
    this.autoTrigger.toggleAttribute("checked");

    if (this.timer === null) {
      this.timer        = window.setInterval(this.nextSlide.bind(this), 2000);
      this.auto.title   = "Pause";

    } else {
      window.clearInterval(this.timer);
      this.timer        = null;
      this.auto.title   = "Play";
    }
  }

  randomSlide() {
    this.randomTrigger.toggleAttribute("checked");

    if (this.random.getAttribute("checked" === true)) {
      this.index = this.getRandomInteger(0, this.slidesCount - 1);
    }

    this.refreshSlide();
  }

  nextSlide() {
    this.index++;

    if (this.index >= this.slidesCount) {
      this.index = 0;
    }

    this.refreshSlide();
  }

  /**
   * @param {Object} event
   */
  keyboardControls(event) {
    switch (event.code) {
      case "ArrowLeft":
        this.previousSlide();
        break;
      case "ArrowUp":
        this.repeatSlide();
        break;
      case "Space":
        this.autoSlide();
        break;
      case "ArrowDown":
        this.randomSlide();
        break;
      case "ArrowRight":
        this.nextSlide();
        break;
    }
  }
}

/*! Author: Philippe Beck <philippe@philippebeck.net>
 Updated: 9th May 2020 @ 10:32:19 PM */