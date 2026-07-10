if(localStorage.getItem("loggedIn") !== "true"){
    window.location.href = "login.html";
}

const tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

const projects =
JSON.parse(localStorage.getItem("projects")) || [];

/* Cards */

document.getElementById("totalTasks").innerText =
tasks.length;

const completed =
tasks.filter(
    task => task.status === "Done"
).length;

document.getElementById("completedTasks").innerText =
completed;

document.getElementById("pendingTasks").innerText =
tasks.length - completed;

document.getElementById("totalProjects").innerText =
projects.length;

/* Completion Rate */

const completionRate =
tasks.length === 0
? 0
: Math.round(
    (completed / tasks.length) * 100
);

document.getElementById(
    "completionRate"
).innerText =
completionRate + "%";

/* Chart Data */

const todoCount =
tasks.filter(
    task => task.status === "To Do"
).length;

const progressCount =
tasks.filter(
    task => task.status === "In Progress"
).length;

const doneCount =
tasks.filter(
    task => task.status === "Done"
).length;

/* Chart */

const ctx =
document.getElementById("taskChart");

new Chart(ctx, {
    type: "pie",
    data: {
        labels: [
            "To Do",
            "In Progress",
            "Done"
        ],
        datasets: [{
            data: [
                todoCount,
                progressCount,
                doneCount
            ]
        }]
    }
});