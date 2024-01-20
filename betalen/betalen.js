function validateField(value, message) {
    if (!value) {
        alert(message);
        return false;
    }
    return true;
}

function validateEmail(email) {
    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return false;
    }
    return true;
}

function validateNumericLength(value, length, fieldName) {
    if (value.length !== length || isNaN(value)) {
        alert(`${fieldName} should be ${length} numeric characters long.`);
        return false;
    }
    return true;
}
const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get('id'); // Changed 'filmId' to 'id'
const selectedRow = urlParams.get('row'); // Changed 'selectedRow' to 'row'
const selectedSeatNum = urlParams.get('seat'); // Changed 'selectedSeatNum' to 'seat'

document.getElementById('paymentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const address = document.getElementById('address').value;

    if (
        validateField(email, 'Please fill in the email field.') &&
        validateField(cardName, 'Please fill in the card name field.') &&
        validateField(expiryDate, 'Please fill in the expiry date field.') &&
        validateField(address, 'Please fill in the address field.') &&
        validateEmail(email) &&
        validateNumericLength(cvv, 3, 'CVV') &&
        validateNumericLength(cardNumber, 16, 'Card number') &&
        validateNumericLength(expiryDate, 4, 'Expiry date')
    ) {
        window.location.href = "/ticket/index.html?id=" + filmId + "&row=" + parseInt(selectedRow) + "&seat=" + parseInt(selectedSeatNum);
    } 
});
