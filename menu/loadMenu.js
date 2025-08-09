function setupMenu() {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            event.preventDefault();
            const dropdownContent = this.nextElementSibling;

            document.querySelectorAll('.dropdown-content.show').forEach(openDropdown => {
                if (openDropdown !== dropdownContent) {
                    openDropdown.classList.remove('show');
                }
            });

            dropdownContent.classList.toggle('show');
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.dropdown') && !event.target.closest('.hamburger-menu')) {
            navLinks.classList.remove('active');
            document.querySelectorAll('.dropdown-content.show').forEach(openDropdown => {
                openDropdown.classList.remove('show');
            });
        }
    });

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('https://vippy.games/menu/menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-placeholder').innerHTML = data;
            setupMenu();
        })
});