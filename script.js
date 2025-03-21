
const propertyWorkspaceArray = [];

const usersArray = [];

const currentUser = "";

var usersCount = 0;

function loadUserNum() {
    if(sessionStorage.getItem("usersCount")!=0)
        {
            usersCount = Number(sessionStorage.getItem("usersCount"));
            alert(`number of users: ${usersCount}`);
        }
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
                break;
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