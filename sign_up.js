// SIGN UP

const signUpForm = document.getElementById("sign_up_form");

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = signUpForm.querySelector("#username").value;
  const email = signUpForm.querySelector("#email").value;
  const password = signUpForm.querySelector("#password").value;
  const confirmPassword = signUpForm.querySelector("#confirm_password").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match! :(");
    return;
  }

  const user = {
    username,
    email,
    password,
  };

  localStorage.setItem("user", JSON.stringify(user));

  console.log("User Registered!");
  window.location.href = "sign_in.html"; // redirect to sign-in page
});
