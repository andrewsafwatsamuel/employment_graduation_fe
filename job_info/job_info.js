document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();

    document.getElementById('companyName').innerText = 'Apple';
    document.getElementById('jobTitle').innerText = 'Software Engineer';
    document.getElementById('jobDescription').innerText = generateJobDescription();
    document.getElementById('experienceLevel').innerText = 'Entry Level';

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

const jobStatusModal = document.getElementById('jobStatusModal');
const jobStatusSelect = document.getElementById('jobStatusSelect');
const saveJobStatusBtn = document.getElementById('saveJobStatusBtn');
const jobStatusText = document.getElementById('jobStatus');

saveJobStatusBtn.addEventListener('click', function () {
    const selectedStatus = jobStatusSelect.value;
    jobStatusText.innerText = selectedStatus === 'open' ? 'Job Is Open' : 'Job Is Closed';
    M.Modal.getInstance(jobStatusModal).close();
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