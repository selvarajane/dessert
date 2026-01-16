// DOM Elements
const logo = document.getElementById('logo');
const dessertsLink = document.getElementById('dessertsLink');
const dessertsDropdown = document.getElementById('dessertsDropdown');
const dropdown = document.querySelector('.dropdown');
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contactForm');
const loginForm = document.getElementById('loginForm');

// Pages
const landingPage = document.getElementById('landingPage');
const aboutPage = document.getElementById('aboutPage');
const allDessertsPage = document.getElementById('allDessertsPage');
const browniesPage = document.getElementById('browniesPage');
const combosPage = document.getElementById('combosPage');
const cupCakePage = document.getElementById('cupCakePage');
const jarCakePage = document.getElementById('jarCakePage');
const pastriesPage = document.getElementById('pastriesPage');
const tartsPage = document.getElementById('tartsPage');
const teaCakePage = document.getElementById('teaCakePage');
const contactPage = document.getElementById('contactPage');

// Logo click - Refresh/Show landing page
logo.addEventListener('click', () => {
    showPage('landing');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Desserts dropdown toggle
dessertsLink.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Navigation links
document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        
        // Close dropdown if open
        dropdown.classList.remove('active');
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        
        // Navigate to page
        showPage(page);
    });
});

// Show specific page
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    let targetPage = null;
    
    switch(pageName) {
        case 'landing':
            targetPage = landingPage;
            break;
        case 'about':
            targetPage = aboutPage;
            break;
        case 'all-desserts':
            targetPage = allDessertsPage;
            break;
        case 'brownies':
            targetPage = browniesPage;
            break;
        case 'combos':
            targetPage = combosPage;
            break;
        case 'cup-cake':
            targetPage = cupCakePage;
            break;
        case 'jar-cake':
            targetPage = jarCakePage;
            break;
        case 'pastries':
            targetPage = pastriesPage;
            break;
        case 'tarts':
            targetPage = tartsPage;
            break;
        case 'tea-cake':
            targetPage = teaCakePage;
            break;
        case 'contact':
            targetPage = contactPage;
            break;
    }
    
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Restart carousel if landing page is shown
        if (pageName === 'landing') {
            setTimeout(() => {
                initCarousel();
                setupCarouselEvents();
            }, 100);
        } else {
            // Stop carousel when on other pages
            stopAutoSlide();
        }
    }
}

// Login/Sign Up Modal
loginBtn.addEventListener('click', () => {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

closeModal.addEventListener('click', () => {
    loginModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close modal when clicking outside
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal.classList.contains('active')) {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value,
        city: document.getElementById('city').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for contacting us! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    
    // Here you would typically send OTP request to server
    console.log('OTP requested for:', email);
    
    // Show success message
    alert('OTP has been sent to your email!');
    
    // Close modal
    loginModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form
    loginForm.reset();
});

// Order Online buttons
document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', () => {
        // Check if user is logged in (you can implement this check)
        // For now, just show a message
        alert('Please log in to place an order.');
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// CTA Order Online button
document.querySelector('.cta-button')?.addEventListener('click', () => {
    showPage('all-desserts');
});

// Product category clicks
document.querySelectorAll('.product-category').forEach(category => {
    category.addEventListener('click', () => {
        showPage('all-desserts');
    });
});

// Combo card clicks
document.querySelectorAll('.combo-card').forEach(card => {
    card.addEventListener('click', () => {
        showPage('all-desserts');
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value.toLowerCase();
        
        // If on all desserts page, filter products
        if (allDessertsPage.classList.contains('active')) {
            filterDesserts(searchTerm);
        } else {
            // Otherwise, navigate to all desserts and search
            showPage('all-desserts');
            setTimeout(() => {
                filterDesserts(searchTerm);
            }, 100);
        }
    }
});

// Filter desserts function
function filterDesserts(searchTerm) {
    const dessertCards = document.querySelectorAll('.dessert-card');
    let found = false;
    
    dessertCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    if (!found && searchTerm) {
        alert('No desserts found matching your search.');
        // Show all desserts again
        dessertCards.forEach(card => {
            card.style.display = 'block';
        });
    }
}

// Initialize - Show landing page on load
window.addEventListener('load', () => {
    showPage('landing');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Carousel Functionality
let carouselSlides = [];
let dots = [];
let prevBtn, nextBtn;
let currentSlide = 0;
let autoSlideInterval;

// Function to initialize carousel elements
function initCarousel() {
    carouselSlides = document.querySelectorAll('.carousel-slide');
    dots = document.querySelectorAll('.dot');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    
    if (carouselSlides.length > 0) {
        showSlide(0);
        startAutoSlide();
    }
}

// Function to show specific slide
function showSlide(index) {
    // Remove active class from all slides and dots
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (carouselSlides[index]) {
        carouselSlides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlide = index;
}

// Function to go to next slide
function nextSlide() {
    if (carouselSlides.length > 0) {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }
}

// Function to go to previous slide
function prevSlide() {
    if (carouselSlides.length > 0) {
        currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
        showSlide(currentSlide);
    }
}

// Auto-slide functionality
function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    if (carouselSlides.length > 0) {
        autoSlideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Event listeners for navigation buttons
function setupCarouselEvents() {
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// Initialize carousel when page loads
window.addEventListener('load', () => {
    initCarousel();
    setupCarouselEvents();
});

