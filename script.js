let populateGallery; // Declare at top level
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
            image: 'images/basketballaction2.jpg', // Replace with your actual image path
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
            title: 'Fashion Duo',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 11,
            category: 'portrait',
            image: 'images/portraits4.jpg', // Replace with your actual image path
            title: 'Modern Traditional',
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
            image: 'images/champions.jpg', // Replace with your actual image path
            title: 'Bharat Sports Union',
            description: '',
            showInAll: false // This item will NOT show in the All category
        },
        {
            id: 14,
            category: 'event',
            image: 'images/fashionshow.jpg', // Replace with your actual image path
            title: 'Ubdhav Fashion Show',
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
                downloadUrl: 'https://drive.google.com/file/d/1ZHE9Ecg5mIBa2lVVYxBO6m3fHkqGpIdI/view'
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
            downloadUrl: 'https://drive.google.com/file/d/1ZHE9Ecg5mIBa2lVVYxBO6m3fHkqGpIdI/view'
        });

        // Return combined array
        return [...items, ...downloadItems];
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

    // Update the gallery items array
    const enhancedGalleryItems = addDownloadItemsToGallery(galleryItems);
    
    
    // Populate gallery with items
    populateGallery = function(items) {
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
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    if (!galleryGrid) return; // Exit if gallery not found
    
    function getGalleryItemWidth() {
        const firstItem = galleryGrid.querySelector('.gallery-item');
        if (!firstItem) return 300; // default fallback
        
        const itemStyle = window.getComputedStyle(firstItem);
        const width = firstItem.getBoundingClientRect().width;
        const marginLeft = parseInt(itemStyle.marginLeft) || 0;
        const marginRight = parseInt(itemStyle.marginRight) || 0;
        
        return width + marginLeft + marginRight;
    }

    function getCurrentIndex() {
        const itemWidth = getGalleryItemWidth();
        return Math.round(galleryGrid.scrollLeft / itemWidth);
    }

    function getTotalItems() {
        return galleryGrid.querySelectorAll('.gallery-item').length;
    }
    
    function scrollToIndex(index, smooth = true) {
        const itemWidth = getGalleryItemWidth();
        const totalItems = getTotalItems();
        const safeIndex = Math.max(0, Math.min(index, totalItems - 1));
        
        requestAnimationFrame(() => {
            galleryGrid.scrollTo({
                left: safeIndex * itemWidth,
                behavior: smooth ? 'smooth' : 'auto'
            });
            setTimeout(() => {
                galleryGrid.scrollLeft = safeIndex * itemWidth; // Force exact alignment
                updateNavigationButtons();
            }, 300);
        });
    }
    
    function scrollToNextItem() {
        scrollToIndex(getCurrentIndex() + 1);
    }
    
    function scrollToPrevItem() {
        scrollToIndex(getCurrentIndex() - 1);
    }

    function updateNavigationButtons() {
        if (!prevBtn || !nextBtn) return;
        const currentIndex = getCurrentIndex();
        const totalItems = getTotalItems();
        
        prevBtn.style.opacity = currentIndex <= 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex <= 0 ? 'none' : 'auto';
        nextBtn.style.opacity = currentIndex >= totalItems - 1 ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentIndex >= totalItems - 1 ? 'none' : 'auto';
    }

    if (nextBtn) nextBtn.addEventListener('click', scrollToNextItem);
    if (prevBtn) prevBtn.addEventListener('click', scrollToPrevItem);

    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartTime = 0;
    const swipeThreshold = 50; // Minimum distance required for a swipe
    const swipeTimeThreshold = 300; // Max time for a swipe in milliseconds
    
    galleryGrid.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartTime = Date.now();
    }, { passive: true });
    
    galleryGrid.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        const touchEndTime = Date.now();
        const swipeTime = touchEndTime - touchStartTime;
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeTime < swipeTimeThreshold && Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                scrollToPrevItem();
            } else {
                scrollToNextItem();
            }
        } else {
            scrollToIndex(getCurrentIndex(), false);
        }
    }, { passive: true });
    
    galleryGrid.addEventListener('scroll', function() {
        clearTimeout(galleryGrid.scrollTimeout);
        galleryGrid.scrollTimeout = setTimeout(function() {
            const itemWidth = getGalleryItemWidth();
            const newIndex = Math.round(galleryGrid.scrollLeft / itemWidth);
            galleryGrid.scrollLeft = newIndex * itemWidth; // Force precise alignment
            updateNavigationButtons();
        }, 100);
    }, { passive: true });
    
    setTimeout(() => scrollToIndex(getCurrentIndex(), false), 100);
    updateNavigationButtons();
});
