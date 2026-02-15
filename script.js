// ========================================
// AgriLearn Network - Complete JavaScript
// MOBILE-FRIENDLY FUNCTIONS
// Agriculture Website - IT245 Project
// Student: AARON ANNANG GALLEY (2425402882)
// ========================================

// ========================================
// MOBILE MENU TOGGLE
// ========================================
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('nav-menu');
    const toggle = document.querySelector('.nav-toggle');
    
    if (menu && toggle && menu.classList.contains('show')) {
        if (!menu.contains(event.target) && !toggle.contains(event.target)) {
            menu.classList.remove('show');
        }
    }
});

// ========================================
// CONTACT FORM VALIDATION
// ========================================
function validateContactForm(event) {
    event.preventDefault();
    
    // Get form values
    let name = document.getElementById('name')?.value.trim() || '';
    let email = document.getElementById('email')?.value.trim() || '';
    let phone = document.getElementById('phone')?.value.trim() || '';
    let message = document.getElementById('message')?.value.trim() || '';
    
    // Get feedback element
    let feedback = document.getElementById('form-feedback');
    if (!feedback) return false;
    
    // Validate name
    if (name === '') {
        feedback.style.display = 'block';
        feedback.style.color = 'red';
        feedback.innerHTML = 'Please enter your full name.';
        return false;
    }
    
    // Validate email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        feedback.style.display = 'block';
        feedback.style.color = 'red';
        feedback.innerHTML = 'Please enter a valid email address.';
        return false;
    }
    
    // Validate phone (optional but must be valid if entered)
    if (phone !== '') {
        let phonePattern = /^[0-9+\-\s]+$/;
        if (!phonePattern.test(phone)) {
            feedback.style.display = 'block';
            feedback.style.color = 'red';
            feedback.innerHTML = 'Please enter a valid phone number.';
            return false;
        }
    }
    
    // Validate message
    if (message === '') {
        feedback.style.display = 'block';
        feedback.style.color = 'red';
        feedback.innerHTML = 'Please enter your message.';
        return false;
    }
    
    // If all validation passes
    feedback.style.display = 'block';
    feedback.style.color = 'green';
    feedback.innerHTML = '✓ Message sent successfully! We will respond within 2 business days.';
    
    // Clear form
    let form = document.getElementById('contactForm');
    if (form) form.reset();
    
    return false;
}

// ========================================
// PRICE CALCULATOR
// ========================================
function calculatePrice() {
    let quantity = document.getElementById('calc-quantity')?.value;
    let price = document.getElementById('calc-price')?.value;
    let result = document.getElementById('calc-result');
    
    if (!result) return;
    
    // Validate inputs
    if (!quantity || !price || quantity <= 0 || price <= 0) {
        result.innerHTML = 'Please enter valid numbers.';
        result.style.color = 'red';
        return;
    }
    
    let total = quantity * price;
    result.innerHTML = '💰 Total Value: GHS ' + total.toFixed(2);
    result.style.color = '#2e7d32';
    result.style.fontWeight = 'bold';
}

// ========================================
// WEATHER ALERT TOGGLE
// ========================================
function toggleWeatherAlert() {
    let alert = document.getElementById('weather-alert');
    if (alert) {
        if (alert.style.display === 'none') {
            alert.style.display = 'block';
        } else {
            alert.style.display = 'none';
        }
    }
}

// ========================================
// FORUM FUNCTIONS
// ========================================
function showPostForm() {
    let form = document.getElementById('new-post-form');
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
}

function addNewPost() {
    let title = document.getElementById('new-post-title')?.value.trim();
    let content = document.getElementById('new-post-content')?.value.trim();
    let author = document.getElementById('new-post-author')?.value.trim();
    
    if (!title || !content || !author) {
        alert('Please fill in all fields to create a post.');
        return;
    }
    
    let forumPosts = document.getElementById('forum-posts');
    if (!forumPosts) return;
    
    let currentDate = new Date();
    let dateStr = currentDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
    
    let newPost = document.createElement('div');
    newPost.className = 'post';
    newPost.innerHTML = `
        <div class="post-header">
            <span class="post-author">${escapeHtml(author)}</span>
            <span class="post-date">Posted: ${dateStr}</span>
        </div>
        <h4>${escapeHtml(title)}</h4>
        <p>${escapeHtml(content)}</p>
    `;
    
    forumPosts.insertBefore(newPost, forumPosts.firstChild);
    
    // Clear form
    document.getElementById('new-post-title').value = '';
    document.getElementById('new-post-content').value = '';
    document.getElementById('new-post-author').value = '';
    
    // Hide form
    let form = document.getElementById('new-post-form');
    if (form) form.style.display = 'none';
    
    alert('✓ Your post has been added to the forum!');
}

// Helper function to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// EXPERT QUESTION
// ========================================
function submitExpertQuestion(event) {
    event.preventDefault();
    let question = document.getElementById('expert-question')?.value.trim();
    
    if (!question) {
        alert('Please enter your question.');
        return false;
    }
    
    alert('✓ Your question has been submitted. Response within 48 hours.');
    document.getElementById('expert-question').value = '';
    return false;
}

// ========================================
// SCROLL TO TOP
// ========================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll button based on scroll position
window.addEventListener('scroll', function() {
    let btn = document.getElementById('scroll-top-btn');
    if (btn) {
        if (window.scrollY > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    }
});

// ========================================
// COPYRIGHT YEAR UPDATE
// ========================================
function updateCopyrightYear() {
    let copyright = document.querySelector('.copyright p');
    if (copyright) {
        let currentYear = new Date().getFullYear();
        copyright.innerHTML = `&copy; ${currentYear} AgriLearn Network | Student: AARON ANNANG GALLEY (2425402882)`;
    }
}

// ========================================
// ACTIVE PAGE HIGHLIGHTING
// ========================================
function setActivePage() {
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let links = document.querySelectorAll('nav ul li a');
    
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ AgriLearn Network loaded - Student: AARON ANNANG GALLEY (2425402882)');
    
    // Update copyright year
    updateCopyrightYear();
    
    // Set active page in navigation
    setActivePage();
    
    // Check if price calculator exists
    if (document.getElementById('calc-result')) {
        // Calculator exists, no action needed
    }
});
