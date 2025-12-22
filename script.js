// Get DOM elements
const startBtn = document.getElementById("start");
const exploreBtn = document.getElementById("explore");
const overlay = document.getElementById("popupOverlay");
const closePopup = document.querySelector(".close-popup");
const popupCloseIcon = document.querySelector(".popup-close-icon");
const popup = document.querySelector(".popup");

// Enhanced button click with ripple effect
function createRipple(event, button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple-effect');
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Add ripple effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Start Learning button click handler
startBtn.addEventListener("click", (e) => {
  createRipple(e, startBtn);
  
  // Pop effect
  startBtn.classList.add("pop");

  setTimeout(() => {
    startBtn.classList.remove("pop");
    overlay.classList.add("active");
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Animate popup options
    const options = document.querySelectorAll('.popup .option');
    options.forEach((option, index) => {
      option.style.opacity = '0';
      option.style.transform = 'translateY(20px)';
      setTimeout(() => {
        option.style.transition = 'all 0.4s ease';
        option.style.opacity = '1';
        option.style.transform = 'translateY(0)';
      }, 100 * (index + 1));
    });
  }, 150);
});

// Explore Courses button (can be customized)
exploreBtn.addEventListener("click", (e) => {
  createRipple(e, exploreBtn);
  
  // Smooth scroll to topics section
  const topicsSection = document.querySelector('.topics-section');
  if (topicsSection) {
    topicsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Close popup function
function closePopupModal() {
  overlay.classList.remove("active");
  document.body.style.overflow = ''; // Restore scrolling
  
  // Reset animations
  const options = document.querySelectorAll('.popup .option');
  options.forEach(option => {
    option.style.opacity = '';
    option.style.transform = '';
  });
}

// Close popup button
closePopup.addEventListener("click", closePopupModal);

// Close icon button
if (popupCloseIcon) {
  popupCloseIcon.addEventListener("click", closePopupModal);
}

// Close when clicking outside popup
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    closePopupModal();
  }
});

// Close popup with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("active")) {
    closePopupModal();
  }
});

// Smooth scroll for all navigation links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (href && href !== '#') {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Add scroll animation for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe topic and feature boxes
document.querySelectorAll('.topic-box, .feature-box').forEach(box => {
  box.style.opacity = '0';
  box.style.transform = 'translateY(30px)';
  box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(box);
});

// Parallax effect for hero image
let lastScrollY = window.scrollY;
const introImage = document.querySelector('.intro-image img');

function parallaxEffect() {
  const scrollY = window.scrollY;
  
  if (introImage && scrollY < window.innerHeight) {
    const parallaxSpeed = 0.5;
    introImage.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
  }
  
  lastScrollY = scrollY;
  requestAnimationFrame(parallaxEffect);
}

if (introImage) {
  requestAnimationFrame(parallaxEffect);
}

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section[class*="section"]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('class').split(' ')[0];
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add hover sound effect (optional - can be enabled)
function playHoverSound() {
  // Create a subtle hover sound using Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
}

// Add click animation to all buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', function(e) {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 100);
  });
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toString().includes('+') ? target : Math.floor(target) + (target.toString().includes('%') ? '%' : '+');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (target.toString().includes('%') ? '%' : '+');
    }
  }, 16);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statItems = entry.target.querySelectorAll('.stat-item h3');
      statItems.forEach((stat, index) => {
        setTimeout(() => {
          const text = stat.textContent;
          const number = parseInt(text.replace(/\D/g, ''));
          animateCounter(stat, text.includes('K') ? text : text);
        }, index * 200);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.stats-row');
if (statsRow) {
  statsObserver.observe(statsRow);
}

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Animate hero elements
  const heroElements = document.querySelectorAll('.skillup-tag, .hero-heading, .hero-description, .hero-btns, .stats-row');
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 150);
  });
});

// Add smooth reveal on scroll for footer
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

const footer = document.querySelector('.footer');
if (footer) {
  footer.style.opacity = '0';
  footer.style.transform = 'translateY(50px)';
  footer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  footerObserver.observe(footer);
}

// Enhanced tooltip behavior for mobile
if (window.innerWidth <= 768) {
  const infoIcons = document.querySelectorAll('.info');
  
  infoIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation();
      const infoText = icon.nextElementSibling;
      
      // Toggle display
      if (infoText.style.display === 'block') {
        infoText.style.display = 'none';
      } else {
        // Hide all other tooltips
        document.querySelectorAll('.info-text').forEach(text => {
          text.style.display = 'none';
        });
        infoText.style.display = 'block';
      }
    });
  });
  
  // Close tooltips when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.info-text').forEach(text => {
      text.style.display = 'none';
    });
  });
}

// Add performance optimization - lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Console message
console.log('%c🎓 Welcome to EduScript! ', 'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cYour learning journey starts here!', 'color: #6366f1; font-size: 14px; font-weight: bold;');