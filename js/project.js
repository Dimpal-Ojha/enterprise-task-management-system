// Login Protection
if(localStorage.getItem("loggedIn") !== "true"){

    window.location.href = "login.html";

}


const projectForm =
document.getElementById("projectForm");


const projectContainer =
document.getElementById("projectContainer");



let projects =
JSON.parse(localStorage.getItem("projects")) || [];


let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];



renderProjects();



// Create Project

projectForm.addEventListener("submit", function(e){

    e.preventDefault();


    const projectName =
    document.getElementById("projectName").value;



    const project = {

        id: Date.now(),

        name: projectName

    };



    projects.push(project);



    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );



    renderProjects();



    projectForm.reset();


});





// Display Projects

function renderProjects(){


    projectContainer.innerHTML = "";



    projects.forEach(project => {



        const taskCount =
        tasks.filter(
            task =>
            task.project === project.name
        ).length;



        projectContainer.innerHTML += `


        <div class="project-card">


            <h2>
                ${project.name}
            </h2>


            <p>
                Total Tasks:
                <strong>
                    ${taskCount}
                </strong>
            </p>



            <button onclick="editProject(${project.id})">

                Edit

            </button>



            <button onclick="deleteProject(${project.id})">

                Delete

            </button>



        </div>


        `;



    });


}





// Edit Project

function editProject(id){


    const project =
    projects.find(
        project =>
        project.id === id
    );



    const newName =
    prompt(
        "Enter New Project Name",
        project.name
    );



    if(newName === null || newName.trim() === ""){

        return;

    }



    // Update tasks project name also

    tasks =
    tasks.map(task => {


        if(task.project === project.name){

            task.project = newName;

        }


        return task;


    });




    project.name = newName;



    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );



    renderProjects();


}





// Delete Project

function deleteProject(id){


    const project =
    projects.find(
        project =>
        project.id === id
    );



    // Remove related tasks

    tasks =
    tasks.filter(
        task =>
        task.project !== project.name
    );



    projects =
    projects.filter(
        project =>
        project.id !== id
    );



    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );



    renderProjects();


}