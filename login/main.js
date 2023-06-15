
var chips = document.querySelectorAll('.chip');
var loginForm = document.getElementById('login-form');
var email_input = document.getElementById('email_input');
var password_input = document.getElementById('password_input');
var login_button = document.getElementById('login_button')

var login_endpoint = "http://localhost:5000/companies/login";
var redirect_endpoint = '../published_jobs/published_jobs.html';
var user_type = 'company';

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
  switch (option) {
    case "Company":
      login_endpoint = 'http://localhost:5000/companies/login';
      redirect_endpoint = '../published_jobs/published_jobs.html';
      user_type = 'company';
      break;
    case "Employee":
      login_endpoint = 'http://localhost:5000/employees/login';
      redirect_endpoint = '../search-job/search-job.html';
      user_type = 'employee';
      break;
    default:
    // No op
  }
}

// Handle form submission
loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
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
    const session_data = await response.json();
    session_data['user_type']=user_type
    sessionStorage.setItem("session_data", JSON.stringify(session_data));
    window.location.replace(redirect_endpoint);
  } else {
    console.log(`Error: ${response.status}`);
  }
}

document.getElementById("registration_button").addEventListener("click", function() {
  window.location.replace("../registration/index.html");
});