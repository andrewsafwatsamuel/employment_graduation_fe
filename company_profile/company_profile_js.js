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
    const industryField = document.getElementById('industry');
    const emailField = document.getElementById('email');

    document.getElementById('edit-name').value = nameField.value;
    document.getElementById('edit-bio').value = bioField.value;
    document.getElementById('edit-website').value = websiteField.value;
    document.getElementById('edit-industry').value = industryField.value;
    document.getElementById('edit-email').value = emailField.value;


    const ChangePasswordBtn = document.getElementById('add-phone-number-btn')
    // Open modal when "Update Info" button is clicked
    const updateInfoBtn = document.getElementById('update-info-btn');
    // 
    updateInfoBtn.addEventListener('click', () => {
        modalInstance.open();
    });

    // Save updated information
    const saveBtn = document.getElementById('save-btn');
    saveBtn.addEventListener('click', () => {
        nameField.value = document.getElementById('edit-name').value;
        bioField.value = document.getElementById('edit-bio').value;
        websiteField.value = document.getElementById('edit-website').value;
        industryField.value = document.getElementById('edit-industry').value;
        emailField.value = document.getElementById('edit-email').value;
        modalInstance.close();
    });

    // draw the button if the company is the user
    if (current_user_session['user_type'].toLowerCase() == "company"){draw_change_password(updateInfoBtn)}
    if (current_user_session['user_type'].toLowerCase() != "company"){
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