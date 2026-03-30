document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTop = document.getElementById('back-to-top');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (nav) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 100) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Fix dropdown menu - prevent gap from closing dropdown
    const dropdownTriggers = document.querySelectorAll('.group');
    
    dropdownTriggers.forEach(function(dropdown) {
        const content = dropdown.querySelector('.group-hover');
        
        if (content) {
            // Add padding extension to prevent gap from closing dropdown
            dropdown.style.paddingBottom = '0px';
            
            // Use mouseenter/mouseleave for better control
            dropdown.addEventListener('mouseenter', function() {
                content.classList.remove('invisible', 'opacity-0');
                content.classList.add('visible', 'opacity-100');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                content.classList.add('invisible', 'opacity-0');
                content.classList.remove('visible', 'opacity-100');
            });
        }
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => observer.observe(counter));
    }

    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-content').classList.remove('hidden');
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-content').classList.add('hidden');
        });
    });

    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown > a');
    
    mobileDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            const content = this.nextElementSibling;
            if (content) {
                content.classList.toggle('hidden');
            }
        });
    });

    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const forms = document.querySelectorAll('form[data-ajax]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            if (submitBtn) {
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
            }

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
                
                this.reset();
                
                alert('Thank you! Your submission has been received.');
            }, 1500);
        });
    });

    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(c => c.classList.add('hidden'));
            
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
        });
    });

    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = !content.classList.contains('hidden');
            
            const allContents = document.querySelectorAll('.accordion-content');
            allContents.forEach(c => c.classList.add('hidden'));
            
            if (!isOpen) {
                content.classList.remove('hidden');
            }
        });
    });

    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;
        
        slider.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDragging = false;
        });
        
        slider.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

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

    const handleResize = debounce(() => {
        if (window.innerWidth > 1024) {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    console.log('Livara Health website loaded successfully');
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

window.addEventListener('beforeunload', function() {
    document.body.classList.remove('loaded');
});
