// ===== AJÉ THE REALEST - SPECTACULAR WEBSITE JAVASCRIPT ===== //

// ===== CONFIGURATION =====
const CONFIG = {
    ANIMATION_DURATION: {
        fast: 200,
        normal: 400,
        slow: 800
    },
    SCROLL_OFFSET: 80,
    MOBILE_BREAKPOINT: 768,
    LOADING_DURATION: 2500
};

// ===== UTILITY FUNCTIONS =====
class Utils {
    static throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    static debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    static isMobile() {
        return window.innerWidth < CONFIG.MOBILE_BREAKPOINT;
    }

    static getScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        return Math.min(scrollTop / docHeight, 1);
    }

    static animateValue(obj, start, end, duration, callback) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            callback(value);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

// ===== LOADING SCREEN =====
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.init();
    }

    init() {
        // Add epic loading sound effect simulation
        this.addLoadingEffects();
        
        // Hide loading screen after duration
        setTimeout(() => {
            this.hideLoadingScreen();
        }, CONFIG.LOADING_DURATION);
    }

    addLoadingEffects() {
        const loadingLogo = document.querySelector('.loading-logo');
        const loadingText = document.querySelector('.loading-text');
        
        // Add dramatic entrance
        setTimeout(() => {
            loadingLogo.style.transform = 'scale(1.2)';
            loadingLogo.style.filter = 'drop-shadow(0 0 50px rgba(255, 107, 53, 0.8))';
        }, 500);

        setTimeout(() => {
            loadingText.style.opacity = '1';
            loadingText.style.transform = 'translateY(0)';
        }, 1000);
    }

    hideLoadingScreen() {
        this.loadingScreen.classList.add('hidden');
        
        // Enable scrolling
        document.body.style.overflow = 'visible';
        
        // Trigger entrance animations
        setTimeout(() => {
            this.triggerEntranceAnimations();
        }, 500);
    }

    triggerEntranceAnimations() {
        // Hero elements entrance
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-buttons');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// ===== NAVIGATION =====
class Navigation {
    constructor() {
        this.nav = document.getElementById('nav');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupActiveLink();
    }

    setupScrollEffect() {
        const scrollHandler = Utils.throttle(() => {
            const scrollY = window.pageYOffset;
            
            if (scrollY > 50) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }
        }, 16);

        window.addEventListener('scroll', scrollHandler);
    }

    setupMobileMenu() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking on links
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.nav.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    }

    closeMobileMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = 'visible';
    }

    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - CONFIG.SCROLL_OFFSET;
                    this.smoothScrollTo(offsetTop);
                }
            });
        });
    }

    smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    setupActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        
        const scrollHandler = Utils.throttle(() => {
            const scrollPosition = window.pageYOffset + CONFIG.SCROLL_OFFSET + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        }, 100);

        window.addEventListener('scroll', scrollHandler);
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupCountUpAnimations();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('stat-card')) {
                        this.animateStatCard(entry.target);
                    }
                    
                    if (entry.target.classList.contains('platform-card')) {
                        this.animatePlatformCard(entry.target);
                    }
                }
            });
        }, this.observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll(`
            .stat-card,
            .platform-card,
            .concert-info,
            .concert-visual,
            .about-visual,
            .about-info,
            .social-link,
            .feature
        `);

        animatedElements.forEach(el => {
            // Set initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            observer.observe(el);
        });
    }

    animateStatCard(card) {
        const statNumber = card.querySelector('.stat-number');
        const finalValue = statNumber.textContent;
        
        // Extract number from text (e.g., "88K+" -> 88)
        const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
        const suffix = finalValue.replace(/[0-9]/g, '');
        
        // Animate count up
        Utils.animateValue(card, 0, numericValue, 1500, (value) => {
            statNumber.textContent = value + suffix;
        });
    }

    animatePlatformCard(card) {
        // Staggered entrance animation
        const delay = Array.from(card.parentNode.children).indexOf(card) * 150;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, delay);
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-image-container, .concert-visual');
        
        const scrollHandler = Utils.throttle(() => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            parallaxElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrollY;
                const elementVisible = (scrollY + windowHeight) > elementTop && scrollY < (elementTop + rect.height);
                
                if (elementVisible) {
                    const yPos = -(scrollY - elementTop) * 0.1;
                    element.style.transform = `translateY(${yPos}px)`;
                }
            });
        }, 16);

        window.addEventListener('scroll', scrollHandler);
    }

    setupCountUpAnimations() {
        // Additional count up animations for stats
        const observeCountUp = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    this.startCountUp(entry.target);
                }
            });
        });

        document.querySelectorAll('.stat-number').forEach(el => {
            observeCountUp.observe(el);
        });
    }

    startCountUp(element) {
        const finalText = element.textContent;
        const numericValue = parseInt(finalText.replace(/[^0-9]/g, ''));
        const suffix = finalText.replace(/[0-9]/g, '');
        
        if (numericValue > 0) {
            element.textContent = '0' + suffix;
            
            Utils.animateValue(element, 0, numericValue, 2000, (value) => {
                element.textContent = value + suffix;
            });
        }
    }
}

