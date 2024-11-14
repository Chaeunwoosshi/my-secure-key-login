function showModal() {
    document.getElementById('modal').style.display = 'flex';
}

function hideModal() {
    document.getElementById('modal').style.display = 'none';
}

function checkEnter(event) {
    if (event.key === "Enter") {
        validateKey();
    }
}

function validateKey() {
    const key = document.getElementById("access-key").value;
    const loginStatus = document.getElementById("login-status");
    const myLoginDiv = document.querySelector(".mylogin");

    // Array of valid keys
    const validKeys = ["KEY3", "KEY4"]; // Add as many keys as you need

    if (validKeys.includes(key)) {
        loginStatus.textContent = "Access granted!";
        loginStatus.style.color = "#0f0";
        myLoginDiv.style.display = "none"; // Hide the 'mylogin' div when access is granted
        setCookie("accessKey", key); // Save the valid key in a permanent cookie
    } else {
        loginStatus.textContent = "Invalid key. Please try again.";
        loginStatus.style.color = "#f00";
    }
}

// Function to set a permanent cookie
function setCookie(name, value) {
    let expires = "expires=" + new Date(9999, 12, 31).toUTCString(); // Set a far-off expiration date
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// On page load, check if the access key cookie exists and validate it
window.onload = function() {
    const accessKey = getCookie("accessKey");
    const validKeys = ["KEY3", "KEY4"]; // Current valid keys

    if (accessKey && validKeys.includes(accessKey)) {
        document.querySelector(".mylogin").style.display = "none"; // Hide login section if key is still valid
    } else {
        // If the key is not in the validKeys array, invalidate access and show the login section
        document.querySelector(".mylogin").style.display = "flex";
        document.getElementById("login-status").textContent = "Access denied. Key is no longer valid.";
        document.getElementById("login-status").style.color = "#f00";
        setCookie("accessKey", "", -1); // Clear the invalid cookie
    }
};
