/**
 * Navigation Component
 */
class Navigation {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.navMenu = document.querySelector(".nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");

    this.init();
  }

  init() {
    this.bindEvents();
    this.handleScroll();
  }

  bindEvents() {
    // Mobile menu toggle
    if (this.mobileMenu) {
      this.mobileMenu.addEventListener("click", () => this.toggleMobileMenu());
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => this.handleOutsideClick(e));

    // Close menu when clicking nav links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMobileMenu());
    });

    // Handle scroll for navbar styling
    window.addEventListener("scroll", () => this.handleScroll());

    // Handle active link highlighting
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.setActiveLink(e.target));
    });
  }

  toggleMobileMenu() {
    this.mobileMenu.classList.toggle("active");
    this.navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  }

  closeMobileMenu() {
    this.mobileMenu.classList.remove("active");
    this.navMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  }

  handleOutsideClick(e) {
    if (
      !this.mobileMenu.contains(e.target) &&
      !this.navMenu.contains(e.target) &&
      this.navMenu.classList.contains("active")
    ) {
      this.closeMobileMenu();
    }
  }

  handleScroll() {
    if (window.pageYOffset > 50) {
      this.navbar.classList.add("scrolled");
    } else {
      this.navbar.classList.remove("scrolled");
    }
  }

  setActiveLink(clickedLink) {
    this.navLinks.forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
  }

  // Method to programmatically set active link based on current section
  updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.pageYOffset + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
}

// Initialize navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const navigation = new Navigation();

  // Update active link on scroll
  window.addEventListener("scroll", () => {
    navigation.updateActiveLink();
  });
});
