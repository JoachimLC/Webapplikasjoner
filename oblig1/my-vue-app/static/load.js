

//funksjon som laster inn fra json lokalt uten server som mellomledd
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

loadFromJSON();
