const signInForm = document.getElementById("sign_in_form");

signInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const signInEmail = signInForm.querySelector("#email").value;
  const signInPassword = signInForm.querySelector("#password").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found. Please sign up first.");
    return;
  }

  if (
    signInEmail === storedUser.email &&
    signInPassword === storedUser.password
  ) {
    alert("Login successful!");
    localStorage.setItem("logged_in_user", storedUser.username);
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password.");
  }
});
