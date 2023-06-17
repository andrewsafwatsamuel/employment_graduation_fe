const stored_user_session = JSON.parse(sessionStorage.getItem("session_data"));
const is_employee = stored_user_session['user_type'].toLowerCase() == 'employee'

const btn_open_add_experience = document.getElementById('open-modal-btn');
const add_exp_modal = document.getElementById('modal');
const add_exp_modal_instance = M.Modal.init(modal);
const change_password_container = document.getElementById('change_password');
const btn_update_profile = document.getElementById('btn-update-profile');
const btn_update_profile_save = document.getElementById('update-profile-save-button')

const bin_add_experience = document.getElementById('btn_add_experience')
const add_experience_company_name_input = document.getElementById('company-name-input')
const add_experience_job_title_input = document.getElementById('job-title-input')
const add_experience_employment_type_input = document.getElementById('employment-type-input')
const add_experience_start_date_input = document.getElementById('start-date-input')
const add_experience_end_date_input = document.getElementById('end-date-input')

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
        draw_experiences(json['experience'])
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
    btn_open_add_experience.style.display = 'none';
}

btn_update_profile.addEventListener('click', () => {
    var instance = M.Modal.getInstance(document.getElementById('update-profile-modal'));
    instance.open();
})

if (is_employee) {
    draw_change_password(change_password_container)
}

const experienceListContainer = document.getElementById("experience-list");



function draw_experiences(experienceList) {
    experienceList.forEach((experience) => {
        draw_experience_element(experience);
    });
}

function draw_experience_element(experience) {
    const card = document.createElement("div");
    card.classList.add("card");

    const companyName = document.createElement("span");
    companyName.classList.add("company-name");
    companyName.textContent = experience['company_name'];

    const employmentType = document.createElement("span");
    employmentType.classList.add("employment-type");
    const emp_type = experience['employment_type']
    employmentType.textContent = get_employment_type(emp_type);

    const jobTitle = document.createElement("span");
    jobTitle.classList.add("job-title");
    jobTitle.textContent = experience['title'];

    card.appendChild(companyName);
    card.appendChild(employmentType);
    card.appendChild(jobTitle);

    // Add start_date and end_date elements in a new row
    const dateRangeRow = document.createElement("div");
    dateRangeRow.classList.add("date-range");
    dateRangeRow.style.display = "flex";
    dateRangeRow.style.flexDirection = "row";

    const start_date = document.createElement("span");
    start_date.classList.add("date-range");
    const date = new Date(experience['start_date']);
    const options = { month: 'short', year: 'numeric' };
    start_date.textContent = 'Start : ' + date.toLocaleDateString('en-US', options);

    const end_date_element = document.createElement("span");
    jobTitle.classList.add("date-range");
    const end_date_json = experience['end_date']
    if (end_date_json != null) {
        const date_end = new Date(end_date_json);
        const end_date_options = { month: 'short', year: 'numeric' };
        end_date_element.textContent = ' - End : ' + date.toLocaleDateString('en-US', end_date_options);

    } else {
        end_date_element.textContent = ' - Present';
    }

    dateRangeRow.appendChild(start_date);
    dateRangeRow.appendChild(end_date_element);
    card.appendChild(dateRangeRow);

    if (is_employee) {
        const deleteButton = document.createElement("div");
        deleteButton.classList.add('material-icons', 'remove-btn');
        deleteButton.textContent = 'close';
        deleteButton.addEventListener('click',()=>{
            remove_experience(experience['id'],()=>{
                card.remove();
            })
        })
        card.appendChild(deleteButton);
    }

    experienceListContainer.appendChild(card);
}

function get_employment_type(type) {
    switch (type) {
        case 0:
            return "Full time";

        case 1:
            return "Prat time";

        case 2:
            return "Contractor";
        default:
            return null;
    }
}

btn_open_add_experience.addEventListener('click', function () {
    add_exp_modal_instance.open()

});

bin_add_experience.addEventListener('click', () => {
    console.log("kjsdlfhlkjsdahflkjsdahfaslkjfhsalkdjfhlkjsdafhlka")
    const company_name = add_experience_company_name_input.value;
    const job_title = add_experience_job_title_input.value
    const employment_type = employement_type_literal_to_int(add_experience_employment_type_input.value)
    const experience_start_date = get_date(add_experience_start_date_input.value)
    const experience_start_date_mysql = to_mysql_date(experience_start_date)
    const experience_end_date = get_date(add_experience_end_date_input.value)
    const experience_end_date_mysql = to_mysql_date(experience_end_date)
    const is_valid_end_date = (experience_end_date != null) && (experience_start_date != null) && (experience_end_date.getTime() > experience_start_date.getTime())
    toggle_invalid_end_date(is_valid_end_date);
    if (is_valid_end_date) {
        add_employee_experience(
            company_name,
            job_title,
            experience_start_date_mysql,
            experience_end_date_mysql,
            employment_type,
            (json) => {
                draw_experience_element(json)
                add_exp_modal_instance.close()
            })
    }
})

function to_mysql_date(parsed_date) {
    if (parsed_date == null) {
        return parsed_date;
    } else {
        return parsed_date.toISOString().split('T')[0];
    }
}

function get_date(date_tring) {
    if (date_tring == null || date_tring.trim() == "") {
        return null;
    } else {
        return new Date(date_tring);
    }
}

function toggle_invalid_end_date(is_valid_end_date) {
    var errorDiv = document.getElementById("exp_end_date_error");
    if (!is_valid_end_date) {
        errorDiv.classList.remove("hidden");
    } else {
        errorDiv.classList.add("hidden");
    }
}


function employement_type_literal_to_int(employment_type) {
    switch (employment_type) {
        case "full-time":
            return 0;
        case "part-time":
            return 1;
        case "contractor":
            return 2;
        default:
            return null
    }
}

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

async function add_employee_experience(company_name, title, start_date, end_date, employment_type, on_success) {
    var formData = new FormData();
    formData.append('company_name', company_name);
    formData.append('title', title);
    formData.append('start_date', start_date);
    formData.append('end_date', end_date);
    formData.append('employment_type', employment_type)
    const response = await fetch('http://localhost:5000/employees/add-experience',
        {
            method: 'POST',
            headers: {
                'Authorization': stored_user_session['auth_token']
            },
            body: formData
        });
    if (response.ok) {
        const adde_experience_response = await response.json(); // get the json of the jobs from the response endpoint
        console.log(JSON.stringify(adde_experience_response))
        on_success(adde_experience_response)
    } else {
        const error_response = await response.text();
        console.log(`Error: ${error_response}`);
    }
}

async function remove_experience(exp_id, on_success) {
    var formData = new FormData();
    formData.append('id', exp_id);
    const response = await fetch('http://localhost:5000/employees/remove-experience',
        {
            method: 'DELETE',
            headers: {
                'Authorization': stored_user_session['auth_token']
            },
            body: formData
        });
    if (response.ok) {
        const remove_experience_success = await response.json(); // get the json of the jobs from the response endpoint
        on_success()
    } else {
        const error_response = await response.text();
        console.log(`Error: ${error_response}`);
    }

}
