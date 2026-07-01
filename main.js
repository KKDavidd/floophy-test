let lastScrollY = window.scrollY;
const navbar = document.querySelector('nav');
const navLinks = document.getElementById('nav-links');
const menuBtn = document.getElementById('menu-btn');
const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (lastScrollY < window.scrollY) {
        navbar.classList.add('nav-hidden');
        if (navLinks && window.innerWidth <= 900 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuIcon) menuIcon.classList.replace('bi-x-lg', 'bi-list');
        }
    } else {
        navbar.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
});

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            if (menuIcon) menuIcon.classList.replace('bi-list', 'bi-x-lg');
        } else {
            if (menuIcon) menuIcon.classList.replace('bi-x-lg', 'bi-list');
        }
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && window.innerWidth <= 900) {
            navLinks.classList.remove('active');
            if (menuIcon) menuIcon.classList.replace('bi-x-lg', 'bi-list');
        }
    });
});
