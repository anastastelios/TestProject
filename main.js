const toggleBtn = document.getElementsByClassName("toggle-button")[0];
const navLinks = document.getElementsByClassName("nav__links")[0];

toggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
})