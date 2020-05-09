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
