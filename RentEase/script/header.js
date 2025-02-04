// Sidebar functionalty
let burgerMenu = document.querySelector("#burger_menu");
let sidebar = document.querySelector(".sidebar");

burgerMenu.onclick = function () {
  sidebar.classList.toggle('active');
};
//Retrieve login credentials from local storage
const loginCredentials = JSON.parse(localStorage.getItem('loginUser'));
const loginEmail = loginCredentials.email;
const loginPassword = loginCredentials.password;
// Get list of users from local storage
const users = JSON.parse(localStorage.getItem('users'));
//Find the user object that matches the provided email and password
const loggedInUser = users.find(user => user.email === loginEmail && user.password === loginPassword);

//If logged-in user was found get the name
if (loggedInUser) {
  const userMessage = document.getElementById("user_message");
  const firstName = loggedInUser.firstName;
  userMessage.innerText = `Hello, ${firstName}`;
}

//User logout
const logoutBtn = document.getElementById("logout_btn");
logoutBtn.addEventListener('click', () => { window.location.href = "signin-signup.html";});