// ===== INTERACTIVE EFFECTS =====
class InteractiveEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupButtonEffects();
        this.setupCardHoverEffects();
        this.setupMagneticEffects();
        this.setupTouchEffects();
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Add ripple effect on click
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });

            // Add magnetic effect on hover
            button.addEventListener('mousemove', (e) => {
                if (!Utils.isMobile()) {
                    this.magneticEffect(e, button);
                }
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(${x}px, ${y}px) scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    magneticEffect(event, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (event.clientX - centerX) * 0.1;
        const deltaY = (event.clientY - centerY) * 0.1;
        
        element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.platform-card, .stat-card, .social-link');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addGlowEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeGlowEffect(card);
            });
        });
    }

    addGlowEffect(element) {
        const glow = document.createElement('div');
        glow.className = 'hover-glow';
        glow.style.cssText = `
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, rgba(124, 77, 255, 0.3), rgba(255, 107, 53, 0.3));
            border-radius: inherit;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        element.style.position = 'relative';
        element.appendChild(glow);
        
        setTimeout(() => {
            glow.style.opacity = '1';
        }, 10);
    }

    removeGlowEffect(element) {
        const glow = element.querySelector('.hover-glow');
        if (glow) {
            glow.style.opacity = '0';
            setTimeout(() => {
                glow.remove();
            }, 300);
        }
    }

    setupMagneticEffects() {
        const magneticElements = document.querySelectorAll('.hero-image, .concert-image');
        
        magneticElements.forEach(element => {
            if (!Utils.isMobile()) {
                element.addEventListener('mousemove', (e) => {
                    const rect = element.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const deltaX = (e.clientX - centerX) * 0.05;
                    const deltaY = (e.clientY - centerY) * 0.05;
                    
                    element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
                });
                
                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'translate(0, 0) scale(1)';
                });
            }
        });
    }

    setupTouchEffects() {
        if (Utils.isMobile()) {
            const touchElements = document.querySelectorAll('.btn, .platform-card, .social-link');
            
            touchElements.forEach(element => {
                element.addEventListener('touchstart', () => {
                    element.classList.add('touch-active');
                    element.style.transform = 'scale(0.98)';
                });
                
                element.addEventListener('touchend', () => {
                    element.classList.remove('touch-active');
                    element.style.transform = 'scale(1)';
                });
            });
        }
    }
}

// ===== PERFORMANCE OPTIMIZER =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
        this.preloadCriticalAssets();
        this.setupReducedMotion();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }

    optimizeAnimations() {
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const animatedElements = document.querySelectorAll('[class*="animation"], [class*="pulse"], [class*="float"]');
            
            if (document.hidden) {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            } else {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        });
    }

    preloadCriticalAssets() {
        const criticalImages = [
            '1900x1900-000000-80-0-0.jpg',
            'Concert.jpeg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    setupReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.classList.add('reduce-motion');
        }
    }
}

// ===== AUDIO VISUALIZER (SIMULATED) =====
class AudioVisualizer {
    constructor() {
        this.init();
    }

    init() {
        this.createVisualizerBars();
        this.startVisualization();
    }

    createVisualizerBars() {
        // Add subtle audio bars to music section
        const musicSection = document.querySelector('.music');
        if (!musicSection) return;

        const visualizer = document.createElement('div');
        visualizer.className = 'audio-visualizer';
        visualizer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            opacity: 0.1;
            pointer-events: none;
            z-index: 1;
        `;

        for (let i = 0; i < 50; i++) {
            const bar = document.createElement('div');
            bar.style.cssText = `
                width: 2px;
                height: 10px;
                background: linear-gradient(to top, var(--orange-fire), var(--purple-bright));
                margin: 0 1px;
                border-radius: 2px;
                transition: height 0.3s ease;
            `;
            visualizer.appendChild(bar);
        }

        musicSection.style.position = 'relative';
        musicSection.appendChild(visualizer);
        this.visualizerBars = visualizer.querySelectorAll('div');
    }

    startVisualization() {
        if (!this.visualizerBars) return;

        setInterval(() => {
            this.visualizerBars.forEach(bar => {
                const height = Math.random() * 100 + 10;
                bar.style.height = height + 'px';
            });
        }, 200);
    }
}

