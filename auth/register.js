const messageDiv = document.querySelector(".message");

function saveData() {
  let email, firstname, lastname, password;
  email = document.getElementById("emailadres").value;
  firstname = document.getElementById("voornaam").value;
  lastname = document.getElementById("achternaam").value;
  password = document.getElementById("wachtwoord").value;
  let isAdmin = false;

  let user_records = new Array();
  user_records = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  if (firstname == "" || email == "" || password == "" || lastname == "") {
    messageDiv.textContent = "Please fill in all fields";
    messageDiv.style.color = "red";
  } else if (password.length < 8) {
    messageDiv.textContent = "Password must be at least 8 characters";
    messageDiv.style.color = "red";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    messageDiv.textContent = "Email format is invalid";
    messageDiv.style.color = "red";
  } else if (
    user_records.some((v) => {
      return v.email == email;
    })
  ) {
    messageDiv.textContent = "Email already exists";
    messageDiv.style.color = "red";
  } else {
    messageDiv.textContent = "Registration succesful";
    messageDiv.style.color = "green";
    user_records.push({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
      isAdmin: isAdmin,
    });
    localStorage.setItem("users", JSON.stringify(user_records));
    setTimeout(() => {
      window.location.href = "login.html";
    }, 800);
  }
}
