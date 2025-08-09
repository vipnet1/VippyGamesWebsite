document.addEventListener("DOMContentLoaded", function() {
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
            // Get the full URL from the link's href attribute
            const targetUrl = new URL(this.href, window.location.href);

            // Check if the link is for the current page
            if (targetUrl.hostname === window.location.hostname && targetUrl.pathname === window.location.pathname) {
                // Prevent the default navigation
                e.preventDefault();

                // Get the target element's ID from the URL hash
                const targetId = targetUrl.hash;
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            
            // Hide the dropdown and the main menu after clicking the link
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