

// Open the default tab on page load
document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByClassName("tab")[0].click();
});

// Handle tab switching
function openTab(evt, tabName) {
  var i, tabContent, tabLinks;

  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tabLinks = document.getElementsByClassName("tab");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  // Reset form fields on tab switch
  var form = document.querySelector("#" + tabName + " form");
  form.reset();
}

// Handle form submission
document.getElementById("company-registration-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const companyNameInput = document.getElementById("company-name");
  const industryInput = document.getElementById("industry");
  const websiteInput = document.getElementById("website");
  const aboutInput = document.getElementById("about");
  const emailInput = document.getElementById("email");
  const facebookInput = document.getElementById("facebook");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");

  var formData = new FormData();
  formData.append('name', companyNameInput.value);
  formData.append('industry', industryInput.value);
  formData.append('website', websiteInput.value);
  formData.append('about', aboutInput.value);
  formData.append('email', emailInput.value);
  formData.append('fbPage', facebookInput.value);
  formData.append('phone', phoneInput.value);
  formData.append('password', passwordInput.value);

  const registerUrl = 'http://localhost:5000/companies/register';
  const redirectOnSuccess = '../published_jobs/published_jobs.html';

  register(formData, registerUrl, redirectOnSuccess, 'company')

  // Retrieve form data and perform further actions (e.g., AJAX request)
  console.log("Form submitted!");
  console.log("Form Data:", Object.fromEntries(formData.entries()));
});


document.getElementById("employee-registration-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById('employee-name');
  const bio = document.getElementById('employee-bio');
  const phone = document.getElementById('employee-phone');
  const email = document.getElementById('employee-email');
  const title = document.getElementById('employee-title');
  const password = document.getElementById('employee-password');

  var formData = new FormData();

  formData.append('name', name.value)
  formData.append('bio', bio.value)
  formData.append('phone', phone.value)
  formData.append('email', email.value)
  formData.append('title', title.value)
  formData.append('password', password.value)

  const registerUrl = 'http://localhost:5000/employees/register';
  const redirectOnSuccess = '../search-job/search-job.html';

  register(formData, registerUrl, redirectOnSuccess, 'employee')

  console.log("Form submitted!");
  console.log("Form Data:", Object.fromEntries(formData.entries()));
});

document.getElementById("login_redirect_employee").addEventListener("click", function () {
  window.location.replace("../login/index.html");
});

document.getElementById("login_redirect_company").addEventListener("click", function () {
  window.location.replace("../login/index.html");
});

async function register(form_data, register_endpoint, redirect_on_success, user_type) {
  const response = await fetch(register_endpoint, {
    method: 'POST',
    body: form_data
  });
  if (response.ok) {
    const session_data = await response.json();
    session_data['user_type'] = user_type
    sessionStorage.setItem("session_data", JSON.stringify(session_data));
    window.location.replace(redirect_on_success);
  } else {
    const session_data = await response.text();

    console.log(`Error: ${session_data}`);
  }
}