// ===== EASTER EGG =====
class EasterEgg {
    constructor() {
        this.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
        this.userInput = [];
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            this.userInput.push(e.keyCode);
            
            if (this.userInput.length > this.konamiCode.length) {
                this.userInput.shift();
            }
            
            if (this.arraysEqual(this.userInput, this.konamiCode)) {
                this.activateEasterEgg();
            }
        });
    }

    arraysEqual(a, b) {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }

    activateEasterEgg() {
        // Epic effect when Konami code is entered
        document.body.style.animation = 'rainbow 2s ease infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Show message
        const message = document.createElement('div');
        message.textContent = '🎵 AJÉ THE REALEST MODE ACTIVATED! 🔥';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--gradient-accent);
            color: white;
            padding: 2rem;
            border-radius: 20px;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 10000;
            animation: pulse-glow 1s infinite;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.style.animation = '';
            message.remove();
            style.remove();
        }, 5000);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 AJÉ THE REALEST - Website Loading...');
    
    // Initialize all components
    new LoadingScreen();
    new Navigation();
    new ScrollAnimations();
    new InteractiveEffects();
    new PerformanceOptimizer();
    new AudioVisualizer();
    new EasterEgg();
    
    // Add CSS animations for enhanced interactions
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes ripple {
            0% {
                transform: translate(var(--x), var(--y)) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(var(--x), var(--y)) scale(4);
                opacity: 0;
            }
        }
        
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .reduce-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(additionalStyles);
    
    console.log('🔥 Website initialized successfully!');
    console.log(`
    🎤 AJÉ THE REALEST - Official Website
    
    🌟 Features:
    - Spectacular animated gradients
    - Mobile-first responsive design
    - Interactive audio visualizer
    - Smooth scroll animations
    - Music platform integration
    - Concert promotion system
    - Touch-optimized interactions
    - Performance optimized
    
    🎵 Stream Ajé's music on all platforms!
    📱 Optimized for mobile experience
    🔥 Built with Lagos energy and authentic vibes
    `);
});

// Lagos street energy - add some spice! 🌶️
window.addEventListener('load', () => {
    setTimeout(() => {
        console.log('💎 Welcome to the realest website in Lagos! 🔥');
        console.log('🎵 Don\'t forget to stream Ajé\'s music! 🎧');
    }, 3000);
});