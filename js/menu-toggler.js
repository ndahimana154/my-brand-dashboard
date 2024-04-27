var menuButton = document.getElementById("menuTogglerBtn");
var navSection = document.getElementById("nav");
var closemenuSection = document.getElementById("closemobile-menu");
var closeMenuButton = document.getElementById("close-menu-button");
menuButton.addEventListener("click", function () {
  navSection.style.display = "flex";
  closemenuSection.style.display = "block";
});

closeMenuButton.addEventListener("click", function () {
  navSection.style.display = "none";
});
