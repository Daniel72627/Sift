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

// CHANGE HEIGHT OF BOXES

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const container = document.getElementById("container");

  if (path.includes("sign_up.html") || path.includes("sign_in.html")) {
    container.style.height = "auto";
  } else {
    container.style.height = "685px";
  }
});

// Homepage: Load all dessert meals and link to food.html
window.addEventListener("DOMContentLoaded", () => {
  loadMeals();
  setupSearch();
});

function loadMeals() {
  const url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const meals = data.meals;
      const boxContainer = document.getElementById("box_container");
      boxContainer.innerHTML = "";

      meals.forEach((meal) => {
        const box = document.createElement("div");
        box.classList.add("box");

        // Create a clickable link to food.html with meal ID
        box.innerHTML = `
          <a href="food.html?id=${meal.idMeal}" style="text-decoration: none; color: inherit">
            <img class="food_image" src="${meal.strMealThumb}" />
            <p class="food_name">${meal.strMeal}</p>
            <p class="food_time">—</p>
            <p class="food_description">
              A delicious ${meal.strMeal} dish. Click to learn more!
            </p>
            <p class="food_about">
              By: <a href="#">TheMealDB</a> Uploaded: 07/22/25
            </p>
          </a>
        `;

        boxContainer.appendChild(box);
      });
    })
    .catch((error) => {
      console.error("Error fetching meals:", error);
    });
}

function setupSearch() {
  document
    .getElementById("search_button")
    .addEventListener("click", function (e) {
      e.preventDefault(); // Prevent form submission/refresh

      const query = document.getElementById("search").value.trim();

      if (!query) {
        alert("Please enter a search term.");
        return;
      }

      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        query
      )}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const meals = data.meals;

          const boxContainer = document.getElementById("box_container");
          boxContainer.innerHTML = "";

          if (!meals) {
            boxContainer.innerHTML =
              "<p>No meals found matching your search.</p>";
            return;
          }

          meals.forEach((meal) => {
            const box = document.createElement("div");
            box.classList.add("box");

            box.innerHTML = `
            <a href="food.html?id=${meal.idMeal}" style="text-decoration: none; color: inherit">
              <img class="food_image" src="${meal.strMealThumb}" />
              <p class="food_name">${meal.strMeal}</p>
              <p class="food_time">—</p>
              <p class="food_description">
                A delicious ${meal.strMeal} dish. Click to learn more!
              </p>
              <p class="food_about">
                By: <a href="#">TheMealDB</a> Uploaded: 07/22/25
              </p>
            </a>
          `;

            boxContainer.appendChild(box);
          });
        })
        .catch((err) => {
          console.error("Error searching meals:", err);
          alert("There was an error fetching search results.");
        });
    });
}

// food.html: Load specific meal details from URL ID
if (window.location.pathname.includes("food.html")) {
  const urlParams = new URLSearchParams(window.location.search);
  const mealId = urlParams.get("id");

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];

      document.querySelector(".food_thumbnail").src = meal.strMealThumb;
      document.querySelector("#sign_in_text").textContent = meal.strMeal;
      document.querySelector(".food_instructions").textContent =
        meal.strInstructions;

      const ingredientsList = document.getElementById("food_ingredients");
      ingredientsList.innerHTML = "";

      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
          const li = document.createElement("li");
          li.className = "ingredient";

          li.innerHTML = `
            <span class="food_ingredient_amount">${measure.trim()}</span>
            <select class="unit-select" name="unit">
              <option value="cups">Cups</option>
              <option value="grams">Grams</option>
              <option value="ounces">Ounces</option>
            </select>
            <span class="food_ingredient">${ingredient.trim()}</span>
          `;

          ingredientsList.appendChild(li);
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching meal:", error);
    });
}
