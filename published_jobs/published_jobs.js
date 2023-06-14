const jobs = [
	{
	  company: "el company",
	  description: "Ninjaaaaaaa one",
	  exp_level: "Senior",
	  id: 1,
	  title: "Android Ninja",
	  status: 1,
	},
	{
	  company: "el company",
	  description: "Ninjaaaaaaa two",
	  exp_level: "Junior",
	  id: 2,
	  title: "Web Developer",
	  status: 1,
	},
	{
	  company: "el company",
	  description: "Ninjaaaaaaa three",
	  exp_level: "Mid",
	  id: 3,
	  title: "Data Scientist",
	  status: 1,
	},
  ];
  
  const resultsDiv = document.getElementById("results");
  
  jobs.forEach((job) => {
	const jobCard = document.createElement("div");
	jobCard.classList.add("job-card");

	jobCard.addEventListener("click", () => {
		// Perform actions when the job card is clicked
		console.log("Job card clicked! Job ID: " + job.id);
		// Replace the console.log statement with your desired functionality
	  });
  
	const jobDetails = document.createElement("div");
	jobDetails.classList.add("job-details");
  
	const jobTitle = document.createElement("div");
	jobTitle.classList.add("job-title");
	jobTitle.textContent = job.title;
  
	const jobCompany = document.createElement("div");
	jobCompany.classList.add("job-company");
	jobCompany.textContent = job.company;
  
	const jobDescription = document.createElement("div");
	jobDescription.classList.add("job-description");
	jobDescription.textContent = job.description;
  
	const jobExpLevel = document.createElement("div");
	jobExpLevel.classList.add("job-exp-level");
	jobExpLevel.textContent = `Experience Level: ${job.exp_level}`;
  
	jobDetails.appendChild(jobTitle);
	jobDetails.appendChild(jobCompany);
	jobDetails.appendChild(jobDescription);
	jobDetails.appendChild(jobExpLevel);
  
	jobCard.appendChild(jobDetails);
	resultsDiv.appendChild(jobCard);
  });
