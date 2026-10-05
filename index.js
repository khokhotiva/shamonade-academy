const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');


// ========================================
// MOBILE NAVIGATION
// ========================================

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});


// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

const revealElements = document.querySelectorAll(
    '.section-title, .about-text, .about-image, .service-card, .gallery-item, .location-card, .contact-card'
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    element.classList.add('reveal-element');
    revealObserver.observe(element);
});


// ========================================
// STAGGER SERVICE CARDS
// ========================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 100}ms`;
});


// ========================================
// STAGGER GALLERY IMAGES
// ========================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 80}ms`;
});


// ========================================
// SCROLL PARALLAX
// ========================================

const floatingElements = document.querySelectorAll(
    '.floating-butterfly, .floating-letter, .floating-number, .floating-animal'
);

let ticking = false;

function updateParallax() {
    const scrollPosition = window.scrollY;

    floatingElements.forEach((element, index) => {
        const speed = 0.08 + (index % 4) * 0.025;
        const direction = index % 2 === 0 ? 1 : -1;

        element.style.transform =
            `translate3d(0, ${scrollPosition * speed * direction}px, 0)`;
    });

    ticking = false;
}

window.addEventListener(
    'scroll',
    () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    },
    { passive: true }
);


// ========================================
// FLOATING ELEMENTS
// ========================================

floatingElements.forEach((element, index) => {
    const duration = 5 + (index % 5);
    const delay = (index % 4) * 0.7;

    element.style.animationDuration = `${duration}s`;
    element.style.animationDelay = `${delay}s`;
});


// ========================================
// IMAGE REVEAL
// ========================================

const images = document.querySelectorAll(
    '.about-image img, .service-card img, .gallery-item img'
);

const imageObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('image-visible');
                imageObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2
    }
);

images.forEach((image) => {
    image.classList.add('image-reveal');
    imageObserver.observe(image);
});


// ========================================
// HERO FLOATING MOVEMENT
// ========================================

const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener(
        'scroll',
        () => {
            const scrollPosition = window.scrollY;

            if (scrollPosition < window.innerHeight) {
                hero.style.backgroundPosition =
                    `center ${50 + scrollPosition * 0.03}%`;
            }
        },
        { passive: true }
    );
}


// ========================================
// SCROLL PROGRESS BAR
// ========================================

const progressBar = document.createElement('div');

progressBar.className = 'scroll-progress';

document.body.appendChild(progressBar);

function updateScrollProgress() {
    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    progressBar.style.width = `${progress}%`;
}

window.addEventListener(
    'scroll',
    updateScrollProgress,
    { passive: true }
);

updateScrollProgress();


// ========================================
// REDUCED MOTION SUPPORT
// ========================================

const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
);

if (prefersReducedMotion.matches) {
    floatingElements.forEach((element) => {
        element.style.animation = 'none';
        element.style.transform = 'none';
    });
}