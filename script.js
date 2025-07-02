const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// In your script.js
document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.getElementById("showMoreBtn");
  const showLessBtn = document.getElementById("showLessBtn");
  const hiddenGalleryItems = document.querySelectorAll(".hidden-gallery-item");

  showMoreBtn.addEventListener("click", () => {
    hiddenGalleryItems.forEach(item => {
      item.style.display = "block"; // Make it block first to allow max-height transition
      // Use requestAnimationFrame to ensure display change takes effect before adding class
      requestAnimationFrame(() => {
        item.classList.add("show-item");
      });
    });
    showMoreBtn.style.display = "none";
    showLessBtn.style.display = "inline-block";
  });

  showLessBtn.addEventListener("click", () => {
    hiddenGalleryItems.forEach(item => {
      item.classList.remove("show-item"); // Start the collapse animation
      // Listen for the end of the transition, then set display: none
      item.addEventListener('transitionend', function handler() {
        if (!item.classList.contains('show-item')) { // Only hide if it's truly collapsed
          item.style.display = "none";
          item.removeEventListener('transitionend', handler); // Remove listener to prevent multiple calls
        }
      });
    });
    showLessBtn.style.display = "none";
    showMoreBtn.style.display = "inline-block";
  });
});