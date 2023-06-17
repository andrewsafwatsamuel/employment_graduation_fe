const session_data = JSON.parse(sessionStorage.getItem('session_data'))
const is_employee = session_data['user_type'].toLowerCase() == 'employee'
const is_company = session_data['user_type'].toLowerCase() == 'company'

const urlParams = new URLSearchParams(window.location.search);
const jsonString = urlParams.get("job");
console.log(jsonString)
var job = JSON.parse(jsonString);

// job info
const company_name_container = document.getElementById('company_name_container');
const company_name = document.getElementById('companyName');
const job_title = document.getElementById('jobTitle');
const job_description = document.getElementById('jobDescription');
const job_exp_level = document.getElementById('experienceLevel');
const job_status = document.getElementById('jobStatus');

// edit job modal
const editJobModal = document.getElementById('editJobModal');
const editJobTitleInput = document.getElementById('editJobTitle');
const editJobDescriptionInput = document.getElementById('editJobDescription');
const editExperienceLevelSelect = document.querySelector('editExperienceLevel')
const saveJobDetailsBtn = document.getElementById('saveJobDetailsBtn');
const jobTitleText = document.getElementById('jobTitle');
const jobDescriptionText = document.getElementById('jobDescription');
const experienceLevelText = document.getElementById('experienceLevel');
const status_input = document.getElementById('editJobStatus');


// employee views
const btn_apply = document.getElementById('applyBtn');
const applications_status_container = document.getElementById('application_status_container')

// company views
const btn_edit_job_details = document.getElementById('edit_job_details_btn')
const btn_toggle_job_status = document.getElementById('toggle_job_status_btn')
const btn_view_applications = document.getElementById('view_applications_btn')

// set basic job info
company_name.textContent = is_employee ? job.company : ""
job_title.textContent = job.title
job_description.textContent = job.description
job_exp_level.textContent = job.exp_level
job_status.textContent = job.status == 1 ? 'Open' : 'Closed'


if (is_company) {
    company_name_container.remove();
    applications_status_container.remove()
    btn_apply.style.display = 'none';
}

if (is_employee) {
    btn_edit_job_details.style.display = 'none';
    btn_toggle_job_status.style.display = 'none';
    btn_view_applications.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
});

// update hob status
btn_toggle_job_status.addEventListener('click', () => {
    toggle_update_job_status(job.id, (json) => {
        job['status'] = json.status
        job_status.textContent = job.status == 1 ? 'Open' : 'Closed'
    })
})

async function toggle_update_job_status(job_id, on_success) {
    var formData = new FormData();
    formData.append('id', job_id);
    const response = await fetch('http://localhost:5000/job-listing/update-status',
        {
            method: 'PUT',
            headers: {
                'Authorization': session_data['auth_token']
            },
            body: formData
        });
    if (response.ok) {
        const update_job_status_response = await response.json(); // get the json of the jobs from the response endpoint
        console.log(JSON.stringify(update_job_status_response))
        on_success(update_job_status_response)
    } else {
        const error_response = await response.text();
        console.log(`Error: ${error_response}`);
    }
}


btn_edit_job_details.addEventListener('click', () => {
    editJobModal.open();
});

saveJobDetailsBtn.addEventListener('click', () => {
    console.log(status_input.value.toLowerCase() == "open" ? 1 : 0);
    update_job_info(
        document.getElementById('editExperienceLevel').value,
        editJobDescriptionInput.value,
        editJobTitleInput.value,
        job.id,
        (status_input.value.toLowerCase() == "open" ? 1 : 0),
        (json) => {
            job = json
            company_name.textContent = is_employee ? job.company : ""
            job_title.textContent = job.title
            job_description.textContent = job.description
            job_exp_level.textContent = job.exp_level
            job_status.textContent = job.status == 1 ? 'Open' : 'Closed'
            editJobModal.close();
        }
    );

});

async function update_job_info(exp_level, discription, title, job_id, status, on_success) {
    const formData = new FormData();
    formData.append('exp_level', exp_level);
    formData.append('description', discription);
    formData.append('title', title)
    formData.append('status', status)
    const response = await fetch('http://localhost:5000/job-listing/' + job_id,
        {
            method: 'PUT',
            headers: {
                'Authorization': session_data['auth_token']
            },
            body: formData
        });
    if (response.ok) {
        const update_job_info_response = await response.json(); // get the json of the jobs from the response endpoint
        console.log(JSON.stringify(update_job_info_response))
        on_success(update_job_info_response)
    } else {
        const error_response = await response.text();
        console.log(`Error: ${error_response}`);
    }
}