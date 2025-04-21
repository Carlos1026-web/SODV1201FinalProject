
var propertyWorkspaceArray = [];

var usersArray = [];

var currentUser = "";

var usersCount = 0;

var propertyCount = 0;

var workspaceCount = 0;

var role = "";

var debug = 1 ;

function loadUserNum() {
    // if(sessionStorage.getItem("usersCount")!=0)
    // {
    //     usersCount = Number(sessionStorage.getItem("usersCount"));
    //     alert(`number of users: ${usersCount}`);
    //     placesCount = Number(sessionStorage.getItem("placesCount"));
    //     alert(`number of places: ${placesCount}`);
    //     currentUser = sessionStorage.getItem("currentUserName");
    //     alert(`current user: ${currentUser}`);
    // }
    
    // // if(currentUser.getItem("currentUserName")!="") {
    // //     // currentUser = sessionStorage.getItem("currentUserName");
    // //     // alert(`current user: ${currentUser}`);
    // // }

    // if (sessionStorage['propertyCount']) {
    //     alert(`property Count:  ${sessionStorage.getItem('propertyCount')}`);
    //     propertyCount = sessionStorage.getItem('propertyCount');
    // }

    // if (sessionStorage['workspaceCount']) {
    //     alert(`workspace Count:  ${sessionStorage.getItem('workspaceCount')}`);
    //     workspaceCount = sessionStorage.getItem('workspaceCount');
    // }
}

function loadName() {   // to be used on coworker/owner page on properties
    checkIfCoworker();
    
    loadUserNum() ;
    $('#coWorkerIntro').text(`Hello, ${currentUser}!`);

    createPropertyTable();
    $(".tableDiv").append(propertyTableString);
}

function loadOwnerName() {
    checkIfOwner();

    loadUserNum() ;
    $('#ownerIntro').text(`Hello, ${currentUser}!`);

    createOwnerTable();
    $(".tableDiv").append(tableString);
}

function checkIfCoworker() {
    if (!(sessionStorage['currentUserName'])) {
        alert("You are not logged in.");
        location.href = 'index.html';
    }

    usersCount = sessionStorage.getItem('usersCount');

    currentUser = sessionStorage.getItem('currentUserName');

    for(var i = 0; i < usersCount; i++) {
        let tempUser = JSON.parse(sessionStorage.getItem(`user${i}`));

        if (currentUser == tempUser.name) {
            let role = tempUser.role;

            if(role != 'Coworker' || role == null) {
                alert("User is not a Coworker or is not logged in");
                location.href = 'index.html';
            }

            break;
        }
    }
}

function checkIfOwner() {
    if (!(sessionStorage['user0'])) {
        alert("You are not logged in.");
        location.href = 'index.html';
    }

    usersCount = sessionStorage.getItem('usersCount');

    currentUser = sessionStorage.getItem('currentUserName');

    for(var i = 0; i < usersCount; i++) {
        let tempUser = JSON.parse(sessionStorage.getItem(`user${i}`));

        if (currentUser == tempUser.name) {
            let role = tempUser.role;

            if(role != 'Owner' || role == null) {
                alert("User is not a Owner or is not logged in");
                location.href = 'index.html';
            }

            break;
        }
    }
}

//===========================================================================

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

                // var currRole = tempUser.role

                sessionStorage.setItem('currentRole', tempUser.role)
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

