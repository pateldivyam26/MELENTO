document.addEventListener("DOMContentLoaded", function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("dob").setAttribute("max", today);
});

document.getElementById("register").addEventListener("submit", function (event) {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (password != confirmPassword) {
        alert("Passwords do not match.");
        event.preventDefault();
    }
});

function login() {
    alert("Login functionality will be implemented here.");
}