class NewFlat {
  constructor(flatID,city,streetName,streetNumber,ac,areaSize,yearBuild,rentPrice,availableDate,favorite){
      this.flatID = flatID;
      this.city = city;
      this.streetName = streetName;
      this.streetNumber = streetNumber;
      this.ac = ac;
      this.areaSize = areaSize;
      this.yearBuild = yearBuild;
      this.rentPrice = rentPrice;
      this.availableDate = availableDate;
      this.favorite = favorite;
  }
}


let apartmentsArray = users[users.indexOf(loggedInUser)].apartments;
let flatID = FindMaxID();

function FindMaxID(){
  const loginCredentials = JSON.parse(localStorage.getItem('loginUser'));
  const loginEmail = loginCredentials.email;
  const loginPassword = loginCredentials.password;
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let loggedInUser = users.find(user => user.email === loginEmail && user.password === loginPassword);
  let apartmentsArray = users[users.indexOf(loggedInUser)].apartments;
  let maxID =0;
  if(apartmentsArray)
  for(let ap of apartmentsArray)
    {
      if(ap.flatID>maxID)
        {
          maxID=ap.flatID;
        }
    }
    return maxID;
}

function createTable(apartments){

  let flatsTable = document.getElementById("flats_table");
  let headerRowValues = ["ID","City","Street Name","Street Number","AC","Area Size","Year Build","Rent Price", "Available Date","Add to favorite","Delete"];
  
  // Clear existing table
  while (flatsTable.firstChild) {
    flatsTable.removeChild(flatsTable.firstChild);
  }
  // Create table header
  let theadTable = document.createElement("thead");
  let headerRow = document.createElement("tr");

  for(let i=0; i<11; i++){
    let th = document.createElement("th");
    th.innerText = headerRowValues[i];
    th.setAttribute("scope", "col");
    headerRow.appendChild(th);
  }
  theadTable.appendChild(headerRow);
  flatsTable.appendChild(theadTable);

  // Create table body
  let tbody = document.createElement("tbody");
  for(let apartmentObj of apartments){
    let row = document.createElement("tr");
    for(let [prop,value] of Object.entries(apartmentObj)){
      let cell = document.createElement("td");
      // Add icon on favorite cell
      if(prop == "favorite"){
        cell.addEventListener("click", addToFavorite);
        if(value == 0){
          cell.innerHTML = "<i class='bx bxs-heart' style='color: black'></i>";
        } else{
          cell.innerHTML = "<i class='bx bxs-heart' style='color: red'></i>";
        }
      } else{
        cell.innerHTML = value;
      }
      cell.setAttribute("data-label", prop);
      row.appendChild(cell);
    }
    // Add the delete cell and the icon at the end of the table 
    let deleteCell = document.createElement("td");
    const deleteIcon = "<i class='bx bx-x-circle' style='color:#db2c2a'></i>";
    deleteCell.addEventListener("click", deleteEntry);
    deleteCell.innerHTML = deleteIcon;
    row.appendChild(deleteCell);
    row.firstChild.setAttribute("scope", "row");

   tbody.appendChild(row);
  }

  flatsTable.appendChild(tbody); 
}



let addFlatButton = document.getElementById("add_flat_btn");
addFlatButton.addEventListener('click', addFlat);

// Add flat function on home page
function addFlat(){

  flatID = FindMaxID()+1;
  // Get all inputs value
  let city = document.getElementById("city_input").value;
  let streetName = document.getElementById("street_name_input").value;
  let streetNumber = document.getElementById("street_number_input").value;
  let ac = document.getElementById("ac_input").value;
  let areaSize = document.getElementById("area_size_input").value;
  let yearBuild = document.getElementById("year_build_input").value;
  let rentPrice = document.getElementById("rent_price_input").value;
  let availableDate = document.getElementById("available_date_input").value;
 
  // Create a new flat object with inputs value
  let newFlat = new NewFlat(flatID,city,streetName,streetNumber,ac,areaSize,yearBuild,rentPrice,availableDate,0);

  if(hasEmptyStringProperty(newFlat)){
    alert("You must complete all the form fields")
  }else{
    //Save the updated apartments array in local storage
    apartmentsArray.push(newFlat);
    loggedInUser.apartments = apartmentsArray;
    users[users.indexOf(loggedInUser)] = loggedInUser;
    localStorage.setItem('users', JSON.stringify(users));
    // Create the table with new data
    createTable(apartmentsArray);
    clearInputs()
  }

}
function clearInputs(){
  let addFlatForm = document.getElementById("add_flat_form");

  let inputs = addFlatForm.querySelectorAll("input");
  console.log(inputs);
  for(let el of inputs){
    el.value = "";
  }
}
function hasEmptyStringProperty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === "") {
      return true; // Return true if any property has an empty string value
    }
  }
  return false; // Return false if no empty string property is found
}

