let messageDiv = document.querySelector(".message");

function saveData() {
  let email = document.getElementById("emailadres").value;
  let password = document.getElementById("wachtwoord").value;

  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  if (email == "" || password == "") {
    messageDiv.textContent = "Please fill in all fields";
    messageDiv.style.color = "red";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    messageDiv.textContent = "Email format is invalid";
    messageDiv.style.color = "red";
  } else if (
    user_records.some((v) => {
      return v.email == email && v.password == password;
    })
  ) {
    messageDiv.textContent = "Login succesvol";
    messageDiv.style.color = "green";

    let current_user = user_records.filter((v) => {
      return v.email == email && v.password == password;
    })[0];

    localStorage.setItem("email", current_user.email);
    localStorage.setItem("firstname", current_user.firstname);
    localStorage.setItem("lastname", current_user.lastname);
    localStorage.setItem("password", current_user.password);
    localStorage.setItem("isAdmin", current_user.isAdmin);

    setTimeout(() => {
      window.location.href = "/home";
    }, 800);
  } else {
    messageDiv.textContent = "wrong email or password";
    messageDiv.style.color = "red";
  }
}
