let editProfileValidationObject = {
  first_name_input: false,
  last_name_input: false,
  email_input: false,
  password_input: false,
  cpassword_input: false,
  birth_date_input: false
};
class UserData {
  constructor(firstName,lastName,email,password,birthDate,apartments){
      this.firstName = firstName.value;
      this.lastName = lastName.value;
      this.email = email.value;
      this.password = password.value;
      this.birthDate = birthDate.value;
      this.apartments = apartments
  }
}
const profileContainer = document.getElementById("profile_container");
let profileData = profileContainer.querySelectorAll("input");
let userInfo = Object.values(loggedInUser);
const editProfileBtn = document.getElementById("edit_profile");
const editProfileForm = document.getElementById("edit_profile_form");


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

function validateName(name,error){
  let regex = /^[a-zA-Z]+$/;
  console.log
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
function validateEmail(mail,error){
  let mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(mail.value===''){
    setError(mail, error,"Can't be blank");
  } else if(!mail.value.match(mailformat)){
    setError(mail, error,"Email format not valid");
  }else{
    validatedInput(mail,error);
  }
}
function validatePassword(pass,error){
  let passVal=pass.value;
  
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

function validateCpassword(cpass, error){
  if(cpass.value === "" || cpass.value !== password.value){
    setError(cpass, error,"Password doesn't match");
  } else{
    validatedInput(cpass,error); 
  }
}

function validateDOB(birthDate, error){
  let birthDateVal = birthDate.value;
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

function validatedInput(input,error){
  input.parentNode.classList.remove('input-field-error');
  input.parentNode.classList.add('input-field-verified');
  error.innerText = "";
  editProfileValidationObject[input.id] = true;

}
function setError(input,error,message){
  const inputField = input.parentNode;
  error.innerText = message;
  error.style.display = "block";
  inputField.classList.remove('input-field-verified');
  inputField.classList.add('input-field-error');
  editProfileValidationObject[input.id] = false;


}
function CheckEditProfileFormValidation(){
  return Object.values(editProfileValidationObject).every(el => el == true);
}

for(let i=0;i<userInfo.length-1;i++){
  profileData[i].value = userInfo[i];
}
function updateUserData(){
  let apartmentsArray = users[users.indexOf(loggedInUser)].apartments;
  users[users.indexOf(loggedInUser)] = new UserData(firstName,lastName,email,password,birthDate,apartmentsArray);

  localStorage.setItem('users', JSON.stringify(users));
  window.location.href = "signin-signup.html";
}
editProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(users);
  if(CheckEditProfileFormValidation()){
    if(confirm("Your profile data has been updated!")){
      updateUserData();   
    }else{
      emptyInputs();
    }
  }
});

editProfileBtn.addEventListener("click", () => {
  const editProfileForm = document.querySelector('.edit-profile-form-container');
  editProfileForm.classList.add('animate');
});

function emptyInputs(){
  const editProfileForm = document.querySelector('.edit-profile-form-container');
  let inputs = editProfileForm.querySelectorAll("input");
  for(let el of inputs){
    el.value = "";
    el.parentNode.classList.remove('input-field-verified');
  }
}

