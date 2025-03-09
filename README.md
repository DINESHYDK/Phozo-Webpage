# Frame & Album Co. Website

A modern, visually stunning website for "Frame & Album Co.", a brand specializing in exquisite photo albums and frames for preserving precious memories.

## Features

### Advanced Hero Slider
- **3D Perspective Transitions**: Smooth rotational effects with depth perception
- **Dynamic Content Animation**: Independent animations for slide elements with staggered timing
- **Interactive Navigation System**:
  - Circular SVG progress indicators with fill animation
  - Numbered indicators (01-05) with hover effects
  - Previous/next arrow buttons with ripple effect
  - Progress bar showing elapsed time for current slide
- **Touch & Gesture Support**: Swipe functionality for mobile devices
- **Pause-on-hover**: Automatic pausing when user interacts with the slider
- **GPU-accelerated animations**: Optimized for performance across devices

### Portfolio Section
- **Filterable Grid Layout**: Interactive filtering by project category
- **Animated Transitions**: Smooth scale and opacity transitions during filtering
- **Hover Effects**: Elegant overlay with project details on hover
- **Responsive Grid**: Adapts from 3 columns on desktop to 1 column on mobile
- **Lightbox Functionality**: Detailed view of portfolio items with captions

### Testimonial Carousel
- **Continuous Animation**: Seamless horizontal scrolling with infinite loop
- **Card-based Design**: Elegant 300px × 300px cards with consistent styling
- **Pause-on-hover**: Animation pauses with zoom effect when hovering
- **Star Ratings**: Visual representation of customer satisfaction
- **Responsive Behavior**: Adapts speed and layout based on screen size
- **Subtle Glow Effect**: Enhanced visual appeal on hover

### Interactive Timeline
- **Scroll-triggered Animations**: Elements animate as they enter viewport
- **Visual Progression**: Connected dots showing company milestones
- **Staggered Reveal**: Sequential animation of timeline items
- **Responsive Layout**: Adapts to different screen sizes

### Modern Navigation
- **Sticky Header**: Navigation bar that sticks to top on scroll
- **Smooth Scrolling**: Animated scrolling to page sections
- **Active State Indicators**: Visual feedback for current section
- **Mobile-friendly Menu**: Collapsible menu for smaller screens
- **Scroll-to-top Button**: Easy navigation back to top of page with enhanced animations

### Contact Section
- **Interactive Form**: User-friendly contact form with real-time validation
- **Visual Feedback**: Styled input fields with focus states and error messages
- **Information Cards**: Contact details with icons and hover effects
- **Form Validation**: Client-side validation with helpful error messages

### Enhanced User Experience
- **Page Loader**: Smooth loading animation when the site initializes
- **Micro-interactions**: Subtle animations for interactive elements
- **Ripple Effects**: Modern touch feedback on buttons and controls
- **Optimized Images**: Properly sized images for faster loading
- **Error Handling**: Graceful error handling throughout the site

### Visual Effects
- **Parallax Scrolling**: Depth effect on hero section background
- **AOS Animations**: Elements animate as they enter the viewport
- **Hover Interactions**: Interactive elements respond to user actions
- **Micro-interactions**: Subtle animations for enhanced user experience

## Technical Implementation

### Animation Technologies
- **GSAP (GreenSock Animation Platform)**: Powers the advanced 3D slider transitions
- **CSS Transitions & Keyframes**: Used for hover effects and continuous animations
- **AOS Library**: Controls scroll-triggered animations
- **SVG Animations**: Used for progress indicators and interactive elements

### Performance Optimizations
- **GPU Acceleration**: Using transform and opacity for smooth animations
- **Will-change Property**: Hints browser about elements that will animate
- **RequestAnimationFrame**: Optimized JavaScript animations
- **Lazy Loading**: Deferred loading of off-screen content
- **Optimized Assets**: Compressed images and efficient code

### Responsive Design
- **Mobile-first Approach**: Ensures compatibility across all devices
- **Fluid Typography**: Text sizes adapt to screen dimensions
- **Flexible Layouts**: Grid and flexbox for responsive positioning
- **Media Queries**: Tailored experiences for different screen sizes
- **Touch-friendly**: Large tap targets and swipe functionality for mobile

### Cross-Browser Compatibility
- **Vendor Prefixes**: Ensures consistent rendering across browsers
- **Feature Detection**: Graceful degradation for older browsers
- **Standardized Properties**: Using both standard and vendor-specific CSS properties
- **Polyfills**: JavaScript fallbacks for modern features when needed

## Recent Enhancements

### May 2023 Updates
- **Loading Animation**: Added smooth page loader with 200ms transition
- **Enhanced Form Validation**: Real-time validation with helpful error messages
- **Improved Back-to-Top Button**: Added smooth animations and transitions
- **Fixed Timeline Visibility**: Ensured all timeline items display correctly
- **Updated Portfolio Images**: Replaced placeholder images with actual content
- **Mobile Menu Improvements**: Fixed toggle functionality and added error checks
- **Performance Optimizations**: Reduced unnecessary repaints and reflows
- **Accessibility Improvements**: Better focus states and semantic HTML

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser
3. Explore the website

## Customization

- Replace placeholder images with actual product images
- Update content in HTML files to match your brand
- Modify colors in CSS variables (in `css/style.css`) to match your brand colors
- Adjust animation parameters in JavaScript files to suit your preferences

## License

This project is licensed under the MIT License.
