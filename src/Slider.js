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
