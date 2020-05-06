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
      this.classes[elementIndex] = this.getElement("#" + this.mainElement + "-" + this.elements[elementIndex]);
    }
    this.mainClass = this.classes[0];
  }

  getAllValues() {
    for (let inputIndex = 0; inputIndex < this.inputCount; inputIndex++) {
      this.inputs[inputIndex] = this.getElement("#" + this.inputIds[inputIndex]);
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
  constructor(slides) {
    super();

    this.slides = slides;
    this.state  = {index: -1, timer: window.setInterval(this.nextSlide.bind(this), 5000)};

    this.installEventListener("#slider-random", "click", this.randomSlide.bind(this));
    this.installEventListener("#slider-previous", "click", this.previousSlide.bind(this));
    this.installEventListener("#slider-next", "click", this.nextSlide.bind(this));
    this.installEventListener("#slider-toggle", "click", this.autoSlide.bind(this));
    this.installEventListener("#toolbar-toggle", "click", this.showToolbar.bind(this));
  }

  nextSlide() {
    this.state.index++;

    if (this.state.index === this.slides.length) {
      this.state.index = 0;
    }
    this.refreshSlide();
  }

  previousSlide() {
    this.state.index--;

    if (this.state.index < 0) {
      this.state.index = this.slides.length - 1;
    }
    this.refreshSlide();
  }

  randomSlide() {
    let index;

    do {
      index = this.getRandomInteger(0, this.slides.length - 1);
    }
    while (index === this.state.index);

    this.state.index = index;

    this.refreshSlide();
  }

  autoSlide() {
    let icon;
    let toggle;

    icon    = this.getElement("#slider-toggle i");
    toggle  = this.getElement("#slider-toggle");

    icon.classList.toggle("fa-play");
    icon.classList.toggle("fa-pause");

    if (this.state.timer == null) {
      this.state.timer = window.setInterval(this.nextSlide.bind(this), 5000);

      toggle.title = "Pause";
    } else {
      window.clearInterval(this.state.timer);

      this.state.timer  = null;
      toggle.title      = "Play";
    }
  }

  showToolbar() {
    let icon;
    let toggle;
    let nav;

    icon    = this.getElement("#toolbar-toggle i");
    toggle  = this.getElement("#toolbar-toggle");
    nav     = this.getElement(".slider-nav ul");

    icon.classList.toggle("fa-toggle-on");
    icon.classList.toggle("fa-toggle-off");

    nav.classList.toggle("none");

    if (nav.classList.contains("none")) {
      toggle.title = "Open the Slider Toolbar";
    } else {
      toggle.title = "Close the Slider Toolbar";
    }
  }

  refreshSlide() {
    let sliderImage;
    let sliderLegend;

    sliderImage  = this.getElement("#slider img");
    sliderLegend = this.getElement("#slider figcaption");

    sliderImage.src          = this.slides[this.state.index].image;
    sliderLegend.textContent = this.slides[this.state.index].legend;
  }
}

/*! Author: Philippe Beck <philippe@philippebeck.net>
 Updated: 6th May 2020 @ 9:18:59 PM */