let apartmentsArray = users[users.indexOf(loggedInUser)].apartments;
let favoriteApartmentsArray = apartmentsArray.filter(item => item.favorite === 1);
console.log(favoriteApartmentsArray);

function createTable(apartments){

  let flatsTable = document.getElementById("flats_table");
  let headerRowValues = ["ID","City","Street Name","Street Number","AC","Area Size","Year Build","Rent Price", "Available Date","Delete"];
  
  // Clear existing table
  while (flatsTable.firstChild) {
    flatsTable.removeChild(flatsTable.firstChild);
  }
  // Create table header
  let theadTable = document.createElement("thead");
  let headerRow = document.createElement("tr");

  for(let i=0; i<10; i++){
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
      if(prop == "favorite"){
        cell.addEventListener("click", deleteFavorite);
        cell.innerHTML = "<i class='bx bx-x-circle' style='color:#db2c2a'></i>";
      } else{
        cell.innerHTML = value;
      }
      cell.setAttribute("data-label", prop);
      row.appendChild(cell);
    }
    row.firstChild.setAttribute("scope", "row");

   tbody.appendChild(row);
  }

  flatsTable.appendChild(tbody); 
}
createTable(favoriteApartmentsArray);

function deleteFavorite(event){
  try{
  let entryTarget = event.target;
  //Delete row
  const flatsTable = document.getElementById("flats_table");
  const rowIndex = entryTarget.parentNode.parentNode.rowIndex;
  flatsTable.deleteRow(rowIndex);
  //Delete flat from localStorage
  let rowID = entryTarget.parentNode.parentNode.cells[0].innerText;
  let flatID = apartmentsArray.findIndex(item => item.flatID == rowID)

  //Change the value of favorite from local storage
  apartmentsArray[flatID].favorite = 0;
  favoriteApartmentsArray.splice(flatID, 1);
 
  
  loggedInUser.apartments = apartmentsArray;
  users[users.indexOf(loggedInUser)] = loggedInUser;
  localStorage.setItem('users', JSON.stringify(users));
  } catch {}
  
}