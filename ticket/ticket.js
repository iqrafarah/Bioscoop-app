// Retrieve the selected time and date from localStorage
const selectedTime = localStorage.getItem('selectedTime');
const selectedDate = localStorage.getItem('selectedDate');

const urlSearchParams = new URLSearchParams(window.location.search);
const filmParam = urlSearchParams.get("id");
const seatParam = urlSearchParams.get("seat");
const rowParam = urlSearchParams.get("row");
console.log('Row', rowParam);
console.log('Seat', seatParam);
const restService = "https://project-bioscoop-restservice.azurewebsites.net";
const apiKey = "zCx9ux68rmkp35Sm";

// fetch film data
getFilms(restService, apiKey, filmParam).then((data) => {
  const filmContainer = document.querySelector(".film-container");
  const film = data.find((film) => film._id === filmParam);
  // console.log(film.genre);
  console.log('Film', film);
  const html = createFilmCard(film, selectedDate, selectedTime, seatParam, rowParam);
  filmContainer.innerHTML = html;
});

function generateOrderId() {
  let orderId = localStorage.getItem('orderId');
  if (!orderId) {
    orderId = '';
    for (let i = 0; i < 12; i++) {
      orderId += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
    }
    localStorage.setItem('orderId', orderId);
  }
  return orderId;
}

// create film card
function createFilmCard(film, selectedDate, selectedTime, seatParam, rowParam) {
  const orderId = generateOrderId();
  let html = `
      <div class="film-info">
        <div class="film-image">
          <img src="${film.thumbImg}" alt="" />
        </div>
        <h1>${film.title}</h1>
        <div class="film-details">
          <div class="details-grid">
            <p><span class="detail-label">Date</span><br>${selectedDate}</p>
            <p><span class="detail-label">Time</span><br>${selectedTime}</p>
            <p><span class="detail-label">Seat</span><br>${seatParam}</p>
            <p><span class="detail-label">Row</span><br>${rowParam}</p>
            <p><span class="detail-label">Price</span><br>€12,50</p>
            <p><span class="detail-label">Order ID</span><br>${orderId}</p>
          </div>
        </div>
        <div class="dotted-line"><div>
        <div class="barcode">
        <h1>${orderId}</h1>
        </div>
        </div>
    `;

  return html;
}
