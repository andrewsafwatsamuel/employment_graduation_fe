
var chips = document.querySelectorAll('.chip');
var loginForm = document.getElementById('login-form');
var email_input = document.getElementById('email_input');
var password_input = document.getElementById('password_input');
var login_button = document.getElementById('login_button')

var login_endpoint = "http://localhost:5000/companies/login";
var redirect_endpoint = null;

// Add event listeners to chips
chips.forEach(function (chip) {
  chip.addEventListener('click', function () {
    if (!this.classList.contains('active')) {
      chips.forEach(function (c) {
        c.classList.remove('active');
      });
      this.classList.add('active');
      handleSelectedOption(chip.textContent);
    }
  });
});



// Handle selected option
function handleSelectedOption(option) {
  console.log(option);
  switch (option) {
    case "Company":
      login_endpoint = 'http://localhost:5000/companies/login'
      break;
    case "Employee":
      login_endpoint = 'http://127.0.0.1:5000/employees/login'
      break;
    default:
    // No op
  }
}

// Handle form submission
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  login_button.classList.add('loading-indicator')
  login();

})

async function login() {
  var formData = new FormData();
  formData.append("email", email_input.value);
  formData.append("password", password_input.value);

  const response = await fetch(login_endpoint, {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const myJson = await response.json();
    console.log(myJson);
    //window.location.replace('../search-job/search-job.html');
  } else {
    console.log(`Error: ${response.status}`);
  }
}