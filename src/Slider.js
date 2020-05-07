class Slider extends Animadio {
  constructor(slides) {
    super();

    this.slides       = slides;
    this.slidesCount  = slides.length;

    this.index = -1;
    this.timer = window.setInterval(this.nextSlide.bind(this), 5000);

    this.installEventListener("#slider-random", "click", this.randomSlide.bind(this));
    this.installEventListener("#slider-previous", "click", this.previousSlide.bind(this));
    this.installEventListener("#slider-next", "click", this.nextSlide.bind(this));
    this.installEventListener("#slider-toggle", "click", this.autoSlide.bind(this));
    this.installEventListener("#toolbar-toggle", "click", this.showToolbar.bind(this));
  }

  nextSlide() {
    this.index++;

    if (this.index === this.slidesCount) {
      this.index = 0;
    }
    this.refreshSlide();
  }

  previousSlide() {
    this.index--;

    if (this.index < 0) {
      this.index = this.slidesCount - 1;
    }
    this.refreshSlide();
  }

  randomSlide() {
    do {
      let index = this.getRandomInteger(0, this.slidesCount - 1);
    }
    while (index === this.index);

    this.index = index;

    this.refreshSlide();
  }

  autoSlide() {
    let icon    = this.getElement("#slider-toggle i");
    let toggle  = this.getElement("#slider-toggle");

    icon.classList.toggle("fa-play");
    icon.classList.toggle("fa-pause");

    if (this.timer === null) {
      this.timer    = window.setInterval(this.nextSlide.bind(this), 5000);
      toggle.title  = "Pause";
    } else {
      window.clearInterval(this.timer);

      this.timer    = null;
      toggle.title  = "Play";
    }
  }

  showToolbar() {
    let icon    = this.getElement("#toolbar-toggle i");
    let toggle  = this.getElement("#toolbar-toggle");
    let nav     = this.getElement(".slider-nav ul");

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
    let sliderImage  = this.getElement("#slider img");
    let sliderLegend = this.getElement("#slider figcaption");

    sliderImage.src          = this.slides[this.index].image;
    sliderLegend.textContent = this.slides[this.index].legend;
  }
}
