
const propertyWorkspaceArray = [];

const usersArray = [];

const currentUser = "";

var usersCount = 0;

function loadUserNum() {
    if(sessionStorage.getItem("usersCount")!=null)
        {
            usersCount = Number(sessionStorage.getItem("counter"));
            alert(`number of users: ${usersCount}`);
        }
}

$("#signUpForm").on("submit", function() {
    let email = document.getElementById("userEmail").value ;
    let password = document.getElementById("userPassword").value;
    let name = document.getElementById("nameUser").value;
    let phone = document.getElementById("phoneNum").value;
    let role = document.getElementById("selectRole").value;

    sessionStorage.setItem('usersCount', usersCount);
    sessionStorage.setItem(`user${usersCount}`, newUser);

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

    usersCount++;

    usersArray.push(newUser);

    alert(`${newUser.email}\n${newUser.password}\n${newUser.name}\n${newUser.phone}\n${newUser.role}`);

    $("#signUpMsg").html("Sign Up Success!");
});

$("#logInForm").on("submit", function() {
    let logInEmail = document.getElementById("logInUserEmail").value ;
    let logInPassword = document.getElementById("logInPassword").value;

    if(usersArray.length > 0) {

        for(let i = 0; i < usersArray.length; i++) {
            if(logInEmail == usersArray[i].email && logInPassword == usersArray[i].password) {

            }
            else if (logInPassword != usersArray[i].password) {    //debugging purposes ONLY
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