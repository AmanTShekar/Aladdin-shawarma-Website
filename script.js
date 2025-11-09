// =============================
// Info Strip Parallax
// =============================
const infoStrip = document.querySelector('.info-strip-content');
if (infoStrip) {
  let lastScrollY = window.scrollY;
  let offset = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    offset -= delta * 0.5;
    infoStrip.style.transform = `translateX(${offset}px)`;
    lastScrollY = currentScrollY;
  });
}

// =============================
// Gallery Carousel
// =============================
const galleryImages = document.querySelectorAll('.gallery-image');
const dotsContainer = document.querySelector('.gallery-indicators');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');

if (galleryImages.length && dotsContainer && prevBtn && nextBtn) {
  let currentGalleryIndex = 0;

  // Create dots dynamically
  galleryImages.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showGalleryImage(i));
    dotsContainer.appendChild(dot);
  });

  const galleryDots = dotsContainer.querySelectorAll('.dot');

  function updateGalleryClasses() {
    galleryImages.forEach((img, i) => {
      img.classList.remove('left', 'right', 'center', 'hidden');
      if (i === currentGalleryIndex) img.classList.add('center');
      else if (i === (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length)
        img.classList.add('left');
      else if (i === (currentGalleryIndex + 1) % galleryImages.length)
        img.classList.add('right');
      else img.classList.add('hidden');
    });

    galleryDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentGalleryIndex);
    });
  }

  function showGalleryImage(index) {
    currentGalleryIndex = (index + galleryImages.length) % galleryImages.length;
    updateGalleryClasses();
  }

  prevBtn.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryClasses();
  });

  nextBtn.addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateGalleryClasses();
  });

  updateGalleryClasses();

  // =============================
  // Swipe Gesture Support
  // =============================
  const galleryDisplay = document.querySelector('.gallery-display');
  if (galleryDisplay) {
    let touchStartX = 0;
    let touchEndX = 0;

    galleryDisplay.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    galleryDisplay.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 50) nextBtn.click(); // swipe left → next
      if (touchEndX > touchStartX + 50) prevBtn.click(); // swipe right → prev
    });
  }
}

// =============================
// Mobile Menu Toggle
// =============================
const menuToggle = document.getElementById('menu1-toggle');
const mobileMenu = document.getElementById('mobile-menu1');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active'); // For X animation
  });
}

// =============================
// Menu Card Scroll Indicators
// =============================
const menuGrid = document.querySelector('.menu-grid');
const menuDotsContainer = document.querySelector('.menu-indicators');

if (menuGrid && menuDotsContainer) {
  const menuCards = menuGrid.querySelectorAll('.menu-card');
  const updateMenuActiveDot = () => {
    const scrollLeft = menuGrid.scrollLeft;
    const cardWidth = menuCards[0].offsetWidth + parseInt(getComputedStyle(menuCards[0]).marginRight);
    const index = Math.round(scrollLeft / cardWidth);
    menuDotsContainer.querySelectorAll('span').forEach(dot => dot.classList.remove('active'));
    if (menuDotsContainer.children[index]) menuDotsContainer.children[index].classList.add('active');
  };
  menuGrid.addEventListener('scroll', updateMenuActiveDot);
}

// =============================
// Scroll Reveal Animations
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll(
    'nav, .hero-heading, .hero-description-wrapper, .hero-buttons button, .explore-btn, .view-menu-btn, .send-btn, .story-left, .story-right, .large-box, .small-box-eq, .menu-card, .testimonial-box, .gallery-section, .contact-section, .contact-info, .contact-form, footer'
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach(el => observer.observe(el));
});

// =============================
// Floating Glow Animation
// =============================
const glow = document.querySelector('.floating-glow');
if (glow) {
  glow.addEventListener('animationend', () => {
    glow.classList.add('float-loop');
  });
}

const filterBtns = document.querySelectorAll('.category-btn');
const cards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.getAttribute('data-category');

    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    cards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

