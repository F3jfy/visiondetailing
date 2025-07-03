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