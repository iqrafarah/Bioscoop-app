window.onload = function () {
  const isAdmin = localStorage.getItem("isAdmin");
  const email = localStorage.getItem("email");
  console.log(email);
  if (isAdmin !== "true" || !email) {
    const alert = document.createElement("div");
    document.body.style.overflow = "hidden";
    document.querySelector(".container").style.filter = "blur(10px)";
    alert.classList.add("alert");
    alert.style.filter = "none";
    alert.innerHTML = `
    <div class="alert-content">
      <h2>You are not authorized to view this page</h2>
      <p>You will be redirected to the home page</p>
      <img src="../assets/alert.png">
    </div>
    `;
    document.body.appendChild(alert);
    setTimeout(() => {
      window.location.href = "../auth/login.html";
    }, 2000);
  }
  const addBtn = document.querySelector("#addBtn");
  const filmContainer = document.querySelector(".film-container");

  function renderModal() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.style.display = "block";
    modal.innerHTML = `
      <div class="modal-content"> 
      <span class="close">&times;</span>
      <form id="addFilmForm">
      <input type="text" id="title" name="title" placeholder="Title" required>
      <input type="text" id="thumb-img" name="thumb-img" placeholder="Thumbnail Image" required>
      <input type="text" id="img" name="img" placeholder="Image" required>
      <input type="text" id="description" name="description" placeholder="Description" required>
      <input type="text" id="url_trailer" name="url_trailer" placeholder="trailer Url" required>
      <input type="text" id="date" name="date" placeholder="Release Date" required>
      <input type="text" id="genre" name="genre" placeholder="Genre" required  >
      <input type="text" id="ratings" name="ratings" placeholder="Ratings url" required  >

       <div class="vote">
       <p>Is Vote Worthy <span>check if true</span></p><input class="check" type="checkbox" id="isVoteWorthy" name="isVoteWorthy"> 
       </div>
      <button type="submit" id="createMovie">Add</button>
    `;
    document.body.appendChild(modal);

    // close modal
    const closeBtn = document.querySelector(".close");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    addFilm();
  }

  addBtn.addEventListener("click", renderModal);

  function addFilm() {
    const addFilmForm = document.querySelector("#addFilmForm");
    addFilmForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.querySelector("#title").value;
      const img = document.querySelector("#img").value;
      const thumbImg = document.querySelector("#thumb-img").value;
      const description = document.querySelector("#description").value;
      const url_trailer = document.querySelector("#url_trailer").value;
      const date = document.querySelector("#date").value;
      const genre = document.querySelector("#genre").value;
      const genreArray = genre.split(",").map((item) => item.trim());
      const ratings = document.querySelector("#ratings").value;
      const isVoteWorthy = document.querySelector("#isVoteWorthy").checked;

      const film = {
        title,
        thumbImg,
        img,
        description,
        url_trailer,
        date,
        genre: genreArray,
        isVoteWorthy,
        vote: 0,
        ratings,
      };

      

      postFilmData(restService, apiKey, film).then((result) => {
        // display succes message
        const modalConent = document.querySelector(".modal-content");
        const modalContainer = document.querySelector(".modal");
        modalContainer.style.display = "block";
        modalConent.innerHTML = "";
        modalConent.innerHTML = `
            <div class="succes">
              <h2>${film.title} is added succesfully</h2>
              <img src="../assets/succes.png"/>
            </div>
          `;
        console.log(result);
        const modal = document.querySelector(".modal");
        setTimeout(() => {
          modalContainer.style.display = "none";
        }, 800);
        addFilmForm.reset();
        renderFilms();
      });
    });
  }
  // films ophalen
  const restService = "https://project-bioscoop-restservice.azurewebsites.net";
  const apiKey = "zCx9ux68rmkp35Sm";

  function createFilmCards(data) {
    let html = `
    <table>
      <thead>
        <tr>
          <th>Movie</th>
          <th>Title</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  `;

    data.forEach((film) => {
      html += `
      <tr>
      <td><img class="film-img" src="${film.thumbImg}" alt="" /></td>
      <td class="film-item film-title" data-id="${film._id}">${film.title}</td>
      <td>
        <img id="delete" data-id="${film._id}" class="edit-icon" src="../assets/trash.png" alt="" />         
      </td>
    </tr>
    `;
    });

    html += `
      </tbody>
    </table>
  `;
    return html;
  }

  function renderFilms() {
    getFilms(restService, apiKey).then((data) => {
      if (data.length === 0 || data === undefined) {
        filmContainer.innerHTML += `<h3>there are no films to display</h3>`;
      } else {
        const html = createFilmCards(data);
        filmContainer.innerHTML = html;

        const totalMovieElement = document.querySelector(".totalMovie");
        if (totalMovieElement) {
          totalMovieElement.textContent = data.length;
        }
        const totalVotesElement = document.querySelector(".totalVotes");
        if (totalVotesElement) {
          const totalVotes = data.reduce((acc, film) => {
            return acc + film.votes;
          }, 0);
          totalVotesElement.textContent = totalVotes;
        }
      }
    });
  }

  renderFilms();

  //films verwijderen
  const deleteButton = document.querySelector("#delete");
  filmContainer.addEventListener("click", function (e) {
    if (e.target && e.target.id === "delete") {
      e.stopPropagation();
      const filmId = e.target.getAttribute("data-id");
      const filmElement =
        e.target.parentElement.parentElement.parentElement.parentElement;
      console.log(filmId);
      const confirmation = confirm(
        "Are you sure you want to delete this film?"
      );
      if (confirmation) {
        try {
          deleteFilm(restService, apiKey, filmId).then(() => {
            filmElement.remove();
            renderFilms();
            addFilm();
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  });

  // search film
  const searchInput = document.querySelector("#searchTerm");
  searchInput.addEventListener("keyup", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filmItems = document.querySelectorAll(".film-item");
    filmItems.forEach((filmItem) => {
      const filmTitle = filmItem.textContent.toLowerCase();
      if (filmTitle.includes(searchValue)) {
        filmItem.parentElement.style.display = "table-row";
      } else {
        filmItem.parentElement.style.display = "none";
      }
    });
  });

  searchInput.addEventListener("search", () => {
    const filmItems = document.querySelectorAll(".film-item");
    filmItems.forEach((filmItem) => {
      filmItem.parentElement.style.display = "table-row";
    });
  });
};
