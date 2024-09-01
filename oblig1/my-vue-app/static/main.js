const form = document.getElementById("projectForm");
const projectsSection = document.getElementById("articles");


//Tar imot data fra skjema og sender til serverens tomme liste
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const newProject = {
    title: event.target.elements.title.value,
    description: event.target.elements.description.value,
    technologies: event.target.elements.technologies.value,
    url: event.target.elements.url.value,
    image: event.target.elements.file.files[0] ? URL.createObjectURL(event.target.elements.file.files[0]) : null,
  };

  try {
    const response = await fetch("http://localhost:3999/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    if (response.status === 201) {
      console.log("Prosjekt lagret på serveren");
    }
  } catch (error) {
    console.error("Feil ved sending av data til serveren:", error);
  }
});


//henter data data fra json gjennom serveren og oppdaterer html

const fetchDataFromServerAndSendToHTML = async () => {
  console.log("Function called");
  const response = await fetch("http://localhost:3999/json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  
  for (const project of result) {
    const article = document.createElement("article");
    article.className = "grid-article-item";

    const img = document.createElement("img");
    img.src = project.image;
    img.alt = `Image of ${project.title}`;
    article.appendChild(img);

    const h3 = document.createElement("h3");
    h3.textContent = project.title;
    article.appendChild(h3);

    const pDesc = document.createElement("p");
    pDesc.textContent = project.description;
    article.appendChild(pDesc);

    const pTech = document.createElement("p");
    pTech.innerHTML = `Technologies: ${project.technologies}`;
    article.appendChild(pTech);

    const link = document.createElement("a");
    link.href = project.url;
    link.textContent = "Read More";
    link.className = "read-more-link";
    article.appendChild(link);

    projectsSection.appendChild(article);
  }
};

fetchDataFromServerAndSendToHTML();
