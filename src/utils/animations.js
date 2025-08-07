// Modern Animation Utilities - Inspired by Premium Sites like Allbirds & LARQ

// Intersection Observer for scroll-triggered animations
export function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Add stagger effect to child elements
        const children = entry.target.querySelectorAll('.stagger-child');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('visible');
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(element => {
    observer.observe(element);
  });

  return observer;
}

// Parallax scrolling effect
export function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  function updateParallax() {
    const scrollTop = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrollTop * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }

  // Throttled scroll listener
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
      setTimeout(() => { ticking = false; }, 16);
    }
  }

  window.addEventListener('scroll', requestTick);
  return updateParallax;
}

// Smooth reveal animations for hero sections
export function initHeroAnimations() {
  const heroElements = document.querySelectorAll('.hero-animate');
  
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add('animate');
    }, index * 200);
  });
}

// Interactive cursor effects
export function initCursorEffects() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '<div class="cursor-dot"></div>';
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    const ease = 0.15;
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(updateCursor);
  }

  updateCursor();

  // Add hover effects
  const hoverElements = document.querySelectorAll('button, a, .card-modern, .product-card');
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
}

// Floating elements animation
export function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-bg');
  
  floatingElements.forEach((element, index) => {
    const delay = index * 1000;
    const duration = 3000 + Math.random() * 2000;
    
    setTimeout(() => {
      element.style.animation = `float ${duration}ms ease-in-out infinite`;
    }, delay);
  });
}

// Magnetic button effects
export function initMagneticEffects() {
  const magneticElements = document.querySelectorAll('.magnetic');
  
  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 50;
      
      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        const moveX = x * strength * 0.3;
        const moveY = y * strength * 0.3;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0)';
    });
  });
}

// Text reveal animations
export function initTextRevealAnimations() {
  const textElements = document.querySelectorAll('.text-reveal');
  
  textElements.forEach(element => {
    const text = element.textContent;
    element.innerHTML = '';
    
    // Split text into spans
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.animationDelay = `${i * 50}ms`;
      element.appendChild(span);
    }
  });
}

// Loading animations
export function initLoadingAnimations() {
  // Add loading class to body
  document.body.classList.add('loading');
  
  // Remove loading class when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }, 500);
  });
}

// Navbar scroll effects
export function initNavbarEffects() {
  const navbar = document.querySelector('.navbar-modern');
  if (!navbar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavbar() {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll
    if (scrollY > lastScrollY && scrollY > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
}

// Initialize all animations
export function initAllAnimations() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    document.body.classList.add('reduced-motion');
    return;
  }

  // Initialize all animation systems
  initLoadingAnimations();
  initScrollAnimations();
  initParallaxEffects();
  initHeroAnimations();
  initFloatingElements();
  initMagneticEffects();
  initTextRevealAnimations();
  initNavbarEffects();
  
  // Optional: cursor effects (can be disabled for mobile)
  if (window.innerWidth > 768) {
    initCursorEffects();
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllAnimations);
} else {
  initAllAnimations();
}
