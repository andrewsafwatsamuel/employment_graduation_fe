
var chips = document.querySelectorAll('.chip');
var loginForm = document.getElementById('login-form');
var email_input = document.getElementById('email_input');
var password_input = document.getElementById('password_input');

// Add event listeners to chips
chips.forEach(function (chip) {
  chip.addEventListener('click', function () {
    if (!this.classList.contains('active')) {
      chips.forEach(function (c) {
        c.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// Handle form submission
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();

  login();
  
})

async function login() {
  var formData = new FormData();
  formData.append("email", email_input.value);
  formData.append("password", password_input.value);
  
  const response = await fetch('http://127.0.0.1:5000/employees/login', {
    method: 'POST',
    body: formData,
  });
  
  if (response.ok) {
    const myJson = await response.json();
    console.log(myJson);
  } else {
    console.log(`Error: ${response.status}`);
  }
}