document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const scrollTop = document.getElementById('scrollTop');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show/Hide Scroll to Top button
        if (window.scrollY > 500) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth Scroll to Top
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Table of Contents functionality for blog detail
    const tocToggle = document.querySelector('.toc-toggle');
    const tocContent = document.querySelector('.toc-content');
    if (tocToggle && tocContent) {
        tocToggle.addEventListener('click', () => {
            tocContent.style.display = tocContent.style.display === 'none' ? 'block' : 'none';
            tocToggle.querySelector('i').classList.toggle('fa-chevron-up');
            tocToggle.querySelector('i').classList.toggle('fa-chevron-down');
        });
    }

    // Auto generate TOC if on blog detail
    const tocList = document.querySelector('.toc-list');
    const articleHeadings = document.querySelectorAll('.article-body h2, .article-body h3');
    if (tocList && articleHeadings.length > 0) {
        articleHeadings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            const li = document.createElement('li');
            li.style.marginLeft = heading.tagName === 'H3' ? '20px' : '0';
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(id);
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
            li.appendChild(a);
            tocList.appendChild(li);
        });
    }
});
