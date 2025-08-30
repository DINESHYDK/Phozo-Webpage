/**
 * Smooth Scroll Utility
 */
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
    this.initScrollToTop();
  }

  bindEvents() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));

        if (target) {
          this.scrollToElement(target);
        }
      });
    });
  }

  scrollToElement(element, offset = 80) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  initScrollToTop() {
    const scrollTopBtn = document.getElementById("scrollTop");

    if (scrollTopBtn) {
      // Show/hide scroll to top button
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          scrollTopBtn.classList.add("show");
        } else {
          scrollTopBtn.classList.remove("show");
        }
      });

      // Scroll to top functionality
      scrollTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }
}

// Initialize smooth scroll when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SmoothScroll();
});
