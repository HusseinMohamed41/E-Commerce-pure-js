const userNameInput = document.querySelector("#userName");
const passwordInput = document.querySelector("#password");
const emailInput = document.querySelector("#email");
const signUpBtn = document.querySelector("#signUP");

// Focus on username field when page loads
window.onload = () => userNameInput.focus();

// SignUp procedsure
signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const username = userNameInput.value.trim();
  const password = passwordInput.value.trim();
  const email = emailInput.value.trim();

  if (!username || !password || !email) {
    return alert("Please fill in all fields");
  }

  // Save user data
  localStorage.setItem("userName", username);
  localStorage.setItem("password", password);
  localStorage.setItem("email", email);

  // Redirect to login page
  setTimeout(() => {
    window.location.href = "login.html";
  }, 500);
});
