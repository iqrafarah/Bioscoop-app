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
  const urlSearchParams = new URLSearchParams(window.location.search);
  const filmParam = urlSearchParams.get("id");

  const restService = "https://project-bioscoop-restservice.azurewebsites.net";
  const apiKey = "zCx9ux68rmkp35Sm";

  // fetch film data
  getFilms(restService, apiKey, filmParam).then((data) => {
    const filmContainer = document.querySelector(".film-container");
    const film = data.find((film) => film._id === filmParam);
    const html = createFilmCard(film);
    filmContainer.innerHTML = html;

    const orderButton = document.getElementById("order-button");
    orderButton.addEventListener("click", function () {
      window.location.href = "/reserveren/index.html?id=" + film._id;
    });
  });

  // create film card
  function createFilmCard(film) {
    let html = `
    <div class="film-info">
    <iframe src="http://www.imdb.com/video/imdb/${
      film.url_trailer
    }/imdb/embed?autoplay=false&width=480" type="video/mp4">
    </iframe>
      <h1>${film.title}</h1>
      <div class="genres">
        ${film.genre.map((genre) => `<span>${genre}</span>`).join("")}
      </div>      

      <button id="order-button">Order Ticket</button>
 
      <div class="description">
        <h3>Storyline</h3>
        <p>
         ${film.description}
        </p>
      </div>
      <div class="ratings">
        <a href="${film.ratings}"><p>IMDB Ratings </p></a>
      </div>
  `;

    return html;
  }
};
