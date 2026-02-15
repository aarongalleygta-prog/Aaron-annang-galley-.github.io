// ========================================
// AgriLearn Network - Complete JavaScript
// All functionality for the website
// ========================================

// ========================================
// FORM VALIDATION FUNCTIONS
// ========================================

// Contact form validation
function validateContactForm(event) {
    event.preventDefault();
    
    // Get form values
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let message = document.getElementById('message').value.trim();
    
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
    
    // Clear form (optional)
    document.getElementById('contactForm').reset();
    
    return false;
}

// ========================================
// PRICE CALCULATOR FUNCTIONS
// ========================================

function calculatePrice() {
    let quantity = document.getElementById('calc-quantity').value;
    let price = document.getElementById('calc-price').value;
    
    // Validate inputs
    if (quantity === '' || price === '' || quantity <= 0 || price <= 0) {
        document.getElementById('calc-result').innerHTML = 'Please enter valid numbers.';
        document.getElementById('calc-result').style.color = 'red';
        return;
    }
    
    let total = quantity * price;
    document.getElementById('calc-result').innerHTML = 
        '💰 Total Value: GHS ' + total.toFixed(2);
    document.getElementById('calc-result').style.color = '#2e7d32';
    document.getElementById('calc-result').style.fontWeight = 'bold';
}

function addPriceCalculator() {
    let priceSection = document.querySelector('.price-analysis');
    if (priceSection && !document.getElementById('price-calculator-added')) {
        let calculatorHTML = `
            <div id="price-calculator-added" class="price-calculator">
                <h4>Quick Price Calculator</h4>
                <div style="margin: 15px 0;">
                    <label>Quantity (bags): </label>
                    <input type="number" id="calc-quantity" min="1" value="10" style="width: 100px; padding: 8px; margin-left: 10px;">
                </div>
                <div style="margin: 15px 0;">
                    <label>Price per bag (GHS): </label>
                    <input type="number" id="calc-price" min="1" value="250" style="width: 100px; padding: 8px; margin-left: 10px;">
                </div>
                <button onclick="calculatePrice()" style="background: #2e7d32; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 12pt;">
                    Calculate Total
                </button>
                <p id="calc-result" style="margin-top: 15px; font-size: 14pt;"></p>
            </div>
        `;
        priceSection.insertAdjacentHTML('beforeend', calculatorHTML);
    }
}

// ========================================
// WEATHER ALERT FUNCTIONS
// ========================================

function toggleWeatherAlert() {
    let alert = document.getElementById('weather-alert');
    if (alert) {
        let toggleBtn = document.getElementById('toggle-alert-btn');
        if (alert.style.display === 'none') {
            alert.style.display = 'block';
            if (toggleBtn) toggleBtn.innerHTML = 'Hide Weather Alert';
        } else {
            alert.style.display = 'none';
            if (toggleBtn) toggleBtn.innerHTML = 'Show Weather Alert';
        }
    }
}

function addWeatherToggle() {
    let weatherSection = document.querySelector('.weather-widget');
    if (weatherSection && !document.getElementById('toggle-alert-btn')) {
        // Ensure alert has ID
        let alert = document.querySelector('.alert');
        if (alert) {
            alert.id = 'weather-alert';
            
            let toggleBtn = document.createElement('button');
            toggleBtn.id = 'toggle-alert-btn';
            toggleBtn.innerHTML = 'Hide Weather Alert';
            toggleBtn.onclick = toggleWeatherAlert;
            toggleBtn.style.cssText = 'background: #ff9800; color: white; padding: 8px 16px; border: none; border-radius: 4px; margin-top: 10px; cursor: pointer; font-size: 12pt;';
            
            weatherSection.appendChild(toggleBtn);
        }
    }
}

// ========================================
// FARMER FORUM FUNCTIONS
// ========================================

