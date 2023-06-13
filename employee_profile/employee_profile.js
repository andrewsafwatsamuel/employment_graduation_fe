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
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="material-icons">delete</i>';

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