$("#newPropertyForm").on("submit", function() {
    if (sessionStorage['propertyCount']) {
        alert(`property Count:  ${sessionStorage.getItem('propertyCount')}`);
    }
                
    let name = document.getElementById("propertyName").value ;
    let address = document.getElementById("placeAddress").value;
    let neighborhood = document.getElementById("placeNeighborhood").value;
    let sqft = document.getElementById("placeSquareFeet").value;
    let garage = document.getElementById("placeGarage").value;
    let transitReachable = document.getElementById("placeReachablePublicTransit").value;

    alert(`name: ${name}
    \nOwned By: ${sessionStorage.getItem('currentUserName')}
    \naddress: ${address}
    \nneighborhood: ${neighborhood}
    \nsqft: ${sqft}
    \ngarage: ${garage}
    \ntransitReachable: ${transitReachable}`
    );

    let newProperty = {
        "name": name,
        "ownedBy": sessionStorage.getItem('currentUserName'),
        "rentedBy": '',
        "address": address,
        "neighborhood": neighborhood,
        "sqft": sqft,
        "garage": garage,
        "transitReachable": transitReachable
    }

    //sessionStorage.setItem(`user${usersCount}`, newUser);
    sessionStorage.setItem(`property${propertyCount}`, JSON.stringify(newProperty));
    propertyCount++;
    sessionStorage.setItem('propertyCount', propertyCount);

    // usersArray.push(newUser);

    alert(`${newProperty.ownedBy}\n${newProperty.address}\n${newProperty.neighborhood}\n${newProperty.sqft}\n${newProperty.garage}\n${newProperty.transitReachable}`);

    $("#signUpMsg").html("Sign Up Success!");
});

//create function for new workspace here
$("#newWorkspaceForm").on("submit", function() {
    if (sessionStorage['workspaceCount']) {
        alert(`workspace Count:  ${sessionStorage.getItem('workspaceCount')}`);
    }
                
    let name = document.getElementById("WorkspaceName").value ;
    let meetingRoom = document.getElementById("placeMeetingRoom").value;
    let privateOffice = document.getElementById("placePrivateOffice").value;
    let openDesk = document.getElementById("placeOpenDesk").value;
    let capacity = document.getElementById("placeCapacity").value;
    let smoking = document.getElementById("placeSmoking").value;
    let availability = document.getElementById("placeAvailability").value;
    let rentTerm = document.getElementById("placeRentTerm").value;
    let termPrice = document.getElementById("placePrice").value;

    alert(`name: ${name}
    \nOwned By: ${sessionStorage.getItem('currentUserName')}
    \nmeetingRoom ${meetingRoom}
    \nprivateOffice: ${privateOffice}
    \nopenDesk: ${openDesk}
    \ncapacity: ${capacity}
    \nsmoking: ${smoking}
    \navailability: ${availability}
    \nrentTerm: ${rentTerm}
    \ntermPrice: ${termPrice}`
    );

    let newWorkspace = {
        "name": name,
        "ownedBy": sessionStorage.getItem('currentUserName'),
        "rentedBy": '',
        "meetingRoom": meetingRoom,
        "privateOffice": privateOffice,
        "openDesk": openDesk,
        "capacity": capacity,
        "smoking": smoking,
        "availability": availability,
        "rentTerm": rentTerm,
        "termPrice": termPrice
    }

    //sessionStorage.setItem(`user${usersCount}`, newUser);
    sessionStorage.setItem(`workspace${workspaceCount}`, JSON.stringify(newWorkspace));
    workspaceCount++;
    sessionStorage.setItem('workspaceCount', workspaceCount);

    // usersArray.push(newUser);

    alert(`${newProperty.ownedBy}\n${newProperty.address}\n${newProperty.neighborhood}\n${newProperty.sqft}\n${newProperty.garage}\n${newProperty.transitReachable}`);

    $("#signUpMsg").html("Sign Up Success!");
});

//===========================================================================

var propertyTableString = "" ;

