document.addEventListener('DOMContentLoaded', function() {
  // Set home link as active by default on page load
  const homeLink = document.querySelector('nav .links ul li a[href="#home"]');
  if (homeLink && !window.location.hash) {
    homeLink.classList.add('active');
    // If we're on the home page and there's no hash, scroll to top
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
      window.scrollTo(0, 0);
    }
  }

  // Intersection Observer for section tracking
  const sections = document.querySelectorAll('#home, #courses, #about, #fee');
  const navLinks = document.querySelectorAll('nav .links ul li a[href^="#"]');

  // Track which sections are currently visible
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1]
  };

  function updateActiveNavLink(sectionId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
        updateActiveNavLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section) {
      observer.observe(section);
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Update active state immediately
        updateActiveNavLink(targetId);

        // Smooth scroll to target
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });

        // Close mobile menu if open
        const navLinksContainer = document.getElementById('navLinks');
        const hamburger = document.querySelector('.hamburger');
        if (navLinksContainer && navLinksContainer.classList.contains('show')) {
          navLinksContainer.classList.remove('show');
          hamburger.classList.remove('active');
        }
      }
    });
  });

  // Handle initial hash in URL
  if (window.location.hash) {
    const initialSection = document.querySelector(window.location.hash);
    if (initialSection) {
      updateActiveNavLink(window.location.hash.substring(1));
    }
  }

  // Handle scroll to top
  window.addEventListener('scroll', () => {
    if (window.scrollY < 50) {
      updateActiveNavLink('home');
    }
  }, { passive: true });

  // Existing hamburger menu code
  var hamburger = document.querySelector('.hamburger');
  var navLinksContainer = document.getElementById('navLinks');
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', function() {
      navLinksContainer.classList.toggle('show');
      hamburger.classList.toggle('active');
    });
  }

  // Add click outside handler
  document.addEventListener('click', function(e) {
    const navLinksContainer = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinksContainer && hamburger) {
      if (!navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
        navLinksContainer.classList.remove('show');
        hamburger.classList.remove('active');
      }
    }
  });

  // Add resize handler
  window.addEventListener('resize', function() {
    const navLinksContainer = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768 && navLinksContainer && hamburger) {
      navLinksContainer.classList.remove('show');
      hamburger.classList.remove('active');
    }
  });

  // Contact form submission
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      // Simple validation
      if (!data.firstName || !data.lastName || !data.email || !data.message) {
        alert('Please fill in all required fields.');
        return;
      }
      // Simulate form submission
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }

  // Newsletter subscription
  var newsletterBtn = document.querySelector('.newsletter-form button');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var emailInput = document.querySelector('.newsletter-form input');
      if (emailInput && emailInput.value) {
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // Social media links (you can replace with actual URLs)
  document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function (e) {
      e.preventDefault();
      // Add your social media URLs here
      console.log('Social media link clicked');
    });
  });

  // Add transition delay to prevent flickering
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      link.style.transition = 'none'; // Disable transition for immediate update
    });
    link.addEventListener('mouseleave', function() {
      link.style.transition = ''; // Re-enable transition
    });
  });

  /* Add transition delay to prevent flickering */
 
});




// FAQ Toggle Functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // If this item wasn't active, open it
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Auto-scroll to FAQ when opened
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            setTimeout(() => {
                if (this.parentElement.classList.contains('active')) {
                    this.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }, 100);
        });
    });
});

// Add keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('faq-question')) {
            e.preventDefault();
            toggleFAQ(e.target);
        }
    }
});

// Add focus management for accessibility
document.querySelectorAll('.faq-question').forEach(question => {
    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    
    question.addEventListener('click', function() {
        const isExpanded = this.parentElement.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });
});

// ===== Blog Page Functionality =====

// Category filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('href').split('/').pop();
            
            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'blog' || selectedCategory === cardCategory) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update URL without page reload
            if (selectedCategory !== 'blog') {
                history.pushState(null, '', `/blog/category/${selectedCategory}`);
            } else {
                history.pushState(null, '', '/blog');
            }
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const path = window.location.pathname;
        const category = path.split('/').pop();
        
        // Update active button
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href').includes(category)) {
                btn.classList.add('active');
            }
        });
        
        // Filter cards accordingly
        blogCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'blog' || category === cardCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Blog card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
        });
    });
});

// Search functionality for blog
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.blog-search input');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            blogCards.forEach(card => {
                const title = card.querySelector('.blog-title').textContent.toLowerCase();
                const excerpt = card.querySelector('.blog-excerpt').textContent.toLowerCase();
                const category = card.querySelector('.blog-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Lazy loading for blog images
document.addEventListener('DOMContentLoaded', function() {
    const blogImages = document.querySelectorAll('.blog-image');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
                observer.unobserve(img);
            }
        });
    });
    
    blogImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        imageObserver.observe(img);
    });
});

// Add CSS animation for fadeIn
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .blog-card {
        animation: fadeIn 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);