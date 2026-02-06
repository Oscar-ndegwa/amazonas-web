// Authentication functions
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    
    // Remove any existing messages
    const existingMsg = document.querySelector('.error-message, .success-message');
    if (existingMsg) existingMsg.remove();
    
    // Validate passwords match
    if (password !== passwordConfirm) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(u => u.email === email);
    
    if (userExists) {
        showMessage('An account with this email already exists', 'error');
        return;
    }
    
    // Save user to localStorage
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    showMessage('Account created successfully! You can now sign in.', 'success');
    
    // Switch to login form after 2 seconds
    setTimeout(() => {
        showLoginForm();
        document.getElementById('loginEmail').value = email;
    }, 2000);
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Remove any existing messages
    const existingMsg = document.querySelector('.error-message, .success-message');
    if (existingMsg) existingMsg.remove();
    
    // Check credentials
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showMessage('Incorrect email or password', 'error');
        return;
    }
    
    // Save logged in user
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to main page
    // Use 'shop.html' if you renamed the file, or 'index.html' if using redirect option
    window.location.href = 'shop.html';
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.textContent = message;
    
    const form = document.querySelector('.auth-form[style="display: block;"], .auth-form:not([style])');
    form.appendChild(messageDiv);
}