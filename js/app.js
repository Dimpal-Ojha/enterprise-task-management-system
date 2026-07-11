// =========================
// AUTH CHECK
// =========================


function checkLogin(){


    const loggedIn =
    localStorage.getItem(
        "loggedIn"
    );


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
// THEME MANAGEMENT
// =========================


function toggleTheme(){


    document.body.classList.toggle(
        "dark-mode"
    );


    const theme =
    document.body.classList.contains(
        "dark-mode"
    )
    ?
    "dark"
    :
    "light";



    localStorage.setItem(
        "theme",
        theme
    );


}





// =========================
// LOAD THEME
// =========================


function loadTheme(){


    const savedTheme =
    localStorage.getItem(
        "theme"
    );



    if(savedTheme === "dark"){


        document.body.classList.add(
            "dark-mode"
        );


    }


}





// =========================
// PAGE PROTECTION
// =========================


function protectPage(){


    const publicPages = [

        "login.html",

        "register.html",

        "forgot-password.html"

    ];



    const currentPage =
    window.location.pathname;



    const isPublic =
    publicPages.some(
        page =>
        currentPage.includes(page)
    );



    if(!isPublic){

        checkLogin();

    }


}





// =========================
// INIT APP
// =========================


window.addEventListener(
"DOMContentLoaded",
()=>{


    loadTheme();


    protectPage();


});
