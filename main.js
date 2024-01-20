document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.createElement("nav");

  navbar.innerHTML =
    ' <div class="topnav">\
          <div class="logo-menu">\
          <a href="../home/" class="active">\
          <img src="/assets/logo.png" alt="play button">\
          </a>\
           <a href="javascript:void(0);" class="icon" onclick="toggleMenu()">\
            <img class="menu-icon" id="menuIcon" src="/assets/menu-icon.png" alt="menu">\
          </a>\
          </div>\
          <div id="myLinks">\
            <div id="profile-background">\
            <p class="username">gebruikersnaam</p>\
            </div>\
            <div class="divider"></div>\
            <a href="/instellingen" class="instellingen"><i class="fas fa-cog"></i><p>Settings</p></a>\
            <a href="/search"><i class="fas fa-search"></i><p>Search</p></a>\
            <a href="/home"><i class="fas fa-home"></i><p>Home</p></a>\
            <a href="/home/"><i class="fas fa-film"></i><p>Movies</p></a>\
            <a href="/stemmen"><i class="fas fa-vote-yea"></i><p>Vote</p></a>\
            <a href="/admin" class="adminLink"><i class="fas fa-cog"></i><p>Admin Dashboard</p></a>\
            <a href="#" id="logoutLink"><i class="fas fa-sign-out-alt"></i><p>Log out</p></a>\
            </div>\
        </div>';

  document.body.insertBefore(navbar, document.body.firstChild);

  const logoutLink = document.querySelector("#logoutLink");
  logoutLink.style.display = "inline-flex";

  logoutLink.addEventListener("click", () => {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.href = "../auth/login.html";
  });

  const voornaam = localStorage.getItem("firstname");
  const achternaam = localStorage.getItem("lastname");

  const userLink = document.querySelector(".username");
  userLink.textContent = "Hi, " + voornaam + " " + achternaam;

  if (localStorage.getItem("isAdmin") !== "true") {
    const adminLink = document.querySelector(".adminLink");
    adminLink.style.display = "none";
  }
});

function toggleMenu() {
  const x = document.getElementById("myLinks");
  const icon = document.getElementById("menuIcon");
  const body = document.body;

  if (x.style.display === "none") {
    x.style.display = "block";
    icon.src = "/assets/close-icon.png";
    body.classList.add("no-scroll");
  } else {
    x.style.display = "none";
    icon.src = "/assets/menu-icon.png";
    body.classList.remove("no-scroll");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const x = document.getElementById("myLinks");
  const icon = document.getElementById("menuIcon");

  x.style.display = "none";
  icon.src = "/assets/menu-icon.png";
});
