// Sign in / Sign up handlers and animations
const authCard = document.getElementById('authCard');
const authPanels = document.getElementById('authPanels');

const showSignUp = document.getElementById('showSignUp');
const showSignIn = document.getElementById('showSignIn');

const sendOtpBtn = document.getElementById('sendOtpBtn');
const phoneInput = document.getElementById('phoneInput');
const resultSignIn = document.getElementById('resultSignIn');

const signupBtn = document.getElementById('signupBtn');
const signupName = document.getElementById('signupName');
const signupEmail = document.getElementById('signupEmail');
const signupPhone = document.getElementById('signupPhone');
const signupNameError = document.getElementById('signupNameError');
const signupEmailError = document.getElementById('signupEmailError');
const signupPhoneError = document.getElementById('signupPhoneError');
const resultSignUp = document.getElementById('resultSignUp');

function shiftToSignUp() {
  if (!authCard) return;
  // animate height from current to target, then slide
  const fromH = authCard.offsetHeight;
  const targetPanel = document.getElementById('signUpPanel');
  const toH = targetPanel ? targetPanel.scrollHeight + 32 : fromH; // padding buffer
  authCard.style.height = fromH + 'px';
  // force reflow
  void authCard.offsetHeight;
  authCard.style.height = toH + 'px';
  authCard.classList.add('auth-shift-left');
  // toggle aria after short delay so screen readers notice the change
  setTimeout(() => {
    const si = document.getElementById('signInPanel');
    if (si) si.setAttribute('aria-hidden', 'true');
    if (targetPanel) {
      targetPanel.removeAttribute('aria-hidden');
      const nameInput = document.getElementById('signupName');
      if (nameInput) nameInput.focus({ preventScroll: true });
    }
  }, 80);
}

function shiftToSignIn() {
  if (!authCard) return;
  const fromH = authCard.offsetHeight;
  const targetPanel = document.getElementById('signInPanel');
  const toH = targetPanel ? targetPanel.scrollHeight + 32 : fromH;
  authCard.style.height = fromH + 'px';
  void authCard.offsetHeight;
  authCard.style.height = toH + 'px';
  authCard.classList.remove('auth-shift-left');
  setTimeout(() => {
    const su = document.getElementById('signUpPanel');
    if (su) su.setAttribute('aria-hidden', 'true');
    if (targetPanel) targetPanel.removeAttribute('aria-hidden');
    const phone = document.getElementById('phoneInput');
    if (phone) phone.focus({ preventScroll: true });
  }, 80);
}

if (showSignUp) showSignUp.addEventListener('click', (e) => { e.preventDefault(); shiftToSignUp(); });
if (showSignIn) showSignIn.addEventListener('click', (e) => { e.preventDefault(); shiftToSignIn(); });

// Clean up inline height after transitions
if (authCard) {
  authCard.addEventListener('transitionend', (ev) => {
    if (ev.propertyName === 'transform' || ev.propertyName === 'height') {
      authCard.style.height = '';
    }
  });
}

// Sign-in (OTP) handler
if (sendOtpBtn && phoneInput) {
  sendOtpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (resultSignIn) { resultSignIn.textContent = ''; resultSignIn.style.color = ''; }

    const raw = phoneInput.value.replace(/\s+/g, '');
    if (!raw || raw.length < 5 || !/^\d+$/.test(raw)) {
      if (resultSignIn) { resultSignIn.textContent = 'Enter a valid phone number.'; resultSignIn.style.color = '#dc2626'; }
      return;
    }

    sendOtpBtn.disabled = true;
    const original = sendOtpBtn.innerHTML;
    sendOtpBtn.innerHTML = 'Sending...';

    // Simulate network delay — replace with actual API call
    setTimeout(() => {
      sendOtpBtn.disabled = false;
      sendOtpBtn.innerHTML = original;
      if (resultSignIn) { resultSignIn.style.color = '#166534'; resultSignIn.textContent = `OTP sent to +62 ${phoneInput.value.trim()}`; }
    }, 900);
  });
}

// Sign-up handler
if (signupBtn && signupName && signupEmail && signupPhone) {
  signupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // clear errors
    signupNameError.textContent = '';
    signupEmailError.textContent = '';
    signupPhoneError.textContent = '';
    if (resultSignUp) { resultSignUp.textContent = ''; resultSignUp.style.color = ''; }

    let ok = true;
    const name = signupName.value.trim();
    const email = signupEmail.value.trim();
    const phone = signupPhone.value.replace(/\s+/g, '').trim();

    if (!name) { signupNameError.textContent = 'Name is required.'; ok = false; }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { signupEmailError.textContent = 'Enter a valid email.'; ok = false; }
    if (!phone || phone.length < 5 || !/^\d+$/.test(phone)) { signupPhoneError.textContent = 'Enter a valid phone number.'; ok = false; }

    if (!ok) return;

    signupBtn.disabled = true;
    const orig = signupBtn.innerHTML;
    signupBtn.innerHTML = 'Creating...';

    setTimeout(() => {
      signupBtn.disabled = false;
      signupBtn.innerHTML = orig;
      if (resultSignUp) { resultSignUp.style.color = '#166534'; resultSignUp.textContent = `Account created for ${name}. OTP sent to +62 ${signupPhone.value.trim()}`; }
      // Optionally switch back to sign-in after creating
      // shiftToSignIn();
    }, 900);
  });
}
