
var propertyWorkspaceArray = [];

var usersArray = [];

var currentUser = "";

var usersCount = 0;

var placesCount = 0;

function loadUserNum() {
    if(sessionStorage.getItem("usersCount")!=0)
    {
        usersCount = Number(sessionStorage.getItem("usersCount"));
        alert(`number of users: ${usersCount}`);
        currentUser = sessionStorage.getItem("currentUserName");
        alert(`current user: ${currentUser}`);
    }
    
    // if(currentUser.getItem("currentUserName")!="") {
    //     // currentUser = sessionStorage.getItem("currentUserName");
    //     // alert(`current user: ${currentUser}`);
    // }
}

function loadName() {   // to be used on coworker/owner page on properties
    loadUserNum() ;
    $('#coWorkerIntro').text(`Hello, ${currentUser}!`);

    createTable();
    $(".tableDiv").append(tableString);
}

$("#signUpForm").on("submit", function() {
    let email = document.getElementById("userEmail").value ;
    let password = document.getElementById("userPassword").value;
    let name = document.getElementById("nameUser").value;
    let phone = document.getElementById("phoneNum").value;
    let role = document.getElementById("selectRole").value;

    alert(`Email: ${email}
    \nPassword: ${password}
    \nName: ${name}
    \nPhone: ${phone}
    \nRole: ${role}`);

    let newUser = {
        "email": email,
        "password": password,
        "name": name,
        "phone": phone,
        "role": role
    }

    //sessionStorage.setItem(`user${usersCount}`, newUser);
    sessionStorage.setItem(`user${usersCount}`, JSON.stringify(newUser));
    usersCount++;
    sessionStorage.setItem('usersCount', usersCount);

    usersArray.push(newUser);

    alert(`${newUser.email}\n${newUser.password}\n${newUser.name}\n${newUser.phone}\n${newUser.role}`);

    $("#signUpMsg").html("Sign Up Success!");
});

$("#logInForm").on("submit", function() {
    let logInEmail = document.getElementById("logInUserEmail").value ;
    let logInPassword = document.getElementById("logInPassword").value;

    if(usersCount > 0) {

        for(let i = -1; i < usersCount; i++) {
            // let tempUser = sessionStorage.getItem(`user${i + 1}`);
            let tempUser = JSON.parse(sessionStorage.getItem(`user${i + 1}`));
            alert(`user${i + 1} is current scanning user`);

            alert(`${tempUser.email}\n${tempUser.password}\n${tempUser.name}\n${tempUser.phone}\n${tempUser.role}`);

            if(logInEmail == tempUser.email && logInPassword == tempUser.password) {
                alert("Log In Successful!");
                currentUser = tempUser.name;
                sessionStorage.setItem('currentUserName', currentUser);
                break;
            }
            else if (logInPassword != tempUser.password) {    //debugging purposes ONLY
                alert("Password is not correct!");
            }
            else {
                alert("Incorrect Credentials");
            }
        }
    }
    else {
        alert("No users in the database!")
    }
});

$("#newPlaceForm").on("submit", function() {
    let name = document.getElementById("placeName").value ;
    let address = document.getElementById("placeAddress").value;
    let neighborhood = document.getElementById("placeNeighborhood").value;
    let sqft = document.getElementById("placeSquareFeet").value;
    let garage = document.getElementById("placeGarage").value;
    let transitReachable = document.getElementById("placeReachablePublicTransit").value;
    let placeType = document.getElementById("placeType").value;

    alert(`name: ${name}
    \naddress: ${address}
    \nneighborhood: ${neighborhood}
    \nsqft: ${sqft}
    \ngarage: ${garage}
    \ntransitReachable: ${transitReachable}
    \nplaceType: ${placeType}`
    );

    let newPlace = {
        "ownedBy": currentUser,
        "rentedBy": "",
        "address": address,
        "neighborhood": neighborhood,
        "sqft": sqft,
        "garage": garage,
        "transitReachable": transitReachable,
        "placeType": placeType
    }

    //sessionStorage.setItem(`user${usersCount}`, newUser);
    sessionStorage.setItem(`place${placesCount}`, JSON.stringify(newPlace));
    placesCount++;
    sessionStorage.setItem('placesCount', placesCount);

    // usersArray.push(newUser);

    alert(`${newPlace.ownedBy}\n${newPlace.address}\n${newPlace.neighborhood}\n${newPlace.sqft}\n${newPlace.garage}\n${newPlace.transitReachable}\n${newPlace.placeType}`);

    $("#signUpMsg").html("Sign Up Success!");
});

var tableString = "" ;

//div for the table so that it doesn't lose its place when being reset
var divTableString = `<div class="tableDiv"></div>`;

function createTable () {
    tableString= `<table class="placesList">`;
    
    //first row for showing the different categories
    tableString += "<tr>";
        tableString += "<th>Name</th>";
        tableString += "<th>Owned By</th>";
        tableString += "<th>Place Type</th>";
        tableString += "<th>Address</th>";
        tableString += "<th>Neighborhood</th>";
        tableString += "<th>Square Feet</th>";
        tableString += "<th>Has a garage</th>";
        tableString += "<th>Is reachable by transit</th>";
    tableString += "</tr>";

    //loop to set up each entry and put them in their respecitve cells
    for(let i = -1; i < placesCount; i++) {
        tempPlace = JSON.parse(sessionStorage.getItem(`place${i + 1}`));

        tableString += "<tr>";
            tableString += `<td id="entry${i}Name" class="entry${i}">${tempPlace.name}</td>`;
            tableString += `<td id="entry${i}Owner" class="entry${i}">${tempPlace.ownedBy}</td>`;
            tableString += `<td id="entry${i}PlaceType" class="entry${i}">${tempPlace.placeType}</td>`;
            tableString += `<td id="entry${i}Address" class="entry${i}">${tempPlace.address}</td>`;
            tableString += `<td id="entry${i}Neighborhood" class="entry${i}">${tempPlace.neighborhood}</td>`;
            tableString += `<td id="entry${i}SqFt" class="entry${i}">${tempPlace.sqft}</td>`;
            tableString += `<td id="entry${i}Garage" class="entry${i}">${tempPlace.garage}</td>`;
            tableString += `<td id="entry${i}Transit" class="entry${i}">${tempPlace.transitReachable}</td>`;
        tableString += "</tr>";
    }

    //once everything has been recorded on the tableString, put the ending table tag to complete the element
    tableString += "</table>";

    //for debug/console check to make sure everything is being written properly
    console.log(tableString);
}