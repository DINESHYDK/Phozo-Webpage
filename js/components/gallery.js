/**
 * Gallery Filter Component
 */
class GalleryFilter {
  constructor() {
    this.filterBtns = document.querySelectorAll(".filter-btn");
    this.galleryItems = document.querySelectorAll(".gallery-item");
    this.currentFilter = "all";

    this.init();
  }

  init() {
    if (this.filterBtns.length === 0) return;

    this.bindEvents();
    this.showAllItems();
  }

  bindEvents() {
    this.filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = btn.getAttribute("data-filter");
        this.filterItems(filter);
        this.updateActiveButton(btn);
      });
    });
  }

  filterItems(filter) {
    this.currentFilter = filter;

    this.galleryItems.forEach((item, index) => {
      const categories = item.getAttribute("data-category") || "";
      const itemClasses = item.className;

      if (
        filter === "all" ||
        categories.includes(filter) ||
        itemClasses.includes(filter)
      ) {
        this.showItem(item, index);
      } else {
        this.hideItem(item);
      }
    });
  }

  showItem(item, index) {
    // Reset styles
    item.style.display = "block";
    item.style.opacity = "0";
    item.style.transform = "translateY(20px) scale(0.95)";

    // Animate in with delay
    setTimeout(() => {
      item.classList.add("show");
      item.style.opacity = "1";
      item.style.transform = "translateY(0) scale(1)";
    }, index * 50);
  }

  hideItem(item) {
    item.classList.remove("show");
    item.style.opacity = "0";
    item.style.transform = "translateY(20px) scale(0.95)";

    setTimeout(() => {
      item.style.display = "none";
    }, 300);
  }

  showAllItems() {
    this.galleryItems.forEach((item, index) => {
      setTimeout(() => {
        this.showItem(item, index);
      }, 100);
    });
  }

  updateActiveButton(activeBtn) {
    this.filterBtns.forEach((btn) => btn.classList.remove("active"));
    activeBtn.classList.add("active");
  }
}

// Initialize gallery filter when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new GalleryFilter();
});
