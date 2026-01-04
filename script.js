const form = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const result = document.getElementById('result');
const togglePwd = document.getElementById('togglePwd');

function validate() {
  let ok = true;
  emailError.textContent = '';
  passwordError.textContent = '';

  if (!email.value) {
    emailError.textContent = 'Email is required.';
    ok = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    emailError.textContent = 'Enter a valid email.';
    ok = false;
  }

  if (!password.value) {
    passwordError.textContent = 'Password is required.';
    ok = false;
  } else if (password.value.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters.';
    ok = false;
  }

  return ok;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  result.textContent = '';

  if (!validate()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing in...';

  // Example: replace with real fetch to your auth endpoint
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign in';
    result.textContent = 'Login simulated — implement server-side auth.';
  }, 900);
});

// Toggle password visibility
if (togglePwd) {
  togglePwd.addEventListener('click', () => {
    const show = password.type === 'password';
    password.type = show ? 'text' : 'password';
    togglePwd.textContent = show ? '🙈' : '👁️';
    togglePwd.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
}
