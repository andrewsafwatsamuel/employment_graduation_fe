const current_user_session = JSON.parse(sessionStorage.getItem('session_data'))
console.log(sessionStorage.getItem('session_data'))
// sessionStorage.setItem("session_data", JSON.stringify(session_data));



document.addEventListener('DOMContentLoaded', () => {
    // Initialize modal
    const modal = document.getElementById('modal'); // getting the modal id from the html
    const modalInstance = M.Modal.init(modal); // intilize the modal from the google MD and save it to use it later

    // Fill fields with initial values
    const nameField = document.getElementById('name');
    const bioField = document.getElementById('bio');
    const websiteField = document.getElementById('website');
    const fbpageField = document.getElementById('fbpage');
    const industryField = document.getElementById('industry');
    const emailField = document.getElementById('email');

    // getting the company info from the database
    get_company_profile((json) => {
        nameField.value = json["name"];
        bioField.value = json["about"];
        websiteField.value = json["website"];
        fbpageField.value = json["fbPage"];
        industryField.value = json["industry"];
        emailField.value = json["email"]
        document.getElementById('edit-name').value = nameField.value;
        document.getElementById('edit-bio').value = bioField.value;
        document.getElementById('edit-website').value = websiteField.value;
        document.getElementById('edit-fbpage').value = fbpageField.value;
        document.getElementById('edit-industry').value = industryField.value;
        document.getElementById('edit-email').value = emailField.value;
    })



    const ChangePasswordBtn = document.getElementById('add-phone-number-btn')
    // Open modal when "Update Info" button is clicked
    const updateInfoBtn = document.getElementById('update-info-btn');
    // 
    updateInfoBtn.addEventListener('click', () => {
        modalInstance.open();
    });

    // update the company info with the modal
    // Save updated information
    const saveBtn = document.getElementById('save-btn');
    saveBtn.addEventListener('click', () => {
        nameField.value = document.getElementById('edit-name').value;
        bioField.value = document.getElementById('edit-bio').value;
        websiteField.value = document.getElementById('edit-website').value;
        fbpageField.value = document.getElementById('edit-fbpage').value;
        industryField.value = document.getElementById('edit-industry').value;
        emailField.value = document.getElementById('edit-email').value;
        update_company_profile(nameField.value, industryField.value, emailField.value, fbpageField.value, bioField.value, websiteField.value,(json) => {
            nameField.value = json["name"];
            bioField.value = json["about"];
            websiteField.value = json["website"];
            fbpageField.value = json["fbPage"];
            industryField.value = json["industry"];
            emailField.value = json["email"]
            document.getElementById('edit-name').value = nameField.value;
            document.getElementById('edit-bio').value = bioField.value;
            document.getElementById('edit-website').value = websiteField.value;
            document.getElementById('edit-fbpage').value = fbpageField.value;
            document.getElementById('edit-industry').value = industryField.value;
            document.getElementById('edit-email').value = emailField.value;
        })
        modalInstance.close();
    });









    // draw the button if the company is the user
    if (current_user_session['user_type'].toLowerCase() == "company") { draw_change_password(updateInfoBtn) }
    if (current_user_session['user_type'].toLowerCase() != "company") {
        updateInfoBtn.style.display = "none";
        ChangePasswordBtn.style.display = "none";
    }
    // Dynamic list for phone numbers
    const phoneNumbersList = document.getElementById('phone-numbers-list');
    const addPhoneNumberBtn = document.getElementById('add-phone-number-btn');
    const newPhoneNumberInput = document.getElementById('new-phone-number');

    addPhoneNumberBtn.addEventListener('click', () => {
        const phoneNumber = newPhoneNumberInput.value;
        if (phoneNumber !== '') {
            const listItem = document.createElement('li');
            listItem.classList.add('collection-item', 'phone-number-item');

            const phoneNumberElement = document.createElement('span');
            phoneNumberElement.classList.add('phone-number');
            phoneNumberElement.textContent = phoneNumber;

            const removeBtn = document.createElement('i');
            removeBtn.classList.add('material-icons', 'remove-btn');
            removeBtn.textContent = 'close';

            removeBtn.addEventListener('click', () => {
                listItem.remove();
            });

            listItem.appendChild(phoneNumberElement);
            listItem.appendChild(removeBtn);
            phoneNumbersList.appendChild(listItem);
            newPhoneNumberInput.value = '';
        }
    });
});

