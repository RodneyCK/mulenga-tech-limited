/* =========================
   NAVBAR ELEMENTS
========================= */

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

/* =========================
   MOBILE MENU TOGGLE
========================= */

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

/* CLOSE MENU ON LINK CLICK */
navItems.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

/* =========================
   NAVBAR SHRINK ON SCROLL
========================= */

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

/* =========================
   ACTIVE SECTION SCROLL SPY
========================= */

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
});

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const el = entry.target;

        // BASE ANIMATION
        if (el.classList.contains("hidden")) {
            el.classList.add("show");
        }

        // SCALE ANIMATION
        if (el.classList.contains("hidden-scale")) {
            el.classList.add("show-scale");
        }

        // LEFT / RIGHT ANIMATION
        if (el.classList.contains("hidden-left")) {
            el.classList.add("show-left");
        }

        if (el.classList.contains("hidden-right")) {
            el.classList.add("show-right");
        }

        observer.unobserve(el);

    });

}, {
    threshold: 0.15
});

const animatedElements = document.querySelectorAll(
    ".hidden, .hidden-scale, .hidden-left, .hidden-right"
);

animatedElements.forEach(el => observer.observe(el));

/* =========================
   PHASE 2 CINEMATIC SYSTEM
========================= */

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    /* 1. PARALLAX SHIFT (TEXT MOVES OPPOSITE DIRECTION) */
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
    }

    /* 2. HERO COMPRESSION EFFECT */
    if (hero) {
        const scale = Math.max(1 - scrollY / 1200, 0.92);
        hero.style.transform = `scale(${scale})`;
    }
});

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.getAttribute("data-target");

        let count = 0;
        const speed = 120;

        const updateCounter = () => {
            const increment = target / speed;

            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        };

        updateCounter();
        counterObserver.unobserve(counter);
    });
}, {
    threshold: 0.6
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});