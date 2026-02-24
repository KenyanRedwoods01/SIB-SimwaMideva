# Frontend - Mansa-X Investment Platform

## Overview

This is the frontend application for the Mansa-X Investment Platform, built with **HTML, CSS, and JavaScript** using **Bootstrap 5** for responsive design and components.

## Project Structure

```
frontend/
├── public/
│   ├── index.html                 # Main HTML file
│   └── assets/
│       ├── images/                # Image assets
│       ├── icons/                 # Icon assets
│       └── fonts/                 # Custom fonts
├── src/
│   ├── css/
│   │   ├── bootstrap-overrides.css # Bootstrap customizations
│   │   ├── layout.css              # Main layout styles
│   │   ├── components.css          # Component-specific styles
│   │   └── responsive.css          # Responsive design styles
│   ├── js/
│   │   ├── main.js                 # Main application logic
│   │   └── validation.js           # Form validation module
│   └── components/
│       ├── navbar.html             # Navbar component
│       ├── membership-cards.html    # Membership cards component
│       └── footer.html             # Footer component
└── README.md                       # This file

```

## Technologies Used

- **HTML5:** Semantic markup and structure
- **CSS3:** Modern styling with custom properties and media queries
- **JavaScript (ES6+):** Interactive functionality and validation
- **Bootstrap 5:** Responsive grid system and components

## Features

### 1. Responsive Design
- Mobile-first approach
- Breakpoints for mobile, tablet, and desktop
- Fluid layouts using Bootstrap grid system

### 2. Interactive Components
- Collapsible membership cards with "Learn More" buttons
- Hover effects on stat cards
- Smooth animations and transitions
- Form validation with real-time feedback

### 3. Navigation
- Responsive navbar with mobile toggle
- Smooth scrolling navigation
- Active link highlighting

### 4. Membership Cards
- Foundation and Economy membership options
- Expandable details sections
- Color-coded styling for visual distinction

### 5. Form Validation
- Email validation
- Phone number validation
- Password strength checking
- Custom validation rules
- Real-time validation feedback

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/simwa-mideva-technical-submission.git
cd simwa-mideva-technical-submission/frontend
```

2. Open the application in a web browser:
```bash
# Simply open the file in your browser
open public/index.html

# Or use a local server (recommended)
python -m http.server 8000
# Then navigate to http://localhost:8000/public/
```

### Development

#### File Organization

- **HTML Files:** Located in `public/` directory
- **CSS Files:** Located in `src/css/` directory
- **JavaScript Files:** Located in `src/js/` directory
- **Components:** Reusable HTML components in `src/components/`

#### CSS Architecture

The CSS is organized into logical modules:

1. **bootstrap-overrides.css** - Custom Bootstrap theme overrides
2. **layout.css** - Main layout and structural styles
3. **components.css** - Reusable component styles
4. **responsive.css** - Media queries and responsive adjustments

#### JavaScript Modules

1. **main.js** - Core application logic
   - Navbar initialization
   - Component interactions
   - Event listeners
   - Utility functions

2. **validation.js** - Form validation module
   - FormValidator class
   - Field-level validation
   - Real-time validation
   - Error handling

## Key Components

### Profile Section
Displays user profile information with avatar and welcome message.

```html
<div class="profile-card">
    <div class="profile-header">
        <img src="..." alt="Profile Background" class="profile-bg">
        <div class="profile-content">
            <img src="..." alt="User" class="profile-avatar">
            <h2 class="profile-name">Michael</h2>
            <p class="profile-message">Welcome message...</p>
        </div>
    </div>
</div>
```

### Stat Cards
Display statistics with avatars and values in a responsive grid.

```html
<div class="stat-card stat-card-pink">
    <img src="..." alt="User" class="stat-avatar">
    <p class="stat-name">User Name</p>
    <p class="stat-value">350</p>
</div>
```

### Membership Cards
Expandable membership options with detailed information.

```html
<div class="membership-card membership-foundation">
    <h4 class="membership-title">FOUNDATION MEMBERSHIP</h4>
    <p class="membership-description">Description...</p>
    <button class="btn btn-membership" data-bs-toggle="collapse" data-bs-target="#details">
        Learn More
    </button>
    <div class="collapse" id="details">
        <!-- Details content -->
    </div>
</div>
```

## Styling Guidelines

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #3498db | Buttons, links, accents |
| Secondary | #95a5a6 | Secondary buttons |
| Success | #27ae60 | Success messages |
| Danger | #e74c3c | Error messages |
| Warning | #f39c12 | Warnings, accents |
| Dark | #2c3e50 | Text, backgrounds |
| Light | #ecf0f1 | Borders, light backgrounds |

### Typography

- **Font Family:** Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Body Font Size:** 14px
- **Line Height:** 1.6
- **Font Weight:** 400 (normal), 600 (semi-bold), 700 (bold)

### Spacing

- **Base Unit:** 1rem (16px)
- **Padding:** 10px, 15px, 20px, 25px, 30px
- **Margin:** Multiples of 1rem
- **Gap:** 1rem, 1.5rem

### Border Radius

- **Default:** 8px
- **Buttons:** 5px
- **Badges:** 20px (pill-shaped)

## Responsive Breakpoints

| Device | Width | Breakpoint |
|--------|-------|-----------|
| Mobile | < 576px | xs |
| Tablet Portrait | 576px - 767px | sm |
| Tablet Landscape | 768px - 991px | md |
| Desktop | 992px - 1199px | lg |
| Large Desktop | ≥ 1200px | xl |

## JavaScript Usage

### Initialization

The application initializes on DOM content load:

```javascript
document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initStatCards();
    initMembershipCards();
    initCollapseButtons();
    initFormValidation();
    initScrollAnimations();
});
```

### Form Validation Example

```javascript
const validator = new FormValidator();
const isValid = validator.validateField('Email', email, 'email', {
    required: true,
    minLength: 5
});
```

### Showing Notifications

```javascript
showNotification('Success message', 'success');
showNotification('Error message', 'error');
showNotification('Info message', 'info');
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

1. **CSS:** Minified and optimized
2. **JavaScript:** Event delegation for better performance
3. **Images:** Optimized for web (use appropriate formats and sizes)
4. **Lazy Loading:** Consider implementing for images below the fold

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus indicators on interactive elements

## Best Practices

1. **Keep HTML semantic** - Use proper HTML5 tags
2. **Modular CSS** - Organize styles by component
3. **DRY JavaScript** - Avoid code repetition
4. **Mobile First** - Design for mobile, enhance for larger screens
5. **Performance** - Minimize HTTP requests, optimize assets
6. **Security** - Validate all user inputs
7. **Accessibility** - Ensure keyboard and screen reader support

## Troubleshooting

### Styles not loading
- Check file paths in HTML
- Ensure CSS files are in the correct directory
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### JavaScript not working
- Check browser console for errors (F12)
- Verify script paths in HTML
- Ensure Bootstrap JS is loaded before custom scripts

### Responsive design issues
- Check media queries in responsive.css
- Test on actual devices or use browser DevTools
- Verify viewport meta tag in HTML head

## Contributing

When making changes:

1. Follow the existing code style
2. Keep CSS modular and organized
3. Use meaningful class names
4. Add comments for complex logic
5. Test on multiple devices and browsers

## License

This project is part of the Simwa Mideva Technical Submission and is provided as-is.

## Support

For issues or questions, please contact the development team.

---

**Last Updated:** February 24, 2026
**Version:** 1.0.0
