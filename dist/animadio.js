/*! animadio.js v0.1.15 | https://animadio.org | MIT License */

"use strict";

class Animadio {

  static input(inputs, elements = ["animadio", ["trigger"]], duration = [2000, {}, {}]) {
    new Input(inputs, elements, duration);
  }

  static slider(timeout = 2000, auto = true, random = false) {
    new Slider(timeout, auto, random);
  }

  static canvas(width = 500, height = 500, line = 2, color = "navy") {
    new Canvas(width, height, line, color);
  }
}

class Input {
  /**
   * @param {Object} inputs
   * @param {Object} elements
   * @param {Object} duration
   */
  constructor(inputs, elements = ["animadio", ["trigger"]], duration = [2000, {}, {}]) {
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

class Slider {
  /**
   * @param {number} timeout
   * @param {Boolean} auto
   * @param {Boolean} random
   */
  constructor(timeout = 2000, auto = true, random = false) {
    this.slider         = document.getElementById("slider");
    this.slidesTriggers = this.slider.querySelectorAll("input");
    this.slidesCount    = this.slidesTriggers.length;

    this.previous = document.getElementById("slider-previous");
    this.next     = document.getElementById("slider-next");

    this.index    = -1;
    this.timer    = null;
    this.timeout  = timeout;

    this.auto       = document.getElementById("slider-auto");
    this.autoIcon   = this.auto.querySelector("i");
    this.autoState  = auto;

    this.random       = document.getElementById("slider-random");
    this.randomIcon   = this.random.querySelector("i");
    this.randomState  = random;

    this.setControls();
    this.runSlider();
  }

  setControls() {
    this.previous.addEventListener("click", this.goPrevious.bind(this));
    this.next.addEventListener("click", this.goNext.bind(this));

    this.auto.addEventListener("click", this.checkAuto.bind(this));
    this.random.addEventListener("click", this.checkRandom.bind(this));

    document.addEventListener("keydown", this.setKeyboard.bind(this));
  }

  runSlider() {
    if (this.autoState) {
      this.timer = window.setInterval(
          this.goNext.bind(this),
          this.timeout
      );

    } else {
      this.goNext();
    }
  }

  /**
   * @param {number} min
   * @param {number} max
   * @return
   */
  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  refreshSlide() {
    for (let i = 0; i < this.slidesCount; i++) {

      if (this.slidesTriggers[i].hasAttribute("checked")) {
        this.slidesTriggers[i].removeAttribute("checked");
      }
    }

    this.slidesTriggers[this.index].setAttribute("checked", true);
  }

  goPrevious() {
    if (this.randomState) {
      this.index = this.getRandomInteger(0, this.slidesCount - 1);

    } else {
      this.index--;

      if (this.index < 0) {
        this.index = this.slidesCount - 1;
      }
    }

    this.refreshSlide();
  }

  goNext() {
    if (this.randomState) {
      this.index = this.getRandomInteger(0, this.slidesCount - 1);

    } else {
      this.index++;

      if (this.index >= this.slidesCount) {
        this.index = 0;
      }
    }

    this.refreshSlide();
  }

  checkAuto() {
    if (this.autoState) {
      this.setAuto(false, "Play", "fa-play", "fa-pause");
      window.clearInterval(this.timer);

    } else {
      this.setAuto(true, "Pause", "fa-pause", "fa-play");
      this.timer = window.setInterval(this.goNext.bind(this), this.timeout);
    }

    this.refreshSlide();
  }

  /**
   * @param {boolean} state
   * @param {string} title
   * @param {string} add
   * @param {string} remove
   */
  setAuto(state, title, add, remove) {
    this.autoState  = state;
    this.auto.title = title;

    this.setIcon(this.autoIcon, add, remove);
  }

  checkRandom() {
    if (this.randomState) {
      this.setRandom(false, "Random", "fa-random", "fa-long-arrow-alt-right")

    } else {
      this.setRandom(true, "Normal", "fa-long-arrow-alt-right", "fa-random");
    }

    this.refreshSlide();
  }

  /**
   * @param {boolean} state
   * @param {string} title
   * @param {string} add
   * @param {string} remove
   */
  setRandom(state, title, add, remove) {
    this.randomState  = state;
    this.random.title = title;

    this.setIcon(this.randomIcon, add, remove);
  }

  /**
   * @param {object} icon
   * @param {string} add
   * @param {string} remove
   */
  setIcon(icon, add, remove) {
    icon.classList.add(add);
    icon.classList.remove(remove);
  }

  /**
   * @param {Object} event
   */
  setKeyboard(event) {
    switch (event.code) {

      case "ArrowLeft":
        this.goPrevious();
        break;

      case "ArrowUp":
        this.checkAuto();
        break;

      case "ArrowDown":
        this.checkRandom();
        break;

      case "ArrowRight":
        this.goNext();
        break;
    }
  }
}

class Canvas {
  /**
   * @param {number} width
   * @param {number} height
   * @param {number} line
   * @param {string} color
   */
  constructor(width = 500, height = 500, line = 2, color = "navy") {
    this.startState = false;
    this.endState   = false;

    this.line  = null;
    this.color = null;

    this.mouseX = 0;
    this.mouseY = 0;
    this.touchX = 0;
    this.touchY = 0;

    this.canvas   = document.getElementById("canvas");
    this.context  = this.canvas.getContext("2d");
    
    this.cleaner = document.getElementById("canvas-cleaner");
    this.cleaner.addEventListener("click", this.cleanCanvas.bind(this));

    this.initCanvas(width, height);
    this.initOptions();
    this.initContext(line, color);
    this.initDraw();
  }

  /**
   * @param {number} width
   * @param {number} height
   */
  initCanvas(width, height) {
    this.canvas.width   = width;
    this.canvas.height  = height;
  }

  initOptions() {
    if (document.getElementById("canvas-line")) {
      this.initLine();
    }

    if (document.getElementById("canvas-color")) {
      this.initColor();
    }
  }

  initLine() {
    this.line = document.getElementById("canvas-line");
    this.line.addEventListener("input", this.setLine.bind(this));
  }

  setLine() {
    this.context.lineWidth = this.line.value;
  }

  initColor() {
    this.color = document.getElementById("canvas-color");
    this.color.addEventListener("input", this.setColor.bind(this));
  }

  setColor() {
    this.context.strokeStyle = this.color.value;
  }

  /**
   * @param {number} line
   * @param {string} color
   */
  initContext(line, color) {
    this.context.lineWidth    = line;
    this.context.strokeStyle  = color;
    this.context.lineCap      = "round";
    this.context.lineJoin     = "round";
  }

  initDraw() {
    this.canvas.addEventListener("mousedown", this.moveInCanvas.bind(this, "mousedown"));
    this.canvas.addEventListener("mousemove", this.drawWithMouse.bind(this));
    this.canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
    this.canvas.addEventListener("mouseout", this.stopDrawing.bind(this));

    this.canvas.addEventListener("touchstart", this.moveInCanvas.bind(this, "touchstart"));
    this.canvas.addEventListener("touchmove", this.drawWithTouch.bind(this));
    this.canvas.addEventListener("touchend", this.stopDrawing.bind(this));
    this.canvas.addEventListener("touchcancel", this.stopDrawing.bind(this));
  }

  startDrawing() {
    this.startState = true;
    this.context.beginPath();
  }

  stopDrawing() {
    this.startState = false;
    this.endState   = true;
  }

  cleanCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.endState = false;
  }

  /**
   * @param {object} event
   */
  getMouseLocation(event) {
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;
  }

  /**
   * @param {object} event
   */
  getTouchLocation(event) {
    let position  = event.target.getBoundingClientRect();
    this.touchX   = event.targetTouches[0].clientX - position.left;
    this.touchY   = event.targetTouches[0].clientY - position.top;
  }

  /**
   * @param {object} event
   * @param {string} type
   */
  moveInCanvas(event, type) {
    this.startDrawing();

    switch (type) {
      case "mousedown":
        this.moveWithMouse(event);
        break;
      case "touchstart":
        this.moveWithTouch(event);
        break;
    }
  }

  /**
   * @param {object} event
   */
  moveWithMouse(event) {
    this.getMouseLocation(event);
    this.moveTo(event, this.mouseX, this.mouseY);
  }

  /**
   * @param {object} event
   */
  moveWithTouch(event) {
    this.getTouchLocation(event);
    this.moveTo(event, this.touchX, this.touchY);
  }

  /**
   * @param {object} event
   * @param {number} x
   * @param {number} y
   */
  moveTo(event, x, y) {
    this.context.moveTo(x, y);
    event.preventDefault();
  }

  /**
   * @param {object} event
   */
  drawWithMouse(event) {
    if (this.startState) {
      this.getMouseLocation(event);
      this.lineTo(this.mouseX, this.mouseY);
    }
  }

  /**
   * @param {object} event
   */
  drawWithTouch(event) {
    if (this.startState) {
      this.getTouchLocation(event);
      this.lineTo(this.touchX, this.touchY);
    }
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  lineTo(x, y) {
    this.context.lineTo(x, y);
    this.context.stroke();
  }
}

/*! Author: Philippe Beck <philippe@philippebeck.net>
 Updated: 13th May 2020 @ 3:07:57 PM */