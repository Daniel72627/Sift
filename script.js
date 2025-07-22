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

// Wait for the page to finish loading before doing anything
window.addEventListener("DOMContentLoaded", loadMeals);

// This function fetches meals from TheMealDB and displays them as boxes
function loadMeals() {
  // Step 1: Define the API URL for a category (e.g., Beef)
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert";

  // Step 2: Fetch the data from the API
  fetch(url)
    .then((response) => response.json()) // Convert the raw response into JSON
    .then((data) => {
      // Step 3: Get the array of meals from the returned data
      const meals = data.meals;

      // Step 4: Get the box container from the HTML
      const boxContainer = document.getElementById("box_container");
      boxContainer.innerHTML = "";

      // Step 5: Loop through each meal
      meals.forEach((meal) => {
        // Create a new box element
        const box = document.createElement("div");

        // Add the 'box' class to style it like your existing ones
        box.classList.add("box");

        // Fill the box with HTML, using the meal's data
        box.innerHTML = `
          <img class="food_image" src="${meal.strMealThumb}" />
          <p class="food_name">${meal.strMeal}</p>
          <p class="food_time">—</p>
          <p class="food_description">
            A delicious ${meal.strMeal} dish. Click to learn more!
          </p>
          <p class="food_about">
            By: <a href="#">TheMealDB</a> Uploaded: 07/22/25
          </p>
        `;

        // Add the box to the page inside #box_container
        boxContainer.appendChild(box);
      });
    })
    .catch((error) => {
      // Handle any errors (e.g., no internet or API issues)
      console.error("Error fetching meals:", error);
    });
}
