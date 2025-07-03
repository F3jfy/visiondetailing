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
    // Check if the link has a hash (i.e., it's an anchor link to a section)
    if (this.hash !== '') {
      e.preventDefault(); // Prevent the default instant jump

      const targetId = this.hash; // e.g., "#services"
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Calculate the offset to account for the fixed navbar
        // Get the navbar's current height dynamically
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

    // Always close the mobile menu after a link is clicked,
    // regardless if it's a smooth scroll link or an external link
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
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