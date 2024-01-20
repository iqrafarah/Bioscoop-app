// Initialize the theater with all seats available
let theater = new Array(6).fill(false).map(() => new Array(10).fill(false));

// Function to generate the HTML for the seats
function generateSeatsHtml() {
    let html = '<div class="theater">';
    for (let row = 0; row < theater.length; row++) {
        html += '<div class="row">';
        for (let seat = 0; seat < theater[row].length; seat++) {
            const status = theater[row][seat] ? 'reserved' : 'available-seat';
            html += `<div class="seat ${status}" data-row="${row}" data-seat="${seat}"></div>`;
        }
        html += '</div>';
    }
    html += '</div>';
    return html;
}
// Function to handle seat clicks and toggle reservation status
let selectedSeat = null;

// Function to handle seat clicks and toggle reservation status
function toggleSeatStatus(event) {
    const clickedSeat = event.target;
    const row = clickedSeat.dataset.row;
    const seat = clickedSeat.dataset.seat;

    // If a seat was previously selected, reset its color
    if (selectedSeat) {
        const prevRow = selectedSeat.dataset.row;
        const prevSeat = selectedSeat.dataset.seat;
        theater[prevRow][prevSeat] = false;
        selectedSeat.classList.remove('reserved');
        selectedSeat.classList.add('available-seat');
    }


    // Update the selected seat
    theater[row][seat] = true;
    clickedSeat.classList.remove('available-seat');
    clickedSeat.classList.add('reserved');

    // Update the selected seat
    selectedSeat = clickedSeat;
}


// Append the seats to the seat-container
const seatContainer = document.querySelector('.seat-container');
seatContainer.innerHTML = generateSeatsHtml();

// Add event listener to each seat
const seats = document.querySelectorAll('.seat');
seats.forEach(seat => {
    seat.addEventListener('click', toggleSeatStatus);
});

// Get the date and time divs
const dateDivs = document.querySelectorAll('.date p');
const timeDivs = document.querySelectorAll('.time p');

// Get the current date and time
const now = new Date();


dateDivs.forEach((div, index) => {
    // Generate a random number of days to add (at least 3)
    const daysToAdd = 3 + index;

    // Get the current date and set the time to the start of the day
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // Add the random number of days to the current date
    const randomDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    // Format the random date to show only the month and day
    const date = randomDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

    // Update the div with the random date
    div.textContent = date;
    div.addEventListener('click', () => {
        div.parentNode.style.backgroundColor = '#e50914';
    });
});

let selectedDateDiv = null;
let selectedTimeDiv = null;
dateDivs.forEach((div, index) => {
    // Get the current date and time
    const daysToAdd = 3 + index;

    // Get the current date and set the time to the start of the day
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    // Add the random number of days to the current date
    const randomDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    // Format the random date to show only the month and day
    const date = randomDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' });

    // Update the div with the random date
    div.textContent = date;
    div.addEventListener('click', () => {
        div.parentNode.style.backgroundColor = '#e50914';
    });
    div.addEventListener('click', () => {
        div.parentNode.style.backgroundColor = '#e50914';
    });
    div.addEventListener('click', () => {
        // Reset the background color of the previously selected date div
        if (selectedDateDiv) {
            selectedDateDiv.parentNode.style.backgroundColor = ''; // Set this to the original background color
        }

        // Set the background color of the selected date div
        div.parentNode.style.backgroundColor = '#e50914';

        // Update the selected date div
        selectedDateDiv = div;
        localStorage.setItem('selectedDate', date);
    });
});
timeDivs.forEach((div, index) => {
    // Get the current date and time
    const now = new Date();

    // Add a certain number of hours to the current time
    now.setHours(now.getHours() + index);

    now.setMinutes(30);
    now.setSeconds(0);

    const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });

    // Update the div with the new time
    div.textContent = time;
    div.addEventListener('click', () => {
        div.parentNode.style.backgroundColor = '#e50914';
    });
    div.addEventListener('click', () => {
        // Reset the background color of the previously selected date div
        if (selectedTimeDiv) {
            selectedTimeDiv.parentNode.style.backgroundColor = ''; // Set this to the original background color
        }

        // Set the background color of the selected date div
        div.parentNode.style.backgroundColor = '#e50914';

        // Update the selected date div
        selectedTimeDiv = div;
        localStorage.setItem('selectedTime', time);
    });
});
// Function to handle reservation
function makeReservation() {
    if (selectedSeat && selectedDateDiv && selectedTimeDiv) {
        // Get the row and seat number of the selected seat
        const selectedRow = selectedSeat.dataset.row;
        const selectedSeatNum = selectedSeat.dataset.seat;

        // Get the selected date and time
        const selectedDate = selectedDateDiv.textContent;
        const selectedTime = selectedTimeDiv.textContent;

        // Get the film ID from the URL parameter
        const urlSearchParams = new URLSearchParams(window.location.search);
        const filmId = urlSearchParams.get('id');

        // Redirect to the betalen page with the reservation and film details in the URL
        window.location.href = "/betalen/index.html?id=" + filmId + "&row=" + (parseInt(selectedRow) + 1) + "&seat=" + (parseInt(selectedSeatNum) + 1);
    } else {
        alert('Please select a seat, date, and time before making a reservation.');
        return; // Return here to prevent redirection
    }
}

// Add click event listener to reservation button
reservationButton.addEventListener('click', makeReservation);

