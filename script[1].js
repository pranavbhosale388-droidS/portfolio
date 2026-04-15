'use strict';

// ========================================
// CONFIG
// ========================================

const CONFIG = {
    preloaderDelay: 1500,
    typingSpeed: 100,
    scrollAnimationDelay: 100,
    debounceDelay: 250,
};

const PROJECTS_DATA = [
    {
        id: 0,
        title: "Clap Switch using 555 IC",
        description: "Intelligent analog circuit for sound detection",
        fullDescription: `<h3>Clap Switch using 555 IC</h3>
            <p>An intelligent analog circuit that detects and responds to sound claps using the NE555 timer IC.</p>
            <h4>Features:</h4>
            <ul><li>Sound detection using microphone</li>
            <li>NE555 timer IC for timing control</li>
            <li>Relay-based switching</li>
            <li>Adjustable sensitivity</li></ul>
            <h4>Technologies:</h4>
            <ul><li>555 Timer IC</li>
            <li>Analog Circuits</li>
            <li>PCB Design</li></ul>`
    },
    {
        id: 1,
        title: "IoT Smart Automation System",
        description: "Comprehensive IoT solution with ESP32",
        fullDescription: `<h3>IoT Smart Automation System</h3>
            <p>A complete IoT ecosystem for smart home and industrial automation.</p>
            <h4>Features:</h4>
            <ul><li>ESP32-based IoT device</li>
            <li>MQTT protocol for communication</li>
            <li>Real-time sensor monitoring</li>
            <li>Mobile app integration</li></ul>
            <h4>Technologies:</h4>
            <ul><li>ESP32</li>
            <li>MQTT Protocol</li>
            <li>AWS IoT</li></ul>`
    },
    {
        id: 2,
        title: "Embedded Systems Projects",
        description: "Advanced ARM microcontroller programming",
        fullDescription: `<h3>Embedded Systems Projects</h3>
            <p>Collection of advanced embedded systems projects.</p>
            <h4>Includes:</h4>
            <ul><li>ARM Cortex-M4 firmware</li>
            <li>Real-time OS implementation</li>
            <li>Device driver development</li>
            <li>Sensor integration</li></ul>
            <h4>Technologies:</h4>
            <ul><li>ARM Cortex</li>
            <li>FreeRTOS</li>
            <li>STM32</li></ul>`
    }
];

// ========================================
// DOM ELEMENTS
// ========================================

const preloader = document.getElementById('preloader');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const projectModal = document.getElementById('projectModal');
const heroStars = document.getElementById('heroStars');
const typingElement = document.getElementById('typingText');

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Pranav Bhosale Portfolio Loaded');
    initializeApp();
});

function initializeApp() {
    hidePreloader();
    initializeNavigation();
    initializeTypingAnimation();
    initializeScrollAnimations();
    initializeFormHandling();
    initializeEventListeners();
    createHeroStars();
    setupScrollspy();
}

// ========================================
// PRELOADER
// ========================================

function hidePreloader() {
    setTimeout(() => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.pointerEvents = 'none';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    }, CONFIG.preloaderDelay);
}

// ========================================
// NAVIGATION
// ========================================

function initializeNavigation() {
    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.style.background = 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.9) 100%)';
        } else {
            navbar.style.background = 'linear-gradient(180deg, rgba(15, 23, 42, 0.97) 0%, rgba(15, 23, 42, 0.85) 100%)';
        }
    });
}

// ========================================
// TYPING ANIMATION
// ========================================

function initializeTypingAnimation() {
    const text = 'Pranav Bhosale';
    let index = 0;

    typingElement.textContent = '';

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, CONFIG.typingSpeed);
        }
    }

    setTimeout(type, 500);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                if (entry.target.classList.contains('progress-fill')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// SCROLLSPY
// ========================================

function setupScrollspy() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', debounce(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }, CONFIG.debounceDelay));
}

// ========================================
// FORM HANDLING
// ========================================

function initializeFormHandling() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission();
        });
    }

    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function handleFormSubmission() {
    const nameField = document.getElementById('fullName');
    const emailField = document.getElementById('emailAddress');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    let isValid = true;

    isValid &= validateField(nameField);
    isValid &= validateField(emailField);
    isValid &= validateField(subjectField);
    isValid &= validateField(messageField);

    if (!isValid) return;

    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.name;
    let isValid = true;

    clearFieldError(field);

    if (fieldType === 'fullName') {
        if (value.length < 2) {
            showFieldError(field, 'Name must be at least 2 characters');
            isValid = false;
        }
    } else if (fieldType === 'emailAddress') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email');
            isValid = false;
        }
    } else if (fieldType === 'subject') {
        if (value.length < 3) {
            showFieldError(field, 'Subject must be at least 3 characters');
            isValid = false;
        }
    } else if (fieldType === 'message') {
        if (value.length < 10) {
            showFieldError(field, 'Message must be at least 10 characters');
            isValid = false;
        }
    }

    return isValid;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        field.style.borderColor = 'var(--danger-color)';
    }
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    field.style.borderColor = '';
}

// ========================================
// NOTIFICATIONS
// ========================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
        color: white;
        font-weight: 600;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: var(--shadow-lg);
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// PROJECT MODAL
// ========================================

window.openProjectModal = function(projectId) {
    const project = PROJECTS_DATA[projectId];
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = project.fullDescription;
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// ========================================
// HERO STARS
// ========================================

function createHeroStars() {
    if (!heroStars) return;

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;

        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${Math.random() * 0.7 + 0.3};
            animation: twinkle ${duration}s ease-in-out infinite;
        `;

        heroStars.appendChild(star);
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

function initializeEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            themeToggle.style.transform = 'rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
    @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

console.log('%c🎉 Pranav Bhosale Portfolio', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cLinkedIn: https://linkedin.com/in/pranav-bhosale-496267346', 'color: #10b981; font-size: 12px;');