/**
 * Livara Health - Centralized Animation System
 * Using AOS (Animate On Scroll) Library
 */

(function() {
    'use strict';

    const AnimationConfig = {
        // AOS Initialization Settings
        aosSettings: {
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0
        },

        // Animation types available
        animations: {
            // Fade animations
            'fade-up': 'fade-up',
            'fade-down': 'fade-down',
            'fade-left': 'fade-left',
            'fade-right': 'fade-right',
            'fade-up-left': 'fade-up-left',
            'fade-up-right': 'fade-up-right',
            'fade-down-left': 'fade-down-left',
            'fade-down-right': 'fade-down-right',

            // Zoom animations
            'zoom-in': 'zoom-in',
            'zoom-in-up': 'zoom-in-up',
            'zoom-in-down': 'zoom-in-down',
            'zoom-in-left': 'zoom-in-left',
            'zoom-in-right': 'zoom-in-right',
            'zoom-out': 'zoom-out',
            'zoom-out-up': 'zoom-out-up',
            'zoom-out-down': 'zoom-out-down',
            'zoom-out-left': 'zoom-out-left',
            'zoom-out-right': 'zoom-out-right',

            // Flip animations
            'flip-left': 'flip-left',
            'flip-right': 'flip-right',
            'flip-up': 'flip-up',
            'flip-down': 'flip-down',

            // Slide animations
            'slide-up': 'slide-up',
            'slide-down': 'slide-down',
            'slide-left': 'slide-left',
            'slide-right': 'slide-right',

            // Special animations
            'rotate': 'rotate',
            'fade-rotate-up': 'fade-rotate-up',
            'fade-rotate-down': 'fade-rotate-down'
        },

        // Stagger delays for groups (in ms)
        staggerDelays: {
            'stagger-100': 100,
            'stagger-150': 150,
            'stagger-200': 200,
            'stagger-250': 250,
            'stagger-300': 300,
            'stagger-400': 400,
            'stagger-500': 500
        }
    };

    // Load AOS CSS and JS from CDN
    function loadAOS() {
        return new Promise(function(resolve, reject) {
            if (window.AOS) {
                resolve();
                return;
            }

            // Load AOS CSS
            const aosCss = document.createElement('link');
            aosCss.rel = 'stylesheet';
            aosCss.href = 'https://unpkg.com/aos@2.3.4/dist/aos.css';
            document.head.appendChild(aosCss);

            // Load AOS JS
            const aosJs = document.createElement('script');
            aosJs.src = 'https://unpkg.com/aos@2.3.4/dist/aos.js';
            aosJs.onload = resolve;
            aosJs.onerror = reject;
            document.body.appendChild(aosJs);
        });
    }

    // Initialize animations
    function init() {
        loadAOS().then(function() {
            AOS.init(AnimationConfig.aosSettings);
            
            // Re-initialize on window resize
            window.addEventListener('resize', function() {
                AOS.refresh();
            });

            console.log('Livara Animations initialized');
        }).catch(function(err) {
            console.error('Failed to load AOS:', err);
        });
    }

    // Helper to add animation class to element
    window.LivaraAnimations = {
        init: init,
        
        // Apply animation to element
        animate: function(element, animation, delay, duration) {
            if (typeof element === 'string') {
                element = document.querySelector(element);
            }
            if (!element) return;

            element.setAttribute('data-aos', animation);
            if (delay) element.setAttribute('data-aos-delay', delay);
            if (duration) element.setAttribute('data-aos-duration', duration);
            
            AOS.refreshHard();
        },

        // Apply staggered animations to multiple elements
        stagger: function(elements, animation, staggerDelay) {
            if (typeof elements === 'string') {
                elements = document.querySelectorAll(elements);
            }
            
            elements.forEach(function(el, index) {
                el.setAttribute('data-aos', animation);
                el.setAttribute('data-aos-delay', index * staggerDelay);
            });
            
            AOS.refreshHard();
        },

        // Refresh animations
        refresh: function() {
            AOS.refresh();
        },

        // Get available animations
        getAnimations: function() {
            return AnimationConfig.animations;
        }
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
