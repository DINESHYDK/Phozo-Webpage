// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const hamburger = document.getElementById('hamburger');
    const body = document.body;
    
    hamburger.addEventListener('click', function() {
        body.classList.toggle('mobile-menu-active');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            body.classList.remove('mobile-menu-active');
        });
    });
    
    // Theme switcher functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            setTheme(theme);
            localStorage.setItem('theme', theme);
        });
    });
    
    function setTheme(theme) {
        // Remove active class from all buttons
        themeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to selected theme button
        const activeButton = document.querySelector(`.theme-btn[data-theme="${theme}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Set theme on html element
        htmlElement.setAttribute('data-theme', theme);
    }
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Reveal animations when scrolling
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Add reveal class to elements that should animate on scroll
    function setupRevealAnimations() {
        // Add reveal class to section headers
        document.querySelectorAll('.section-header').forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });
        
        // Add reveal class to service cards
        document.querySelectorAll('.service-card').forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });
        
        // Add reveal class to contact cards
        document.querySelectorAll('.contact-card').forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });
        
        // Add reveal to about section elements
        const aboutElements = document.querySelectorAll('.about-image, .about-text');
        aboutElements.forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });
    }
    
    // Initialize reveal animations
    setupRevealAnimations();
    
    // Check for elements to reveal on page load and scroll
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '1rem 0';
        }
    });
    
    // Form submission handling (prevent default and show success message)
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Simple form validation
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                return;
            }
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.style.padding = '1rem';
            successMessage.style.marginTop = '1rem';
            successMessage.style.backgroundColor = 'var(--primary-light)';
            successMessage.style.color = 'var(--primary-color)';
            successMessage.style.borderRadius = '0.5rem';
            successMessage.style.textAlign = 'center';
            successMessage.innerHTML = 'Thank you for your message! I\'ll get back to you soon.';
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
            
            // For demo purposes only - log form data to console
            console.log('Form submitted with values:', formValues);
        });
    }
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});