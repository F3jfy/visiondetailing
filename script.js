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

document.addEventListener("DOMContentLoaded", function () {
  const showMoreBtn = document.getElementById("showMoreBtn");
  const showLessBtn = document.getElementById("showLessBtn");
  const hiddenGalleryItems = document.querySelectorAll(".hidden-gallery-item");

  showMoreBtn.addEventListener("click", () => {
    hiddenGalleryItems.forEach((item, index) => {
      // Make the stagger delay shorter
      setTimeout(() => {
        item.classList.add("show-item");
      }, index * 20); // Changed from 100 to 20
    });
    showMoreBtn.style.display = "none";
    showLessBtn.style.display = "inline-block";
  });

  showLessBtn.addEventListener("click", () => {
    hiddenGalleryItems.forEach((item, index) => {
      // Make the stagger delay shorter
      setTimeout(() => {
        item.classList.remove("show-item");
      }, (hiddenGalleryItems.length - 1 - index) * 10); // Changed from 50 to 10
    });

    // Reduce the total delay before hiding buttons
    setTimeout(() => {
      showLessBtn.style.display = "none";
      showMoreBtn.style.display = "inline-block";
    }, hiddenGalleryItems.length * 10 + 50); // Adjusted total delay
  });
});