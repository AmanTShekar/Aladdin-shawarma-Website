// =============================
// Info Strip Parallax
// =============================
const infoStrip = document.querySelector('.info-strip-content');
let lastScrollY = window.scrollY;
let offset = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;
  offset -= delta * 0.5;
  infoStrip.style.transform = `translateX(${offset}px)`;
  lastScrollY = currentScrollY;
});

// =============================
// Gallery Carousel
// =============================
const galleryImages = document.querySelectorAll(".gallery-image");
const dotsContainer = document.querySelector(".gallery-indicators");
const prevBtn = document.querySelector(".nav-btn.prev");
const nextBtn = document.querySelector(".nav-btn.next");

let currentGalleryIndex = 0;

// Create dots dynamically
galleryImages.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => showGalleryImage(i));
  dotsContainer.appendChild(dot);
});

const galleryDots = document.querySelectorAll(".dot");

function updateGalleryClasses() {
  galleryImages.forEach((img, i) => {
    img.classList.remove("left", "right", "center", "hidden");
    if (i === currentGalleryIndex) img.classList.add("center");
    else if (i === (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length)
      img.classList.add("left");
    else if (i === (currentGalleryIndex + 1) % galleryImages.length)
      img.classList.add("right");
    else img.classList.add("hidden");
  });

  galleryDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentGalleryIndex);
  });
}

function showGalleryImage(index) {
  currentGalleryIndex = (index + galleryImages.length) % galleryImages.length;
  updateGalleryClasses();
}

prevBtn.addEventListener("click", () => {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
  updateGalleryClasses();
});

nextBtn.addEventListener("click", () => {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
  updateGalleryClasses();
});

updateGalleryClasses();

// =============================
// Mobile Menu Toggle
// =============================
const menuToggle = document.getElementById('menu1-toggle');
const mobileMenu = document.getElementById('mobile-menu1');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  menuToggle.classList.toggle('active'); // For X animation
});

// =============================
// Menu Card Scroll Indicators
// =============================
const menuGrid = document.querySelector('.menu-grid');
const menuDotsContainer = document.querySelector('.menu-indicators');
const menuCards = menuGrid.querySelectorAll('.menu-card');

const updateMenuActiveDot = () => {
  const scrollLeft = menuGrid.scrollLeft;
  const cardWidth = menuCards[0].offsetWidth + parseInt(getComputedStyle(menuCards[0]).marginRight);
  const index = Math.round(scrollLeft / cardWidth);
  menuDotsContainer.querySelectorAll('span').forEach(dot => dot.classList.remove('active'));
  if(menuDotsContainer.children[index]) menuDotsContainer.children[index].classList.add('active');
};

menuGrid.addEventListener('scroll', updateMenuActiveDot);


  const galleryDisplay = document.querySelector('.gallery-display');
  let touchStartX = 0;
  let touchEndX = 0;

  function handleGesture() {
    if (touchEndX < touchStartX - 50) {
      document.querySelector('.right-btn').click(); // swipe left → next
    }
    if (touchEndX > touchStartX + 50) {
      document.querySelector('.left-btn').click(); // swipe right → prev
    }
  }

  galleryDisplay.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  galleryDisplay.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });





document.addEventListener("DOMContentLoaded", () => {
  // Select all elements that should animate
  const animateEls = document.querySelectorAll(
    "nav, .hero-heading, .hero-description-wrapper, .hero-buttons button, .explore-btn, .view-menu-btn, .send-btn, .story-left, .story-right, .large-box, .small-box-eq, .menu-card, .testimonial-box, .gallery-section, .contact-section, .contact-info, .contact-form, footer"
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const animateObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target); // animate only once
      }
    });
  }, observerOptions);

  animateEls.forEach(el => animateObserver.observe(el));
});


// =============================
// Scroll Reveal Animations
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const revealEls = document.querySelectorAll(
    "nav, .hero-heading, .hero-description-wrapper, .hero-buttons button, .explore-btn, .view-menu-btn, .send-btn, .story-left, .story-right, .large-box, .small-box-eq, .menu-card, .testimonial-box, .gallery-section, .contact-section, .contact-info, .contact-form, footer"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active'); // triggers CSS reveal
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.2 });

  revealEls.forEach(el => observer.observe(el));
});



const glow = document.querySelector('.floating-glow');

glow.addEventListener('animationend', () => {
  glow.classList.add('float-loop'); // start infinite sway + shimmer
});



