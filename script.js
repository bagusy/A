const result = document.getElementById('result');

// OTP form handler
const sendOtpBtn = document.getElementById('sendOtpBtn');
const phoneInput = document.getElementById('phoneInput');

if (sendOtpBtn && phoneInput) {
  sendOtpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (result) { result.textContent = ''; result.style.color = ''; }

    const raw = phoneInput.value.replace(/\s+/g, '');
    if (!raw || raw.length < 5 || !/^\d+$/.test(raw)) {
      if (result) { result.textContent = 'Enter a valid phone number.'; result.style.color = '#dc2626'; }
      return;
    }

    sendOtpBtn.disabled = true;
    const original = sendOtpBtn.innerHTML;
    sendOtpBtn.innerHTML = 'Sending...';

    // Simulate network delay — replace with actual API call
    setTimeout(() => {
      sendOtpBtn.disabled = false;
      sendOtpBtn.innerHTML = original;
      if (result) { result.style.color = '#166534'; result.textContent = `OTP sent to +62 ${phoneInput.value.trim()}`; }
    }, 900);
  });
}

// Keep behavior safe if legacy form exists — do nothing extra
