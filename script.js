document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-item');

    // Initialize accordion states smoothly
    accordions.forEach(acc => {
        const body = acc.querySelector('.accordion-body');
        if (body) {
            body.style.display = ''; // Clear display style to let CSS transition handle it
            if (acc.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + 'px';
                body.style.opacity = '1';
            } else {
                body.style.maxHeight = '0px';
                body.style.opacity = '0';
            }
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
                if (body) {
                    body.style.maxHeight = '0px';
                    body.style.opacity = '0';
                }
            });

            // Open clicked accordion if it wasn't active
            if (!isActive) {
                acc.classList.add('active');
                const icon = acc.querySelector('.icon');
                if (icon) icon.textContent = '-';
                let body = acc.querySelector('.accordion-body');
                if (!body) {
                    // Create body if it doesn't exist (for demo purposes based on UI)
                    body = document.createElement('div');
                    body.classList.add('accordion-body');
                    body.innerHTML = '<p>Surround your name digital workflow with Frame2. Free strategy to break out, unlock the full potential of social media to elevate your marketing, boost productivity.</p>';
                    acc.appendChild(body);
                }
                // Trigger reflow to ensure height transition plays
                body.getBoundingClientRect();
                body.style.maxHeight = body.scrollHeight + 'px';
                body.style.opacity = '1';
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
    const dots = document.querySelectorAll('.carousel-dots .dot');

    if (videoGrid && dots.length > 0) {
        // Dot Click to Scroll
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                const cardWidth = videoGrid.querySelector('.video-card').offsetWidth + 20; // width + gap
                videoGrid.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            });
        });

        // Scroll listener to update active dot
        videoGrid.addEventListener('scroll', () => {
            const cardWidth = videoGrid.querySelector('.video-card').offsetWidth + 20;
            const scrollPos = videoGrid.scrollLeft;
            const activeIndex = Math.round(scrollPos / cardWidth);

            dots.forEach((dot, idx) => {
                if (idx === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
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
});
