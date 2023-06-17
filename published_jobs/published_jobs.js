const resultsDiv = document.getElementById("results"); // holding the result div

const session_data = JSON.parse(sessionStorage.getItem('session_data')) //getting the stored user session to
get_published_jobs(session_data['auth_token']) // getting the auth token from the session data

const jobTitleField = document.getElementById('editJobTitle')
const jobDescriptionField = document.getElementById('editJobDescription')
const jobExperiencesField = document.getElementById('editExperienceLevel')
const jobStatusField = document.getElementById('editJobStatus')
const createJobBtn = document.getElementById("saveJobDetailsBtn")
const modal = document.getElementById('editJobModal');
const modalInstance = M.Modal.init(modal);

// Modal initialization of the Create New Job Button
document.addEventListener('DOMContentLoaded', function () {
	const modalBtn = document.querySelector('.modal-trigger');

	modalBtn.addEventListener('click', function () {
		modalInstance.open();
	});

	// Initialize the dropdown select
	const selectElement = document.getElementById('editExperienceLevel');
	const selectInstance = M.FormSelect.init(selectElement);
	const selectElementJob = document.getElementById('editJobStatus')
	const selectinstanceJob = M.FormSelect.init(selectElementJob)
});

createJobBtn.addEventListener("click", () => {
	add_new_job(jobExperiencesField.value,
				jobTitleField.value,
				jobStatusField.value.toLowerCase() == 'open'? 1 : 0,
				jobDescriptionField.value, () => {
					location.reload();
					modalInstance.close()
				})
	console.log(jobStatusField.value)
	

})

function fill_jobs(jobs) {
	jobs.forEach((job) => {
		const jobCard = document.createElement("div"); // create new div
		jobCard.classList.add("job-card"); // apply the css style on the card

		jobCard.addEventListener("click", () => {
			const jsonString = JSON.stringify(job);
			window.location.href = '../job_info/job_info.html?job=' + encodeURIComponent(jsonString); // give it to the job details page to view the job descriptions
		});

		const jobDetails = document.createElement("div"); // creating a new div in the Parent div (Job card)
		jobDetails.classList.add("job-details");

		// creating and getting the job details info
		const jobTitle = document.createElement("div");
		jobTitle.classList.add("job-title");
		jobTitle.textContent = job.title;

		const jobDescription = document.createElement("div");
		jobDescription.classList.add("job-description");
		jobDescription.textContent = job.description;

		const jobExpLevel = document.createElement("div");
		jobExpLevel.classList.add("job-exp-level");
		jobExpLevel.textContent = `Experience Level: ${job.exp_level}`;

		// appending the details and the result to the parent 
		jobDetails.appendChild(jobTitle);
		jobDetails.appendChild(jobDescription);
		jobDetails.appendChild(jobExpLevel);

		jobCard.appendChild(jobDetails);
		resultsDiv.appendChild(jobCard);
	});

}


function no_jobs_found() {
	const jobCard = document.createElement("div");
	jobCard.classList.add("job-card-empty", "empty-response");

	const message = document.createElement("p");
	message.classList.add("message");
	message.textContent = 'No jobs found';

	jobCard.appendChild(message);
	resultsDiv.appendChild(jobCard);
}


async function get_published_jobs(auth_token) {
	const response = await fetch('http://localhost:5000/companies/published-jobs', {
		method: 'GET',
		headers: {
			'Authorization': auth_token
		}
	});
	if (response.ok) {
		const published_jobs = await response.json(); // get the json of the jobs from the response endpoint
		if (published_jobs.hasOwnProperty('message')) { // if there is message then no jobs found
			no_jobs_found()
		}
		else {
			fill_jobs(published_jobs) // draw the html cards jobs
		}
	} else {
		const error_response = await response.text();

		console.log(`Error: ${error_response}`);
	}

}

// add_new_job('Intern', 'Senior Software Engineer', 1, 'asdwqeoasjfnaasdwae', () => {
// 	console.log('Success')
// })

async function add_new_job(exp_level, title, status, description, on_success) {
    var formData = new FormData();
    formData.append('exp_level', exp_level);
	formData.append('title', title)
	formData.append('status', status)
	formData.append('description', description)
    const response = await fetch('http://localhost:5000/job-listing/add-new-job',
        {
            method: 'POST',
            headers: {
                'Authorization': session_data['auth_token']
            },
            body: formData
        });
    if (response.ok) {
        const add_phone_response = await response.json(); // get the json of the jobs from the response endpoint
        on_success()
    } else {
        const error_response = await response.text();

        console.log(`Error: ${error_response}`);
    }

}