document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       TOP BANNER INFINITE SCROLL
       ========================================================================== */
    const banners = document.querySelectorAll('.top-banner');
    banners.forEach(banner => {
        let content = banner.querySelector('.top-banner-content');

        // If content wrapper doesn't exist, create it (handles product.html etc.)
        if (!content) {
            const inner = banner.innerHTML;
            banner.innerHTML = `<div class="top-banner-content">${inner}</div>`;
            content = banner.querySelector('.top-banner-content');
        }

        // Clean up and check if there's only 1 text element to loop
        const children = Array.from(content.children);
        const textSpans = children.filter(el => !el.classList.contains('dot-separator') && el.textContent.trim() !== '');

        if (textSpans.length === 1) {
            // There is just 1 unique text! Let's mark the banner
            banner.classList.add('single-text');
            const mainText = textSpans[0].textContent.trim();

            content.innerHTML = `<span>${mainText}</span>`;

            // For single text, we don't need a seamless duplicate track, just animate the single content
            banner.innerHTML = '';
            banner.appendChild(content);
            return; // Skip the multi-item seamless loop logic
        }

        // Create the scrolling track for multi-item banners
        const track = document.createElement('div');
        track.className = 'top-banner-track';

        // Clone the content for a seamless loop
        const clone = content.cloneNode(true);

        // Append both to track
        track.appendChild(content);
        track.appendChild(clone);

        // Clear banner and append track
        banner.innerHTML = '';
        banner.appendChild(track);
    });

    const accordions = document.querySelectorAll('.accordion-item');

    // Initialize accordion states smoothly
    accordions.forEach(acc => {
        const body = acc.querySelector('.accordion-body');
        if (body) {
            body.style.display = ''; // Clear inline display styles from HTML
            body.style.maxHeight = ''; // Remove any lingering JS inline styles
        }
    });

    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = acc.classList.contains('active');

            // Close all accordions
            accordions.forEach(item => {
                item.classList.remove('active');
                const icon = item.querySelector('.icon');
                if (icon) icon.textContent = '+';
                const body = item.querySelector('.accordion-body');
                if (body) body.style.maxHeight = ''; // Clean up any old inline styles
            });

            // Open clicked accordion if it wasn't active
            if (!isActive) {
                acc.classList.add('active');
                const icon = acc.querySelector('.icon');
                if (icon) icon.textContent = '-';
            }
        });
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');

    if (hamburger && navContainer) {
        hamburger.addEventListener('click', () => {
            navContainer.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navContainer.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Product Hero Color Options
    const colorCircles = document.querySelectorAll('.color-circle');
    const colorNameSpan = document.querySelector('.color-name');

    if (colorCircles.length > 0) {
        colorCircles.forEach(circle => {
            circle.addEventListener('click', function () {
                // Remove active class from all
                colorCircles.forEach(c => c.classList.remove('active'));

                // Add active class to clicked
                this.classList.add('active');

                const mainImage = document.querySelector('.product-hero__main-image img');
                const pillowImg = document.querySelector('.product-details__pillow-img');
                const bodyDesignImg = document.querySelector('.product-body-design');

                // Update text based on color and handle image swapping
                if (colorNameSpan) {
                    if (this.classList.contains('color-blue')) {
                        colorNameSpan.textContent = 'Blue';
                        document.body.classList.remove('theme-grey');

                        if (mainImage) mainImage.src = 'assets/product1.png';
                        if (pillowImg) pillowImg.src = 'assets/pillow2.png';
                        if (bodyDesignImg) bodyDesignImg.src = 'assets/pillow2.png';

                    } else if (this.classList.contains('color-grey')) {
                        colorNameSpan.textContent = 'Grey';
                        document.body.classList.add('theme-grey');

                        if (mainImage) mainImage.src = 'assets/product1-grey.png';
                        if (pillowImg) pillowImg.src = 'assets/pillow1-grey.png';
                        if (bodyDesignImg) bodyDesignImg.src = 'assets/pillow1-grey.png';
                    }
                }
            });
        });
    }

    /* ==========================================================================
       CONTENT SECTION 1 SLIDER
       ========================================================================== */
    const sliderImg = document.querySelector('.content-section-1 .rounded-image');
    const sliderHeading = document.querySelector('.content-section-1 .text-col h2');
    const sliderText = document.querySelector('.content-section-1 .blue-box p');

    const slides = [
        {
            img: 'assets/slider1.png',
            heading: 'Warning: <span class="blue-text">You May Oversleep</span>.',
            text: 'The kind of comfort that turns “just five more minutes” into an entire morning mood. Designed to help you relax faster, sleep deeper, and wake up feeling like a functional human again instead of running on caffeine and regret.'
        },
        {
            img: 'assets/slider2.png',
            heading: 'Goodbye <span class="blue-text">Stiff Neck Energy</span>.',
            text: 'Support that actually supports you. The ergonomic design helps reduce pressure on your neck and shoulders so you can stop waking up feeling like you lost a fight with your pillow overnight.'
        },
        {
            img: 'assets/slider3.png',
            heading: 'Your Bed’s <span class="blue-text">New Favorite Upgrade</span>.',
            text: 'Soft enough to feel cozy. Supportive enough to make a difference. Built for people who love comfort but still want proper posture, better sleep, and mornings that feel slightly less offensive.'
        }
    ];

    if (sliderImg && sliderHeading && sliderText) {
        let currentSlideIndex = 0;
        const slideDuration = 5000; // 5 seconds per slide

        const changeSlide = () => {
            // Step 1: Add fade-out class
            sliderImg.classList.add('slide-fade-out');
            sliderHeading.classList.add('slide-fade-out');
            sliderText.classList.add('slide-fade-out');

            // Step 2: Swap content after fade-out transition completes (500ms)
            setTimeout(() => {
                currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                const nextSlide = slides[currentSlideIndex];

                sliderImg.src = nextSlide.img;
                sliderHeading.innerHTML = nextSlide.heading;
                sliderText.innerHTML = nextSlide.text;

                // Step 3: Remove fade-out class to fade-in new content
                sliderImg.classList.remove('slide-fade-out');
                sliderHeading.classList.remove('slide-fade-out');
                sliderText.classList.remove('slide-fade-out');
            }, 500);
        };

        // Start slide rotation
        setInterval(changeSlide, slideDuration);
    }

    /* ==========================================================================
       VIDEO MODAL LIGHTBOX (About Page)
       ========================================================================== */
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalClose = document.querySelector('.video-modal-close');
    const modalBackdrop = document.querySelector('.video-modal-backdrop');
    const videoCards = document.querySelectorAll('.video-card');

    if (videoModal && modalVideo && videoCards.length > 0) {
        videoCards.forEach(card => {
            card.addEventListener('click', () => {
                const videoSrc = card.getAttribute('data-video');
                if (videoSrc) {
                    modalVideo.src = videoSrc;
                    videoModal.classList.add('active');
                    modalVideo.play().catch(err => {
                        console.log("Auto-play prevented or failed: ", err);
                    });
                }
            });
        });

        const closeModal = () => {
            videoModal.classList.remove('active');
            modalVideo.pause();
            modalVideo.src = '';
        };

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closeModal);
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Sleep Challenge Carousel Logic
    const sleepPages = document.querySelectorAll('.sleep-challenge .sleep-page');
    const sleepDots = document.querySelectorAll('.sleep-challenge .carousel-dots .dot');
    const sleepCarousel = document.querySelector('.sleep-challenge-carousel');

    if (sleepPages.length > 0 && sleepDots.length > 0) {
        let sleepCurrentIndex = 0;
        let sleepTimer;
        let isSleepHovered = false;

        const goToSleepPage = (index) => {
            sleepCurrentIndex = index;
            // Update pages visibility
            sleepPages.forEach((page, i) => {
                if (i === index) {
                    page.style.opacity = '1';
                    page.style.pointerEvents = 'auto';
                    page.classList.add('active-page');
                } else {
                    page.style.opacity = '0';
                    page.style.pointerEvents = 'none';
                    page.classList.remove('active-page');
                }
            });

            // Update active dot
            sleepDots.forEach(d => d.classList.remove('active'));
            sleepDots[index].classList.add('active');
        };

        const startSleepTimer = () => {
            clearTimeout(sleepTimer);
            const delay = isSleepHovered ? 10000 : 5000;
            sleepTimer = setTimeout(() => {
                let nextIndex = (sleepCurrentIndex + 1) % sleepDots.length;
                goToSleepPage(nextIndex);
                startSleepTimer();
            }, delay);
        };

        sleepDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSleepPage(index);
                startSleepTimer();
            });
        });

        if (sleepCarousel) {
            sleepCarousel.addEventListener('mouseenter', () => {
                isSleepHovered = true;
                startSleepTimer();
            });

            sleepCarousel.addEventListener('mouseleave', () => {
                isSleepHovered = false;
                startSleepTimer();
            });
        }

        // Initialize
        startSleepTimer();
    }

    /* ========================= FAQ ACCORDION========================= */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    });

    /* ==========================================================================
       SCROLL REVEAL INTERSECTION OBSERVER
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback
        revealElements.forEach(el => el.classList.add('in-view'));
    }

    /* ==========================================================================
       PRODUCT SHOWCASE — SCROLL-PINNED ANIMATION
       Scrolling pauses when the curve-container reaches the stop point.
       Animation is driven entirely by scroll progress within the spacer.
       Structure: stop-point detection → scroll pause (sticky) → animation.
       ========================================================================== */
    const scrollSpacer = document.querySelector('.showcase-scroll-spacer');
    const showcaseSection = document.querySelector('.product-showcase');
    const curvePath = document.getElementById('showcase-curve');
    const pointer1 = document.querySelector('.product-showcase .p-1');
    const pointer2 = document.querySelector('.product-showcase .p-2');

    if (scrollSpacer && showcaseSection && curvePath && pointer1 && pointer2) {

        // --- 1. STOP-POINT DETECTION: Set spacer height to create scroll zone ---
        const SCROLL_EXTRA = window.innerHeight * 1.5; // Extra scroll distance for animation
        function setSpacer() {
            const sectionH = showcaseSection.offsetHeight;
            scrollSpacer.style.height = (sectionH + SCROLL_EXTRA) + 'px';
        }
        setSpacer();

        // --- Configuration ---
        // Pointer 1 destination threshold (previously Dot 1 arrival)
        // Pointer 2 destination threshold (previously Dot 2 arrival)
        const DOT1_END = 0.45;
        const DOT2_END = 0.75;
        const ARRIVAL_TOLERANCE = 0.02;

        // --- 2 & 3. SCROLL PAUSE + ANIMATION TRIGGER WITH LERPING ---
        let targetProgress = 0;
        let currentProgress = 0;
        const LERP_FACTOR = 0.08; // Control transition speed (lower = smoother / more lag, higher = snappier)
        let isRunning = false;

        function updateAnimationValues(progress) {
            // --- Curve stroke drawing (0→1 maps to dashoffset 100→0) ---
            curvePath.style.strokeDashoffset = 100 - (progress * 100);

            // --- Pointer 1: reveal when curve reaches target location ---
            if (progress < DOT1_END - ARRIVAL_TOLERANCE) {
                pointer1.classList.remove('pointer-arrived');
            } else {
                pointer1.classList.add('pointer-arrived');
            }

            // --- Pointer 2: reveal when curve reaches target location ---
            if (progress < DOT2_END - ARRIVAL_TOLERANCE) {
                pointer2.classList.remove('pointer-arrived');
            } else {
                pointer2.classList.add('pointer-arrived');
            }
        }

        function tick() {
            const diff = targetProgress - currentProgress;
            if (Math.abs(diff) > 0.0001) {
                currentProgress += diff * LERP_FACTOR;
                updateAnimationValues(currentProgress);
                requestAnimationFrame(tick);
            } else {
                currentProgress = targetProgress;
                updateAnimationValues(currentProgress);
                isRunning = false;
            }
        }

        function onScroll() {
            const spacerRect = scrollSpacer.getBoundingClientRect();
            const scrolled = -spacerRect.top - 200;
            let progress = scrolled / SCROLL_EXTRA;
            targetProgress = Math.max(0, Math.min(1, progress));

            if (!isRunning) {
                isRunning = true;
                requestAnimationFrame(tick);
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', () => {
            setSpacer();
            onScroll();
        });

        // Initial setup and render
        onScroll();
    }

    /* ==========================================================================
       FABRIC DETAIL — SCROLL-PINNED ANIMATION
       ========================================================================== */
    const fabricSpacer = document.querySelector('.fabric-scroll-spacer');
    const fabricSection = document.querySelector('.fabric-scroll-spacer .fabric-detail');
    const centerPillow = document.querySelector('.fabric-scroll-spacer .center-pillow');
    const fpLeft = document.querySelector('.fabric-scroll-spacer .fp-left');
    const fpRight = document.querySelector('.fabric-scroll-spacer .fp-right');
    const statBoxes = document.querySelectorAll('.fabric-scroll-spacer .stat-box');

    if (fabricSpacer && fabricSection && fpLeft && fpRight) {
        const SCROLL_EXTRA = window.innerHeight * 1.5; // Extra scroll zone height

        function setFabricSpacer() {
            const sectionH = fabricSection.offsetHeight;
            fabricSpacer.style.height = (sectionH + SCROLL_EXTRA) + 'px';
        }
        setFabricSpacer();

        // Reveal thresholds
        const SHOW_PILLOW = 0.05;
        const SHOW_LEFT = 0.25;
        const SHOW_RIGHT = 0.55;
        const SHOW_STAT1 = 0.75;
        const SHOW_STAT2 = 0.90;

        function animateCount(el) {
            if (el.dataset.animated === "true") return;
            el.dataset.animated = "true";

            const target = parseInt(el.getAttribute('data-target'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            const duration = 1500; // Duration of animation in ms
            const startTime = performance.now();

            function updateCount(currentTime) {
                if (el.dataset.animated !== "true") return; // cancel animation if reset
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out quad
                const easeProgress = progress * (2 - progress);
                const currentValue = Math.floor(easeProgress * target);

                el.textContent = currentValue + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    el.textContent = target + suffix;
                }
            }
            requestAnimationFrame(updateCount);
        }

        function resetCount(el) {
            el.dataset.animated = "false";
            const suffix = el.getAttribute('data-suffix') || '';
            el.textContent = "0" + suffix;
        }

        let targetFabricProgress = 0;
        let currentFabricProgress = 0;
        const LERP_FACTOR = 0.08;
        let isFabricRunning = false;

        function updateFabricAnimation(progress) {
            // Center pillow reveal
            if (centerPillow) {
                if (progress >= SHOW_PILLOW) {
                    centerPillow.classList.add('visible');
                } else {
                    centerPillow.classList.remove('visible');
                }
            }

            // Left pointer reveal
            if (progress >= SHOW_LEFT) {
                fpLeft.classList.add('visible');
            } else {
                fpLeft.classList.remove('visible');
            }

            // Right pointer reveal
            if (progress >= SHOW_RIGHT) {
                fpRight.classList.add('visible');
            } else {
                fpRight.classList.remove('visible');
            }

            // Stat Box 1 reveal
            if (statBoxes[0]) {
                const countEl = statBoxes[0].querySelector('h2');
                if (progress >= SHOW_STAT1) {
                    if (!statBoxes[0].classList.contains('visible')) {
                        statBoxes[0].classList.add('visible');
                        if (countEl) animateCount(countEl);
                    }
                } else {
                    if (statBoxes[0].classList.contains('visible')) {
                        statBoxes[0].classList.remove('visible');
                        if (countEl) resetCount(countEl);
                    }
                }
            }

            // Stat Box 2 reveal
            if (statBoxes[1]) {
                const countEl = statBoxes[1].querySelector('h2');
                if (progress >= SHOW_STAT2) {
                    if (!statBoxes[1].classList.contains('visible')) {
                        statBoxes[1].classList.add('visible');
                        if (countEl) animateCount(countEl);
                    }
                } else {
                    if (statBoxes[1].classList.contains('visible')) {
                        statBoxes[1].classList.remove('visible');
                        if (countEl) resetCount(countEl);
                    }
                }
            }
        }

        function tickFabric() {
            const diff = targetFabricProgress - currentFabricProgress;
            if (Math.abs(diff) > 0.0001) {
                currentFabricProgress += diff * LERP_FACTOR;
                updateFabricAnimation(currentFabricProgress);
                requestAnimationFrame(tickFabric);
            } else {
                currentFabricProgress = targetFabricProgress;
                updateFabricAnimation(currentFabricProgress);
                isFabricRunning = false;
            }
        }

        function onFabricScroll() {
            const spacerRect = fabricSpacer.getBoundingClientRect();
            const scrolled = -spacerRect.top;
            let progress = scrolled / SCROLL_EXTRA;
            targetFabricProgress = Math.max(0, Math.min(1, progress));

            if (!isFabricRunning) {
                isFabricRunning = true;
                requestAnimationFrame(tickFabric);
            }
        }

        window.addEventListener('scroll', onFabricScroll, { passive: true });
        window.addEventListener('resize', () => {
            setFabricSpacer();
            onFabricScroll();
        });

        // Initialize
        onFabricScroll();
    }

    /* ==========================================================================
       body DESIGN CIRCULAR SCROLL ANIMATION
       ========================================================================== */
    const bodyDesignSection = document.getElementById('body-design');
    const featuresContainer = document.querySelector('.body-design__features');
    const featureItems = document.querySelectorAll('.body-design__feature-item');

    if (bodyDesignSection && featuresContainer && featureItems.length > 0) {
        window.addEventListener('scroll', () => {
            const rect = bodyDesignSection.getBoundingClientRect();
            // scrollDistance is total height minus viewport height
            const scrollDistance = rect.height - window.innerHeight;

            // progress is 0 at top, 1 at bottom
            let progress = -rect.top / scrollDistance;
            progress = Math.max(0, Math.min(1, progress));

            const radius = 550; // Radius of the dashed circle (1099 / 2 = 549.5)
            const angleSpacing = 25; // Degrees between each item
            const totalRotation = (featureItems.length - 1) * angleSpacing; // Total rotation needed to bring last item to 0deg

            let closestItemIndex = 0;
            let minAngleAbs = Infinity;

            featureItems.forEach((item, index) => {
                // Base angle: item 0 starts at 0deg, item 1 at 25deg, etc.
                // Subtract totalRotation * progress to rotate them upwards
                const angleDeg = (index * angleSpacing) - (progress * totalRotation);
                const angleRad = angleDeg * (Math.PI / 180);

                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;

                // Position item. translateY(-50%) centers it vertically on the point.
                // We add a little padding (e.g., 20px) to x so it sits just outside the line.
                item.style.transform = `translate(${x}px, calc(-50% + ${y}px))`;

                // Find active item (closest to 0 degrees)
                if (Math.abs(angleDeg) < minAngleAbs) {
                    minAngleAbs = Math.abs(angleDeg);
                    closestItemIndex = index;
                }
            });

            // Update active classes
            featureItems.forEach((item, index) => {
                if (index === closestItemIndex) {
                    item.classList.add('is-active');
                } else {
                    item.classList.remove('is-active');
                }
            });
        });

        // Trigger once on load to set initial state
        window.dispatchEvent(new Event('scroll'));
    }

    /* ==========================================================================
       SUBSCRIBE FORM
       ========================================================================== */
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload

            // Optionally clear the input field after subscribing
            const input = subscribeForm.querySelector('input[type="email"]');
            if (input && input.value.trim() !== '') {
                input.value = '';

                // You can add a success message notification here if desired
                const btnText = subscribeForm.querySelector('.btn-text');
                if (btnText) {
                    const originalText = btnText.textContent;
                    btnText.textContent = 'Subscribed!';
                    setTimeout(() => {
                        btnText.textContent = originalText;
                    }, 3000);
                }
            }
        });
    }

    /* ==========================================================================
       GENERIC CAROUSEL LOGIC & DATA DUPLICATION
       ========================================================================== */
    const carouselConfigs = [
        {
            containerSelector: '.why-choose-us .grid-container',
            itemSelector: '.grid-card',
            dotsSelector: '.why-choose-us .carousel-dots',
            desktopItems: 8,
            mobileItems: 2,
            activeDisplay: 'block'
        },
        {
            containerSelector: '.testimonials .testi-grid',
            itemSelector: '.testi-card',
            dotsSelector: '.testimonials .carousel-dots, .carousel-dots.testi-dots',
            prevArrowSelector: '.testi-header .arrow-btn:first-child',
            nextArrowSelector: '.testi-header .arrow-btn:last-child',
            desktopItems: 4,
            mobileItems: 1,
            activeDisplay: 'block'
        }
    ];

    const carouselStyle = document.createElement('style');
    carouselStyle.innerHTML = `
        .carousel-item-hidden { display: none !important; }
        .carousel-item-flex { display: flex !important; }
        .carousel-item-block { display: block !important; }
    `;
    document.head.appendChild(carouselStyle);

    carouselConfigs.forEach(config => {
        const dotsContainers = document.querySelectorAll(config.dotsSelector);

        dotsContainers.forEach(dotsContainer => {
            let container = null;
            if (config.containerSelector.includes(' ')) {
                const parentSelector = config.containerSelector.split(' ')[0];
                const section = dotsContainer.closest(parentSelector);
                if (section) container = section.querySelector(config.containerSelector.split(' ')[1]);
                else container = document.querySelector(config.containerSelector);
            } else {
                container = document.querySelector(config.containerSelector);
            }

            if (!container) return;

            let items = Array.from(container.querySelectorAll(config.itemSelector));
            if (items.length === 0) return;

            // No need to duplicate items since we are toggling display property
            let currentItems = [...items];

            let currentPageIndex = 0;
            let autoScrollTimer;
            let isHovered = false;

            container.addEventListener('mouseenter', () => isHovered = true);
            container.addEventListener('mouseleave', () => isHovered = false);

            function startAutoScroll() {
                clearInterval(autoScrollTimer);
                autoScrollTimer = setInterval(() => {
                    if (!isHovered) {
                        const isMobile = window.innerWidth <= 768;
                        const itemsPerPage = isMobile ? config.mobileItems : config.desktopItems;
                        const totalPages = Math.ceil(items.length / itemsPerPage);
                        if (totalPages > 1) {
                            currentPageIndex = (currentPageIndex + 1) % totalPages;
                            goToPage(currentPageIndex);
                        }
                    }
                }, 4000);
            }

            function updateCarousel() {
                const isMobile = window.innerWidth <= 768;
                const itemsPerPage = isMobile ? config.mobileItems : config.desktopItems;
                const totalPages = Math.ceil(items.length / itemsPerPage);

                dotsContainer.innerHTML = '';
                for (let i = 0; i < totalPages; i++) {
                    const dot = document.createElement('span');
                    dot.className = i === 0 ? 'dot active' : 'dot';
                    dot.addEventListener('click', () => {
                        goToPage(i);
                        startAutoScroll();
                    });
                    dotsContainer.appendChild(dot);
                }

                goToPage(0);
                startAutoScroll();
            }

            function goToPage(pageIndex) {
                currentPageIndex = pageIndex;
                const isMobile = window.innerWidth <= 768;
                const itemsPerPage = isMobile ? config.mobileItems : config.desktopItems;

                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    if (index === pageIndex) dot.classList.add('active');
                    else dot.classList.remove('active');
                });

                const startIndex = pageIndex * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;

                items.forEach((item, index) => {
                    item.classList.remove('carousel-item-hidden', 'carousel-item-flex', 'carousel-item-block');
                    if (index >= startIndex && index < endIndex) {
                        item.classList.add('carousel-item-' + config.activeDisplay);
                    } else {
                        item.classList.add('carousel-item-hidden');
                    }
                });
            }

            if (config.prevArrowSelector) {
                const prevArrow = document.querySelector(config.prevArrowSelector);
                if (prevArrow) {
                    prevArrow.addEventListener('click', () => {
                        const isMobile = window.innerWidth <= 768;
                        const itemsPerPage = isMobile ? config.mobileItems : config.desktopItems;
                        const totalPages = Math.ceil(items.length / itemsPerPage);
                        if (totalPages > 1) {
                            currentPageIndex = (currentPageIndex - 1 + totalPages) % totalPages;
                            goToPage(currentPageIndex);
                            startAutoScroll();
                        }
                    });
                }
            }

            if (config.nextArrowSelector) {
                const nextArrow = document.querySelector(config.nextArrowSelector);
                if (nextArrow) {
                    nextArrow.addEventListener('click', () => {
                        const isMobile = window.innerWidth <= 768;
                        const itemsPerPage = isMobile ? config.mobileItems : config.desktopItems;
                        const totalPages = Math.ceil(items.length / itemsPerPage);
                        if (totalPages > 1) {
                            currentPageIndex = (currentPageIndex + 1) % totalPages;
                            goToPage(currentPageIndex);
                            startAutoScroll();
                        }
                    });
                }
            }

            updateCarousel();
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(updateCarousel, 200);
            });
        });
    });

    /* ==========================================================================
       PILLOW CAROUSEL AUTO-SCROLL
       ========================================================================== */
    const pillowCarousel = document.getElementById('pillow-carousel');
    if (pillowCarousel) {
        const slides = pillowCarousel.querySelectorAll('.pillow-carousel__slide');
        const dots = pillowCarousel.querySelectorAll('.product-details__dot');
        let pillowCurrentIndex = 0;
        let pillowTimer;
        let isPillowHovered = false;

        function goToPillowSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('product-details__dot--active'));
            pillowCurrentIndex = index;
            slides[index].classList.add('active');
            dots[index].classList.add('product-details__dot--active');
        }

        function startPillowAutoScroll() {
            clearInterval(pillowTimer);
            pillowTimer = setInterval(() => {
                if (!isPillowHovered) {
                    const nextIndex = (pillowCurrentIndex + 1) % slides.length;
                    goToPillowSlide(nextIndex);
                }
            }, 3000);
        }

        // Dot click navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-slide'));
                goToPillowSlide(idx);
                startPillowAutoScroll();
            });
        });

        // Pause on hover
        pillowCarousel.addEventListener('mouseenter', () => isPillowHovered = true);
        pillowCarousel.addEventListener('mouseleave', () => isPillowHovered = false);

        // Initialize
        startPillowAutoScroll();
    }

    /* ==========================================================================
       WARRANTY UPLOAD BOX INTERACTION & DRAG-AND-DROP
       ========================================================================== */
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('invoice-file');
    const warrantyForm = document.querySelector('.warranty-form');

    if (uploadBox && fileInput) {
        uploadBox.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                const fileName = fileInput.files[0].name;
                const uploadText = uploadBox.querySelector('span');
                const uploadIcon = uploadBox.querySelector('i');
                if (uploadText) {
                    uploadText.textContent = `Selected: ${fileName}`;
                }
                if (uploadIcon) {
                    uploadIcon.className = 'fa-solid fa-file-circle-check';
                    uploadIcon.style.color = '#2e7d32'; // green color
                }
            }
        });

        // Drag and drop event listeners
        uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = '#1d1c50';
            uploadBox.style.backgroundColor = '#f0f2f5';
        });

        const resetUploadBoxStyle = () => {
            uploadBox.style.borderColor = '#747494';
            uploadBox.style.backgroundColor = 'var(--white)';
        };

        uploadBox.addEventListener('dragleave', resetUploadBoxStyle);
        uploadBox.addEventListener('dragend', resetUploadBoxStyle);

        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            resetUploadBoxStyle();
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                fileInput.dispatchEvent(new Event('change'));
            }
        });
    }

    if (warrantyForm) {
        warrantyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Handle form submission (UI visual feedback)
            const submitBtn = warrantyForm.querySelector('.btn-submit');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'SUBMITTING...';
                submitBtn.disabled = true;
                setTimeout(() => {
                    submitBtn.textContent = 'SUBMITTED SUCCESSFULLY!';
                    submitBtn.style.backgroundColor = '#2e7d32'; // green success
                    warrantyForm.reset();
                    if (uploadBox) {
                        const uploadText = uploadBox.querySelector('span');
                        const uploadIcon = uploadBox.querySelector('i');
                        if (uploadText) uploadText.textContent = 'Click to upload or drag and drop';
                        if (uploadIcon) {
                            uploadIcon.className = 'fa-solid fa-cloud-arrow-up';
                            uploadIcon.style.color = '';
                        }
                    }
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });
    }
});
