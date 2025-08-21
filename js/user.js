const userInfo = document.querySelector("#userInfo");
const user = document.querySelector("#user");
const links = document.querySelector("#links");
const logOutBtn = document.querySelector("#logOut");

const storedUser = localStorage.getItem("userName");

// Show user info if logged in
if (storedUser) {
  links?.remove();
  userInfo.style.display = "flex";
  user.style.display = "block";
  user.textContent = `Welcome ${storedUser}`;
}

// Handle logout
logOutBtn?.addEventListener("click", () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
});