function deleteEntry(event) {
  let entryTarget = event.target;
  //Delete row
  const flatsTable = document.getElementById("flats_table");
  const rowIndex = entryTarget.parentNode.parentNode.rowIndex;
  flatsTable.deleteRow(rowIndex);
  //Delete flat from localStorage
  let apartmentsArray = users[users.indexOf(loggedInUser)].apartments;
  let rowID = entryTarget.parentNode.parentNode.cells[0].innerText;
  let flatID = apartmentsArray.findIndex(item => item.flatID == rowID)
  apartmentsArray.splice(flatID, 1);

  //Set the updated apartments array in local storage
  loggedInUser.apartments = apartmentsArray;
  users[users.indexOf(loggedInUser)] = loggedInUser;
  localStorage.setItem('users', JSON.stringify(users));
  
}

function addToFavorite(event){
  let entryTarget = event.target;
  let selectedRow = entryTarget.parentNode.parentNode;
  let addToFavoriteBtn = selectedRow.querySelector(".bxs-heart");
  
  //Find which flat to add to favorites 
  let apartmentsArray = users[users.indexOf(loggedInUser)].apartments;
  let rowID = entryTarget.parentNode.parentNode.cells[0].innerText;
  let flatID = apartmentsArray.findIndex(item => item.flatID == rowID);

  if(apartmentsArray[flatID].favorite == 0){
    //Change the style of the favorite button
    addToFavoriteBtn.style.color = "red";
    //Change the value of the favorite property from local storage
    apartmentsArray[flatID].favorite = 1;
    loggedInUser.apartments = apartmentsArray;
    users[users.indexOf(loggedInUser)] = loggedInUser;
    localStorage.setItem('users', JSON.stringify(users));
  } else{
    //Change the style of the favorite button
    addToFavoriteBtn.style.color = "black";
    //Change the value of the favorite property from local storage
    apartmentsArray[flatID].favorite = 0;
    loggedInUser.apartments = apartmentsArray;
    users[users.indexOf(loggedInUser)] = loggedInUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
}

document.getElementById('view_flats_btn').addEventListener('click', () => createTable(apartmentsArray));

document.getElementById('filter_form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the selected value of the <select> element
  const selectedOption = document.getElementById('filters').value;
  // Get the input value
  let inputVal = document.getElementById('filter_form_input').value;
  let apartmentsArray = users[users.indexOf(loggedInUser)].apartments;
  let filteredApartmentsArray = [];

  for(let apartmentObj of apartmentsArray){
    if(selectedOption == 'city' && apartmentObj.city == inputVal){
        filteredApartmentsArray.push(apartmentObj);
    }
    if(selectedOption == 'rentPrice' && apartmentObj.rentPrice == inputVal){
        filteredApartmentsArray.push(apartmentObj);
    }
    if(selectedOption == 'areaSize' && apartmentObj.areaSize == inputVal){
        filteredApartmentsArray.push(apartmentObj);
    }
  }
  createTable(filteredApartmentsArray);
});

document.getElementById('sort_form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the selected value of the <select> element
  const selectedOption = document.getElementById('sort').value;
  // Get all the apartments from local storage
  let apartmentsArray = users[users.indexOf(loggedInUser)].apartments;
  let sortedApartmentsArray = apartmentsArray;
  if(selectedOption == 'city'){
    sortedApartmentsArray.sort((a, b) => {
      const cityA = a.city.toUpperCase(); // Convert city names to uppercase
      const cityB = b.city.toUpperCase();
        
      if (cityA < cityB) {
        return -1;
      }
      if (cityA > cityB) {
        return 1;
      }
      return 0;
    });
  }
  if(selectedOption == 'rentPrice'){
    sortedApartmentsArray.sort((a, b) => {
      return a.rentPrice - b.rentPrice;
    });
  }
  if(selectedOption == 'areaSize'){
    sortedApartmentsArray.sort((a, b) => {
      return a.areaSize - b.areaSize;
    });
  }
  
  createTable(sortedApartmentsArray);
});
//Add flat form animation
let showAddFlatForm = document.getElementById("show_add_flat_form");
showAddFlatForm.addEventListener('click', () =>{
  let id = null;
  let addFlatForm = document.getElementById("main_content"); 
  let pos = -330;
  id = setInterval(frame, 1);
  function frame() {
    if (pos == 0) {
      clearInterval(id);
    }else{
      pos=pos+5; 
      addFlatForm.style.top = pos + "px"; 
    }
  }
});

let closeAddFlatForm = document.getElementById("close_form");
closeAddFlatForm.addEventListener('click', () =>{
  let id = null;
  let addFlatForm = document.getElementById("main_content"); 
  let pos = 0;
  id = setInterval(frame, 1);
  function frame() {
    if (pos == -330 && window.screen.width > 860) {
      clearInterval(id);
    } else if(pos == -740 && window.screen.width < 860){
      clearInterval(id);
    }else {
      pos=pos-5; 
      addFlatForm.style.top = pos + "px"; 
    }
  }
});

createTable(apartmentsArray);
