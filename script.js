// Check if jQuery is loaded
if (typeof jQuery === 'undefined') {
    console.error('jQuery is not loaded!');
}

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    // Close mobile menu when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });

    const popupOverlay = document.getElementById('popupOverlay');
    const closePopup = document.getElementById('closePopup');
    const ctaButtons = document.querySelectorAll('.button');
    const consultationForm = document.getElementById('consultationForm');

    // Popup Event Listeners
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closePopup.addEventListener('click', function() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        consultationForm.reset();
    });

    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
            consultationForm.reset();
        }
    });

    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(consultationForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Form submitted:', data);
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        consultationForm.reset();
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
            consultationForm.reset();
        }
    });

    // Services Tabs
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    // Hide all tab contents initially
    tabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    // Set first tab as active by default
    if (tabs[0] && tabContents[0]) {
        tabs[0].classList.add('active');
        tabContents[0].style.display = 'block';
        tabContents[0].classList.add('active');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            const content = document.getElementById(tabId);
            
            if (content) {
                content.style.display = 'block';
                // Use setTimeout to trigger the opacity transition
                setTimeout(() => {
                    content.classList.add('active');
                }, 10);
            }
        });
    });

// Partners Slider
const partnersSwiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        prevEl: '.custom-prev',
        nextEl: '.custom-next',
    },
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 40,
        }
    }
});

// Remove old event listeners
const prevButton = document.querySelector('.custom-prev');
const nextButton = document.querySelector('.custom-next');

    // Legacy Tabs Implementation
    const legacyTabs = document.querySelectorAll('#tabs a');
    const legacyContents = document.querySelectorAll('#content > div');

    // Hide all content initially
    legacyContents.forEach(content => {
        content.style.display = 'none';
    });

    // Show first content by default
    if (legacyContents[0]) {
        legacyContents[0].style.display = 'block';
    }

    // Add click event listeners to tabs
    legacyTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove current class from all tabs
            legacyTabs.forEach(t => t.parentElement.removeAttribute('id'));
            
            // Add current class to clicked tab
            this.parentElement.setAttribute('id', 'current');
            
            // Hide all content
            legacyContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected content
            const targetId = this.getAttribute('title');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });

// Solutions Slider
const solutionsSwiper = new Swiper('.solutions-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.solutions-button-next',
        prevEl: '.solutions-button-prev',
    },
    pagination: {
        el: '.solutions-pagination',
        type: 'fraction',
        formatFractionCurrent: function (number) {
            return number;
        },
        formatFractionTotal: function (number) {
            return number;
        },
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
                   ' / ' +
                   '<span class="' + totalClass + '"></span>';
        }
    },
});

// Add click handlers for the navigation arrows
document.querySelector('.solutions-button-prev').addEventListener('click', () => {
    solutionsSwiper.slidePrev();
});
document.querySelector('.solutions-button-next').addEventListener('click', () => {
    solutionsSwiper.slideNext();
});
});
