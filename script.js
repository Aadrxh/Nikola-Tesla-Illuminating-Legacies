function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        const colors = ['#00ffff', '#ff00ff', '#ffd700', '#00ff00'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        particlesContainer.appendChild(particle);
    }
}

// Scroll animation observer
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Theme toggle functionality
let isDarkTheme = true;
function toggleTheme() {
    const root = document.documentElement;
    const button = document.querySelector('.theme-toggle');
    
    if (isDarkTheme) {
        // Currently dark theme — switch to light theme
        root.style.setProperty('--primary-color', '#f8f9fa');
        root.style.setProperty('--secondary-color', '#e9ecef');
        root.style.setProperty('--accent-color', '#dee2e6');
        root.style.setProperty('--text-light', '#212529');
        root.style.setProperty('--text-dark', '#495057');
        button.innerHTML = '🌙 Dark Theme';  // next theme to switch to
        document.body.style.color = '#212529';
    } else {
        // Currently light theme — switch to dark theme
        root.style.setProperty('--primary-color', '#1a1a2e');
        root.style.setProperty('--secondary-color', '#16213e');
        root.style.setProperty('--accent-color', '#0f3460');
        root.style.setProperty('--text-light', '#ffffff');
        root.style.setProperty('--text-dark', '#333333');
        button.innerHTML = '☀️ Light Theme';  // next theme to switch to
        document.body.style.color = '#ffffff';
    }
    isDarkTheme = !isDarkTheme;
}


function smoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

function addInteractiveEffects() {
    const interactiveElements = document.querySelectorAll('.timeline-event, .sticky-note, #qualities li, #ending li');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        const headerImage = document.querySelector('.header-image img');
        
        if (header && scrolled < window.innerHeight) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
            if (headerImage) {
                headerImage.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
            }
        }
    });
}

function addTypingEffect() {
    const subtitle = document.querySelector('.header-text p');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        subtitle.textContent += text.charAt(i);
        i++;
        if (i > text.length) {
            clearInterval(typeInterval);
        }
    }, 50);
}

function observeStickyNotes() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.sticky-note').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    setupScrollAnimations();
    observeStickyNotes();
    smoothScroll();
    addInteractiveEffects();
    addParallaxEffect();
    setTimeout(addTypingEffect, 1000);
    
    const timelineEvents = document.querySelectorAll('.timeline-event');
    timelineEvents.forEach((event, index) => {
        event.style.animationDelay = `${index * 0.1}s`;
    });
    const stickyNotes = document.querySelectorAll('.sticky-note');
    stickyNotes.forEach((note, index) => {
        note.style.animationDelay = `${index * 0.1}s`;
        note.classList.add('fade-in-on-scroll');
    });
});

document.addEventListener('click', function(e) {
    if (e.target.closest('.header-image img')) {
        const img = e.target.closest('.header-image img');
        img.style.animation = 'none';
        img.offsetHeight;
        img.style.animation = 'rotate 2s linear infinite, pulse 0.5s ease-in-out 3 alternate';
        
        // Create electric effect
        const spark = document.createElement('div');
        spark.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #00ffff;
            border-radius: 50%;
            box-shadow: 0 0 20px #00ffff;
            pointer-events: none;
            z-index: 1000;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: sparkle 1s ease-out forwards;
        `;
        
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 1000);
    }
});