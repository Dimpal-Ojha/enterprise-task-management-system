// =========================
// LOGIN
// =========================
const loginForm =
document.getElementById("loginForm");
if(loginForm){
    loginForm.addEventListener(
    "submit",
    function(e){
        e.preventDefault();
        const email =
        document.getElementById("email").value;
        const password =
        document.getElementById("password").value;
        const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];
        const user =
        users.find(user =>
            user.email === email &&
            user.password === password
        );
        if(user){
            localStorage.setItem(
                "loggedIn",
                "true"
            );

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );
            window.location.href =
            "dashboard.html";
        }
        else{
            document.getElementById("error")
            .innerText =
            "Invalid Email or Password";
        }
    });
}
// =========================
// REGISTER
// =========================
const registerForm =
document.getElementById("registerForm");
if(registerForm){
    registerForm.addEventListener(
    "submit",
    function(e){
        e.preventDefault();
        const name =
        document.getElementById("name").value;
        const email =
        document.getElementById("email").value;
        const password =
        document.getElementById("password").value;
        const confirmPassword =
        document.getElementById("confirmPassword").value;
        const message =
        document.getElementById("message");
        if(password !== confirmPassword){
            message.innerText =
            "Passwords do not match";
            return;
        }
        let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];
        const existingUser =
        users.find(
            user =>
            user.email === email
        );
        if(existingUser){
            message.innerText =
            "Email already registered";
            return;
        }
        const user = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            role: "Employee"
        };
        users.push(user);
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );
        message.innerText =
        "Registration Successful";
        registerForm.reset();
        setTimeout(() => {
            window.location.href =
            "login.html";
        }, 1500);
    });
}
// =========================
// FORGOT PASSWORD
// =========================
const forgotForm =
document.getElementById("forgotForm");
if(forgotForm){
    forgotForm.addEventListener(
    "submit",
    function(e){

        e.preventDefault();
        const email =
        document.getElementById("resetEmail").value;
        const newPassword =
        document.getElementById("newPassword").value;
        let users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];
        const user =
        users.find(
            user =>
            user.email === email
        );
        if(!user){
            document.getElementById(
                "resetMessage"
            ).innerText =
            "User Not Found";
            return;
        }
        user.password =
        newPassword;
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );
        document.getElementById(
            "resetMessage"
        ).innerText =
        "Password Updated Successfully";
        forgotForm.reset();
    });
}