function draw_change_password(updateInfoBtn) {
    const changePasswordBtn = document.createElement('button'); //creating the button
    changePasswordBtn.classList.add('btn', 'waves-effect', 'waves-light'); //giving it css styles
    changePasswordBtn.textContent = 'Change Password';
    changePasswordBtn.addEventListener('click', () => {
        changePasswordModalInstance.open();
    });

    updateInfoBtn.parentNode.insertBefore(changePasswordBtn, updateInfoBtn.nextSibling);

    // Change password modal
    const changePasswordModal = document.getElementById('change-password-modal');
    const changePasswordModalInstance = M.Modal.init(changePasswordModal);

    const changePasswordSaveBtn = document.getElementById('change-password-save-btn');
    changePasswordSaveBtn.addEventListener('click', () => {
        const oldPassword = document.getElementById('old-password').value;
        const newPassword = document.getElementById('new-password').value;
        console.log('Old Password:', oldPassword);
        console.log('New Password:', newPassword);
        changePasswordModalInstance.close();
    });
}

// getting company profile data from the endpoint
//get_company_profile()
async function get_company_profile(on_success) {
    const response = await fetch('http://localhost:5000/companies/' + current_user_session["owner_id"],
        {
            method: 'GET'
        });
    if (response.ok) {
        const company_profile = await response.json(); // get the json of the jobs from the response endpoint
        on_success(company_profile)
        console.log(JSON.stringify(company_profile))

    } else {
        const error_response = await response.text();

        console.log(`Error: ${error_response}`);
    }

}


// updating the profile
//update_company_profile("Ahmed Mostafa", "Electro", "ahmed.mostafa@gmail.com", "www.facebook.com/ahmedmostafa", "ahmed mostafa bio", 'www.ahmedmostsafa.com')
async function update_company_profile(name, industry, email, fbPage, about, website, on_success) {
    var formData = new FormData();
    formData.append("name", name);
    formData.append("industry", industry);
    formData.append("email", email);
    formData.append("fbPage", fbPage);
    formData.append("about", about);
    formData.append("website", website);
    const response = await fetch('http://localhost:5000/companies/update-profile',
        {
            method: 'PUT',
            headers: {
                'Authorization': current_user_session['auth_token']
            },
            body: formData
        });
    if (response.ok) {
        const update_profile_response = await response.json(); // get the json of the jobs from the response endpoint
        console.log(JSON.stringify(update_profile_response))
        on_success(update_profile_response)
    } else {
        const error_response = await response.text();

        console.log(`Error: ${error_response}`);
    }

}
//update_company_password('anamostafA@123', 'mostafA@123')
async function update_company_password(old_password, new_password) {
    var formData = new FormData();
    formData.append('old-password', old_password);
    formData.append('new-password', new_password);
    const response = await fetch('http://localhost:5000/companies/update-password',
        {
            method: 'PUT',
            headers: {
                'Authorization': current_user_session['auth_token']
            },
            body: formData
        });
    if (response.ok) {
        const published_jobs = await response.json(); // get the json of the jobs from the response endpoint
        console.log(JSON.stringify(published_jobs))
    } else {
        const error_response = await response.text();

        console.log(`Error: ${error_response}`);
    }

}

//add_company_phone('01154875268')
async function add_company_phone(new_phone) {
    var formData = new FormData();
    formData.append('phone', new_phone);
    const response = await fetch('http://localhost:5000/companies/add-phone',
        {
            method: 'POST',
            headers: {
                'Authorization': current_user_session['auth_token']
            },
            body: formData
        });
    if (response.ok) {
        const published_jobs = await response.json(); // get the json of the jobs from the response endpoint
        console.log(JSON.stringify(published_jobs))
    } else {
        const error_response = await response.text();

        console.log(`Error: ${error_response}`);
    }

}
//remove_company_phone('01154875268')
async function remove_company_phone(remove_phone) {
    var formData = new FormData();
    formData.append('phone', remove_phone);
    const response = await fetch('http://localhost:5000/companies/remove-phone',
        {
            method: 'DELETE',
            headers: {
                'Authorization': current_user_session['auth_token']
            },
            body: formData
        });
    if (response.ok) {
        const published_jobs = await response.json(); // get the json of the jobs from the response endpoint
        console.log(JSON.stringify(published_jobs))
    } else {
        const error_response = await response.text();

        console.log(`Error: ${error_response}`);
    }

}