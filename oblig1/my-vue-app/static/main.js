const form = document.getElementById("projectForm");
const projectsSection = document.getElementById("articles");


//Tar imot data fra skjema for å opprette nytt prosjekt objekt og sender til serverens tomme liste
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


//henter data fra json gjennom serveren og oppdaterer html

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

    const pDescription = document.createElement("p");
    pDescription.textContent = project.description;
    article.appendChild(pDescription);

    const pTechnologies = document.createElement("p");
    pTechnologies.innerHTML = `Technologies: ${project.technologies}`;
    article.appendChild(pTechnologies);

    const link = document.createElement("a");
    link.href = project.url;
    link.textContent = "Read More";
    link.className = "read-more-link";
    article.appendChild(link);

    projectsSection.appendChild(article);
  }
};

fetchDataFromServerAndSendToHTML();

//funksjon som laster inn fra json lokalt uten server som mellomledd
//denne bruker jeg ikke, da jeg heller bruker funksjonen over som henter fra server
function loadFromJSON() {
  fetch("static/data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const articlesection = document.getElementById("articles");
      console.log(data);
      for (const project of data) {
        const article = document.createElement("article");
        article.className = "grid-article-item";

        const img = document.createElement("img");
        img.src = project.image;
        img.alt = project.title;
        article.appendChild(img);

        const h3 = document.createElement("h3");
        h3.textContent = project.title;
        article.appendChild(h3);

        const p = document.createElement("p");
        p.textContent = project.description;
        article.appendChild(p);

        const techPara = document.createElement("p");
        techPara.textContent = "Technologies used: " + project.technologies;
        article.appendChild(techPara);

        const link = document.createElement("a");
        link.href = project.link;
        link.textContent = "Read More";
        link.className = "read-more-link";
        article.appendChild(link);

        articlesection.appendChild(article);
      }
    })
    .catch((error) => {
      console.error('Error', error);
    });
  }
