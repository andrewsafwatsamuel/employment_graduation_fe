const session_data = JSON.parse(sessionStorage.getItem('session_data'))
const is_employee = session_data['user_type'].toLowerCase() == 'employee'
const is_company = session_data['user_type'].toLowerCase() == 'company'

const urlParams = new URLSearchParams(window.location.search);
const jsonString = urlParams.get("job");
console.log(jsonString)
const job = JSON.parse(jsonString);

// job info
const company_name_container = document.getElementById('company_name_container');
const company_name = document.getElementById('companyName');
const job_title = document.getElementById('jobTitle');
const job_description = document.getElementById('jobDescription');
const job_exp_level = document.getElementById('experienceLevel');
const job_status = document.getElementById('jobStatus');

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


// update hob status
btn_toggle_job_status.addEventListener('click', () => {
    toggle_update_job_status(job.id, () => {
        job['status'] = job['status'] == 1 ? 0 : 1
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
        on_success()
        const update_job_status_response = await response.json(); // get the json of the jobs from the response endpoint
        console.log(JSON.stringify(update_job_status_response))
    } else {
        const error_response = await response.text();
        console.log(`Error: ${error_response}`);
    }
}

















document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();

    // document.getElementById('companyName').innerText = 'Apple';
    // document.getElementById('jobTitle').innerText = 'Software Engineer';
    // document.getElementById('jobDescription').innerText = generateJobDescription();
    // document.getElementById('experienceLevel').innerText = 'Entry Level';

    const editExperienceLevelSelect = document.getElementById('editExperienceLevel');
    const jobStatusSelect = document.getElementById('jobStatusSelect');

    M.FormSelect.init(editExperienceLevelSelect);
    M.FormSelect.init(jobStatusSelect);
});

function generateJobDescription() {
    return 'This is a random job description.';
}

document.getElementById('applyBtn').addEventListener('click', function () {
    document.getElementById('applicationStatus').innerText = 'Application submitted';
});

const editJobModal = document.getElementById('editJobModal');
const editJobTitleInput = document.getElementById('editJobTitle');
const editJobDescriptionInput = document.getElementById('editJobDescription');
const editExperienceLevelSelect = document.querySelector('#editExperienceLevel')
const saveJobDetailsBtn = document.getElementById('saveJobDetailsBtn');
const jobTitleText = document.getElementById('jobTitle');
const jobDescriptionText = document.getElementById('jobDescription');
const experienceLevelText = document.getElementById('experienceLevel');

document.getElementById('editJobModal').addEventListener('click', function () {
    editJobTitleInput.value = jobTitleText.innerText;
    editJobDescriptionInput.value = jobDescriptionText.innerText;
    M.FormSelect.init(editExperienceLevelSelect);
    M.updateTextFields();
});

saveJobDetailsBtn.addEventListener('click', function () {
    jobTitleText.innerText = editJobTitleInput.value;
    jobDescriptionText.innerText = editJobDescriptionInput.value;
    experienceLevelText.innerText = editExperienceLevelSelect.options[editExperienceLevelSelect.selectedIndex].text;
    M.Modal.getInstance(editJobModal).close();
});