const stored_user_session = JSON.parse(sessionStorage.getItem("session_data"));
const is_employee = stored_user_session['user_type'].toLowerCase() == 'employee'

document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
    const change_password_container = document.getElementById('change_password')


    if (is_employee) {
        draw_change_password(change_password_container)
    }
});

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

    const deleteButton = document.createElement("div");
    deleteButton.classList.add('material-icons', 'remove-btn');
    deleteButton.textContent = 'close';
    
    card.appendChild(companyName);
    card.appendChild(employmentType);
    card.appendChild(jobTitle);
    card.appendChild(dateRange);
    card.appendChild(deleteButton);
    experienceListContainer.appendChild(card);
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    var select = document.querySelectorAll('select');
    M.FormSelect.init(select);
});

document.getElementById('open-modal-btn').addEventListener('click', function () {
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
        //update_company_password(oldPassword, newPassword, () => {
        changePasswordModalInstance.close();
        //});
    });
}