window.onload = function () {
  const email = localStorage.getItem("email");
  if (!email) {
    const alert = document.createElement("div");
    document.body.style.overflow = "hidden";
    document.querySelector(".container").style.filter = "blur(10px)";
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
    }, 5000);
    return;
  }
  let filmIndex = 0;
  const sliderElement = document.querySelector(".film-slider");

  function change() {
    if (filmsData && filmsData.length > 0) {
      sliderElement.innerHTML = `<a href="../film-info/index.html?id=${filmsData[filmIndex]._id}"><img id="slider-img" src="${filmsData[filmIndex].thumbImg}" /></a>`;
      filmIndex++;
      if (filmIndex >= filmsData.length) {
        filmIndex = 0;
      }
    }
  }

  // films ophalen
  const restService = "https://project-bioscoop-restservice.azurewebsites.net";
  const apiKey = "zCx9ux68rmkp35Sm";

  getFilms(restService, apiKey)
    .then((data) => {
      filmsData = data;
      setInterval(change, 3000);
      // Your existing code...
    })
    .catch((error) => {
      console.error("Error fetching films:", error);
    });

  getFilms(restService, apiKey).then((data) => {
    let filmGroups = [];
    for (let i = 0; i < data.length; i += 6) {
      filmGroups.push(data.slice(i, i + 6));
    }

    let votableFilms = data.filter((film) => film.isVoteWorthy);

    let votableFilmGroup = votableFilms.slice(0, 6);

    filmGroups.unshift(votableFilmGroup);
    const itemsContainers = document.querySelectorAll(".items");

    itemsContainers.forEach((container, index) => {
      let html = "";
      filmGroups[index].forEach((film) => {
        html += `
          <div class="film-item">
              <a href="../film-info/index.html?id=${film._id}"><img src="${film.img}" alt="" /></a>
              <div class="film-info">
                  <h4>${film.title}</h4>
              </div>
          </div>
      `;
      });
      container.innerHTML = html;

      const slider = {
        startX: 0,
        filmIndex: 0,
        filmsData: filmGroups[index],
        handleTouchStart(event) {
          this.startX = event.touches[0].clientX;
        },
        handleTouchMove(event) {
          let touchEndX = event.touches[0].clientX;
          let swipeDistance = touchEndX - this.startX;

          if (Math.abs(swipeDistance) >= 100) {
            this.changeFilmIndex(swipeDistance > 0 ? -1 : 1);
            this.updateFilmCarousel();
            this.startX = touchEndX;
          }
        },
        changeFilmIndex(direction) {
          this.filmIndex += direction;
          if (this.filmIndex < 0) {
            this.filmIndex = this.filmsData.length - 1;
          } else if (this.filmIndex >= this.filmsData.length) {
            this.filmIndex = 0;
          }
        },
        updateFilmCarousel() {
          container.style.transform = `translateX(${-this.filmIndex * 45}%)`;
        },
      };

      container.addEventListener(
        "touchstart",
        slider.handleTouchStart.bind(slider),
        false
      );
      container.addEventListener(
        "touchmove",
        slider.handleTouchMove.bind(slider),
        false
      );
      const itemsContainers = document.querySelectorAll(".items");

      itemsContainers.forEach((container, index) => {
        const filmItems = container.querySelectorAll(".film-item");

        filmItems.forEach((item, filmIndex) => {
          item.addEventListener("click", () => {
            displayFilmInfo(filmGroups[index][filmIndex]);
          });
        });
      });
    });
  });
};
