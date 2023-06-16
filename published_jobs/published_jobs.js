const resultsDiv = document.getElementById("results"); // holding the result div

const session_data = JSON.parse(sessionStorage.getItem('session_data')) //getting the stored user session to
get_published_jobs(session_data['auth_token']) // getting the auth token from the session data

async function get_published_jobs(auth_token) {
	const response = await fetch('http://localhost:5000/companies/published-jobs', {
		method: 'GET',
		headers: {
			'Authorization': auth_token
		}
	});
	if (response.ok) {
		const published_jobs = await response.json(); // get the json of the jobs from the response endpoint
		if (published_jobs.hasOwnProperty('message')) {
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

function fill_jobs(jobs) {
	jobs.forEach((job) => {
		const jobCard = document.createElement("div"); // create new div
		jobCard.classList.add("job-card"); // apply the css style on the card

		jobCard.addEventListener("click", () => {
			window.location.href = '../job_info/job_info.html?id=' + job['id'] // give it to the job details page to view the job descriptions
		});

		const jobDetails = document.createElement("div");
		jobDetails.classList.add("job-details");

		const jobTitle = document.createElement("div");
		jobTitle.classList.add("job-title");
		jobTitle.textContent = job.title;

		const jobDescription = document.createElement("div");
		jobDescription.classList.add("job-description");
		jobDescription.textContent = job.description;

		const jobExpLevel = document.createElement("div");
		jobExpLevel.classList.add("job-exp-level");
		jobExpLevel.textContent = `Experience Level: ${job.exp_level}`;

		jobDetails.appendChild(jobTitle);
		jobDetails.appendChild(jobDescription);
		jobDetails.appendChild(jobExpLevel);

		jobCard.appendChild(jobDetails);
		resultsDiv.appendChild(jobCard);
	});

}


function no_jobs_found() {
	const jobCard = document.createElement("div");
	jobCard.classList.add("job-card-empty", "empty-response"); // Apply additional CSS class for styling

	const message = document.createElement("p");
	message.classList.add("message");
	message.textContent = 'No jobs found';

	jobCard.appendChild(message);
	resultsDiv.appendChild(jobCard);
}