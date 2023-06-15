// script.js

// Open the default tab on page load
document.addEventListener("DOMContentLoaded", function() {
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
document.getElementById("company-registration-form").addEventListener("submit", function(e) {
  e.preventDefault();
  var form = e.target;
  var formData = new FormData(form);

  // Retrieve form data and perform further actions (e.g., AJAX request)
  console.log("Form submitted!");
  console.log("Form Data:", Object.fromEntries(formData.entries()));
});


document.getElementById("employee-registration-form").addEventListener("submit", function(e) {
  e.preventDefault();
  var form = e.target;
  var formData = new FormData(form);

  // Retrieve form data and perform further actions (e.g., AJAX request)
  console.log("Form submitted!");
  console.log("Form Data:", Object.fromEntries(formData.entries()));
});

document.getElementById("login_redirect_employee").addEventListener("click", function() {
  window.location.replace("../login/index.html");
});

document.getElementById("login_redirect_company").addEventListener("click", function() {
  window.location.replace("../login/index.html");
});