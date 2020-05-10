class Slider extends Animadio {
  /**
   * @param {number} timeout
   * @param {Boolean} auto
   * @param {Boolean} random
   */
  constructor(timeout = 1000, auto = true, random = false) {
    super();

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
    this.auto.addEventListener("click", this.setAuto.bind(this));
    this.random.addEventListener("click", this.setRandom.bind(this));

    document.addEventListener("keydown", this.setKeyboard.bind(this));
  }

  runSlider() {
    if (this.autoState) {
      this.timer = window.setInterval(this.goNext.bind(this), this.timeout);
    } else {
      this.goNext();
    }
  }

  /**
   * @param min
   * @param max
   * @return
   */
  getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  refreshSlide() {
    for (let slidesIndex = 0; slidesIndex < this.slidesCount; slidesIndex++) {
      if (this.slidesTriggers[slidesIndex].hasAttribute("checked")) {
        this.slidesTriggers[slidesIndex].removeAttribute("checked");
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

  setAuto() {
    if (this.autoState) {
      this.autoState  = false;
      this.auto.title = "Play";
      this.autoIcon.classList.add("fa-play");
      this.autoIcon.classList.remove("fa-pause");
      window.clearInterval(this.timer);

    } else if (!this.autoState) {
      this.autoState  = true;
      this.auto.title = "Pause";
      this.autoIcon.classList.add("fa-pause");
      this.autoIcon.classList.remove("fa-play");
      this.timer = window.setInterval(this.goNext.bind(this), this.timeout);
    }

    this.refreshSlide();
  }

  setRandom() {
    if (this.randomState) {
      this.randomState  = false;
      this.random.title = "Random";
      this.randomIcon.classList.add("fa-random");
      this.randomIcon.classList.remove("fa-long-arrow-alt-right");

    } else if (!this.randomState) {
      this.randomState  = true;
      this.random.title = "Normal";
      this.randomIcon.classList.add("fa-long-arrow-alt-right");
      this.randomIcon.classList.remove("fa-random");
    }
    
    this.refreshSlide();
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
        this.setAuto();
        break;
      case "ArrowDown":
        this.setRandom();
        break;
      case "ArrowRight":
        this.goNext();
        break;
    }
  }
}
