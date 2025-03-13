/**
 * Team Section Interactive Elements
 * Handles animations and interactive elements for the Meet The Team page
 */

document.addEventListener("DOMContentLoaded", function () {
    // Add scroll reveal animation
    const revealElements = document.querySelectorAll(
      ".team-member, .section-title, .section-subtitle, .story-content"
    );
  
    const revealOnScroll = () => {
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (elementTop < windowHeight - 100) {
          element.classList.add("revealed");
        }
      });
    };
  
    // Add crazy animations for the top team images
    const topImages = document.querySelectorAll(".team-image");
  
    topImages.forEach((image) => {
      image.addEventListener("mouseover", function () {
        // Apply random rotation effect
        const randomDegree = Math.floor(Math.random() * 16) - 8; // -8 to +8 degrees
        image.style.transform = `rotate(${randomDegree}deg) scale(1.1)`;
      });
  
      image.addEventListener("mouseout", function () {
        // Reset to default animation state
        image.style.transform = "";
      });
  
      // Add click event for fun effect
      image.addEventListener("click", function () {
        // Create a fun spin animation
        image.style.transform = "rotate(360deg) scale(1.2)";
        setTimeout(() => {
          image.style.transform = "";
        }, 1000);
      });
    });
  
    // Initialize the 3D tilt effect for team member cards
    const teamCards = document.querySelectorAll(".team-member");
  
    teamCards.forEach((card) => {
      card.addEventListener("mousemove", function (e) {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
  
        // Calculate mouse position relative to card center
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
  
        // Calculate rotation based on mouse position (limited to 10 degrees)
        const rotateY = mouseX * 0.01;
        const rotateX = -mouseY * 0.01;
  
        // Apply the rotation transformation
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
  
      card.addEventListener("mouseleave", function () {
        // Reset the transformation when mouse leaves
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
        setTimeout(() => {
          card.style.transition = "transform 0.5s ease";
        }, 100);
      });
  
      card.addEventListener("mouseenter", function () {
        card.style.transition = "transform 0.1s ease";
      });
    });
  
    // Add styles for scroll reveal animation
    document.head.insertAdjacentHTML(
      "beforeend",
      `
        <style>
            .team-member, .section-title, .section-subtitle, .story-content {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .revealed {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `
    );
  
    // Initial check for elements in view
    revealOnScroll();
  
    // Add scroll event listener
    window.addEventListener("scroll", revealOnScroll);
  
    // Create particle effect in header
    createParticles();
  });
  
  // Function to create particle effect in header
  function createParticles() {
    const header = document.querySelector(".header");
  
    // Create particles container
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles-container";
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    `;
  
    // Add particles container to header
    header.appendChild(particlesContainer);
  
    // Create particles
    for (let i = 0; i < 50; i++) {
      createParticle(particlesContainer);
    }
  }
  
  // Function to create a single particle
  function createParticle(container) {
    const particle = document.createElement("div");
  
    // Random size between 4px and 8px
    const size = Math.random() * 4 + 4;
  
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
  
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1;
  
    // Random animation duration
    const duration = Math.random() * 20 + 10;
  
    // Set particle styles
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(255, 255, 255, ${opacity});
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        animation: float-particle ${duration}s linear infinite;
    `;
  
    // Create keyframes for the floating animation
    const styleSheet = document.styleSheets[0];
    if (!document.querySelector("style#particle-styles")) {
      const style = document.createElement("style");
      style.id = "particle-styles";
      style.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: ${opacity};
                }
                25% {
                    transform: translateY(-20px) translateX(10px);
                }
                50% {
                    transform: translateY(-40px) translateX(-10px);
                    opacity: ${opacity * 0.8};
                }
                75% {
                    transform: translateY(-60px) translateX(10px);
                }
                100% {
                    transform: translateY(-80px) translateX(0);
                    opacity: 0;
                }
            }
        `;
      document.head.appendChild(style);
    }
  
    // Add particle to container
    container.appendChild(particle);
  
    // Remove and recreate particle after animation ends
    setTimeout(() => {
      particle.remove();
      createParticle(container);
    }, duration * 1000);
  }
  
  // Function to create ripple effect when clicking on team members
  function createRippleEffect() {
    const teamMembers = document.querySelectorAll(".team-member");
  
    teamMembers.forEach((member) => {
      member.addEventListener("click", function (e) {
        // Get position relative to the clicked element
        const rect = member.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        // Create ripple element
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
  
        // Add ripple to the element
        member.appendChild(ripple);
  
        // Remove ripple after animation
        setTimeout(() => {
          ripple.remove();
        }, 800);
      });
    });
  
    // Add ripple styles
    const rippleStyle = document.createElement("style");
    rippleStyle.textContent = `
    .team-member {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.8s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
  `;
    document.head.appendChild(rippleStyle);
  }
  
  // Run ripple effect setup
  createRippleEffect();
  
  // Add typing animation to story section
  function setupTypingAnimation() {
    const storyContent = document.querySelector(".story-content p:first-child");
    const originalText = storyContent.textContent;
  
    // Function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
  
    // Function to start typing animation
    function startTypingAnimation() {
      if (
        isInViewport(storyContent) &&
        !storyContent.classList.contains("typed")
      ) {
        storyContent.classList.add("typed");
        storyContent.textContent = "";
        let charIndex = 0;
  
        const typeText = () => {
          if (charIndex < originalText.length) {
            storyContent.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 30);
          }
        };
  
        typeText();
      }
    }
  
    // Check on scroll
    window.addEventListener("scroll", startTypingAnimation);
  
    // Initial check
    startTypingAnimation();
  }
  
  // Run typing animation setup
  setupTypingAnimation();
  
  // Add hover effect for phone number
  const phoneNumber = document.querySelector(".phone-number");
  if (phoneNumber) {
    phoneNumber.addEventListener("mouseover", function () {
      document.querySelector(".hidden-digits").style.color = "var(--light-color)";
    });
  
    phoneNumber.addEventListener("mouseleave", function () {
      document.querySelector(".hidden-digits").style.color = "transparent";
    });
  }
  
  // Add scroll-to-top button
  function addScrollToTopButton() {
    // Create button element
    const scrollButton = document.createElement("button");
    scrollButton.className = "scroll-top-btn";
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  
    // Style the button
    const btnStyle = document.createElement("style");
    btnStyle.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
        z-index: 100;
    }
    
    .scroll-top-btn:hover {
        background-color: var(--dark-color);
        transform: translateY(0) scale(1.1);
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        transform: translateY(0);
    }
  `;
    document.head.appendChild(btnStyle);
  
    // Add button to the body
    document.body.appendChild(scrollButton);
  
    // Show button on scroll
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        scrollButton.classList.add("visible");
      } else {
        scrollButton.classList.remove("visible");
      }
    });
  
    // Scroll to top when clicked
    scrollButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
  
  // Add scroll to top button
  addScrollToTopButton();
  
  // Add preloader animation
  function addPreloader() {
    // Create preloader element
    const preloader = document.createElement("div");
    preloader.className = "preloader";
    preloader.innerHTML = `
    <div class="loader">
        <div class="loader-circle"></div>
        <div class="loader-text">Frame & Album Co.</div>
    </div>
  `;
  
    // Style the preloader
    const preloaderStyle = document.createElement("style");
    preloaderStyle.textContent = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--dark-color);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    
    .loader {
        text-align: center;
    }
    
    .loader-circle {
        width: 60px;
        height: 60px;
        margin: 0 auto 20px;
        border: 4px solid rgba(255, 255, 255, 0.2);
        border-top-color: var(--accent-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    .loader-text {
        color: white;
        font-size: 1.3rem;
        letter-spacing: 2px;
    }
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
  `;
    document.head.appendChild(preloaderStyle);
  
    // Add preloader to the body
    document.body.insertBefore(preloader, document.body.firstChild);
  
    // Hide preloader after page load
    window.addEventListener("load", function () {
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
      }, 800);
    });
  }
  
  // Add preloader
  addPreloader();
  