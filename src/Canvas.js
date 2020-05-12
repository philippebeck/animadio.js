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

    this.mouseX = 0;
    this.mouseY = 0;
    this.touchX = 0;
    this.touchY = 0;

    this.lineMaker  = null;
    this.colorMaker = null;

    this.line   = line;
    this.color  = color;

    this.canvas   = document.getElementById("canvas");
    this.context  = this.canvas.getContext("2d");
    
    this.cleaner = document.getElementById("canvas-cleaner");
    this.cleaner.addEventListener("click", this.cleanCanvas.bind(this));

    this.initCanvas(width, height);
    this.initOptions();
    this.initContext(this.line, this.color);
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
      this.lineMaker = document.getElementById("canvas-line");
      this.lineMaker.addEventListener("input", this.setLine.bind(this));
    }

    if (document.getElementById("canvas-color")) {
      this.colorMaker = document.getElementById("canvas-color");
      this.colorMaker.addEventListener("input", this.setColor.bind(this));
    }
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
    this.canvas.addEventListener("mousedown", this.moveWithMouse.bind(this));
    this.canvas.addEventListener("mousemove", this.drawWithMouse.bind(this));
    this.canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
    this.canvas.addEventListener("mouseout", this.stopDrawing.bind(this));

    this.canvas.addEventListener("touchstart", this.moveWithTouch.bind(this));
    this.canvas.addEventListener("touchmove", this.drawWithTouch.bind(this));
    this.canvas.addEventListener("touchend", this.stopDrawing.bind(this));
    this.canvas.addEventListener("touchcancel", this.stopDrawing.bind(this));
  }

  setLine() {
    this.line = this.lineMaker.value;
    this.initContext(this.line, this.color);
  }

  setColor() {
    this.color = this.colorMaker.value;
    this.initContext(this.line, this.color);
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
   */
  moveWithMouse(event) {
    this.startDrawing();
    this.getMouseLocation(event);
    this.context.moveTo(this.mouseX, this.mouseY);
    event.preventDefault();
  }

  /**
   * @param {object} event
   */
  moveWithTouch(event) {
    this.startDrawing();
    this.getTouchLocation(event);
    this.context.moveTo(this.touchX, this.touchY);
    event.preventDefault();
  }

  /**
   * @param {object} event
   */
  drawWithMouse(event) {
    if (this.startState) {
      this.getMouseLocation(event);
      this.context.lineTo(this.mouseX, this.mouseY);
      this.context.stroke();
    }
  }

  /**
   * @param {object} event
   */
  drawWithTouch(event) {
    if (this.startState) {
      this.getTouchLocation(event);
      this.context.lineTo(this.touchX, this.touchY);
      this.context.stroke();
    }
  }
}
