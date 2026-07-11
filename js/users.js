/* =========================
   LOGIN PROTECTION
========================= */

if(localStorage.getItem("loggedIn") !== "true"){

    window.location.href =
    "login.html";

}


/* =========================
   ELEMENTS
========================= */

const userForm =
document.getElementById("userForm");

const userContainer =
document.getElementById("userContainer");


/* =========================
   DATA
========================= */

let users =
JSON.parse(
    localStorage.getItem("users")
) || [];

let tasks =
JSON.parse(
    localStorage.getItem("tasks")
) || [];


/* =========================
   INITIAL LOAD
========================= */

renderUsers();


/* =========================
   CREATE USER
========================= */

userForm.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const name =
        document
        .getElementById("userName")
        .value
        .trim();

        const email =
        document
        .getElementById("userEmail")
        .value
        .trim();

        const role =
        document
        .getElementById("role")
        .value;


        const exists =
        users.some(
            user =>
            user.email.toLowerCase()
            === email.toLowerCase()
        );

        if(exists){

            alert(
                "Email already exists."
            );

            return;
        }


        const user = {

            id: Date.now(),

            name,

            email,

            role,

            createdAt:
            new Date()
            .toLocaleDateString()

        };


        users.push(user);


        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        renderUsers();

        userForm.reset();

    }
);


/* =========================
   RENDER USERS
========================= */

function renderUsers(){

    userContainer.innerHTML = "";


    if(users.length === 0){

        userContainer.innerHTML = `

            <div class="user-card">

                <h3>
                    No Team Members Found
                </h3>

                <p>
                    Create your first user.
                </p>

            </div>

        `;

        return;
    }


    users.forEach(user => {

        const initials =
        user.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();


        const assignedTasks =
        tasks.filter(
            task =>
            task.assignee ===
            user.name
        ).length;


        userContainer.innerHTML += `

        <div class="user-card">

            <div class="avatar">

                ${initials}

            </div>

            <h3>

                ${user.name}

            </h3>

            <p>

                ${user.email}

            </p>

            <p>

                <span class="role-badge">

                    ${user.role}

                </span>

            </p>

            <p>

                Assigned Tasks:
                <strong>

                    ${assignedTasks}

                </strong>

            </p>

            <p>

                Joined:
                ${user.createdAt}

            </p>

            <div class="user-actions">

                <button
                onclick="editUser(${user.id})">

                    Edit

                </button>

                <button
                onclick="deleteUser(${user.id})">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}


/* =========================
   EDIT USER
========================= */

function editUser(id){

    const user =
    users.find(
        user =>
        user.id === id
    );

    if(!user){

        return;

    }


    const newName =
    prompt(
        "Enter New Name",
        user.name
    );

    if(
        newName === null ||
        newName.trim() === ""
    ){

        return;

    }


    const newRole =
    prompt(
        "Enter Role",
        user.role
    );

    if(
        newRole === null ||
        newRole.trim() === ""
    ){

        return;

    }


    user.name =
    newName.trim();

    user.role =
    newRole.trim();


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    renderUsers();

}


/* =========================
   DELETE USER
========================= */

function deleteUser(id){

    const confirmDelete =
    confirm(
        "Delete this user?"
    );

    if(!confirmDelete){

        return;

    }


    users =
    users.filter(
        user =>
        user.id !== id
    );


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    renderUsers();

}
