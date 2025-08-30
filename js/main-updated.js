/*
 * EverFrame
 * Main JavaScript File - Modular Structure
 * Version: 2.0
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS Animation Library
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  // Initialize all components
  initNavigation();
  initHeroSlider();
  initGalleryFilter();
  initSmoothScroll();
  initScrollToTop();
  initForms();
});

// Navigation Component
function initNavigation() {
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (!mobileMenu || !navMenu) return;

  // Mobile menu toggle
  mobileMenu.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !mobileMenu.contains(e.target) &&
      !navMenu.contains(e.target) &&
      navMenu.classList.contains("active")
    ) {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Close menu when clicking on nav links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Hero Slider Component
function initHeroSlider() {
  const slides = document.querySelectorAll(".slide");
  const navBtns = document.querySelectorAll(".nav-btn");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval = null;
  const autoPlayDelay = 5000;

  // Navigation buttons
  navBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => goToSlide(index));
  });

  // Arrow buttons
  if (prevBtn) prevBtn.addEventListener("click", () => prevSlide());
  if (nextBtn) nextBtn.addEventListener("click", () => nextSlide());

  // Auto-play functionality
  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(() => {
      nextSlide();
    }, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    navBtns[currentSlide].classList.remove("active");

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    navBtns[currentSlide].classList.add("active");

    updateProgress();
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prevIndex);
  }

  function updateProgress() {
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      const progress = ((currentSlide + 1) / slides.length) * 100;
      progressBar.style.width = `${progress}%`;
    }
  }

  // Pause on hover
  const heroSlider = document.querySelector(".hero-slider");
  if (heroSlider) {
    heroSlider.addEventListener("mouseenter", stopAutoPlay);
    heroSlider.addEventListener("mouseleave", startAutoPlay);
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  // Start auto-play
  startAutoPlay();
  updateProgress();
}

// Gallery Filter Component
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterBtns.length === 0) return;

  // Show all items initially
  setTimeout(() => {
    galleryItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("show");
      }, index * 50);
    });
  }, 100);

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const filter = btn.getAttribute("data-filter");

      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter items
      galleryItems.forEach((item, index) => {
        const categories = item.getAttribute("data-category") || "";
        const itemClasses = item.className;

        if (
          filter === "all" ||
          categories.includes(filter) ||
          itemClasses.includes(filter)
        ) {
          // Show item
          item.style.display = "block";
          setTimeout(() => {
            item.classList.add("show");
          }, index * 30);
        } else {
          // Hide item
          item.classList.remove("show");
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Smooth Scroll Component
function initSmoothScroll() {
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const offsetTop =
          target.getBoundingClientRect().top + window.pageYOffset - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Scroll to Top Component
function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scrollTop");

  if (!scrollTopBtn) return;

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

// Form Handling
function initForms() {
  // Contact form
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
      }

      // Here you would typically send the data to a server
      alert("Thank you for your message! We will get back to you soon.");
      this.reset();
    });
  }

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;

      if (!email) {
        alert("Please enter your email address");
        return;
      }

      // Here you would typically send the email to a server
      alert("Thank you for subscribing to our newsletter!");
      this.reset();
    });
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(() => {
  // Handle scroll events here if needed
}, 10);
