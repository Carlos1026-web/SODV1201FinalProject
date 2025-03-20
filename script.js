

$("#signUpForm").on("submit", function(event) {
    alert(`Email: ${document.getElementById("userEmail").value}
    \nPassword: ${document.getElementById("userPassword").value}
    \nName: ${document.getElementById("nameUser").value}
    \nPhone: ${document.getElementById("phoneNum").value}
    \nRole: ${document.getElementById("selectRole").value}`);

    $("#signUpMsg").html("Sign Up Success!");
});