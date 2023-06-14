document.addEventListener('DOMContentLoaded', function () {
    // Initialize modal
    const modal = document.getElementById('modal');
    const modalInstance = M.Modal.init(modal);

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

    // Open modal when "Update Info" button is clicked
    const updateInfoBtn = document.getElementById('update-info-btn');
    updateInfoBtn.addEventListener('click', function () {
        modalInstance.open();
    });

    // Save updated information
    const saveBtn = document.getElementById('save-btn');
    saveBtn.addEventListener('click', function () {
        nameField.value = document.getElementById('edit-name').value;
        bioField.value = document.getElementById('edit-bio').value;
        websiteField.value = document.getElementById('edit-website').value;
        industryField.value = document.getElementById('edit-industry').value;
        emailField.value = document.getElementById('edit-email').value;
        modalInstance.close();
    });

    // Open change password modal
    const changePasswordBtn = document.createElement('button');
    changePasswordBtn.classList.add('btn', 'waves-effect', 'waves-light');
    changePasswordBtn.textContent = 'Change Password';
    changePasswordBtn.addEventListener('click', function () {
        changePasswordModalInstance.open();
    });

    updateInfoBtn.parentNode.insertBefore(changePasswordBtn, updateInfoBtn.nextSibling);

    // Change password modal
    const changePasswordModal = document.getElementById('change-password-modal');
    const changePasswordModalInstance = M.Modal.init(changePasswordModal);

    const changePasswordSaveBtn = document.getElementById('change-password-save-btn');
    changePasswordSaveBtn.addEventListener('click', function () {
        const oldPassword = document.getElementById('old-password').value;
        const newPassword = document.getElementById('new-password').value;
        console.log('Old Password:', oldPassword);
        console.log('New Password:', newPassword);
        changePasswordModalInstance.close();
    });

    // Dynamic list for phone numbers
    const phoneNumbersList = document.getElementById('phone-numbers-list');
    const addPhoneNumberBtn = document.getElementById('add-phone-number-btn');
    const newPhoneNumberInput = document.getElementById('new-phone-number');

    addPhoneNumberBtn.addEventListener('click', function () {
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

            removeBtn.addEventListener('click', function () {
                listItem.remove();
            });

            listItem.appendChild(phoneNumberElement);
            listItem.appendChild(removeBtn);
            phoneNumbersList.appendChild(listItem);
            newPhoneNumberInput.value = '';
        }
    });
});