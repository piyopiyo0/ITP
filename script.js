// Dropdown menu functionality
const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');
const navbar = document.querySelector('.navbar');
const blurOverlay = document.querySelector('.blur-overlay');
const dropdownLink = dropdown.querySelector('a');

// Handle dropdown click
dropdownLink.addEventListener('click', function(e) {
    e.preventDefault();
    dropdownContent.classList.toggle('active');
    navbar.classList.toggle('dropdown-active');
    blurOverlay.style.display = dropdownContent.classList.contains('active') ? 'block' : 'none';
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
        dropdownContent.classList.remove('active');
        navbar.classList.remove('dropdown-active');
        blurOverlay.style.display = 'none';
    }
});

// Close dropdown on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        dropdownContent.classList.remove('active');
        navbar.classList.remove('dropdown-active');
        blurOverlay.style.display = 'none';
    }
});

// Handle menu item clicks
dropdownContent.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Add your navigation logic here
        dropdownContent.classList.remove('active');
        navbar.classList.remove('dropdown-active');
        blurOverlay.style.display = 'none';
    });
});

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
    const submitButton = consultationForm.querySelector('button[type="submit"]');
    const formContent = document.getElementById('formContent');
    const successContent = document.getElementById('successContent');

    // Popup Event Listeners
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('CTA Button clicked');
            e.preventDefault();
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Handle form submission via submit button click
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Submit button clicked');
        
        // Get form data
        const formData = new FormData(consultationForm);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Form data:', data);

        // Hide form and show success message
        formContent.style.display = 'none';
        successContent.style.display = 'block';
        
        // Close popup after 3 seconds
        setTimeout(() => {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset form and content after popup closes
            setTimeout(() => {
                formContent.style.display = 'block';
                successContent.style.display = 'none';
                consultationForm.reset();
            }, 300);
        }, 3000);
    });

    // Close popup handlers
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

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
            consultationForm.reset();
        }
    });
});

// Partners Slider
const partnersSwiper = new Swiper('.swiper', {
    slidesPerView: 4,
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

// // Remove old event listeners
const prevButton = document.querySelector('.custom-prev');
const nextButton = document.querySelector('.custom-next');

// Tabs Implementation
const tabLinks = document.querySelectorAll('#tabs a');
const tabContents = document.querySelectorAll('#content > div');

// Function to reorder tabs
function reorderTabs(activeTab) {
    const tabsList = document.getElementById('tabs');
    const activeTabLi = activeTab.parentElement;
    
    // If active tab's li is not the first child, reorder
    if (activeTabLi !== tabsList.firstElementChild) {
        tabsList.insertBefore(activeTabLi, tabsList.firstElementChild);
    }
}

// Hide all content initially
tabContents.forEach(content => {
    content.style.display = 'none';
});

// Show first content by default
if (tabContents[0]) {
    tabContents[0].style.display = 'block';
    if (tabLinks[0]) {
        tabLinks[0].parentElement.setAttribute('id', 'current');
        reorderTabs(tabLinks[0]);
    }
}

// Add click event listeners to tabs
tabLinks.forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove current class from all tabs
        tabLinks.forEach(t => t.parentElement.removeAttribute('id'));
        
        // Add current class to clicked tab
        this.parentElement.setAttribute('id', 'current');
        
        // Reorder tabs to put active one first
        reorderTabs(this);
        
        // Hide all content
        tabContents.forEach(content => {
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
    loop: false,
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
