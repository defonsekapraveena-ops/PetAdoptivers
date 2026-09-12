```javascript
// ===============================
// PET HAVEN - CREATE ACCOUNT
// ===============================


// Get the form
const form = document.getElementById("Uform");


// Form submit
form.addEventListener("submit", function(event) {

    // Stop the page from refreshing
    event.preventDefault();


    // Get form values
    const firstName = document.getElementById("fname").value.trim();
    const lastName = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("Cpassword").value;
    const accountType = document.getElementById("accountType").value;
    const agreement = document.getElementById("agreement").checked;


    // ===============================
    // VALIDATION
    // ===============================

    if (password !== confirmPassword) {

        alert("❌ Passwords do not match!");

        return;
    }


    if (password.length < 6) {

        alert("❌ Password must contain at least 6 characters.");

        return;
    }


    if (!agreement) {

        alert("❌ Please agree to the Terms & Conditions.");

        return;
    }


    // ===============================
    // CHECK EXISTING USER
    // ===============================

    let users =
        JSON.parse(localStorage.getItem("petHavenUsers")) || [];


    const existingUser = users.find(function(user) {

        return user.email.toLowerCase() === email.toLowerCase();

    });


    if (existingUser) {

        alert(
            "An account with this email already exists."
        );

        return;
    }


    // ===============================
    // CREATE USER
    // ===============================

    const newUser = {

        firstName: firstName,

        lastName: lastName,

        email: email,

        accountType: accountType

    };


    // Add user
    users.push(newUser);


    // Save user
    localStorage.setItem(
        "petHavenUsers",
        JSON.stringify(users)
    );


    // ===============================
    // SEND WELCOME EMAIL
    // ===============================

    const templateParams = {

        to_name: firstName,

        to_email: email,

        account_type: accountType

    };


    emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams
    )


    .then(function(response) {

        console.log("Email sent successfully!", response);


        alert(
            "Account Created Successfully!\n\n" +
            "Welcome to Pet Haven, " +
            firstName +
            "! 🐾\n\n" +
            "A welcome email has been sent to " +
            email
        );


        // Go to login page
        window.location.href = "login.html";

    })


    .catch(function(error) {

        console.error("Email error:", error);


        alert(
            "Your account was created successfully!\n\n" +
            "However, we could not send the welcome email."
        );


        window.location.href = "login.html";

    });

});
```