function addNewPost() {
    let postTitle = document.getElementById('new-post-title').value.trim();
    let postContent = document.getElementById('new-post-content').value.trim();
    let postAuthor = document.getElementById('new-post-author').value.trim();
    
    if (!postTitle || !postContent || !postAuthor) {
        alert('Please fill in all fields to create a post.');
        return;
    }
    
    let forumPosts = document.querySelector('.forum-posts');
    if (forumPosts) {
        let currentDate = new Date();
        let dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        let newPost = document.createElement('div');
        newPost.className = 'post';
        newPost.innerHTML = `
            <div class="post-header">
                <span class="post-author">${postAuthor}</span>
                <span class="post-date">Posted: ${dateStr}</span>
            </div>
            <h4>${postTitle}</h4>
            <p>${postContent}</p>
            <div class="post-actions">
                <span>0 replies</span>
                <a href="#">Be the first to reply →</a>
            </div>
        `;
        
        forumPosts.insertBefore(newPost, forumPosts.firstChild);
        
        // Clear form
        document.getElementById('new-post-title').value = '';
        document.getElementById('new-post-content').value = '';
        document.getElementById('new-post-author').value = '';
        
        alert('✓ Your post has been added to the forum!');
    }
}

function showPostForm() {
    let form = document.getElementById('new-post-form');
    if (form) {
        if (form.style.display === 'none') {
            form.style.display = 'block';
        } else {
            form.style.display = 'none';
        }
    }
}

// ========================================
// DATE AND TIME FUNCTIONS
// ========================================

function updateCopyrightYear() {
    let copyright = document.querySelector('.copyright p');
    if (copyright) {
        let currentYear = new Date().getFullYear();
        copyright.innerHTML = `&copy; ${currentYear} AgriLearn Network. All rights reserved.`;
    }
}

function displayWelcomeMessage() {
    let hours = new Date().getHours();
    let greeting = '';
    
    if (hours < 12) greeting = 'Good morning';
    else if (hours < 18) greeting = 'Good afternoon';
    else greeting = 'Good evening';
    
    console.log(`${greeting}! Welcome to AgriLearn Network.`);
}

// ========================================
// SCROLL TO TOP FUNCTION
// ========================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function addScrollTopButton() {
    let footer = document.querySelector('footer');
    if (footer && !document.getElementById('scroll-top-btn')) {
        let scrollBtn = document.createElement('button');
        scrollBtn.id = 'scroll-top-btn';
        scrollBtn.innerHTML = '↑ Back to Top';
        scrollBtn.onclick = scrollToTop;
        scrollBtn.style.cssText = 'position: fixed; bottom: 30px; right: 30px; background: #2e7d32; color: white; padding: 12px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 12pt; box-shadow: 0 2px 10px rgba(0,0,0,0.2); display: none; z-index: 1000;';
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });
    }
}

// ========================================
// PRINT PAGE FUNCTION
// ========================================

function printPage() {
    window.print();
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ AgriLearn Network loaded successfully!');
    
    // Update copyright year
    updateCopyrightYear();
    
    // Display welcome message
    displayWelcomeMessage();
    
    // Add scroll to top button
    addScrollTopButton();
    
    // Get current page filename
    let currentPage = window.location.pathname.split('/').pop();
    
    // Page-specific initializations
    if (currentPage === 'contact.html') {
        // Contact page: setup form validation
        let form = document.getElementById('contactForm');
        if (form) {
            form.onsubmit = validateContactForm;
        }
        console.log('✓ Contact form validation ready');
    }
    
    if (currentPage === 'market-prices.html') {
        // Market prices page: add price calculator
        addPriceCalculator();
        console.log('✓ Price calculator added');
    }
    
    if (currentPage === 'resources.html') {
        // Resources page: add weather toggle
        addWeatherToggle();
        console.log('✓ Weather toggle added');
    }
    
    if (currentPage === 'contact.html' || currentPage === '') {
        // Contact page or home page: could add forum functionality
        console.log('✓ Community features ready');
    }
    
    // Add print button to all pages
    let mainContent = document.querySelector('main');
    if (mainContent && !document.getElementById('print-btn')) {
        let printBtn = document.createElement('button');
        printBtn.id = 'print-btn';
        printBtn.innerHTML = '🖨️ Print this page';
        printBtn.onclick = printPage;
        printBtn.style.cssText = 'background: #666; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-size: 12pt; margin: 20px 0;';
        
        mainContent.insertBefore(printBtn, mainContent.firstChild);
    }
});

// ========================================
// EXPERT QUESTION FORM
// ========================================

function submitExpertQuestion(event) {
    event.preventDefault();
    let question = document.getElementById('expert-question').value.trim();
    
    if (question === '') {
        alert('Please enter your question.');
        return;
    }
    
    alert('✓ Your question has been submitted to our expert panel. You will receive a response within 48 hours.');
    document.getElementById('expert-question').value = '';
}
