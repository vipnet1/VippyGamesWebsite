document.addEventListener("DOMContentLoaded", function() {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // This listener will close all menus when the user returns to the page
    // from another site (e.g., by using the browser's back button).
    window.addEventListener('pageshow', function(event) {
        // Check if the page is being loaded from the browser's cache
        if (event.persisted) {
            navLinks.classList.remove('active');
            document.querySelectorAll('.dropdown-content.show').forEach(openDropdown => {
                openDropdown.classList.remove('show');
            });
        }
    });

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active') && !item.classList.contains('dropdown-toggle')) {
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
            const targetUrl = new URL(this.href, window.location.href);

            if (targetUrl.hostname === window.location.hostname && targetUrl.pathname === window.location.pathname) {
                e.preventDefault();

                const targetId = targetUrl.hash;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            
            const parentDropdownContent = this.closest('.dropdown-content');
            if (parentDropdownContent) {
                parentDropdownContent.classList.remove('show');
            }
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
});