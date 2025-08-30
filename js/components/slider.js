/**
 * Hero Slider Component
 */
class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.navBtns = document.querySelectorAll(".nav-btn");
    this.prevBtn = document.querySelector(".prev-slide");
    this.nextBtn = document.querySelector(".next-slide");
    this.currentSlide = 0;
    this.slideInterval = null;
    this.autoPlayDelay = 5000;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    this.bindEvents();
    this.startAutoPlay();
    this.updateProgress();
  }

  bindEvents() {
    // Navigation buttons
    this.navBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => this.goToSlide(index));
    });

    // Arrow buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prevSlide());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.nextSlide());
    }

    // Pause on hover
    const heroSlider = document.querySelector(".hero-slider");
    if (heroSlider) {
      heroSlider.addEventListener("mouseenter", () => this.stopAutoPlay());
      heroSlider.addEventListener("mouseleave", () => this.startAutoPlay());
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prevSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });
  }

  goToSlide(index) {
    // Remove active class from current slide and nav button
    this.slides[this.currentSlide].classList.remove("active");
    this.navBtns[this.currentSlide].classList.remove("active");

    // Update current slide
    this.currentSlide = index;

    // Add active class to new slide and nav button
    this.slides[this.currentSlide].classList.add("active");
    this.navBtns[this.currentSlide].classList.add("active");

    this.updateProgress();
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  prevSlide() {
    const prevIndex =
      this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.goToSlide(prevIndex);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  updateProgress() {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      const progress = ((this.currentSlide + 1) / this.slides.length) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }
}

// Initialize slider when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new HeroSlider();
});
