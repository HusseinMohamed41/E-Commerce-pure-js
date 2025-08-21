const userNameInput = document.querySelector("#userName");
const passwordInput = document.querySelector("#password");
const signInBtn = document.querySelector("#signIn");

// Retrieve stored credentials
const storedUserName = localStorage.getItem("userName")?.trim();
const storedPassword = localStorage.getItem("password")?.trim();

// Focus username field on load
window.onload = () => userNameInput.focus();

// Login procedsure
signInBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const enteredUser = userNameInput.value.trim();
  const enteredPass = passwordInput.value.trim();

  if (!enteredUser || !enteredPass) {
    return alert("Please enter both username and password");
  }

  const isValid =
    storedUserName === enteredUser && storedPassword === enteredPass;

  if (isValid) {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  } else {
    alert("Invalid username or password");
  }
});
