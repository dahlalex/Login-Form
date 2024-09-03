const loginForm = document.getElementById('login-form');
const loginUsername = document.getElementById('login-username');
const loginPassword = document.getElementById('login-password');
const loginErrorMessage = document.getElementById('login-error-message');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const auth = window.btoa(`${loginUsername.value}:${loginPassword.value}`);
  fetch('https://example.com', {
    method: 'GET',
    headers: {
      Authorization: `Basic ${auth}`
    }
  }).then(res => {
    if (!res.ok) {
      throw new Error('Inloggning misslyckades.');
    }
    return res.json();
  })
    .then(data => console.log(data))
    .catch(error => {
      loginErrorMessage.textContent = error.message;
      loginErrorMessage.style.visibility = 'visible';
    });
});
// Clear inputs and error message when clicking outside the form
document.addEventListener('click', (e) => {
  if (!loginForm.contains(e.target)) {
    loginUsername.value = '';
    loginPassword.value = '';
    loginErrorMessage.style.visibility = 'hidden';
  }
});
