/**
 * Form Validation Utility
 */
class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.errors = {};

    if (this.form) {
      this.init();
    }
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    // Real-time validation
    const inputs = this.form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearFieldError(input));
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validateForm()) {
      this.submitForm();
    }
  }

  validateForm() {
    this.errors = {};
    const inputs = this.form.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => this.validateField(input));

    return Object.keys(this.errors).length === 0;
  }

  validateField(field) {
    const value = field.value.trim();
    const name = field.name;
    const type = field.type;

    // Clear previous error
    this.clearFieldError(field);

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      this.setFieldError(field, "This field is required");
      return false;
    }

    // Email validation
    if (type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.setFieldError(field, "Please enter a valid email address");
        return false;
      }
    }

    // Phone validation
    if (type === "tel" && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
        this.setFieldError(field, "Please enter a valid phone number");
        return false;
      }
    }

    // Minimum length validation
    if (field.hasAttribute("minlength")) {
      const minLength = parseInt(field.getAttribute("minlength"));
      if (value.length < minLength) {
        this.setFieldError(field, `Minimum ${minLength} characters required`);
        return false;
      }
    }

    return true;
  }

  setFieldError(field, message) {
    this.errors[field.name] = message;

    // Add error class to field
    field.classList.add("error");

    // Create or update error message
    let errorElement = field.parentNode.querySelector(".error-message");
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "error-message";
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  clearFieldError(field) {
    delete this.errors[field.name];

    // Remove error class
    field.classList.remove("error");

    // Remove error message
    const errorElement = field.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
    }
  }

  async submitForm() {
    const formData = new FormData(this.form);
    const submitButton = this.form.querySelector('button[type="submit"]');

    // Show loading state
    if (submitButton) {
      submitButton.classList.add("loading");
      submitButton.disabled = true;
    }

    try {
      // Simulate form submission (replace with actual endpoint)
      await this.simulateSubmission(formData);

      // Show success message
      this.showMessage(
        "Thank you! Your message has been sent successfully.",
        "success"
      );
      this.form.reset();
    } catch (error) {
      // Show error message
      this.showMessage(
        "Sorry, there was an error sending your message. Please try again.",
        "error"
      );
    } finally {
      // Remove loading state
      if (submitButton) {
        submitButton.classList.remove("loading");
        submitButton.disabled = false;
      }
    }
  }

  async simulateSubmission(formData) {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        Math.random() > 0.1 ? resolve() : reject();
      }, 2000);
    });
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageElement = document.createElement("div");
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    // Insert message before form
    this.form.parentNode.insertBefore(messageElement, this.form);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }
}

// Initialize form validation for common forms
document.addEventListener("DOMContentLoaded", () => {
  // Contact form
  new FormValidator(".contact-form");

  // Newsletter form
  new FormValidator(".newsletter-form");

  // Any other forms with class 'validate-form'
  document.querySelectorAll(".validate-form").forEach((form) => {
    new FormValidator(`#${form.id}`);
  });
});
