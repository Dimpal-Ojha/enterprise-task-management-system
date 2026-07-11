if(localStorage.getItem("loggedIn") !== "true"){

    window.location.href =
    "login.html";

}

const tasks =
JSON.parse(
    localStorage.getItem("tasks")
) || [];

const projects =
JSON.parse(
    localStorage.getItem("projects")
) || [];


/* =========================
   CARDS
========================= */

const completed =
tasks.filter(
    task =>
    task.status === "Done"
).length;

document.getElementById(
    "analyticsTotalTasks"
).innerText =
tasks.length;

document.getElementById(
    "analyticsCompletedTasks"
).innerText =
completed;

document.getElementById(
    "analyticsPendingTasks"
).innerText =
tasks.length - completed;

document.getElementById(
    "analyticsProjects"
).innerText =
projects.length;


/* =========================
   STATUS CHART
========================= */

const todoCount =
tasks.filter(
    task =>
    task.status === "To Do"
).length;

const progressCount =
tasks.filter(
    task =>
    task.status === "In Progress"
).length;

const doneCount =
tasks.filter(
    task =>
    task.status === "Done"
).length;


new Chart(

    document.getElementById(
        "statusChart"
    ),

    {

        type:"pie",

        data:{

            labels:[
                "To Do",
                "In Progress",
                "Done"
            ],

            datasets:[{

                data:[
                    todoCount,
                    progressCount,
                    doneCount
                ]

            }]

        }

    }

);


/* =========================
   PROJECT CHART
========================= */

const projectNames =
projects.map(
    project =>
    project.name
);

const projectTaskCount =
projects.map(project => {

    return tasks.filter(
        task =>
        task.project ===
        project.name
    ).length;

});


new Chart(

    document.getElementById(
        "projectChart"
    ),

    {

        type:"bar",

        data:{

            labels:
            projectNames,

            datasets:[{

                label:
                "Tasks",

                data:
                projectTaskCount

            }]

        }

    }

);
