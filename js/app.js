// =========================
// LOGIN CHECK
// =========================

function checkLogin(){

    const loggedIn =
    localStorage.getItem("loggedIn");

    if(loggedIn !== "true"){

        window.location.href =
        "login.html";

    }

}



// =========================
// LOGOUT
// =========================

function logout(){

    localStorage.removeItem(
        "loggedIn"
    );

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
    "login.html";

}



// =========================
// CURRENT USER
// =========================

function getCurrentUser(){

    return JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

}



// =========================
// DARK MODE
// =========================

function toggleTheme(){

    document.body.classList.toggle(
        "dark-mode"
    );

    if(
        document.body.classList.contains(
            "dark-mode"
        )
    ){

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

    else{

        localStorage.setItem(
            "theme",
            "light"
        );

    }

}



// =========================
// LOAD SAVED THEME
// =========================

window.addEventListener(
"load",
function(){

    const theme =
    localStorage.getItem(
        "theme"
    );

    if(theme === "dark"){

        document.body.classList.add(
            "dark-mode"
        );

    }

});



// =========================
// AUTO CHECK LOGIN
// =========================

const currentPage =
window.location.pathname;

if(
!currentPage.includes(
"login.html"
)
&&
!currentPage.includes(
"register.html"
)
&&
!currentPage.includes(
"forgot-password.html"
)
){

    checkLogin();

}