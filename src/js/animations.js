// animations.js
export function initAnimations() {
  const animatedElements = document.querySelectorAll('.section-title, .room-card');
  
  if (animatedElements.length === 0) {
    return; // No elements to animate on this page
  }

  function animateOnScroll() {
    animatedElements.forEach(element => {
      if (isElementInViewport(element)) {
        element.classList.add('animate');
      }
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * 1.2 && // Adding 20% threshold
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Run on initial load
  animateOnScroll();

  // Then on scroll
  window.addEventListener('scroll', animateOnScroll);
}