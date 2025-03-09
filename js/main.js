/*
 * Frame & Album Co.
 * Main JavaScript File
 * Version: 1.0
 */

// Page Loader
window.addEventListener('load', function() {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(function() {
      loader.classList.add('loaded');
    }, 200);
  }
});

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS Animation Library
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
  });

  // Advanced Hero Slider Functionality
  const slides = document.querySelectorAll('.slide');
  const navBtns = document.querySelectorAll('.nav-btn');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  const progressBar = document.querySelector('.progress-bar');
  
  let currentSlide = 0;
  let slideInterval;
  let isAnimating = false;
  const slideDuration = 5000; // 5 seconds per slide
  const totalSlides = slides.length;
  
  // Set initial progress bar width
  updateProgressBar(0);
  
  // Function to update progress bar
  function updateProgressBar(percentage) {
    progressBar.style.width = `${percentage}%`;
  }
  
  // Function to reset progress animation
  function resetProgressAnimation() {
    // Reset the progress bar
    updateProgressBar(0);
    
    // Animate progress over slide duration
    let startTime = null;
    
    function animateProgress(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / slideDuration * 100, 100);
      
      updateProgressBar(progress);
      
      if (elapsed < slideDuration) {
        requestAnimationFrame(animateProgress);
      }
    }
    
    requestAnimationFrame(animateProgress);
  }

  // Function to change slide with advanced animations
  function changeSlide(newIndex, direction = 'next') {
    if (isAnimating || newIndex === currentSlide) return;
    isAnimating = true;
    
    // Get current and next slides
    const currentSlideEl = slides[currentSlide];
    const nextSlideEl = slides[newIndex];
    
    // Update navigation buttons
    navBtns.forEach(btn => btn.classList.remove('active'));
    navBtns[newIndex].classList.add('active');
    
    // Set initial state for the next slide
    nextSlideEl.style.visibility = 'visible';
    nextSlideEl.style.opacity = '0';
    
    // Determine animation direction
    const xOffset = direction === 'next' ? 100 : -100;
    
    // Apply 3D animations with GSAP
    gsap.fromTo(currentSlideEl, 
      { opacity: 1, rotateY: 0, z: 0 },
      { 
        opacity: 0, 
        rotateY: -direction === 'next' ? 10 : -10, 
        z: -100,
        duration: 1.2,
        ease: "power3.inOut"
      }
    );
    
    gsap.fromTo(nextSlideEl, 
      { opacity: 0, rotateY: direction === 'next' ? -10 : 10, z: -100 },
      { 
        opacity: 1, 
        rotateY: 0, 
        z: 0,
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
          // Remove active class from current slide
          currentSlideEl.classList.remove('active');
          
          // Add active class to next slide
          nextSlideEl.classList.add('active');
          
          // Update current slide index
          currentSlide = newIndex;
          
          // Reset animation flag
          isAnimating = false;
          
          // Reset and start progress animation
          resetProgressAnimation();
        }
      }
    );
  }

  // Function to go to next slide
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    changeSlide(nextIndex, 'next');
  }
  
  // Function to go to previous slide
  function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = slides.length - 1;
    }
    changeSlide(prevIndex, 'prev');
  }

  // Start automatic slide rotation
  function startSlideShow() {
    resetProgressAnimation();
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  // Stop automatic slide rotation
  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  // Add click event listeners to navigation buttons
  navBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (index === currentSlide) return;
      
      stopSlideShow();
      const direction = index > currentSlide ? 'next' : 'prev';
      changeSlide(index, direction);
      startSlideShow();
    });
    
    // Add ripple effect on click
    btn.addEventListener('mousedown', function(e) {
      const circle = document.createElement('div');
      circle.classList.add('ripple');
      this.appendChild(circle);
      
      const d = Math.max(this.clientWidth, this.clientHeight);
      circle.style.width = circle.style.height = d + 'px';
      
      const rect = this.getBoundingClientRect();
      circle.style.left = e.clientX - rect.left - d/2 + 'px';
      circle.style.top = e.clientY - rect.top - d/2 + 'px';
      
      circle.classList.add('active');
      
      setTimeout(() => {
        circle.remove();
      }, 500);
    });
  });
  
  // Add click event listeners to arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopSlideShow();
      prevSlide();
      startSlideShow();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopSlideShow();
      nextSlide();
      startSlideShow();
    });
  }
  
  // Add touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;
  
  const heroSection = document.querySelector('.hero');
  
  heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  heroSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      stopSlideShow();
      nextSlide();
      startSlideShow();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      stopSlideShow();
      prevSlide();
      startSlideShow();
    }
  }

  // Start the slideshow
  startSlideShow();
  
  // Pause slideshow when user hovers over the slider
  heroSection.addEventListener('mouseenter', stopSlideShow);
  heroSection.addEventListener('mouseleave', startSlideShow);

  // Initialize GSAP ScrollTrigger
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Timeline animation
    const timelineItems = document.querySelectorAll(".timeline-item");
    const timelineHeading = document.querySelector(".timeline h3");
    
    if (timelineItems.length > 0) {
      // First ensure the timeline heading is visible
      if (timelineHeading) {
        gsap.from(timelineHeading, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 80%",
            toggleActions: "play none none none"
          },
          onComplete: function() {
            timelineHeading.style.opacity = 1;
            timelineHeading.style.visibility = 'visible';
          }
        });
      }
      
      // Then animate the timeline items with a slight delay
      gsap.from(timelineItems, {
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        },
        onComplete: function() {
          timelineItems.forEach(item => {
            item.style.opacity = 1;
            item.style.visibility = 'visible';
          });
        }
      });
    }

    // Hero section parallax effect
    const heroSection = document.querySelector(".hero");
    if (heroSection) {
      gsap.to(heroSection, {
        backgroundPosition: "50% 30%",
        ease: "none",
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }

  // Navigation Menu Toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a nav-link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // Sticky Navigation
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("sticky", window.scrollY > 50);

    // Scroll to Top Button
    const scrollTop = document.getElementById("scrollTop");
    if (scrollTop) {
      scrollTop.classList.toggle("active", window.scrollY > 500);
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Testimonial Carousel
  const testimonialCarousel = document.getElementById("testimonialCarousel");
  if (testimonialCarousel) {
    const testimonials =
      testimonialCarousel.querySelectorAll(".testimonial-slide");
    let currentIndex = 0;
    let interval;
    let isHovered = false;

    // Set first testimonial as active
    testimonials[0].classList.add("active");

    // Function to show next testimonial
    function showNextTestimonial() {
      if (isHovered) return;

      testimonials[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % testimonials.length;
      testimonials[currentIndex].classList.add("active");
    }

    // Start automatic rotation
    function startAutoRotation() {
      interval = setInterval(showNextTestimonial, 5000);
    }

    // Stop rotation on hover
    testimonialCarousel.addEventListener("mouseenter", function () {
      isHovered = true;
      clearInterval(interval);
    });

    // Resume rotation on mouse leave
    testimonialCarousel.addEventListener("mouseleave", function () {
      isHovered = false;
      startAutoRotation();
    });

    // Initialize the carousel
    startAutoRotation();

    // Create visual carousel effect with jQuery
    $(testimonialCarousel).slick({
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      arrows: false,
      pauseOnHover: true,
      pauseOnFocus: false,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: "linear",
    });
  }

  // Portfolio Filtering System
  const portfolioFilterButtons = document.querySelectorAll('#portfolio .filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  // Add click event to portfolio filter buttons
  portfolioFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all portfolio buttons
      portfolioFilterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Get filter value
      const filterValue = button.getAttribute('data-filter');
      
      // Filter portfolio items
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        // Show/hide items based on filter
        if (filterValue === 'all' || filterValue === category) {
          // Show item with animation
          gsap.to(item, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            clearProps: "scale"
          });
          item.style.display = 'block';
        } else {
          // Hide item with animation
          gsap.to(item, {
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
              item.style.display = 'none';
            }
          });
        }
      });
    });
  });

  // Portfolio Lightbox
  if (portfolioItems.length > 0) {
    portfolioItems.forEach((item) => {
      item.addEventListener("click", function () {
        const imgSrc = this.querySelector("img").getAttribute("src");
        const imgTitle = this.querySelector(".portfolio-info h3").textContent;
        const imgDesc = this.querySelector(".portfolio-info p").textContent;

        // Create lightbox
        const lightbox = document.createElement("div");
        lightbox.className = "portfolio-lightbox";
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <span class="close-lightbox">&times;</span>
            <img src="${imgSrc}" alt="${imgTitle}">
            <div class="lightbox-caption">
              <h3>${imgTitle}</h3>
              <p>${imgDesc}</p>
            </div>
          </div>
        `;

        // Add lightbox to body
        document.body.appendChild(lightbox);

        // Show lightbox with animation
        setTimeout(() => {
          lightbox.style.opacity = "1";
        }, 10);

        // Close lightbox on click
        const closeBtn = lightbox.querySelector(".close-lightbox");
        closeBtn.addEventListener("click", function () {
          lightbox.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(lightbox);
          }, 300);
        });

        // Close lightbox when clicking outside the image
        lightbox.addEventListener("click", function (e) {
          if (e.target === lightbox) {
            lightbox.style.opacity = "0";
            setTimeout(() => {
              document.body.removeChild(lightbox);
            }, 300);
          }
        });
      });
    });
  }

  // Product Filtering System
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        // Show/hide gallery items based on category
        galleryItems.forEach((item) => {
          if (filterValue === "all") {
            item.style.display = "block";
          } else if (item.classList.contains(filterValue)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // Product Gallery Lightbox
  if (galleryItems.length > 0) {
    galleryItems.forEach((item) => {
      item.addEventListener("click", function () {
        const imgSrc = this.querySelector("img").getAttribute("src");
        const imgTitle = this.querySelector("img").getAttribute("alt");

        // Create lightbox
        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.innerHTML = `
                      <div class="lightbox-content">
                          <span class="close-lightbox">&times;</span>
                          <img src="${imgSrc}" alt="${imgTitle}">
                          <div class="lightbox-caption">${imgTitle}</div>
                      </div>
                  `;

        // Append to body
        document.body.appendChild(lightbox);

        // Prevent scrolling when lightbox is open
        document.body.style.overflow = "hidden";

        // Close lightbox when clicking on close button or outside the image
        lightbox.addEventListener("click", function (e) {
          if (
            e.target === lightbox ||
            e.target.classList.contains("close-lightbox")
          ) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = "auto";
          }
        });
      });
    });
  }

  // Custom Frame Builder
  const frameBuilder = document.getElementById("frameBuilder");
  if (frameBuilder) {
    const frameOptions = frameBuilder.querySelectorAll(".frame-option");
    const framePreview = document.getElementById("framePreview");
    const framePrice = document.getElementById("framePrice");
    let totalPrice = 59.99; // Base price

    // Update preview and price when selecting options
    frameOptions.forEach((option) => {
      option.addEventListener("change", function () {
        const optionType = this.getAttribute("data-type");
        const optionValue = this.value;
        const optionPrice = parseFloat(
          this.options[this.selectedIndex].getAttribute("data-price")
        );

        // Update preview based on selection
        if (optionType === "material") {
          framePreview.setAttribute("data-material", optionValue);
        } else if (optionType === "size") {
          framePreview.setAttribute("data-size", optionValue);
        } else if (optionType === "color") {
          framePreview.setAttribute("data-color", optionValue);
        }

        // Calculate new price
        totalPrice = 59.99; // Reset to base price
        frameOptions.forEach((opt) => {
          const selectedPrice =
            parseFloat(
              opt.options[opt.selectedIndex].getAttribute("data-price")
            ) || 0;
          totalPrice += selectedPrice;
        });

        // Update price display
        framePrice.textContent = "$" + totalPrice.toFixed(2);
      });
    });

    // Add to cart functionality
    const addToCartBtn = document.getElementById("addToCartBtn");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", function () {
        // Get all selected options
        const material = document.querySelector('[data-type="material"]').value;
        const size = document.querySelector('[data-type="size"]').value;
        const color = document.querySelector('[data-type="color"]').value;

        // Create item object
        const item = {
          id: generateUniqueId(),
          type: "custom-frame",
          material: material,
          size: size,
          color: color,
          price: totalPrice,
        };

        // Add to cart (localStorage)
        addItemToCart(item);

        // Show confirmation message
        showNotification("Custom frame added to cart!");
      });
    }

    // Helper function to generate ID
    function generateUniqueId() {
      return "frame_" + Math.random().toString(36).substr(2, 9);
    }

    // Helper function to add item to cart
    function addItemToCart(item) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart counter
      updateCartCounter();
    }

    // Helper function to update cart counter
    function updateCartCounter() {
      const cartCounter = document.getElementById("cartCounter");
      if (cartCounter) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartCounter.textContent = cart.length;

        if (cart.length > 0) {
          cartCounter.style.display = "block";
        } else {
          cartCounter.style.display = "none";
        }
      }
    }

    // Initialize cart counter on page load
    updateCartCounter();
  }

  // Contact Form Validation and Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    // Add input event listeners for real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        // Remove error styling as user types
        if (this.classList.contains('error')) {
          this.classList.remove('error');
          const errorMsg = this.parentNode.querySelector('.error-message');
          if (errorMsg) errorMsg.remove();
        }
      });
    });
    
    // Function to validate individual fields
    function validateField(field) {
      let isValid = true;
      let errorMessage = '';
      
      // Check if empty
      if (!field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
      } 
      // Email validation
      else if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
      }
      
      // Display error or success state
      if (!isValid) {
        field.classList.add('error');
        
        // Add error message if it doesn't exist
        let errorMsg = field.parentNode.querySelector('.error-message');
        if (!errorMsg) {
          errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.textContent = errorMessage;
          field.parentNode.appendChild(errorMsg);
        }
      } else {
        field.classList.remove('error');
        const errorMsg = field.parentNode.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
      }
      
      return isValid;
    }
    
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate all fields
      let isValid = true;
      const formFields = this.querySelectorAll("input, textarea");

      formFields.forEach((field) => {
        if (!validateField(field)) {
          isValid = false;
        }
      });

      if (isValid) {
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        // Simulate AJAX request
        setTimeout(() => {
          // Reset form
          contactForm.reset();
          
          // Remove any error messages
          document.querySelectorAll('.error-message').forEach(msg => msg.remove());

          // Show success message
          showNotification(
            "Message sent successfully! We'll get back to you soon."
          );

          // Reset button
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 1500);
      } else {
        showNotification("Please fill all required fields correctly", "error");
      }
    });
  }

  // Newsletter Subscription
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        emailInput.classList.add("error");
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Simulate subscription
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = "Subscribing...";

      // Simulate AJAX request
      setTimeout(() => {
        // Reset form
        newsletterForm.reset();

        // Show success message
        showNotification("Thank you for subscribing to our newsletter!");

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }

  // Helper function to show notifications
  function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
              <div class="notification-content">
                  <span>${message}</span>
                  <button class="close-notification">&times;</button>
              </div>
          `;

    // Append to body
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.add("hide");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);

    // Close on button click
    notification
      .querySelector(".close-notification")
      .addEventListener("click", function () {
        notification.classList.add("hide");
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      });
  }

  // Testimonial Cards Interaction
  const testimonialTrack = document.querySelector('.testimonial-track');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  if (testimonialTrack && testimonialCards.length > 0) {
    // Calculate the correct animation distance based on the number of original cards
    function updateAnimationDistance() {
      const cardWidth = testimonialCards[0].offsetWidth;
      const cardMargin = parseInt(window.getComputedStyle(testimonialCards[0]).marginRight);
      const totalWidth = (cardWidth + cardMargin * 2);
      
      // We need to calculate how many original cards we have (not counting duplicates)
      const originalCardCount = testimonialCards.length / 2; // Assuming half are duplicates
      
      // Set the animation end position to move exactly the width of the original cards
      const animationDistance = totalWidth * originalCardCount;
      
      // Create the keyframes
      const keyframes = `
        @keyframes testimonialScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${animationDistance}px);
          }
        }
      `;
      
      // Add or update the style element
      let styleElement = document.getElementById('testimonial-keyframes');
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'testimonial-keyframes';
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = keyframes;
      
      // Apply the animation
      testimonialTrack.style.animation = 'testimonialScroll 30s linear infinite';
    }
    
    // Add individual hover effect for each card
    testimonialCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        // Add a class to indicate this card is being hovered
        this.classList.add('hovered');
      });
      
      card.addEventListener('mouseleave', function() {
        // Remove the hovered class
        this.classList.remove('hovered');
      });
    });
    
    // Check if we need to adjust the animation duration based on screen width
    function adjustAnimationSpeed() {
      const viewportWidth = window.innerWidth;
      let duration = '30s'; // Default duration
      
      if (viewportWidth < 576) {
        duration = '25s'; // Faster on mobile
      } else if (viewportWidth < 768) {
        duration = '28s';
      }
      
      testimonialTrack.style.animationDuration = duration;
    }
    
    // Call on load and resize
    updateAnimationDistance();
    adjustAnimationSpeed();
    window.addEventListener('resize', () => {
      updateAnimationDistance();
      adjustAnimationSpeed();
    });
    
    // Pause animation when the user leaves the page
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        testimonialTrack.style.animationPlayState = 'paused';
      } else {
        testimonialTrack.style.animationPlayState = 'running';
      }
    });
  }
});
