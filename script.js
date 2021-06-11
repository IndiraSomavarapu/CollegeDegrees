/* 
JavaScript program to read Json data and show it as table
 */

//  trigger getJson function upon event
window.addEventListener("DOMContentLoaded", getJson());

// make http request to read json file from github account
function getJson() {

   makeRequest("https://indirasomavarapu.github.io/CollegeDegrees/degrees.json");

}

// read json data by calling the url
function makeRequest(url) {

   let errorContainer = document.getElementById("error_message");
   let errors = document.getElementById("error_list");
   httpRequest = new XMLHttpRequest();

   errorContainer.style.display = "none";
   errors.innerHTML = "<p>Please fix the following errors:</p>";

   if (!httpRequest) {
      errors.innerHTML += "Unable to create an JsonHTTP instance";
      errorContainer.style.display = "block";
      return false;
   }
   // This will run once the httpRequest's state has changed
   httpRequest.onreadystatechange = function () {
      //check if response is done
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
         //check if status = 200, success, call function to update DOM
         if (httpRequest.status === 200) {
            //Parse the response and grab the array 
            let mydegrees = JSON.parse(httpRequest.responseText).my_college_degrees;
            populateTable(mydegrees);
         } else {
            //AJAX call unsuccessful
            errorContainer.style.display = "block";
            errors.innerHTML += "Error! Status is ";
            errors.innerHTML += httpRequest.status;
            return false;
         }
      }
   };
   httpRequest.open('GET', url);
   httpRequest.send();
}

// Populate table and show json 
function populateTable(degrees) {

   var col = [];
   for (var i = 0; i < degrees.length; i++) {
      for (var key in degrees[i]) {
         if (col.indexOf(key) === -1) {
            col.push(key);
         }
      }
   }

   // Create table dynamically
   var table = document.createElement("table");

   // add row
   var tr = table.insertRow(-1);

   // capture column heading from json
   for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th);
   }

   // add data to table rows
   for (var i = 0; i < degrees.length; i++) {

      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
         var tabCell = tr.insertCell(-1);
         tabCell.innerHTML = degrees[i][col[j]];
      }
   }

   // show json converted table data on html page
   var tableContainer = document.getElementById("showJson");
   tableContainer.innerHTML = "";
   tableContainer.appendChild(table);
}