function createPropertyTable () {
    propertyCount = sessionStorage.getItem('propertyCount');
    userCount = sessionStorage.getItem('usersCount');

    propertyTableString= `<table class="propertiesList">`;
    
    //first row for showing the different categories
    propertyTableString += "<tr>";
        propertyTableString += "<th>Name</th>";
        propertyTableString += "<th>Owned By</th>";
        propertyTableString += "<th>Owner Email</th>";
        propertyTableString += "<th>Owner Phone</th>";
        propertyTableString += "<th>Address</th>";
        propertyTableString += "<th>Neighborhood</th>";
        propertyTableString += "<th>Square Feet</th>";
        propertyTableString += "<th>Has a garage</th>";
        propertyTableString += "<th>Is reachable by transit</th>";
    propertyTableString += "</tr>";

    //loop to set up each entry and put them in their respecitve cells
    for(let i = 0; i < propertyCount; i++) {
        tempProperty = JSON.parse(sessionStorage.getItem(`property${i}`));

        propertyTableString += "<tr>";
            propertyTableString += `<td id="entry${i}Name" class="entry${i}">${tempProperty.name}</td>`;

            for(let j = 0; j < userCount; j++) {
                let tempUser = JSON.parse(sessionStorage.getItem(`user${j}`));

                if(tempProperty.ownedBy == tempUser.name) {
                    propertyTableString += `<td id="property${i}Owner" class="property${i}">${tempProperty.ownedBy}</td>`;
                    propertyTableString += `<td id="property${i}OwnerEmail" class="property${i}">${tempUser.email}</td>`;
                    propertyTableString += `<td id="property${i}OwnerPhone" class="property${i}">${tempUser.phone}</td>`;
                    break;
                }
                break
            }

            // propertyTableString += `<td id="property${i}Owner" class="property${i}">${tempProperty.ownedBy}</td>`;
            propertyTableString += `<td id="property${i}Address" class="property${i}">${tempProperty.address}</td>`;
            propertyTableString += `<td id="property${i}Neighborhood" class="property${i}">${tempProperty.neighborhood}</td>`;
            propertyTableString += `<td id="property${i}SqFt" class="property${i}">${tempProperty.sqft}</td>`;
            propertyTableString += `<td id="property${i}Garage" class="property${i}">${tempProperty.garage}</td>`;
            propertyTableString += `<td id="property${i}Transit" class="property${i}">${tempProperty.transitReachable}</td>`;
        propertyTableString += "</tr>";
    }

    //once everything has been recorded on the tableString, put the ending table tag to complete the element
    propertyTableString += "</table>";

    //for debug/console check to make sure everything is being written properly
    console.log(propertyTableString);
}

function restartTable () {
    //table will be fade out first
    $(".placesList").fadeOut();

    setTimeout(function() {
        //table will get removed from html
        $(".placesList").remove();

        //then it will be called back
        createPropertyTable();
        $(".tableDiv").append(propertyTableString);
        $(".placesList").css("display", "none");

        $(".placesList").fadeIn();
    },500);
}

