const stored_user_session = JSON.parse(sessionStorage.getItem("session_data"));
const is_employee = stored_user_session['user_type'].toLowerCase() == 'employee'

const btn_add_experience = document.getElementById('open-modal-btn');
const change_password_container = document.getElementById('change_password');
const btn_update_profile = document.getElementById('btn-update-profile');
const btn_update_profile_save = document.getElementById('update-profile-save-button')

const name_field = document.getElementById('name')
const bio_field = document.getElementById('bio')
const title_field = document.getElementById('title')
const phone_field = document.getElementById('phone')
const email_field = document.getElementById('email')

const name_input = document.getElementById('name-input')
const bio_input = document.getElementById('bio-input')
const title_input = document.getElementById('title-input')
const phone_input = document.getElementById('phone-input')
const email_input = document.getElementById('email-input')


document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
    get_employee_profile((json) => {
        name_field.value = json['name']
        bio_field.value = json['bio']
        title_field.value = json['title']
        phone_field.value = json['phone']
        email_field.value = json['email']
        name_input.value = json['name']
        bio_input.value = json['bio']
        title_input.value = json['title']
        phone_input.value = json['phone']
        email_input.value = json['email']
    })
});

btn_update_profile_save.addEventListener('click', () => {
    update_employee_profile(
        name_input.value,
        bio_input.value,
        email_input.value,
        phone_input.value,
        title_input.value,
        () => {
            name_field.value = name_input.value
            bio_field.value = bio_input.value
            title_field.value = title_input.value
            phone_field.value = phone_input.value
            email_field.value = email_input.value
        }
    )
})

if (!is_employee) {
    btn_update_profile.style.display = 'none';
    btn_add_experience.style.display = 'none';
}

btn_update_profile.addEventListener('click', () => {
    var instance = M.Modal.getInstance(document.getElementById('update-profile-modal'));
    instance.open();
})

if (is_employee) {
    draw_change_password(change_password_container)
}

const experienceListContainer = document.getElementById("experience-list");

const experienceList = [
    {
        companyName: "Example Company 1",
        employmentType: "Full-time",
        startDate: "2020-01-01",
        endDate: "2021-12-31",
        jobTitle: "Software Engineer"
    },
    {
        companyName: "Example Company 2",
        employmentType: "Part-time",
        startDate: "2019-05-01",
        endDate: "2022-06-30",
        jobTitle: "Web Developer"
    },
    {
        companyName: "Example Company 3",
        employmentType: "Internship",
        startDate: "2022-03-15",
        endDate: "2022-09-15",
        jobTitle: "Junior Designer"
    }
];

experienceList.forEach((experience) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const companyName = document.createElement("span");
    companyName.classList.add("company-name");
    companyName.textContent = experience.companyName;

    const employmentType = document.createElement("span");
    employmentType.classList.add("employment-type");
    employmentType.textContent = experience.employmentType;

    const jobTitle = document.createElement("span");
    jobTitle.classList.add("job-title");
    jobTitle.textContent = experience.jobTitle;

    const dateRange = document.createElement("span");
    dateRange.classList.add("date-range");
    dateRange.textContent = `${experience.startDate} - ${experience.endDate}`;



    card.appendChild(companyName);
    card.appendChild(employmentType);
    card.appendChild(jobTitle);
    card.appendChild(dateRange);

    if (is_employee) {
        const deleteButton = document.createElement("div");
        deleteButton.classList.add('material-icons', 'remove-btn');
        deleteButton.textContent = 'close';
        card.appendChild(deleteButton);
    }

    experienceListContainer.appendChild(card);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    var select = document.querySelectorAll('select');
    M.FormSelect.init(select);
});

btn_add_experience.addEventListener('click', function () {
    var instance = M.Modal.getInstance(document.getElementById('modal'));
    instance.open();
});

function draw_change_password(changePasswordContainer) {
    const changePasswordBtn = document.createElement('button'); //creating the button
    changePasswordBtn.classList.add('btn', 'waves-effect', 'waves-light', 'custom-btn'); //giving it css styles
    changePasswordBtn.textContent = 'Change Password';
    changePasswordBtn.addEventListener('click', () => {
        changePasswordModalInstance.open();
    });

    changePasswordContainer.appendChild(changePasswordBtn);

    // Change password modal
    const changePasswordModal = document.getElementById('change-password-modal');
    const changePasswordModalInstance = M.Modal.init(changePasswordModal);

    const changePasswordSaveBtn = document.getElementById('change-password-save-btn');
    changePasswordSaveBtn.addEventListener('click', () => {
        const oldPassword = document.getElementById('old-password').value;
        const newPassword = document.getElementById('new-password').value;
        update_employee_password(oldPassword, newPassword, () => {
            changePasswordModalInstance.close();
        });
    });
}

// getting employee profile data from the endpoint
//get_employee_profile()
async function get_employee_profile(on_success) {
    const response = await fetch('http://localhost:5000/employees/' + stored_user_session["owner_id"],
        {
            method: 'GET'
        });
    if (response.ok) {
        const employee_profile = await response.json(); // get the json of the jobs from the response endpoint
        on_success(employee_profile)
        console.log(JSON.stringify(employee_profile))
    } else {
        const error_response = await response.text();
        console.log(`Error: ${error_response}`);
    }
}

// updating the profile
async function update_employee_profile(name, bio, email, phone, title, on_success) {
    var formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("title", title);

    const response = await fetch('http://localhost:5000/employees/update-profile',
        {
            method: 'PUT',
            headers: {
                'Authorization': stored_user_session['auth_token']
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

async function update_employee_password(old_password, new_password, on_success) {
    var formData = new FormData();
    formData.append('old-password', old_password);
    formData.append('new-password', new_password);
    const response = await fetch('http://localhost:5000/employees/update-password',
        {
            method: 'PUT',
            headers: {
                'Authorization': stored_user_session['auth_token']
            },
            body: formData
        });
    if (response.ok) {
        const update_password_response = await response.text(); // get the json of the jobs from the response endpoint
        console.log(update_password_response)
        on_success()
    } else {
        const error_response = await response.text();

        console.log(`Error: ${error_response}`);
    }

}
