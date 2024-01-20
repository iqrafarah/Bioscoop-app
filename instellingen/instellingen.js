const messageDiv = document.querySelector(".message");
const username = document.querySelector("#username");

const firstname = localStorage.getItem("firstname");
const lastname = localStorage.getItem("lastname");

username.textContent = `${firstname} ${lastname}`;
document
  .getElementById("updateForm")
  .addEventListener("click", function (event) {
    event.preventDefault();

    let newEmail = document.getElementById("newEmail").value;
    let newPassword = document.getElementById("newPassword").value;
    let newPasswordConfirm =
      document.getElementById("newPasswordConfirm").value;

    console.log(newEmail, newPassword, newPasswordConfirm);

    if (newPassword !== newPasswordConfirm) {
      messageDiv.textContent = "Passwords do not match";
      messageDiv.style.color = "red";
      return;
    }

    let email = localStorage.getItem("email");
    let password = localStorage.getItem("password");

    if (password !== document.getElementById("currentPassword").value) {
      messageDiv.textContent = "Current password is incorrect";
      messageDiv.style.color = "red";
      return;
    }

    updateUserData(email, { email: newEmail, password: newPassword });
  });

function updateUserData(email, updatedData) {
  let user_records = JSON.parse(localStorage.getItem("users")) || [];

  // Find the user
  let userIndex = user_records.findIndex((user) => user.email === email);
  if (userIndex === -1) {
    messageDiv.textContent = "User not found";
    messageDiv.style.color = "red";
    return;
  }

  // Update the user data
  for (let key in updatedData) {
    if (updatedData[key]) {
      user_records[userIndex][key] = updatedData[key];
    }
  }

  // Save the updated user records back to localStorage
  localStorage.setItem("users", JSON.stringify(user_records));

  messageDiv.textContent = "User data updated successfully";
  messageDiv.style.color = "green";
}
