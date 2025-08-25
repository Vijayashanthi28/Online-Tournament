//navbar
  // Modal functionality
        const contactModal = document.getElementById('contact-modal');
        const authModal = document.getElementById('auth-modal');
        const pricingLink = document.getElementById('pricing-link');
        const loginBtn = document.getElementById('login-btn');
        const closeContact = document.getElementById('close-contact');
        const closeAuth = document.getElementById('close-auth');

        // Open contact modal when pricing is clicked
        pricingLink.addEventListener('click', function(e) {
            e.preventDefault();
            contactModal.classList.add('active');
        });

        // Open auth modal when login is clicked
        loginBtn.addEventListener('click', function() {
            authModal.classList.add('active');
            // Change login button to blue when modal is open
            loginBtn.classList.add('blue');
        });

        // Close contact modal
        closeContact.addEventListener('click', function() {
            contactModal.classList.remove('active');
        });

        // Close auth modal
        closeAuth.addEventListener('click', function() {
            authModal.classList.remove('active');
            loginBtn.classList.remove('blue');
        });

        // Close modals when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
            }
            if (e.target === authModal) {
                authModal.classList.remove('active');
                loginBtn.classList.remove('blue');
            }
        });

        // Tab switching in auth modal
        const authTabs = document.querySelectorAll('.auth-tab');
        const formSections = document.querySelectorAll('.form-section');

        authTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                // Remove active class from all tabs and forms
                authTabs.forEach(t => t.classList.remove('active'));
                formSections.forEach(f => f.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding form
                if (targetTab === 'login') {
                    document.getElementById('login-form').classList.add('active');
                } else {
                    document.getElementById('signup-form').classList.add('active');
                }
            });
        });

        // Form submission handlers
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login form submitted!');
        });

        document.getElementById('signup-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Signup form submitted!');
        });

        // Social login handlers
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.classList.contains('google-btn') ? 'Google' : 
                               this.classList.contains('facebook-btn') ? 'Facebook' : 'LinkedIn';
                alert(`${platform} login clicked!`);
            });
        });

        //index tour
         class TournamentCarousel {
            constructor() {
                this.currentSlide = 0;
                this.totalSlides = 4;
                this.autoPlayInterval = 1500;
                this.autoPlayTimer = null;
                this.init();
            }

            init() {
                this.bindEvents();
                this.startAutoPlay();
            }

            bindEvents() {
                // Dot navigation
                const dots = document.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => {
                        this.goToSlide(index);
                        this.restartAutoPlay();
                    });
                });

                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') {
                        this.previousSlide();
                        this.restartAutoPlay();
                    } else if (e.key === 'ArrowRight') {
                        this.nextSlide();
                        this.restartAutoPlay();
                    }
                });

                // Pause on hover
                const container = document.querySelector('.tournament-container');
                container.addEventListener('mouseenter', () => this.pauseAutoPlay());
                container.addEventListener('mouseleave', () => this.startAutoPlay());
            }

            goToSlide(slideIndex) {
                // Hide current slide
                const currentCard = document.querySelector('.tournament-card.active');
                const currentDot = document.querySelector('.dot.active');
                
                if (currentCard) {
                    currentCard.classList.remove('active');
                }
                
                if (currentDot) {
                    currentDot.classList.remove('active');
                }

                // Show new slide after a short delay
                setTimeout(() => {
                    const targetCard = document.querySelector(`[data-tournament="${slideIndex}"]`);
                    const targetDot = document.querySelector(`[data-slide="${slideIndex}"]`);
                    
                    if (targetCard) {
                        targetCard.classList.add('active');
                    }
                    
                    if (targetDot) {
                        targetDot.classList.add('active');
                    }
                }, 200);

                this.currentSlide = slideIndex;
            }

            nextSlide() {
                const nextIndex = (this.currentSlide + 1) % this.totalSlides;
                this.goToSlide(nextIndex);
            }

            previousSlide() {
                const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                this.goToSlide(prevIndex);
            }

            startAutoPlay() {
                this.autoPlayTimer = setInterval(() => {
                    this.nextSlide();
                }, this.autoPlayInterval);
            }

            pauseAutoPlay() {
                if (this.autoPlayTimer) {
                    clearInterval(this.autoPlayTimer);
                    this.autoPlayTimer = null;
                }
            }

            restartAutoPlay() {
                this.pauseAutoPlay();
                this.startAutoPlay();
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new TournamentCarousel();
        });

        // Add smooth scrolling and enhanced animations
        document.addEventListener('DOMContentLoaded', () => {
            // Add entrance animation
            const container = document.querySelector('.tournament-container');
            container.style.opacity = '0';
            container.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                container.style.transition = 'all 0.8s ease-out';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 100);

            // Add button click animations
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('cta-button')) {
                    e.target.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        e.target.style.transform = '';
                    }, 150);
                }
            });
        });

        //Hero Banner
         class HeroCarousel {
            constructor() {
                this.currentSlide = 0;
                this.slides = document.querySelectorAll('.slide');
                this.indicators = document.querySelectorAll('.indicator');
                this.registerBtn = document.querySelector('.register-btn');
                
                this.init();
            }

            init() {
                // Auto-slide every 5 seconds
                this.autoSlideInterval = setInterval(() => {
                    this.nextSlide();
                }, 5000);

                // Event listeners for indicators
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => this.goToSlide(index));
                });

                // Pause auto-slide on hover
                const carousel = document.querySelector('.hero-carousel');
                carousel.addEventListener('mouseenter', () => this.pauseAutoSlide());
                carousel.addEventListener('mouseleave', () => this.resumeAutoSlide());
            }

            updateSlides() {
                // Update slides
                this.slides.forEach((slide, index) => {
                    slide.classList.toggle('active', index === this.currentSlide);
                });

                // Update indicators
                this.indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentSlide);
                });

                // Animate register button position
                this.animateRegisterButton();
            }

            animateRegisterButton() {
                // Remove existing position classes
                this.registerBtn.classList.remove('top-position', 'bottom-position');
                
                // Add appropriate position class based on current slide
                if (this.currentSlide === 0) {
                    // Marathon slide - button at bottom
                    this.registerBtn.classList.add('bottom-position');
                } else {
                    // Chess slide - button at top
                    this.registerBtn.classList.add('top-position');
                }
            }

            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
                this.updateSlides();
            }

            prevSlide() {
                this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
                this.updateSlides();
            }

            goToSlide(index) {
                this.currentSlide = index;
                this.updateSlides();
                this.resetAutoSlide();
            }

            pauseAutoSlide() {
                clearInterval(this.autoSlideInterval);
            }

            resumeAutoSlide() {
                this.autoSlideInterval = setInterval(() => {
                    this.nextSlide();
                }, 5000);
            }

            resetAutoSlide() {
                this.pauseAutoSlide();
                this.resumeAutoSlide();
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new HeroCarousel();
        });

        //Reward price

         let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.nav-dot');
        
        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Auto-advance slides every 4 seconds
        setInterval(nextSlide, 4000);
        
        // Initialize
        showSlide(0);


        //Addprofile
          // Start the animation sequence
        window.addEventListener('load', function() {
            const checkCircle = document.getElementById('checkCircle');
            const rays = document.querySelectorAll('.ray');
            
            // Add rotation animation to the circle
            setTimeout(() => {
                checkCircle.classList.add('animated');
            }, 1500);
            
            // Add ray blast animation - start immediately after page load for testing
            setTimeout(() => {
                rays.forEach((ray, index) => {
                    setTimeout(() => {
                        ray.classList.add('ray-animated');
                        console.log(`Ray ${index + 1} animated`); // Debug log
                    }, index * 25);
                });
            }, 1000); // Start rays at 1 second instead of 2.5
        });

        