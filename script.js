/**
 * SparklePro Cleaning Services - Core JavaScript
 * Handles navigation, multi-step quote modal, instant ZIP checker,
 * testimonial carousel, and interactive UI animations.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close mobile drawer when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* ==========================================================================
       2. STICKY HEADER EFFECT & ACTIVE NAV HIGHLIGHTING
       ========================================================================== */
    const mainHeader = document.getElementById('mainHeader');

    const handleScrollHeader = () => {
        if (window.scrollY > 40) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScrollHeader);
    handleScrollHeader(); // Initial check

    // Active Navigation Link Observer
    const sections = document.querySelectorAll('section[id]');

    const highlightNavOnScroll = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navItem = document.querySelector(`.nav-list a[href*=${sectionId}]`);

            if (navItem) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navItem.classList.add('active');
                } else {
                    navItem.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);

    /* ==========================================================================
       3. INTERACTIVE ZIP / POSTAL CODE SERVICEABILITY CHECKER
       ========================================================================== */
    const heroZipForm = document.getElementById('heroZipForm');
    const heroZipInput = document.getElementById('heroZipInput');
    const areaLookupForm = document.getElementById('areaLookupForm');
    const areaZipInput = document.getElementById('areaZipInput');
    const lookupResultBox = document.getElementById('lookupResultBox');

    // Sample list of valid ZIPs / Regex check
    const validateZip = (zip) => {
        const cleaned = zip.trim().toUpperCase();
        // Standard US ZIP (5 digits) or Canadian Postal Code (A1A 1A1)
        const usPattern = /^\d{5}(-\d{4})?$/;
        const caPattern = /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/;
        return usPattern.test(cleaned) || caPattern.test(cleaned);
    };

    const processZipCheck = (zipValue, resultContainer = null) => {
        const isValid = validateZip(zipValue);

        if (resultContainer) {
            resultContainer.classList.remove('hidden', 'success', 'error');

            if (isValid) {
                resultContainer.classList.add('success');
                resultContainer.innerHTML = `
                    <strong>🎉 Service Available in ${zipValue.toUpperCase()}!</strong><br>
                    <span>Good news! We have 4 dedicated cleaning teams operating near your neighborhood. Next available slot: <strong>Tomorrow at 9:00 AM</strong>.</span>
                `;
            } else {
                resultContainer.classList.add('error');
                resultContainer.innerHTML = `
                    <strong>⚠️ Invalid ZIP/Postal Code</strong><br>
                    <span>Please enter a valid 5-digit US Zip Code (e.g. 90210, 10001, 60601) or Canadian postal code.</span>
                `;
            }
        }

        if (isValid) {
            // Auto open quote modal with pre-filled ZIP
            openQuoteModal(zipValue);
        }
    };

    if (heroZipForm) {
        heroZipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const zipVal = heroZipInput.value;
            processZipCheck(zipVal, null);
        });
    }

    if (areaLookupForm && lookupResultBox) {
        areaLookupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const zipVal = areaZipInput.value;
            processZipCheck(zipVal, lookupResultBox);
        });
    }

    /* ==========================================================================
       4. QUICK QUOTE MULTI-STEP MODAL ENGINE & PRICING CALCULATOR
       ========================================================================== */
    const quoteModal = document.getElementById('quoteModal');
    const closeQuoteModalBtn = document.getElementById('closeQuoteModalBtn');
    const openQuoteBtns = document.querySelectorAll('.open-quote-btn');
    const selectServiceBtns = document.querySelectorAll('.select-service-btn');
    const multiStepForm = document.getElementById('multiStepQuoteForm');

    // Step Panels
    const step1 = document.getElementById('quoteStep1');
    const step2 = document.getElementById('quoteStep2');
    const step3 = document.getElementById('quoteStep3');
    const stepSuccess = document.getElementById('quoteStepSuccess');
    const stepDots = document.querySelectorAll('.step-dot');

    // Inputs for pricing
    const modalServiceType = document.getElementById('modalServiceType');
    const modalBedrooms = document.getElementById('modalBedrooms');
    const modalBathrooms = document.getElementById('modalBathrooms');
    const modalSquareFeet = document.getElementById('modalSquareFeet');
    const modalZip = document.getElementById('modalZip');

    // Display elements
    const calcPriceDisplay = document.getElementById('calcPriceDisplay');
    const calcFreqNote = document.getElementById('calcFreqNote');
    const estServiceText = document.getElementById('estServiceText');
    const estSizeText = document.getElementById('estSizeText');

    let currentStep = 1;

    const openQuoteModal = (prefillZip = '') => {
        if (quoteModal) {
            quoteModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (prefillZip && modalZip) {
                modalZip.value = prefillZip;
            }
        }
    };

    const closeQuoteModal = () => {
        if (quoteModal) {
            quoteModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    };

    openQuoteBtns.forEach(btn => btn.addEventListener('click', () => openQuoteModal()));
    if (closeQuoteModalBtn) closeQuoteModalBtn.addEventListener('click', closeQuoteModal);

    // Clicking outside modal closes it
    if (quoteModal) {
        quoteModal.addEventListener('click', (e) => {
            if (e.target === quoteModal) closeQuoteModal();
        });
    }

    // Pre-select service from service cards
    selectServiceBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedService = e.target.getAttribute('data-service');
            if (modalServiceType && selectedService) {
                modalServiceType.value = selectedService;
            }
            openQuoteModal();
        });
    });

    // Step Navigation Function
    const goToStep = (stepNumber) => {
        currentStep = stepNumber;

        [step1, step2, step3, stepSuccess].forEach(panel => panel.classList.remove('active'));
        stepDots.forEach(dot => dot.classList.remove('active'));

        if (stepNumber === 1) {
            step1.classList.add('active');
            document.querySelector('[data-step-dot="1"]').classList.add('active');
        } else if (stepNumber === 2) {
            step2.classList.add('active');
            document.querySelector('[data-step-dot="2"]').classList.add('active');
        } else if (stepNumber === 3) {
            calculateEstimate();
            step3.classList.add('active');
            document.querySelector('[data-step-dot="3"]').classList.add('active');
        } else if (stepNumber === 4) {
            stepSuccess.classList.add('active');
        }
    };

    // Step 1 Next
    document.getElementById('btnNextStep1')?.addEventListener('click', () => goToStep(2));

    // Step 2 Back & Next
    document.getElementById('btnPrevStep2')?.addEventListener('click', () => goToStep(1));
    document.getElementById('btnNextStep2')?.addEventListener('click', () => {
        if (!modalZip.value) {
            modalZip.focus();
            modalZip.style.borderColor = '#E11D48';
            return;
        }
        modalZip.style.borderColor = '';
        goToStep(3);
    });

    // Step 3 Back
    document.getElementById('btnPrevStep3')?.addEventListener('click', () => goToStep(2));

    // Dynamic Price Calculator
    const calculateEstimate = () => {
        const service = modalServiceType ? modalServiceType.value : 'residential';
        const beds = parseInt(modalBedrooms ? modalBedrooms.value : 2, 10);
        const baths = parseInt(modalBathrooms ? modalBathrooms.value : 2, 10);
        const freqRadio = document.querySelector('input[name="frequency"]:checked');
        const frequency = freqRadio ? freqRadio.value : 'biweekly';

        // Base price calculation algorithm
        let basePrice = 119;
        let serviceName = "Residential House Cleaning";

        if (service === 'deep') {
            basePrice = 249;
            serviceName = "Deep Clean & Move In/Out";
        } else if (service === 'commercial') {
            basePrice = 199;
            serviceName = "Commercial Office Clean";
        } else if (service === 'specialty') {
            basePrice = 299;
            serviceName = "Post-Construction / Special Event";
        }

        // Room additions
        const bedCost = (beds - 1) * 25;
        const bathCost = (baths - 1) * 20;

        let total = basePrice + bedCost + bathCost;

        // Frequency discount factor
        let discountPct = 0;
        let freqLabel = "per visit";

        if (frequency === 'weekly') {
            discountPct = 0.20;
            freqLabel = "per visit (Weekly - Save 20%)";
        } else if (frequency === 'biweekly') {
            discountPct = 0.15;
            freqLabel = "per visit (Bi-Weekly - Save 15%)";
        } else if (frequency === 'monthly') {
            discountPct = 0.10;
            freqLabel = "per visit (Monthly - Save 10%)";
        } else {
            freqLabel = "one-time total";
        }

        total = total * (1 - discountPct);
        // Apply $25 introductory coupon
        total = Math.max(79, total - 25);

        // Update displays
        if (calcPriceDisplay) calcPriceDisplay.textContent = `$${total.toFixed(2)}`;
        if (calcFreqNote) calcFreqNote.textContent = freqLabel;
        if (estServiceText) estServiceText.textContent = serviceName;
        if (estSizeText) estSizeText.textContent = `${beds} Bed, ${baths} Bath`;
    };

    // Recalculate on input change
    [modalServiceType, modalBedrooms, modalBathrooms, modalSquareFeet].forEach(elem => {
        if (elem) elem.addEventListener('change', calculateEstimate);
    });

    document.querySelectorAll('input[name="frequency"]').forEach(radio => {
        radio.addEventListener('change', calculateEstimate);
    });

    // Form Submission
    if (multiStepForm) {
        multiStepForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('modalFullName');
            const phoneInput = document.getElementById('modalPhone');

            const customerName = nameInput ? nameInput.value : 'Customer';
            const customerPhone = phoneInput ? phoneInput.value : 'your phone';
            const randomRef = 'SP-' + Math.floor(10000 + Math.random() * 90000);

            document.getElementById('confirmCustomerName').textContent = customerName;
            document.getElementById('confirmCustomerPhone').textContent = customerPhone;
            document.getElementById('confirmRefId').textContent = '#' + randomRef;

            goToStep(4);
        });
    }

    document.getElementById('btnFinishModal')?.addEventListener('click', () => {
        closeQuoteModal();
        goToStep(1); // Reset to step 1
        multiStepForm.reset();
    });

    /* ==========================================================================
       5. WHY CHOOSE US - INTERACTIVE TABS
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(targetTab)?.classList.add('active');
        });
    });

    /* ==========================================================================
       6. CUSTOMER TESTIMONIALS CAROUSEL SLIDER
       ========================================================================== */
    const track = document.getElementById('testimonialTrack');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    const updateCarousel = (index) => {
        if (!track || totalSlides === 0) return;
        currentSlide = (index + totalSlides) % totalSlides;

        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === currentSlide);
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => updateCarousel(currentSlide - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateCarousel(currentSlide + 1));

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-index'), 10);
            updateCarousel(slideIndex);
        });
    });

    // Auto Play Timer
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(() => {
            updateCarousel(currentSlide + 1);
        }, 6000);
    };

    const stopAutoSlide = () => clearInterval(autoSlideInterval);

    if (track) {
        startAutoSlide();
        track.parentElement.addEventListener('mouseenter', stopAutoSlide);
        track.parentElement.addEventListener('mouseleave', startAutoSlide);
    }

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    if (track) {
        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                updateCarousel(currentSlide + 1);
            } else if (touchEndX - touchStartX > 50) {
                updateCarousel(currentSlide - 1);
            }
        }, { passive: true });
    }

    /* ==========================================================================
       7. ANIMATED METRIC COUNTERS ON SCROLL
       ========================================================================== */
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const increment = target / (duration / 16);

            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target;
                }
            };
            updateCount();
        });
    };

    const metricsSection = document.querySelector('.metrics-section');
    if (metricsSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    runCounters();
                    counted = true;
                }
            });
        }, { threshold: 0.3 });

        observer.observe(metricsSection);
    }

});
