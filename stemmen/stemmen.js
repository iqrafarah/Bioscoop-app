window.onload = function () {
  const email = localStorage.getItem("email");
  if (!email) {
    const alert = document.createElement("div");
    document.body.style.overflow = "hidden";
    document.querySelector(".film-container").style.filter = "blur(10px)";
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
  const restService = "https://project-bioscoop-restservice.azurewebsites.net";
  const apiKey = "zCx9ux68rmkp35Sm";

  const filmContainer = document.querySelector(".film-container");
  let films = [];

  getFilms(restService, apiKey).then((data) => {
    const films = data.filter((film) => film.isVoteWorthy);

    if (films.length === 0 || films === undefined) {
      filmContainer.innerHTML = `<h3>there are no films to display</h3>`;
    } else {
      let html = `
  <h2 class="vote-h2"><span>democratic </span> movie night </h2>
  <p class="vote-p">Vote for your favorite movie and we will show it in the cinema On friday!</p>
`;
      films.forEach((film) => {
        html += createFilmCard(film);
      });
      filmContainer.innerHTML = html;
    }
  });

  function createFilmCard(film) {
    let html = `
    <div class="vote-item">
       <img
         src="${film.img}"
         alt=""
       />

       <div class="vote-info">
         <h3>${film.title}</h3>
          <p>
            ${film.description}
          </p>
         <div class="likes">
          <span class="vote-count">votes: ${film.votes} </span>
         </div>
         <div class="vote-btns">
         <a href="../film-info/index.html?id=${film._id}"><button>details</button></a>
           <button id='voteBtn' data-id="${film._id}">Vote</button>
         </div>
       </div>
     </div>
     `;
    return html;
  }

  filmContainer.addEventListener("click", function (e) {
    if (e.target && e.target.id === "voteBtn") {
      try {
        const filmId = e.target.dataset.id;
        const voteCountElement =
          e.target.parentElement.parentElement.querySelector(".vote-count");

        const votedFilms = JSON.parse(localStorage.getItem("votedFilms")) || [];

        if (votedFilms.includes(filmId)) {
          alert("you already voted for this film");
          return;
        }

        voteUp(restService, apiKey, filmId)
          .then((data) => {
            let voteCount = voteCountElement.textContent.split(": ")[1];
            voteCountElement.textContent =
              "votes: " + (parseInt(voteCount) + 1);
            votedFilms.push(filmId);
            localStorage.setItem("votedFilms", JSON.stringify(votedFilms));
          })
          .then(() => {
            postFilmData(restService, apiKey, {
              id: filmId,
              vote: parseInt(voteCountElement.textContent),
            });
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });
};
