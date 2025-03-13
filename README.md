# Frame & Album Co. Website

A professional website for Frame & Album Co., showcasing their collection of handcrafted photo albums and frames.

![Frame & Album Co. Website](https://img.icons8.com/fluency/48/photo-album.png)

## Project Description

Frame & Album Co. is a premium brand specializing in handcrafted photo albums and frames. This website serves as their digital storefront, allowing customers to explore their collections, learn about the company's history, and contact them for custom orders.

The website features a modern, responsive design with smooth animations and interactive elements to provide an engaging user experience that reflects the premium nature of the brand's products.

## Features

### Responsive Design
- Fully responsive layout that adapts to all screen sizes (mobile, tablet, desktop)
- Mobile-friendly navigation with animated hamburger menu
- Optimized images and content for different devices

### Interactive Gallery
- Filterable gallery with smooth animations
- Category-based filtering (Albums, Frames, Wedding, Family, Special Occasions)
- Masonry grid layout for visually appealing presentation
- Product details displayed on hover

### Theme Switching
- Light and dark theme options
- Smooth transition animations between themes
- User preference saved in localStorage
- Consistent styling across both themes

### Advanced UI Components
- Hero slider with progress indicators
- Animated timeline for company history
- Testimonial carousel
- Smooth scrolling navigation
- Back-to-top button with scroll detection

### Performance Optimizations
- Lazy loading of images
- Optimized animations for better performance
- Minified CSS and JavaScript
- Responsive images for faster loading on mobile devices

## Technologies Used

- **HTML5** - Semantic markup for structure
- **CSS3** - Custom styling with variables for theming
- **JavaScript** - Interactive features and DOM manipulation
- **jQuery** - Simplified DOM manipulation and event handling
- **AOS** - Animate On Scroll library for scroll-based animations
- **GSAP** - GreenSock Animation Platform for advanced animations
- **Masonry** - JavaScript grid layout library for gallery
- **Font Awesome** - Icon library for UI elements

## Installation and Setup

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/frame-album-co.git
   cd frame-album-co
   ```

2. **Open the project**
   - Open the project folder in your preferred code editor
   - No build process is required as this is a static website

3. **View the website**
   - Open `index.html` in your browser to view the website
   - Alternatively, use a local development server:
     ```
     npx serve
     ```

## Usage Guide

### Maintaining the Gallery

To add new items to the gallery:

1. Add a new HTML element to the gallery grid in `gallery.html`:
   ```html
   <div class="gallery-item [category-classes]" data-aos="fade-up">
     <!-- [Product Type] Product Image -->
     <img src="images/your-image.jpg" alt="Product Name" />
     <div class="gallery-overlay">
       <div class="gallery-info">
         <h3>Product Name</h3>
         <p>Product Description</p>
         <span class="price">$XX.XX</span>
       </div>
     </div>
   </div>
   ```

2. Replace `[category-classes]` with appropriate categories (e.g., `albums wedding`)
3. Add a descriptive comment above the image tag
4. Use appropriate alt text for accessibility
5. Update the product details (name, description, price)

### Modifying Themes

To modify the theme colors:

1. Open `css/style.css`
2. Locate the `:root` and `[data-theme="dark"]` sections
3. Modify the CSS variables to change colors
4. Test both themes to ensure good contrast and readability

## Browser Compatibility

The website has been tested and is compatible with:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## Credits and Acknowledgments

- Images: Unsplash and placeholder images (replace with actual product images)
- Icons: Font Awesome and Icons8
- Fonts: Google Fonts (Lato, Playfair Display)
- Libraries: jQuery, AOS, GSAP, Masonry

## Contact Information

For support or inquiries about this website, please contact:

- **Email**: support@frameandalbumco.com
- **Website**: [www.frameandalbumco.com](https://www.frameandalbumco.com)

## License

© 2025 Frame & Album Co. All Rights Reserved.
