//Panel Animation
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});
// End of panel animation

const registerForm = document.getElementById("register_form");
const loginForm = document.getElementById("login_form");

class NewUser {
    constructor(firstName,lastName,email,password,birthDate,apartments){
        this.firstName = firstName.value;
        this.lastName = lastName.value;
        this.email = email.value;
        this.password = password.value;
        this.birthDate = birthDate.value;
        this.apartments = apartments
    }
}

class LoginUser{
    constructor(loginEmail,loginPassword){
        this.email = loginEmail.value;
        this.password = loginPassword.value
    }
}

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Check if all inputs are filled in correctly
    if(CheckRegisterFormValidation()){
        showPopup('Congratulations, your account has been successfully created.', moveToLogin);
    } else{
        alert("You must complete all the form fields correctly!");
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(CheckLoginFormValidation()){
      moveToHomePage();
    }else{
      alert("You must complete all the form fields correctly!");
    }
});

function moveToHomePage(){
    let loginUser = new LoginUser(loginEmail,loginPassword);
    //Save the login user data to local storage
    localStorage.setItem('loginUser', JSON.stringify(loginUser));
    window.location.href = "home.html";
}

function moveToLogin(){
    users.push(new NewUser(firstName,lastName,email,password,birthDate,[]));
    //Save the updated users array to local storage
    localStorage.setItem('users', JSON.stringify(users));
}

function showPopup(popupMessage, confirmFunction){
    //Create overlay element
    let overlay = document.createElement('div');
    overlay.id = 'overlay';
    
    // Create popup element
    let popup = document.createElement('div');
    popup.id = 'popup';

    // Add message to popup
    let message = document.createElement('p');
    message.textContent = popupMessage;
    popup.appendChild(message);

    let btnsContainer = document.createElement('div');
    btnsContainer.id = 'btns_container';
    // Add Yes button to pop up
    let continueButton = document.createElement('button');
    continueButton.textContent = 'Continue';
    continueButton.id = 'continue_btn';
    continueButton.onclick = function() {
        // Handle Continue button click
        confirmFunction();
        container.classList.remove("sign-up-mode");
        // Remove popup and overlay
        document.body.removeChild(overlay);
        document.body.removeChild(popup);
    };
    btnsContainer.appendChild(continueButton);

    popup.appendChild(btnsContainer);
    // Append overlay and popup to the body
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
}


