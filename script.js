document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = acc.classList.contains('active');
            
            // Close all accordions
            accordions.forEach(item => {
                item.classList.remove('active');
                item.querySelector('.icon').textContent = '+';
                const body = item.querySelector('.accordion-body');
                if(body) body.style.display = 'none';
            });

            // Open clicked accordion if it wasn't active
            if (!isActive) {
                acc.classList.add('active');
                acc.querySelector('.icon').textContent = '-';
                const body = acc.querySelector('.accordion-body');
                if (body) {
                    body.style.display = 'block';
                } else {
                    // Create body if it doesn't exist (for demo purposes based on UI)
                    const newBody = document.createElement('div');
                    newBody.classList.add('accordion-body');
                    newBody.style.display = 'block';
                    newBody.innerHTML = '<p>Surround your name digital workflow with Frame2. Free strategy to break out, unlock the full potential of social media to elevate your marketing, boost productivity.</p>';
                    acc.appendChild(newBody);
                }
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
            circle.addEventListener('click', function() {
                // Remove active class from all
                colorCircles.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked
                this.classList.add('active');

                // Update text based on color
                if (colorNameSpan) {
                    if (this.classList.contains('color-blue')) {
                        colorNameSpan.textContent = 'Blue';
                    } else if (this.classList.contains('color-grey')) {
                        colorNameSpan.textContent = 'Grey';
                    }
                }
            });
        });
    }
});
