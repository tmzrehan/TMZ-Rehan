document.addEventListener('DOMContentLoaded', function() {
    // Fix for Font Awesome loading issues
    const fixFontAwesome = () => {
        // Create a style element to fix the font loading issues
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Fix for Font Awesome glyph bbox issues */
            .fas, .far, .fab {
                font-display: block;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
        `;
        document.head.appendChild(styleElement);
    };
    
    // Call the fix function
    fixFontAwesome();

    // Navigation Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Gallery Filter System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Sample gallery items - in a real project, this would likely come from a database
    const galleryItems = [
        {
            id: 1,
            category: 'game',
            image: 'images/firstphoto.jpg',
            title: 'Sports',
            description: '',
            showInAll: true // This item will show in All category
        },
        {
            id: 2,
            category: 'bikes',
            image: 'images/petrol.jpg',
            title: 'Automotive',
            description: '',
            showInAll: true // This item will show in All category
        },
        {
            id: 3,
            category: 'portrait',
            image: 'images/red-saaree.jpg',
            title: 'Portraits',
            description: '',
            showInAll: true // This item will show in All category
        },
        {
            id: 4,
            category: 'event',
            image: 'images/singing.jpg',
            title: 'Events',
            description: '',
            showInAll: true // This item will show in All category
        },
        // New items that won't show in the All category
        {
            id: 5,
            category: 'game',
            image: 'images/almostdunk.jpg', // Replace with your actual image path
            title: 'Dunk Action',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 6,
            category: 'portrait',
            image: 'images/basketballportrait.jpg', // Replace with your actual image path
            title: 'Basketball Action',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 7,
            category: 'game',
            image: 'images/woah.jpg', // Replace with your actual image path
            title: 'Basketball Action',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 8,
            category: 'game',
            image: 'images/ritika.jpg', // Replace with your actual image path
            title: 'Basketball Action',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 9,
            category: 'bikes',
            image: 'images/lambo.jpg', // Replace with your actual image path
            title: 'Lamborghini Urus',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 10,
            category: 'portrait',
            image: 'images/portraits3.jpg', // Replace with your actual image path
            title: 'Fashion Portrait',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 11,
            category: 'portrait',
            image: 'images/portraits4.jpg', // Replace with your actual image path
            title: 'Fashion Portrait',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 12,
            category: 'event',
            image: 'images/nbl.jpg', // Replace with your actual image path
            title: 'NBL Tournament',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 13,
            category: 'event',
            image: 'images/event-2.jpg', // Replace with your actual image path
            title: 'Concert',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 14,
            category: 'event',
            image: 'images/nbl.jpg', // Replace with your actual image path
            title: 'Concert',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        
        
        {
            id: 14,
            category: 'bikes',
            image: 'images/airplane.jpg', // Replace with your actual image path
            title: 'Ducati 959',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 15,
            category: 'bikes',
            image: 'images/BMW.jpg', // Replace with your actual image path
            title: 'Bmw 530d',
            description: '',
            showInAll: false // This item will NOT show in the All category
        }
    ];
    
    // Modify the gallery items array by adding a download item for each category
    function addDownloadItemsToGallery(items) {
        // Get unique categories
        const categories = [...new Set(items.map(item => item.category))];
        
        // Create download items for each category with different background images
        const downloadItems = categories.map((category, index) => {
            // Define different images for each category
            let imageUrl;
            switch(category) {
                case 'game':
                case 'game action':
                    imageUrl = 'images/gametransparent.jpg';
                    break;
                case 'portrait':
                    imageUrl = 'images/dude.jpg';
                    break;
                case 'bikes':
                    imageUrl = 'images/tmzbike.png';
                    break;
                case 'event':
                    imageUrl = 'images/stagebaddie.jpeg';
                    break;
                default:
                    imageUrl = 'images/reha.png';
            }
            
            return {
                id: 1000 + index,
                category: category,
                image: imageUrl,
                title: 'Download Portfolio',
                description: `Download my ${category} photography portfolio`,
                isDownloadItem: true,
                showInAll: false, // Download items for specific categories don't show in All
                // Add the download URL for each category
                downloadUrl: 'https://drive.google.com/file/d/1mn7OR41WtwraVNNyDDyTsbxQgHWuom_4/view?usp=drive_link'
            };
        });

        // Add a general download item for the "all" category
        downloadItems.push({
            id: 999,
            category: 'all',
            image: 'images/camera.jpg',
            title: 'Complete Portfolio',
            description: 'Download my complete photography portfolio',
            isDownloadItem: true,
            showInAll: true, // This one shows in All category
            // Add the download URL for the all category
            downloadUrl: 'https://drive.google.com/file/d/1mn7OR41WtwraVNNyDDyTsbxQgHWuom_4/view?usp=drive_link'
        });

        // Return combined array
        return [...items, ...downloadItems];
    }

    // Update the gallery items array
    const enhancedGalleryItems = addDownloadItemsToGallery(galleryItems);
    
    // Populate gallery with items
    function populateGallery(items) {
        galleryGrid.innerHTML = '';

        items.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            if (item.isDownloadItem) {
                galleryItem.className += ' download-item';
            }
            galleryItem.dataset.category = item.category;
            galleryItem.dataset.id = item.id;

            galleryItem.style.animationDelay = `${0.1 * (index % 8)}s`;

            // Create different HTML structure for download items
            if (item.isDownloadItem) {
                galleryItem.innerHTML = `
                    <div class="download-container">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="overlay">
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                            <a href="${item.downloadUrl}" target="_blank" class="download-btn">Download PDF</a> <!-- ✅ Drive Link -->
                        </div>
                    </div>
                `;

            } else {
                // Regular gallery item
                galleryItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="overlay">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                `;

                // Add click event for modal on regular items
                galleryItem.addEventListener('click', function() {
                    openModal(item);
                });
            }

            galleryGrid.appendChild(galleryItem);
        });
        
        // Apply scroll animations to newly added items
        setTimeout(() => {
            applyScrollAnimationsToNewItems();
        }, 50);
    }
    
    // Initialize gallery with items that should show in All category
    let currentGalleryItems = enhancedGalleryItems.filter(item => 
        item.showInAll === true
    );
    
    // Make sure we populate the gallery before setting up filters
    populateGallery(currentGalleryItems);
    
    // Set active class on "All" filter button
    const allFilterButton = document.querySelector('[data-filter="all"]');
    if (allFilterButton) {
        allFilterButton.classList.add('active');
    }
    
    // Filter functionality
    // Add this to the filter button click handler
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        const gallerySection = document.querySelector('.gallery');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Reset gallery scroll position
        if (galleryGrid) {
            galleryGrid.scrollLeft = 0;
        }
        
        // Animate category change
        animateCategoryChange(gallerySection, filterValue);
        
        // Filter items
        let filteredItems;
        
        if (filterValue === 'all') {
            filteredItems = enhancedGalleryItems.filter(item => item.showInAll === true);
        } else {
            filteredItems = enhancedGalleryItems.filter(item => 
                item.category === filterValue
            );
        }
        
        // Delay populating gallery to sync with animation
        setTimeout(() => {
            currentGalleryItems = filteredItems;
            populateGallery(filteredItems);
        }, 400);
    });
});

    function animateCategoryChange(gallerySection, newCategory) {
        // Create overlay for transition
        const overlay = document.createElement('div');
        overlay.className = 'category-transition-overlay';
        document.body.appendChild(overlay);
        
        // Fade in overlay
        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 10);
        
        // After overlay is visible, change category and prepare to fade out
        setTimeout(() => {
            // Remove all category classes
            gallerySection.classList.forEach(className => {
                if (className.startsWith('category-')) {
                    gallerySection.classList.remove(className);
                }
            });
            
            // Add the new category class
            gallerySection.classList.add(`category-${newCategory}`);
            
            // Begin fade out
            overlay.style.opacity = '0';
        }, 800);
        
        // Remove overlay after animation completes
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 800);
    }

    // Add this line after the filterButtons setup to set initial category class
    const gallerySection = document.querySelector('.gallery');
    if (gallerySection) {
        gallerySection.classList.add('category-all');
    }
    
    // Gallery Modal
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentImageIndex = 0;
    
    function openModal(item) {
        // Don't open modal for download items
        if (item.isDownloadItem) return;
        
        modal.style.display = 'block';
        modalImg.src = item.image;
        modalCaption.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
        
        // Find the index of current item among regular items only
        const regularItems = currentGalleryItems.filter(i => !i.isDownloadItem);
        currentImageIndex = regularItems.findIndex(i => i.id === item.id);
        
        // Update navigation buttons state
        updateNavigationButtons(regularItems);
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNav);
    }
    
    // Close modal function
    function closeModalFunction() {
        modal.style.display = 'none';
        document.removeEventListener('keydown', handleKeyboardNav);
    }
    
    // Update navigation buttons based on current index
    function updateNavigationButtons(items) {
        const regularItems = items || currentGalleryItems.filter(i => !i.isDownloadItem);
        
        if (regularItems.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }
        
        prevBtn.style.display = currentImageIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentImageIndex === regularItems.length - 1 ? 'none' : 'block';
    }
    
    // Navigate to previous image
    function navigatePrev() {
        const regularItems = currentGalleryItems.filter(i => !i.isDownloadItem);
        if (currentImageIndex > 0) {
            currentImageIndex--;
            const item = regularItems[currentImageIndex];
            modalImg.src = item.image;
            modalCaption.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
            updateNavigationButtons(regularItems);
        }
    }
    
    // Navigate to next image
    function navigateNext() {
        const regularItems = currentGalleryItems.filter(i => !i.isDownloadItem);
        if (currentImageIndex < regularItems.length - 1) {
            currentImageIndex++;
            const item = regularItems[currentImageIndex];
            modalImg.src = item.image;
            modalCaption.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
            updateNavigationButtons(regularItems);
        }
    }
    
    // Keyboard navigation
    function handleKeyboardNav(e) {
        if (e.key === 'Escape') {
            closeModalFunction();
        } else if (e.key === 'ArrowLeft') {
            navigatePrev();
        } else if (e.key === 'ArrowRight') {
            navigateNext();
        }
    }
    
    // Add event listeners for modal navigation
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', navigatePrev);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', navigateNext);
    }
    
    // Click outside modal to close
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunction();
        }
    });
    
    // Batman Theme Toggle (for dark mode with red accents)
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('batman-theme');
            
            // Save user preference
            if (body.classList.contains('batman-theme')) {
                localStorage.setItem('theme', 'batman');
                this.textContent = 'Light Mode';
            } else {
                localStorage.setItem('theme', 'light');
                this.textContent = 'Batman Mode';
            }
        });
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'batman') {
        body.classList.add('batman-theme');
        if (themeToggle) {
            themeToggle.textContent = 'Light Mode';
        }
    }
    
    // Animation for logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseover', function() {
            this.classList.add('pulse');
        });
        
        logo.addEventListener('animationend', function() {
            this.classList.remove('pulse');
        });
    }
    
    // Modified parallax effect for hero section to be more browser-friendly
    const hero = document.querySelector('.hero');
    if (hero) {
        // Store original background position
        const originalBackgroundPosition = window.getComputedStyle(hero).backgroundPosition;
        
        // Use transform instead of backgroundPositionY for better performance
        window.addEventListener('scroll', function() {
            // Use requestAnimationFrame to optimize scroll performance
            window.requestAnimationFrame(() => {
                const scrollPosition = window.pageYOffset;
                
                // Use transform: translate3d for hardware acceleration instead of changing background position
                hero.style.transform = `translate3d(0, 0, 0)`; // Force hardware acceleration
                hero.style.backgroundPositionY = `calc(${originalBackgroundPosition.split(' ')[1]} + ${scrollPosition * 0.3}px)`;
            });
        });
    }
    
    // Testimonials slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    let testimonialIndex = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    if (testimonialSlider && testimonials.length > 0) {
        // Initial display
        showTestimonial(testimonialIndex);
        
        // Auto rotate testimonials
        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            showTestimonial(testimonialIndex);
        }, 5000);
        
        // Add navigation buttons
        const prevTestimonial = document.createElement('button');
        prevTestimonial.className = 'prev-testimonial';
        prevTestimonial.innerHTML = '&lt;';
        prevTestimonial.addEventListener('click', () => {
            testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(testimonialIndex);
        });
        
        const nextTestimonial = document.createElement('button');
        nextTestimonial.className = 'next-testimonial';
        nextTestimonial.innerHTML = '&gt;';
        nextTestimonial.addEventListener('click', () => {
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
            showTestimonial(testimonialIndex);
        });
        
        testimonialSlider.appendChild(prevTestimonial);
        testimonialSlider.appendChild(nextTestimonial);
    }
    
    // Contact form submission with EmailJS
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            let valid = true;
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const serviceInput = this.querySelector('#service');
            const messageInput = this.querySelector('#message');
            
            // Remove existing error messages
            const errorMessages = this.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
            
            // Remove existing success message
            const successMessage = this.querySelector('.success-message');
            if (successMessage) {
                successMessage.remove();
            }
            
            // Validate name
            if (!nameInput.value.trim()) {
                valid = false;
                addErrorMessage(nameInput, 'Please enter your name');
            }            
            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                valid = false;
                addErrorMessage(emailInput, 'Please enter a valid email address');
            }
            
            // Validate service
            if (!serviceInput.value) {
                valid = false;
                addErrorMessage(serviceInput, 'Please select a service');
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                valid = false;
                addErrorMessage(messageInput, 'Please enter your message');
            }
            
            if (!valid) {
                return;
            }
            
            // Show loading indicator
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Prepare template parameters
            const templateParams = {
                name: nameInput.value,
                email: emailInput.value,
                subject: `Photography Service Inquiry: ${serviceInput.options[serviceInput.selectedIndex].text}`,
                message: messageInput.value,
                service: serviceInput.options[serviceInput.selectedIndex].text
            };
            
            // Send email using EmailJS
            emailjs.send('service_yodrqad', 'template_6jwhrrc', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully!', response.status, response.text);
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thanks for your message! I\'ll get back to you soon.';
                    bookingForm.appendChild(successMessage);
                    
                    // Reset form
                    bookingForm.reset();
                    
                    // Restore button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                })
                .catch(function(error) {
                    console.error('Email sending failed:', error);
                    
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message form-error';
                    errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact me directly.';
                    bookingForm.appendChild(errorMessage);
                    
                    // Restore button
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                });
        });
        
        function addErrorMessage(input, message) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            input.parentNode.appendChild(errorMessage);
            input.classList.add('error');
            
            // Remove error class when input changes
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        }
    }
    
    // Contact form in the main section
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm && contactForm !== bookingForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // You can implement the same EmailJS functionality here if needed
        });
    }

    // Add CSS for download items with updated styling
    const addDownloadItemStyles = () => {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* Styling for download items */
            .gallery-item.download-item {
                position: relative;
                overflow: hidden;
                background-color: rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease;
            }
            
            .gallery-item.download-item:hover {
                background-color: rgba(0, 0, 0, 0.1);
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
            }
            
            .download-container {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0; /* Remove padding */
                text-align: center;
            }
            
            .download-container img {
                width: 100%; /* Make image fill container width */
                height: 100%; /* Make image fill container height */
                object-fit: cover; /* Maintain aspect ratio and cover container */
                margin-bottom: 0; /* Remove margin */
                opacity: 1;
                transition: all 0.3s ease;
            }
            
            .download-container .overlay {
                position: absolute; /* Position absolutely */
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5); /* Dark overlay */
                color: white;
                opacity: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 20px;
                text-align: center;
            }
            
            .download-btn {
                display: inline-block;
                margin-top: 15px;
                padding: 10px 20px;
                background-color: #e74c3c;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                transition: all 0.2s ease;
            }
            
            .download-btn:hover {
                background-color: #c0392b;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            
            /* Batman theme adjustments */
            .batman-theme .download-btn {
                background-color: #e74c3c;
            }
            
            .batman-theme .download-btn:hover {
                background-color: #ff5e4d;
            }
        `;
        document.head.appendChild(styleElement);
    };
    
    // Add the download item styles
    addDownloadItemStyles();
});
document.addEventListener('DOMContentLoaded', function() {
    // Existing code remains unchanged...

    // Add intersection observer for scroll animations
    function setupScrollAnimations() {
        // Create options for the observer
        const observerOptions = {
            root: null, // use the viewport as the root
            rootMargin: '0px',
            threshold: 0.15 // trigger when 15% of the element is visible
        };

        // Create callback function for the observer
        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class to the element when it's visible
                    entry.target.classList.add('fade-in-up');
                    
                    // Optional: stop observing the element after it's animated
                    // observer.unobserve(entry.target);
                }
            });
        };

        // Create a new observer with the callback and options
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Target all gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // Observe each gallery item
        galleryItems.forEach(item => {
            // Add the initial class for the animation
            item.classList.add('will-animate');
            // Start observing the element
            observer.observe(item);
        });
    }

    // Function to apply scroll animations to newly added gallery items
    function applyScrollAnimationsToNewItems() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        const newItems = document.querySelectorAll('.gallery-item:not(.will-animate)');
        newItems.forEach(item => {
            item.classList.add('will-animate');
            observer.observe(item);
        });
    }

    // Modify the populateGallery function to reset animations
    const originalPopulateGallery = populateGallery;
    populateGallery = function(items) {
        originalPopulateGallery(items);
        setTimeout(() => {
            applyScrollAnimationsToNewItems();
        }, 50);
    };

    // Call setup function after initial gallery population
    setTimeout(() => {
        setupScrollAnimations();
    }, 100);
});
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    // Amount to scroll on each click (adjust this to your preference)
    const scrollAmount = 400;
    
    nextBtn.addEventListener('click', function() {
        galleryGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    prevBtn.addEventListener('click', function() {
        galleryGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Re-enable overflow to allow scrolling with buttons
    galleryGrid.style.overflowX = 'hidden';
});
// Image Zoom Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create zoom modal HTML structure
    const zoomModal = document.createElement('div');
    zoomModal.className = 'zoom-modal';
    zoomModal.innerHTML = `
        <span class="close-zoom">&times;</span>
        <div class="zoom-container">
            <img class="zoom-img" src="" alt="Zoomed image">
        </div>
        <div class="zoom-controls">
            <div class="zoom-btn zoom-in">+</div>
            <div class="zoom-btn zoom-out">-</div>
            <div class="zoom-btn zoom-reset">↺</div>
        </div>
    `;
    document.body.appendChild(zoomModal);

    // Get elements
    const zoomImg = document.querySelector('.zoom-img');
    const closeZoom = document.querySelector('.close-zoom');
    const zoomInBtn = document.querySelector('.zoom-in');
    const zoomOutBtn = document.querySelector('.zoom-out');
    const zoomResetBtn = document.querySelector('.zoom-reset');
    const zoomContainer = document.querySelector('.zoom-container');
    
    // Variables for zooming and panning
    let currentScale = 1;
    let posX = 0;
    let posY = 0;
    let startX, startY;
    let isDragging = false;
    
    // Open zoom modal when clicking on gallery items
    function initializeGalleryZoom() {
        // Select all gallery items across all categories
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(function(item) {
            item.addEventListener('click', function(e) {
                // Don't trigger zoom if clicking on a button or link within the gallery item
                if (e.target.closest('.download-btn') || e.target.closest('a')) {
                    return;
                }
                
                const imgSrc = this.querySelector('img').src;
                zoomImg.src = imgSrc;
                zoomModal.style.display = 'block';
                
                // Reset zoom and position
                resetZoom();
            });
        });
    }
    
    // Initialize zoom functionality
    initializeGalleryZoom();
    
    // Re-initialize when category changes (if using AJAX)
    // You may need to call initializeGalleryZoom() after category changes if using AJAX
    
    // Observe DOM changes to handle dynamically added gallery items
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                initializeGalleryZoom();
            }
        });
    });
    
    // Start observing the gallery container for changes
    const galleryContainers = document.querySelectorAll('.gallery-grid, .gallery-container');
    galleryContainers.forEach(function(container) {
        observer.observe(container, { childList: true, subtree: true });
    });
    
    // Close zoom modal
    closeZoom.addEventListener('click', function() {
        zoomModal.style.display = 'none';
    });
    
    // Close on escape key
    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && zoomModal.style.display === 'block') {
            zoomModal.style.display = 'none';
        }
    });
    
    // Zoom in button
    zoomInBtn.addEventListener('click', function() {
        if (currentScale < 4) { // Increased max zoom from 3 to 4
            currentScale += 0.5;
            updateTransform();
        }
    });
    
    // Zoom out button
    zoomOutBtn.addEventListener('click', function() {
        if (currentScale > 0.5) { // Limit min zoom
            currentScale -= 0.5;
            updateTransform();
        }
    });
    
    // Reset zoom button
    zoomResetBtn.addEventListener('click', resetZoom);
    
    // Double click to toggle between zoomed and normal
    zoomImg.addEventListener('dblclick', function(e) {
        if (currentScale === 1) {
            currentScale = 2;
            
            // Zoom towards mouse position
            const rect = zoomImg.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            posX = (mouseX - rect.width / 2) * -1;
            posY = (mouseY - rect.height / 2) * -1;
        } else {
            resetZoom();
        }
        updateTransform();
    });
    
    // Mouse wheel zoom
    zoomContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        // Calculate zoom factor based on wheel delta
        const zoomFactor = 0.1;
        const delta = e.deltaY > 0 ? -zoomFactor : zoomFactor;
        
        // Calculate new scale
        const newScale = currentScale * (1 + delta);
        
        // Apply limits
        if (newScale >= 0.5 && newScale <= 4) {
            // Get mouse position relative to image
            const rect = zoomImg.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Calculate cursor position in image coordinates
            const x = (mouseX - posX) / currentScale;
            const y = (mouseY - posY) / currentScale;
            
            // Update scale
            currentScale = newScale;
            
            // Adjust position to zoom toward cursor
            posX = mouseX - x * currentScale;
            posY = mouseY - y * currentScale;
            
            updateTransform();
        }
    });
    
    // Start dragging
    zoomImg.addEventListener('mousedown', function(e) {
        if (currentScale > 1) {
            isDragging = true;
            startX = e.clientX - posX;
            startY = e.clientY - posY;
            zoomImg.classList.add('zoomed');
        }
    });
    
    // Dragging
    window.addEventListener('mousemove', function(e) {
        if (isDragging) {
            posX = e.clientX - startX;
            posY = e.clientY - startY;
            updateTransform();
        }
    });
    
    // Stop dragging
    window.addEventListener('mouseup', function() {
        isDragging = false;
    });
    
    // Update transform with current scale and position
    function updateTransform() {
        // Add zoomed class if zoomed in
        if (currentScale > 1) {
            zoomImg.classList.add('zoomed');
        } else {
            zoomImg.classList.remove('zoomed');
        }
        
        zoomImg.style.transform = `translate(${posX}px, ${posY}px) scale(${currentScale})`;
    }
    
    // Reset zoom and position
    function resetZoom() {
        currentScale = 1;
        posX = 0;
        posY = 0;
        zoomImg.classList.remove('zoomed');
        updateTransform();
    }
    
    // Mobile touch support
    zoomImg.addEventListener('touchstart', function(e) {
        if (currentScale > 1 && e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX - posX;
            startY = e.touches[0].clientY - posY;
        }
    });
    
    zoomImg.addEventListener('touchmove', function(e) {
        if (isDragging && e.touches.length === 1) {
            posX = e.touches[0].clientX - startX;
            posY = e.touches[0].clientY - startY;
            updateTransform();
            e.preventDefault();
        }
    });
    
    zoomImg.addEventListener('touchend', function() {
        isDragging = false;
    });
    
    // Pinch to zoom for mobile
    let initialDistance = 0;
    let initialScale = 1;
    
    zoomImg.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            initialDistance = getDistance(
                e.touches[0].clientX, 
                e.touches[0].clientY, 
                e.touches[1].clientX, 
                e.touches[1].clientY
            );
            initialScale = currentScale;
        }
    });
    
    zoomImg.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            const currentDistance = getDistance(
                e.touches[0].clientX, 
                e.touches[0].clientY, 
                e.touches[1].clientX, 
                e.touches[1].clientY
            );
            
            const newScale = initialScale * (currentDistance / initialDistance);
            currentScale = Math.min(Math.max(newScale, 0.5), 4);
            
            updateTransform();
            e.preventDefault(); // Prevent page zoom
        }
    });
    
    // Calculate distance between two points
    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    // Function to get gallery item width (including margins/padding)
    function getGalleryItemWidth() {
        const firstItem = galleryGrid.querySelector('.gallery-item');
        if (!firstItem) return 300; // default fallback
        
        const itemStyle = window.getComputedStyle(firstItem);
        const width = firstItem.offsetWidth;
        const marginLeft = parseInt(itemStyle.marginLeft) || 0;
        const marginRight = parseInt(itemStyle.marginRight) || 0;
        
        return width + marginLeft + marginRight;
    }
    
    // Function to scroll to the next full item
    function scrollToNextItem() {
        const itemWidth = getGalleryItemWidth();
        const currentScroll = galleryGrid.scrollLeft;
        const targetScroll = Math.ceil(currentScroll / itemWidth) * itemWidth;
        
        galleryGrid.scrollTo({
            left: targetScroll + itemWidth,
            behavior: 'smooth'
        });
    }
    
    // Function to scroll to the previous full item
    function scrollToPrevItem() {
        const itemWidth = getGalleryItemWidth();
        const currentScroll = galleryGrid.scrollLeft;
        const targetScroll = Math.floor(currentScroll / itemWidth) * itemWidth;
        
        galleryGrid.scrollTo({
            left: targetScroll - itemWidth,
            behavior: 'smooth'
        });
    }
    
    // Button event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', scrollToNextItem);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', scrollToPrevItem);
    }
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // minimum distance required for a swipe
    
    galleryGrid.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    galleryGrid.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
            // Swiped right - go to previous
            scrollToPrevItem();
        } else if (swipeDistance < -swipeThreshold) {
            // Swiped left - go to next
            scrollToNextItem();
        }
    }
    
    // Add CSS snap scrolling for better UX
    galleryGrid.style.scrollSnapType = 'x mandatory';
    
    // Apply snap alignment to gallery items
    const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.scrollSnapAlign = 'start';
    });
});
// Enhanced Gallery Navigation with Optimized Image Loading
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    if (!galleryGrid) return; // Exit if grid not found
    
    // ====== IMAGE LOADING OPTIMIZATION ======
    
    // Preload adjacent images to improve perceived loading speed
    function preloadAdjacentImages(currentIndex) {
        const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
        const totalItems = galleryItems.length;
        
        // Define which images to preload (current, next, previous, next+1, prev-1)
        const indicesToPreload = [
            currentIndex,
            currentIndex + 1,
            currentIndex - 1,
            currentIndex + 2,
            currentIndex - 2
        ];
        
        indicesToPreload.forEach(index => {
            if (index >= 0 && index < totalItems) {
                const item = galleryItems[index];
                const images = item.querySelectorAll('img');
                const backgroundImages = item.querySelectorAll('[style*="background-image"]');
                
                // Preload regular images
                images.forEach(img => {
                    if (img.dataset.src && !img.src) {
                        // If using lazy loading with data-src
                        img.src = img.dataset.src;
                    } else if (!img.complete) {
                        // Force load if not complete
                        const newImg = new Image();
                        newImg.src = img.src;
                    }
                    
                    // Set loading priority
                    img.loading = index === currentIndex ? 'eager' : 'high';
                    
                    // Set fetchpriority attribute for modern browsers
                    img.setAttribute('fetchpriority', index === currentIndex ? 'high' : 'auto');
                });
                
                // Handle background images
                backgroundImages.forEach(el => {
                    const style = window.getComputedStyle(el);
                    const url = style.backgroundImage.slice(4, -1).replace(/"/g, "");
                    
                    if (url && url !== 'none') {
                        const img = new Image();
                        img.src = url;
                    }
                });
            }
        });
    }
    
    // Function to optimize all images in the gallery
    function optimizeGalleryImages() {
        const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            const images = item.querySelectorAll('img');
            
            images.forEach(img => {
                // Set appropriate loading attribute
                img.loading = index < 3 ? 'eager' : 'lazy';
                
                // Set fetchpriority attribute for modern browsers
                img.setAttribute('fetchpriority', index < 3 ? 'high' : 'auto');
                
                // Apply size optimization if not already sized
                if (!img.width && !img.height && !img.style.width && !img.style.height) {
                    img.style.maxWidth = '100%';
                    img.style.height = 'auto';
                }
                
                // Decode images asynchronously
                if ('decode' in img) {
                    img.decode().catch(() => {});
                }
            });
        });
    }
    
    // ====== CORE GALLERY FUNCTIONALITY ======
    
    // Function to get gallery item width (including margins/padding)
    function getGalleryItemWidth() {
        const firstItem = galleryGrid.querySelector('.gallery-item');
        if (!firstItem) return 300; // default fallback
        
        const itemStyle = window.getComputedStyle(firstItem);
        const width = firstItem.offsetWidth;
        const marginLeft = parseInt(itemStyle.marginLeft) || 0;
        const marginRight = parseInt(itemStyle.marginRight) || 0;
        
        return width + marginLeft + marginRight;
    }
    
    // Calculate total items and current index
    function getCurrentIndex() {
        const itemWidth = getGalleryItemWidth();
        const currentScroll = galleryGrid.scrollLeft;
        return Math.round(currentScroll / itemWidth);
    }
    
    function getTotalItems() {
        return galleryGrid.querySelectorAll('.gallery-item').length;
    }
    
    // Improved scroll functions to navigate precisely to the next/previous item
    function scrollToIndex(index) {
        const itemWidth = getGalleryItemWidth();
        const totalItems = getTotalItems();
        const safeIndex = Math.max(0, Math.min(index, totalItems - 1));
        
        // Preload images before scrolling
        preloadAdjacentImages(safeIndex);
        
        // Use requestAnimationFrame to ensure smooth scrolling
        requestAnimationFrame(() => {
            galleryGrid.scrollTo({
                left: safeIndex * itemWidth,
                behavior: 'smooth'
            });
            
            // Update button states after animation completes
            setTimeout(updateNavigationButtons, 300);
        });
    }
    
    // Function to scroll to the next item with proper animation
    function scrollToNextItem() {
        const currentIndex = getCurrentIndex();
        scrollToIndex(currentIndex + 1);
    }
    
    // Function to scroll to the previous item with proper animation
    function scrollToPrevItem() {
        const currentIndex = getCurrentIndex();
        scrollToIndex(currentIndex - 1);
    }
    
    // Function to update navigation button states
    function updateNavigationButtons() {
        if (!prevBtn || !nextBtn) return;
        
        const currentIndex = getCurrentIndex();
        const totalItems = getTotalItems();
        
        const isAtStart = currentIndex <= 0;
        const isAtEnd = currentIndex >= totalItems - 1;
        
        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
        
        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
        nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        
        // Preload images for current position
        preloadAdjacentImages(currentIndex);
    }
    
    // Button event listeners
    if (nextBtn) {
        nextBtn.removeEventListener('click', nextBtn.onclick);
        nextBtn.addEventListener('click', scrollToNextItem);
    }
    
    if (prevBtn) {
        prevBtn.removeEventListener('click', prevBtn.onclick);
        prevBtn.addEventListener('click', scrollToPrevItem);
    }
    
    // Improved swipe functionality for mobile with better handling
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartTime = 0;
    let isScrolling = false;
    let isSwiping = false;
    const swipeThreshold = 50; // minimum distance required for a swipe
    const swipeTimeThreshold = 300; // maximum time for a swipe in milliseconds
    
    galleryGrid.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        touchStartTime = Date.now();
        isScrolling = false;
        isSwiping = false;
        
        // Preload images in anticipation of swipe
        preloadAdjacentImages(getCurrentIndex());
    }, { passive: true });
    
    galleryGrid.addEventListener('touchmove', function(e) {
        // Prevent unintended scrolling during horizontal swipe
        const currentX = e.changedTouches[0].screenX;
        const currentY = e.changedTouches[0].screenY;
        const horizontalDistance = Math.abs(currentX - touchStartX);
        const verticalDistance = Math.abs(currentY - touchStartY);
        
        // Detect vertical scrolling
        if (verticalDistance > horizontalDistance) {
            isScrolling = true;
        } else if (horizontalDistance > 10) {
            // If horizontal distance is significant, we're swiping
            isSwiping = true;
            
            // Preload images in the direction of the swipe
            const currentIndex = getCurrentIndex();
            if (currentX < touchStartX) {
                // Swiping left, preload next images
                preloadAdjacentImages(currentIndex + 1);
            } else {
                // Swiping right, preload previous images
                preloadAdjacentImages(currentIndex - 1);
            }
        }
    }, { passive: true });
    
    galleryGrid.addEventListener('touchend', function(e) {
        // Don't handle swipes if user was scrolling vertically
        if (isScrolling || !isSwiping) return;
        
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        const touchEndTime = Date.now();
        const swipeTime = touchEndTime - touchStartTime;
        
        // Process swipe with improved detection
        handleSwipe(swipeTime);
    }, { passive: true });
    
    function handleSwipe(swipeTime) {
        const swipeDistance = touchEndX - touchStartX;
        const verticalDistance = Math.abs(touchEndY - touchStartY);
        const swipeSpeed = Math.abs(swipeDistance) / swipeTime;
        
        // Ignore diagonal swipes
        if (verticalDistance > Math.abs(swipeDistance) * 0.8) return;
        
        // Fast swipes can have a lower threshold
        const dynamicThreshold = swipeSpeed > 1 ? swipeThreshold * 0.7 : swipeThreshold;
        
        if (swipeDistance > dynamicThreshold && swipeTime < swipeTimeThreshold) {
            // Swiped right - go to previous
            scrollToPrevItem();
        } else if (swipeDistance < -dynamicThreshold && swipeTime < swipeTimeThreshold) {
            // Swiped left - go to next
            scrollToNextItem();
        } else {
            // If not a clear swipe, snap to the nearest item
            const currentIndex = getCurrentIndex();
            scrollToIndex(currentIndex);
        }
    }
    
    // Ensure proper snap alignment after any scroll ends
    galleryGrid.addEventListener('scroll', function() {
        clearTimeout(galleryGrid.scrollTimeout);
        galleryGrid.scrollTimeout = setTimeout(function() {
            // Once scrolling stops, ensure we're properly aligned
            const currentIndex = getCurrentIndex();
            const itemWidth = getGalleryItemWidth();
            const expectedScroll = currentIndex * itemWidth;
            const actualScroll = galleryGrid.scrollLeft;
            
            // If we're not aligned properly, adjust
            if (Math.abs(actualScroll - expectedScroll) > 10) {
                scrollToIndex(currentIndex);
            }
            
            updateNavigationButtons();
            
            // Preload images at the new position
            preloadAdjacentImages(currentIndex);
        }, 150);
    }, { passive: true });
    
    // Add CSS for improved snap scrolling and image loading
    function addOptimizedStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .gallery-grid {
                scroll-snap-type: x mandatory;
                scrollbar-width: none; /* Hide scrollbar for Firefox */
                -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
                scroll-behavior: smooth;
                -webkit-overflow-scrolling: touch; /* Improve iOS scrolling */
                will-change: scroll-position; /* Optimize for animations */
            }
            
            .gallery-grid::-webkit-scrollbar {
                display: none; /* Hide scrollbar for Chrome/Safari/Opera */
            }
            
            .gallery-item {
                scroll-snap-align: center; /* Changed to center for better alignment */
                scroll-snap-stop: always; /* Ensure we stop at each item */
                user-select: none; /* Prevent text selection during swipe */
                -webkit-user-select: none;
                transform: translateZ(0); /* Hardware acceleration */
                will-change: transform; /* Optimize for animations */
                contain: layout; /* Improve performance */
            }
            
            /* Optimize images */
            .gallery-item img {
                backface-visibility: hidden; /* Prevents flickering */
                -webkit-backface-visibility: hidden;
                transform: translateZ(0); /* Hardware acceleration */
                will-change: transform; /* Optimize for animations */
                contain: paint; /* Improve performance */
            }
            
            /* Ensure gallery container has proper positioning */
            .gallery-container {
                position: relative;
                overflow: hidden;
            }
            
            /* Improve navigation buttons */
            .gallery-prev, .gallery-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 10;
                background: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 20px;
                transition: all 0.3s ease;
                touch-action: manipulation; /* Improve touch handling */
            }
            
            .gallery-prev:hover, .gallery-next:hover {
                background: rgba(0, 0, 0, 0.8);
            }
            
            .gallery-prev {
                left: 10px;
            }
            
            .gallery-next {
                right: 10px;
            }
            
            /* Batman theme adjustments */
            .batman-theme .gallery-prev, 
            .batman-theme .gallery-next {
                background: rgba(231, 76, 60, 0.7);
            }
            
            .batman-theme .gallery-prev:hover, 
            .batman-theme .gallery-next:hover {
                background: rgba(231, 76, 60, 1);
            }
            
            /* Loading indicator */
            .gallery-item.loading::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 30px;
                height: 30px;
                margin: -15px 0 0 -15px;
                border: 3px solid rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                border-top-color: #000;
                animation: gallery-loader 0.6s linear infinite;
            }
            
            @keyframes gallery-loader {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styleElement);
    }})
    