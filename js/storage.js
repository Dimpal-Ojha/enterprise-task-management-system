/* =========================
   STORAGE MANAGEMENT
========================= */


/* Save Data */

function saveData(key, data){

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}



/* Get Data */

function getData(key){

    const data =
    localStorage.getItem(key);


    if(!data){

        return [];

    }


    return JSON.parse(data);

}



/* Remove Data */

function removeData(key){

    localStorage.removeItem(key);

}



/* Clear Application Data */

function clearStorage(){

    localStorage.clear();

}



/* =========================
   USER SESSION
========================= */


function setCurrentUser(user){

    saveData(
        "currentUser",
        user
    );

}



function getCurrentUser(){

    return JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

}



function isLoggedIn(){

    return (
        localStorage.getItem(
            "loggedIn"
        ) === "true"
    );

}



function logoutUser(){

    removeData(
        "currentUser"
    );


    localStorage.removeItem(
        "loggedIn"
    );


    window.location.href =
    "login.html";

}



/* =========================
   DEFAULT DATA
========================= */


function initializeStorage(){


    if(!localStorage.getItem("tasks")){

        saveData(
            "tasks",
            []
        );

    }



    if(!localStorage.getItem("projects")){

        saveData(
            "projects",
            []
        );

    }



    if(!localStorage.getItem("users")){

        saveData(
            "users",
            []
        );

    }



    if(!localStorage.getItem("activities")){

        saveData(
            "activities",
            []
        );

    }


}



/* Initialize */

initializeStorage();
