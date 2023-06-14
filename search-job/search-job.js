const jobs = [
	{
		"company": "el company",
		"description": "Ninjaaaaaaa one",
		"exp_level": "Senior",
		"id": 1,
		"title": "Android Ninja"
	},
	{
		"company": "el company",
		"description": "Ninjaaaaaaa one",
		"exp_level": "Senior",
		"id": 2,
		"title": "Android Ninja"
	},
	{
		"company": "el company",
		"description": "Ninjaaaaaaa one",
		"exp_level": "Senior",
		"id": 3,
		"title": "Android Ninja"
	}
];

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');

function searchJobs() {
	// Clear previous results
	resultsDiv.innerHTML = '';

	// Get search term
	const searchTerm = searchInput.value.toLowerCase();

	// Filter jobs based on search term
	const filteredJobs = jobs.filter(job => job.title.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm) || job.description.toLowerCase().includes(searchTerm));

	// Display filtered jobs
	if (filteredJobs.length > 0) {
		filteredJobs.forEach(job => {
			const jobCard = document.createElement('div');
			jobCard.classList.add('job-card');

			const jobTitle = document.createElement('div');
			jobTitle.classList.add('job-title');
			jobTitle.textContent = job.title;
			jobCard.appendChild(jobTitle);

			const jobCompany = document.createElement('div');
			jobCompany.classList.add('job-company');
			jobCompany.textContent = job.company;
			jobCard.appendChild(jobCompany);

			const jobDescription = document.createElement('div');
			jobDescription.classList.add('job-description');
			jobDescription.textContent = job.description;
			jobCard.appendChild(jobDescription);

			const jobExpLevel = document.createElement('div');
			jobExpLevel.classList.add('job-exp-level');
			jobExpLevel.textContent = `Experience Level: ${job.exp_level}`;
			jobCard.appendChild(jobExpLevel);

			resultsDiv.appendChild(jobCard);
		});
	} else {
		const noResults = document.createElement('div');
        noResults.classList.add('no-results');
        noResults.textContent = 'No results found.';
        resultsDiv.appendChild(noResults);	}
}

searchButton.addEventListener('click', searchJobs);