$("#filterSubmit").on("click", function() {
    alert("test");
    let filter = document.getElementById("filterBy").value;

    $(".placesList").remove();

    if(filter == "Property") {
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
        for(let i = 0; i < placesCount; i++) {
            tempPlace = JSON.parse(sessionStorage.getItem(`place${i}`));

            if(tempPlace.placeType == "Property") {
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
        }

        //once everything has been recorded on the tableString, put the ending table tag to complete the element
        tableString += "</table>";

        $(".tableDiv").append(tableString);
    }
    if(filter == "Workspace") {
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
        for(let i = 0; i < placesCount; i++) {
            tempPlace = JSON.parse(sessionStorage.getItem(`place${i}`));

            if(tempPlace.placeType == "Workspace") {
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
        }

        //once everything has been recorded on the tableString, put the ending table tag to complete the element
        tableString += "</table>";

        $(".tableDiv").append(tableString);
    }
});

$("#searchPlace").on('keyup', function (e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        let search = document.getElementById("searchPlace").value ;

        $(".propertiesList").remove();

    propertyCount = sessionStorage.getItem('propertyCount');
    userCount = sessionStorage.getItem('usersCount');

    propertyTableString= `<table class="propertiesList">`;
    
    //first row for showing the different categories
    propertyTableString += "<tr>";
        propertyTableString += "<th>Name</th>";
        propertyTableString += "<th>Owned By</th>";
        propertyTableString += "<th>Owner Email</th>";
        propertyTableString += "<th>Owner Phone</th>";
        propertyTableString += "<th>Address</th>";
        propertyTableString += "<th>Neighborhood</th>";
        propertyTableString += "<th>Square Feet</th>";
        propertyTableString += "<th>Has a garage</th>";
        propertyTableString += "<th>Is reachable by transit</th>";
    propertyTableString += "</tr>";

        //loop to set up each entry and put them in their respecitve cells
        for(let i = 0; i < propertyCount; i++) {
            tempProperty = JSON.parse(sessionStorage.getItem(`property${i}`));

            if(tempProperty.name == search) {
                propertyTableString += "<tr>";
                    propertyTableString += `<td id="entry${i}Name" class="entry${i}">${tempProperty.name}</td>`;

                for(let j = 0; j < userCount; j++) {
                    let tempUser = JSON.parse(sessionStorage.getItem(`user${j}`));

                    if(tempProperty.ownedBy == tempUser.name) {
                        propertyTableString += `<td id="property${i}Owner" class="property${i}">${tempProperty.ownedBy}</td>`;
                        propertyTableString += `<td id="property${i}OwnerEmail" class="property${i}">${tempUser.email}</td>`;
                        propertyTableString += `<td id="property${i}OwnerPhone" class="property${i}">${tempUser.phone}</td>`;
                        break;
                    }
                    // break
                }
                    propertyTableString += `<td id="property${i}Address" class="property${i}">${tempProperty.address}</td>`;
                    propertyTableString += `<td id="property${i}Neighborhood" class="property${i}">${tempProperty.neighborhood}</td>`;
                    propertyTableString += `<td id="property${i}SqFt" class="property${i}">${tempProperty.sqft}</td>`;
                    propertyTableString += `<td id="property${i}Garage" class="property${i}">${tempProperty.garage}</td>`;
                    propertyTableString += `<td id="property${i}Transit" class="property${i}">${tempProperty.transitReachable}</td>`;
                propertyTableString += "</tr>";
            }
        }

        //once everything has been recorded on the tableString, put the ending table tag to complete the element
        propertyTableString += "</table>";

        $(".tableDiv").append(propertyTableString);
    }
});

function createOwnerTable () {
    tableString= `<table class="placesList">`;
    
    //first row for showing the different categories
    tableString += "<tr>";
        tableString += "<th>Name</th>";
        tableString += "<th>Owned By</th>";
        tableString += "<th>Being Rented</th>";
        tableString += "<th>Place Type</th>";
        tableString += "<th>Address</th>";
        tableString += "<th>Neighborhood</th>";
        tableString += "<th>Square Feet</th>";
        tableString += "<th>Has a garage</th>";
        tableString += "<th>Is reachable by transit</th>";
    tableString += "</tr>";

    //loop to set up each entry and put them in their respecitve cells
    for(let i = 0; i < placesCount; i++) {
        tempPlace = JSON.parse(sessionStorage.getItem(`place${i}`));

        if(tempPlace.ownedBy == currentUser) {

            tableString += "<tr>";
                tableString += `<td id="entry${i}Name" class="entry${i}">${tempPlace.name}</td>`;
                tableString += `<td id="entry${i}Owner" class="entry${i}">${tempPlace.ownedBy}</td>`;

                if(tempPlace.rentedBy != "") {
                    tableString += `<td id="entry${i}BeingRented" class="entry${i}">Yes</td>`;
                }
                else {
                    tableString += `<td id="entry${i}BeingRented" class="entry${i}">No</td>`;
                }

                tableString += `<td id="entry${i}PlaceType" class="entry${i}">${tempPlace.placeType}</td>`;
                tableString += `<td id="entry${i}Address" class="entry${i}">${tempPlace.address}</td>`;
                tableString += `<td id="entry${i}Neighborhood" class="entry${i}">${tempPlace.neighborhood}</td>`;
                tableString += `<td id="entry${i}SqFt" class="entry${i}">${tempPlace.sqft}</td>`;
                tableString += `<td id="entry${i}Garage" class="entry${i}">${tempPlace.garage}</td>`;
                tableString += `<td id="entry${i}Transit" class="entry${i}">${tempPlace.transitReachable}</td>`;
            tableString += "</tr>";
        }
    }

    //once everything has been recorded on the tableString, put the ending table tag to complete the element
    tableString += "</table>";

    //for debug/console check to make sure everything is being written properly
    console.log(tableString);
}

$("#filterOwnerSubmit").on("click", function() {
    alert("test");
    let filter = document.getElementById("filterByOwner").value;

    $(".placesList").remove();

    if(filter == "Property") {
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
        for(let i = 0; i < placesCount; i++) {
            tempPlace = JSON.parse(sessionStorage.getItem(`place${i}`));

            if(tempPlace.placeType == "Property" && tempPlace.ownedBy == currentUser) {

                tableString += "<tr>";
                    tableString += `<td id="entry${i}Name" class="entry${i}">${tempPlace.name}</td>`;
                    tableString += `<td id="entry${i}Owner" class="entry${i}">${tempPlace.ownedBy}</td>`;
    
                    if(tempPlace.rentedBy != "") {
                        tableString += `<td id="entry${i}BeingRented" class="entry${i}">Yes</td>`;
                    }
                    else {
                        tableString += `<td id="entry${i}BeingRented" class="entry${i}">No</td>`;
                    }
    
                    tableString += `<td id="entry${i}PlaceType" class="entry${i}">${tempPlace.placeType}</td>`;
                    tableString += `<td id="entry${i}Address" class="entry${i}">${tempPlace.address}</td>`;
                    tableString += `<td id="entry${i}Neighborhood" class="entry${i}">${tempPlace.neighborhood}</td>`;
                    tableString += `<td id="entry${i}SqFt" class="entry${i}">${tempPlace.sqft}</td>`;
                    tableString += `<td id="entry${i}Garage" class="entry${i}">${tempPlace.garage}</td>`;
                    tableString += `<td id="entry${i}Transit" class="entry${i}">${tempPlace.transitReachable}</td>`;
                tableString += "</tr>";
            }
        }

        //once everything has been recorded on the tableString, put the ending table tag to complete the element
        tableString += "</table>";

        $(".tableDiv").append(tableString);
    }
    if(filter == "Workspace") {
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
        for(let i = 0; i < placesCount; i++) {
            tempPlace = JSON.parse(sessionStorage.getItem(`place${i}`));

            if(tempPlace.placeType == "Workspace" && tempPlace.ownedBy == currentUser) {

                tableString += "<tr>";
                    tableString += `<td id="entry${i}Name" class="entry${i}">${tempPlace.name}</td>`;
                    tableString += `<td id="entry${i}Owner" class="entry${i}">${tempPlace.ownedBy}</td>`;
    
                    if(tempPlace.rentedBy != "") {
                        tableString += `<td id="entry${i}BeingRented" class="entry${i}">Yes</td>`;
                    }
                    else {
                        tableString += `<td id="entry${i}BeingRented" class="entry${i}">No</td>`;
                    }
    
                    tableString += `<td id="entry${i}PlaceType" class="entry${i}">${tempPlace.placeType}</td>`;
                    tableString += `<td id="entry${i}Address" class="entry${i}">${tempPlace.address}</td>`;
                    tableString += `<td id="entry${i}Neighborhood" class="entry${i}">${tempPlace.neighborhood}</td>`;
                    tableString += `<td id="entry${i}SqFt" class="entry${i}">${tempPlace.sqft}</td>`;
                    tableString += `<td id="entry${i}Garage" class="entry${i}">${tempPlace.garage}</td>`;
                    tableString += `<td id="entry${i}Transit" class="entry${i}">${tempPlace.transitReachable}</td>`;
                tableString += "</tr>";
            }
        }

        //once everything has been recorded on the tableString, put the ending table tag to complete the element
        tableString += "</table>";

        $(".tableDiv").append(tableString);
    }
});