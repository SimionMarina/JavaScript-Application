let registerValidationObject = {
  first_name_input: false,
  last_name_input: false,
  email_input: false,
  password_input: false,
  cpassword_input: false,
  birth_date_input: false
};

let loginValidationObject = {
  login_email: false,
  login_password: false,
};
//Get users from local storage or initialize an empty array if not exist
let users = JSON.parse(localStorage.getItem('users')) || [];

const firstNameError = document.getElementById("first_name_error");
const firstName = document.getElementById("first_name_input");
firstName.addEventListener("keyup", () => { validateName(firstName,firstNameError)});

const lastNameError = document.getElementById("last_name_error");
const lastName = document.getElementById("last_name_input");
lastName.addEventListener("keyup", () => { validateName(lastName,lastNameError)});

const emailError = document.getElementById("email_error");
const email = document.getElementById("email_input");
email.addEventListener("keyup", () => { validateEmail(email,emailError)});

const passwordError = document.getElementById("password_error");
const password = document.getElementById("password_input");
password.addEventListener("keyup", () => { validatePassword(password,passwordError)});

const cpasswordError = document.getElementById("cpassword_error");
const cpassword = document.getElementById("cpassword_input");
cpassword.addEventListener("keyup", () => { validateCpassword(cpassword,cpasswordError)});

const birthDateError = document.getElementById("birth_date_error");
const birthDate = document.getElementById("birth_date_input");
birthDate.addEventListener("change", () => { validateDOB(birthDate,birthDateError)});

const loginEmailError = document.getElementById("login_email_error");
const loginEmail = document.getElementById("login_email");
loginEmail.addEventListener("keyup", () => { validateEmail(loginEmail,loginEmailError)});

const loginPasswordError = document.getElementById("login_password_error");
const loginPassword = document.getElementById("login_password");
loginPassword.addEventListener("keyup", () => { validateLoginPassword(loginPassword,loginPasswordError)});

function validatedInput(input,error){
  // Handle the class list for validated input
  input.parentNode.classList.remove('input-field-error');
  input.parentNode.classList.add('input-field-verified');
  // Clear the error paragraph
  error.innerText = "";
  // Set value true to the validated input from the registration object 
  registerValidationObject[input.id] = true;
  // Check if we validate inputs from the login form
  if(input == loginPassword || input == loginEmail){
    // Set value true to the validated input from the login object 
    loginValidationObject[input.id] = true;
  }
}

function setError(input,error,message){
  const inputField = input.parentNode;
  error.innerText = message;
  // Handle the class list for invalid input
  error.style.display = "block";
  inputField.classList.remove('input-field-verified');
  inputField.classList.add('input-field-error');
  registerValidationObject[input.id] = false;
  if(input == loginPassword || input == loginEmail){
    loginValidationObject[input.id] = false;
  }
}

// First name and last name validation function
function validateName(name,error){
  // Regex for only numbers
  let regex = /^[a-zA-Z]+$/;
  
  if(name.value===''){
    setError(name, error,"Can't be blank");
  } else if(!regex.test(name.value)){
    setError(name, error,"Can't contain numbers");
 } else if((name.value).length < 2){
    setError(name, error,"Name too short");
 } else {
    validatedInput(name,error);
 }
}

// Email validation function for register and login form
function validateEmail(mail,error){
  // Regex for mailformat
  let mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Check if email already exists in local storage
  let existingEmail = users.find(user => user.email === mail.value);
  if(mail.value===''){
    setError(mail, error,"Can't be blank");
  } else if(!mail.value.match(mailformat)){
    setError(mail, error,"Email format not valid");
  }else if(mail == email && existingEmail){
    // Validation for register email
    setError(mail, error,'This email address is already used');
  }else if(mail == loginEmail && !existingEmail){
    // Validation for login email
    setError(mail, error,'We could not find an account for this email address');
  }else{
    validatedInput(mail,error);
  }
}

// Password validation function
function validatePassword(pass,error){
  let passVal=pass.value;
  // Password must contain letters, numbers and a special character
  if(passVal.length < 6){
    setError(pass, error,"Password must be at least 6 characters");
  } else if (passVal.search(/[a-z]/i) < 0) {
    setError(pass, error,"Password must contain at least one letter")
  } else if (passVal.search(/[0-9]/) < 0){
    setError(pass, error,"Password must contain at least one digit")
  } else if (passVal.search(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/)){
    setError(pass, error,"Password must contain at least one special character")
  }else{
    validatedInput(pass,error);
  }
}

// Confirm password validation function
function validateCpassword(cpass, error){
  // Password input value and confirm password input value must be identical
  if(cpass.value === "" || cpass.value !== password.value){
    setError(cpass, error,"Password doesn't match");
  } else{
    validatedInput(cpass,error); 
  }
}

// Birth date validation function
function validateDOB(birthDate, error){
  // Get the birth date input value
  let birthDateVal = birthDate.value;
  // Convert the birth date input value to date format
  let dob = new Date(birthDateVal);
  let currentDate = new Date();
  if(birthDateVal==null||birthDateVal==''){
    setError(birthDate, error,"Please choose a date");
  }else{
    //calculate the difference between the current date and the birth date in milliseconds  
    let month_diff = Date.now() - dob.getTime(); 
    //convert the calculated difference in date format  
    let age_dt = new Date(month_diff);
    //extract year from date      
    let year = age_dt.getUTCFullYear(); 
    //now calculate the age of the user  
    let age = Math.abs(year - 1970);  
    if(dob > currentDate){
      setError(birthDate, error,"Selected date is in the future!");
    }else if(age < 18 || age > 120){
      setError(birthDate, error,"You need to be over 18 years");
    }else{
      validatedInput(birthDate,error);
    }
  }
}

// Password validation function for login form
function validateLoginPassword(loginPass,error){
  // Check if password exists in local storage
  let existingPassword = users.find(user => user.password === loginPass.value);
  if(loginPass.value===''){
      setError(loginPass, error,"Can't be blank");
  }else if(!existingPassword){
      setError(loginPass, error,"Wrong user/password combination");
  }else{
      validatedInput(loginPass,error);
  }
}

// Check if all register form inputs are valid
function CheckRegisterFormValidation(){
  return Object.values(registerValidationObject).every(el => el == true);
}

// Check if all login form inputs are valid
function CheckLoginFormValidation(){
  return Object.values(loginValidationObject).every(el => el == true);
}

