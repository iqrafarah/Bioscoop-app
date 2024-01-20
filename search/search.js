window.onload = function () {
  const email = localStorage.getItem("email");
  if (!email) {
    const alert = document.createElement("div");
    document.body.style.overflow = "hidden";
    document.querySelector(".films-container").style.filter = "blur(10px)";
    alert.classList.add("alert");
    alert.style.filter = "none";
    alert.innerHTML = `
    <div class="alert-content">
      <h2>Please log in to continue</h2>
      <p>You will be redirected to the login page</p>
      <img src="../assets/alert.png">
    </div>
    `;
    document.body.appendChild(alert);

    setTimeout(() => {
      window.location.href = "../auth/login.html";
    }, 2000);
  }
  // films ophalen
  const filmsContainer = document.querySelector(".items");

  const restService = "https://project-bioscoop-restservice.azurewebsites.net";
  const apiKey = "zCx9ux68rmkp35Sm";

  let filmsData = [];

  async function renderFilms() {
    try {
      const data = await getFilms(restService, apiKey);

      filmsContainer.innerHTML = "";

      data.forEach((film) => {
        filmsContainer.innerHTML += `
        <div class="film-item">
          <a href="../film-info/index.html?id=${film._id}"><img src="${film.img}" alt="" /></a>
          <div class="film-info">
            <h4>${film.title}</h4>
          </div>
        </div>
      `;
      });
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  renderFilms();

  // search
  const search = document.querySelector("#searchTerm");

  search.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    const films = Array.from(document.querySelectorAll(".film-item"));
    films.forEach((film) => {
      const filmTitle = film.textContent.toLowerCase();
      if (filmTitle.includes(searchString)) {
        film.style.display = "inline-table";
      } else {
        film.style.display = "none";
      }
    });
  });

  search.addEventListener("search", () => {
    const films = document.querySelectorAll(".film-item");
    films.forEach((film) => {
      film.style.display = "inline-table";
    });
  });

  // Get all genre links
  const dropdownMenu = document.querySelector(".dropdown");
  const dropdownButton = document.querySelector(".dropbtn");
  const genreLinks = document.querySelectorAll(".dropdown-content a");
  genreLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const genre = e.target.textContent.toLowerCase();

      dropdownButton.textContent = `Genre: ${genre}`;
      await renderFilmsByGenre(genre);
    });
  });

  async function renderFilmsByGenre(genre) {
    try {
      const data = await getFilms(restService, apiKey);

      const filteredFilms = data.filter((film) => {
        const lowerCaseGenres = film.genre.map((g) => g.toLowerCase());
        return lowerCaseGenres.includes(genre);
      });

      renderFilteredFilms(filteredFilms);

      if (filteredFilms.length === 0) {
        filmsContainer.innerHTML = `
        <div class="no-results">
          <h2>Geen films gevonden</h2>
        </div>
      `;
      }

      dropdownMenu.classList.remove("show");

      if (genre === "all") {
        renderFilms();
      }
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  }

  function renderFilteredFilms(filteredFilms) {
    filmsContainer.innerHTML = "";

    filteredFilms.forEach((film) => {
      filmsContainer.innerHTML += `
      <div class="film-item">
        <a href="../film-info/index.html?id=${film._id}"><img src="${film.img}" alt="" /></a>
        <div class="film-info">
          <h4>${film.title}</h4>
        </div>
      </div>
    `;
    });
  }
};
