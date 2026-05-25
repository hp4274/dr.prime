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

                        if (mainImage) mainImage.src = 'assets/product-display.png';
                        if (pillowImg) pillowImg.src = 'assets/body_design2.png';
                        if (bodyDesignImg) bodyDesignImg.src = 'assets/body_design2.png';

                    } else if (this.classList.contains('color-grey')) {
                        colorNameSpan.textContent = 'Grey';
                        document.body.classList.add('theme-grey');

                        if (mainImage) mainImage.src = 'assets/product-display-grey.png';
                        if (pillowImg) pillowImg.src = 'assets/body_design2-grey.png';
                        if (bodyDesignImg) bodyDesignImg.src = 'assets/body_design2-grey.png';
                    }
                }
            });
        });
    }
    // Video Carousel Logic (About Page)
    const videoGrid = document.querySelector('.video-cards-grid');
    const videoDots = document.querySelectorAll('.about-videos .carousel-dots .dot');

    if (videoGrid && videoDots.length > 0) {
        let videoCurrentIndex = 0;
        let videoAutoScrollTimer;
        let isVideoHovered = false;

        const scrollToVideo = (index) => {
            const cardWidth = videoGrid.querySelector('.video-card').offsetWidth + 20; // width + gap
            videoGrid.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        };

        const startVideoAutoScroll = () => {
            clearInterval(videoAutoScrollTimer);
            videoAutoScrollTimer = setInterval(() => {
                if (!isVideoHovered) {
                    const isMobile = window.innerWidth <= 768;
                    const itemsPerPage = isMobile ? 1 : 4;
                    const totalPages = videoDots.length; // Use the number of dots as total pages
                    
                    if (totalPages > 1) {
                        videoCurrentIndex = (videoCurrentIndex + 1) % totalPages;
                        scrollToVideo(videoCurrentIndex * itemsPerPage);
                    }
                }
            }, 3000);
        };

        // Hover handling
        videoGrid.addEventListener('mouseenter', () => isVideoHovered = true);
        videoGrid.addEventListener('mouseleave', () => isVideoHovered = false);

        // Dot Click to Scroll
        videoDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index') || Array.from(videoDots).indexOf(dot));
                const isMobile = window.innerWidth <= 768;
                const itemsPerPage = isMobile ? 1 : 4;
                videoCurrentIndex = index;
                scrollToVideo(index * itemsPerPage);
                startVideoAutoScroll();
            });
        });

        // Scroll listener to update active dot
        videoGrid.addEventListener('scroll', () => {
            const cardWidth = videoGrid.querySelector('.video-card').offsetWidth + 20;
            const scrollPos = videoGrid.scrollLeft;
            const activeCardIndex = Math.round(scrollPos / cardWidth);
            const isMobile = window.innerWidth <= 768;
            const itemsPerPage = isMobile ? 1 : 4;
            const activeDotIndex = Math.round(activeCardIndex / itemsPerPage);

            videoDots.forEach((dot, idx) => {
                if (idx === activeDotIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });

        // Initialize
        startVideoAutoScroll();
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
       BODY DESIGN CIRCULAR SCROLL ANIMATION
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
            containerSelector: '.sleep-challenge .challenge-cards',
            itemSelector: '.challenge-card',
            dotsSelector: '.sleep-challenge .carousel-dots',
            desktopItems: 3,
            mobileItems: 1,
            activeDisplay: 'flex'
        },
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
});
