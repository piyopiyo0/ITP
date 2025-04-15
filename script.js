// Dropdown menu functionality
const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');
const navbar = document.querySelector('.navbar');
const blurOverlay = document.querySelector('.blur-overlay');
const dropdownLink = document.querySelector('.dropdown-trigger');

// Handle dropdown click
dropdownLink.addEventListener('click', function(e) {
    e.preventDefault();
    dropdownContent.classList.toggle('active');
    navbar.classList.toggle('dropdown-active');
    blurOverlay.style.display = dropdownContent.classList.contains('active') ? 'block' : 'none';
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target) && dropdownLink !== e.target) {
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
        // Close the dropdown
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
    const blurOverlay = document.querySelector('.blur-overlay');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        // Toggle blur overlay
        blurOverlay.style.display = mobileMenu.classList.contains('active') ? 'block' : 'none';
        // Prevent body scrolling when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            blurOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Mobile dropdown functionality
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    const mobileDropdownContent = document.querySelector('.mobile-dropdown-content');

    if (mobileDropdownToggle && mobileDropdownContent) {
        mobileDropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileDropdownToggle.classList.toggle('active');
            
            if (mobileDropdownContent.style.maxHeight) {
                mobileDropdownContent.style.maxHeight = null;
            } else {
                mobileDropdownContent.style.maxHeight = mobileDropdownContent.scrollHeight + "px";
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileDropdownToggle.contains(e.target) && !mobileDropdownContent.contains(e.target)) {
                mobileDropdownToggle.classList.remove('active');
                mobileDropdownContent.style.maxHeight = null;
            }
        });
    }

    // Close mobile menu when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            blurOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            blurOverlay.style.display = 'none';
            document.body.style.overflow = '';
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
const partnersSwiper = new Swiper('.partners-swiper', {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    autoplay: false,
    navigation: {
        prevEl: '.custom-next',
        nextEl: '.custom-prev',
    },
    breakpoints: {
        // Mobile - 1 slide
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        // Tablet - 3 slides
        769: {
            slidesPerView: 3,
            spaceBetween: 15,
        },
        // Desktop - 4 slides
        1025: {
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
    
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
        // Get all tabs and convert to array for easier manipulation
        const allTabs = Array.from(tabsList.children);
        
        // First, remove current active tab from its position
        const activeIndex = allTabs.indexOf(activeTabLi);
        if (activeIndex !== -1) {
            allTabs.splice(activeIndex, 1);
        }
        
        // Create new order: put non-active tabs first, then active tab
        const newOrder = [...allTabs, activeTabLi];
        
        // Clear the tabs list
        while (tabsList.firstChild) {
            tabsList.removeChild(tabsList.firstChild);
        }
        
        // Add tabs back in new order
        newOrder.forEach(tab => {
            tabsList.appendChild(tab);
        });
    } else {
        // Desktop behavior - move to first position
        if (activeTabLi !== tabsList.firstElementChild) {
            tabsList.insertBefore(activeTabLi, tabsList.firstElementChild);
        }
    }
}

// Hide all content initially
tabContents.forEach(content => {
    content.style.display = 'none';
});

// Add click event listeners to tabs
tabLinks.forEach(tab => {
    tab.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove current class from all tabs
        tabLinks.forEach(t => t.parentElement.removeAttribute('id'));
        
        // Add current class to clicked tab
        this.parentElement.setAttribute('id', 'current');
        
        // Reorder tabs
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

// Add resize handler to maintain correct order when screen size changes
window.addEventListener('resize', () => {
    const currentTab = document.querySelector('#tabs li[id="current"] a');
    if (currentTab) {
        reorderTabs(currentTab);
    }
});

// Initialize the first tab as active on page load
if (tabLinks[0]) {
    tabLinks[0].parentElement.setAttribute('id', 'current');
    reorderTabs(tabLinks[0]);
    
    const firstContent = document.getElementById(tabLinks[0].getAttribute('title'));
    if (firstContent) {
        firstContent.style.display = 'block';
    }
}

// Solutions Slider
const solutionsSwiper = new Swiper('.solutions-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    speed: 800,
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
    effect: 'slide',
    followFinger: true,
    allowTouchMove: true,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideToClickedSlide: false,
});

// Remove any duplicate event listeners
const prevSolutionBtn = document.querySelector('.solutions-button-prev');
const nextSolutionBtn = document.querySelector('.solutions-button-next');

if (prevSolutionBtn && nextSolutionBtn) {
    // Clean up old listeners
    prevSolutionBtn.replaceWith(prevSolutionBtn.cloneNode(true));
    nextSolutionBtn.replaceWith(nextSolutionBtn.cloneNode(true));
    
    // Add new listeners
    document.querySelector('.solutions-button-prev').addEventListener('click', () => {
        solutionsSwiper.slidePrev();
    });
    
    document.querySelector('.solutions-button-next').addEventListener('click', () => {
        solutionsSwiper.slideNext();
    });
}

// Mobile dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
    const mobileDropdownContent = document.querySelector('.mobile-dropdown-content');

    if (mobileDropdownToggle && mobileDropdownContent) {
        mobileDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            mobileDropdownContent.classList.toggle('show');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-item-header');
        const body = item.querySelector('.accordion-item-body');
        const toggleBtn = item.querySelector('.accordion-toggle-btn');

        // Initially hide all accordion bodies
        if (!item.classList.contains('active')) {
            body.style.display = 'none';
        }

        header.addEventListener('click', (e) => {
            // Prevent click event if clicking on the button
            if (e.target === toggleBtn || toggleBtn.contains(e.target)) {
                return;
            }
            toggleAccordion(item);
        });

        // Separate event listener for the button
        toggleBtn.addEventListener('click', () => {
            toggleAccordion(item);
        });
    });

    function toggleAccordion(clickedItem) {
        const body = clickedItem.querySelector('.accordion-item-body');
        const isActive = clickedItem.classList.contains('active');

        // Close all other accordion items
        accordionItems.forEach(item => {
            if (item !== clickedItem && item.classList.contains('active')) {
                item.classList.remove('active');
                item.querySelector('.accordion-item-body').style.display = 'none';
            }
        });

        // Toggle current item
        if (!isActive) {
            clickedItem.classList.add('active');
            body.style.display = 'block';
        } else {
            clickedItem.classList.remove('active');
            body.style.display = 'none';
        }
    }
});