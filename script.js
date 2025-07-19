document
  .getElementById("menu_button")
  .addEventListener("click", function (event) {
    const menuDropdown = document.getElementById("menu_dropdown");
    menuDropdown.style.display =
      menuDropdown.style.display === "block" ? "none" : "block";
    document.getElementById("profile_dropdown").style.display = "none";
    event.stopPropagation();
  });

document
  .getElementById("profile_button")
  .addEventListener("click", function (event) {
    const profileDropdown = document.getElementById("profile_dropdown");
    profileDropdown.style.display =
      profileDropdown.style.display === "block" ? "none" : "block";

    document.getElementById("menu_dropdown").style.display = "none";
    event.stopPropagation();
  });
document.addEventListener("click", function () {
  document.getElementById("menu_dropdown").style.display = "none";
  document.getElementById("profile_dropdown").style.display = "none";
});
