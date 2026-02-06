// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // Redirect to login page if not logged in
        // Use 'index.html' if you renamed login.html, or 'login.html' if using redirect option
        window.location.href = 'index.html';
        return;
    }
    
    // Update header with user name
    const signInElement = document.querySelector('.header-nav .nav-item');
    if (signInElement) {
        signInElement.textContent = `Hello, ${currentUser.name}`;
        signInElement.onclick = showAccountMenu;
    }
    
    // Initialize the rest of the page
    renderProducts();
    setupSearch();
});

function showAccountMenu() {
    const confirmLogout = confirm('Do you want to sign out?');
    if (confirmLogout) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

function setupSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

// Sample product data
const products = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones - Premium Sound Quality",
        price: 49.99,
        rating: 4.5,
        reviews: 1234,
        prime: true,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bose_QuietComfort_35.jpg/320px-Bose_QuietComfort_35.jpg"
    },
    {
        id: 2,
        title: "Smart Watch with Fitness Tracker and Heart Rate Monitor",
        price: 199.99,
        rating: 4.3,
        reviews: 856,
        prime: true,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Apple_Watch_Series_4.png/320px-Apple_Watch_Series_4.png"
    },
    {
        id: 3,
        title: "4K Ultra HD Smart TV - 55 Inch",
        price: 499.99,
        rating: 4.7,
        reviews: 2341,
        prime: true,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Television_set_icon.svg/320px-Television_set_icon.svg.png"
    },
    {
        id: 4,
        title: "Laptop Computer - 15.6 Inch Full HD Display",
        price: 699.99,
        rating: 4.4,
        reviews: 567,
        prime: false,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Laptop_icon.svg/320px-Laptop_icon.svg.png"
    },
    {
        id: 5,
        title: "Coffee Maker - 12 Cup Programmable",
        price: 79.99,
        rating: 4.6,
        reviews: 3421,
        prime: true,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Coffee_maker_icon.svg/240px-Coffee_maker_icon.svg.png"
    },
    {
        id: 6,
        title: "Yoga Mat - Extra Thick Exercise Mat",
        price: 24.99,
        rating: 4.8,
        reviews: 4532,
        prime: true,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Yoga_mat_icon.svg/320px-Yoga_mat_icon.svg.png"
    },
    {
        id: 7,
        title: "Gaming Mouse - RGB LED Backlit",
        price: 34.99,
        rating: 4.2,
        reviews: 890,
        prime: true,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/3-Tasten-Maus_Microsoft.jpg/320px-3-Tasten-Maus_Microsoft.jpg"
    },
    {
        id: 8,
        title: "Backpack - Water Resistant Laptop Bag",
        price: 39.99,
        rating: 4.5,
        reviews: 1678,
        prime: false,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Backpack_icon.svg/240px-Backpack_icon.svg.png"
    }
];

let cart = [];

// Function to create star rating
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '☆';
    return stars;
}

// Function to render products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image" onerror="this.src='https://via.placeholder.com/250x200?text=Product+Image'">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-rating">
                ${createStarRating(product.rating)} (${product.reviews})
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            ${product.prime ? '<div class="product-prime">Prime ✓ FREE Delivery</div>' : '<div class="product-prime">Standard Delivery</div>'}
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

// Function to add items to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        saveCart();
        alert(`${product.title} has been added to your cart!`);
    }
}

// Function to update cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    
    // Add search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
            // You can implement actual search filtering here
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
});