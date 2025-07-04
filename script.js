// Get references to your menu elements
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

// Toggle mobile menu visibility
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Handle clicks on navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    // Determine if the link is an internal anchor on the current page
    const isInternalLink = this.pathname === window.location.pathname && this.hash !== '';

    if (isInternalLink) {
      e.preventDefault(); // Prevent the default instant jump for internal anchors

      const targetId = this.hash; // e.g., "#services"
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate the offset to account for the fixed navbar
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        // Perform the smooth scroll
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    // If it's NOT an internal link (e.g., index.html#hero), we do NOT preventDefault().
    // The browser will handle the navigation to the new page and its hash.

    // Always close the mobile menu after a link is clicked,
    // regardless if it's a smooth scroll link or an external link
    // This needs to happen AFTER the potential preventDefault, but should always happen.
    // Delaying it slightly might help ensure the click event has fully processed
    // before the menu disappears, which is less critical for page changes but good practice.
    setTimeout(() => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }, 100); // Small delay to ensure click is registered before menu hides
  });
});

// --- Gallery Show More/Less Functionality (Keep this as is) ---
document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.getElementById("showMoreBtn");
  const showLessBtn = document.getElementById("showLessBtn");
  const hiddenGalleryItems = document.querySelectorAll(".hidden-gallery-item");

  showMoreBtn.addEventListener("click", () => {
    hiddenGalleryItems.forEach(item => {
      item.style.display = "block";
      requestAnimationFrame(() => {
        item.classList.add("show-item");
      });
    });
    showMoreBtn.style.display = "none";
    showLessBtn.style.display = "inline-block";
  });

  showLessBtn.addEventListener("click", () => {
    hiddenGalleryItems.forEach(item => {
      item.classList.remove("show-item");
      item.addEventListener('transitionend', function handler() {
        if (!item.classList.contains('show-item')) {
          item.style.display = "none";
          item.removeEventListener('transitionend', handler);
        }
      });
    });
    showLessBtn.style.display = "none";
    showMoreBtn.style.display = "inline-block";
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const bubblesContainer = document.querySelector('.bubbles-container');
    if (!bubblesContainer) {
        console.error('Error: .bubbles-container not found in the DOM.');
        return;
    }

    const numberOfBubbles = 20;
    const minBubbleSize = 30;
    const maxBubbleSize = 100;
    const minAnimationDuration = 12; // seconds
    const maxAnimationDuration = 30; // seconds
    const minAnimationDelay = 0; // seconds (still useful for staggering starts)
    const maxAnimationDelay = 8; // seconds
    const maxHorizontalDrift = 150; // pixels for random horizontal movement

    // New parameters for random starting vertical position
    const minStartOffset = -50; // Pixels below/above the viewport bottom
    const maxStartOffset = 90; // Percentage of viewport height from the bottom (e.g., 90vh)

    for (let i = 0; i < numberOfBubbles; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        const size = Math.random() * (maxBubbleSize - minBubbleSize) + minBubbleSize;
        const duration = Math.random() * (maxAnimationDuration - minAnimationDuration) + minAnimationDuration;
        const delay = Math.random() * (maxAnimationDelay - minAnimationDelay) + minAnimationDelay;
        const initialLeft = Math.random() * 95;

        // Random starting vertical position (from 0 to 100% of container height, plus some offset)
        // This makes bubbles appear at various points on the screen, not just the bottom
        const startBottom = Math.random() * (maxStartOffset - minStartOffset) + minStartOffset;

        const horizontalDrift = (Math.random() * 2 - 1) * maxHorizontalDrift;
        const endScale = 1 + (Math.random() * 0.6 - 0.3); // Between 0.7 and 1.3
        const randomTransparency = 0.2 + Math.random() * 0.4;

        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${initialLeft}%`;
        bubble.style.bottom = `${startBottom}vh`; // Set initial random vertical position using vh
        bubble.style.backgroundColor = `rgba(255, 255, 255, ${randomTransparency})`;

        bubble.style.setProperty('--x-end', `${horizontalDrift}px`);
        // The --y-end needs to compensate for the random startBottom to ensure they always move upwards off-screen
        // If startBottom is 0vh (bottom of screen), then -100vh moves it off top.
        // If startBottom is 50vh, then we need to move it -150vh from its start point to go off top.
        bubble.style.setProperty('--y-end', `calc(-100vh - ${startBottom}vh)`); // Dynamically calculate end vertical position
        bubble.style.setProperty('--scale-end', endScale);
        bubble.style.animationDuration = `${duration}s`;
        bubble.style.animationDelay = `${delay}s`;

        bubblesContainer.appendChild(bubble);
    }
});
