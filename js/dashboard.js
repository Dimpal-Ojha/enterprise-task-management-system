if(localStorage.getItem("loggedIn") !== "true"){
    window.location.href = "login.html";
}
/* =========================
   LOAD DATA
========================= */
const tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];
const projects =
JSON.parse(
localStorage.getItem("projects")
) || [];
const users =
JSON.parse(
localStorage.getItem("users")
) || [];
/* =========================
   DASHBOARD STATISTICS
========================= */
const totalTasks =
tasks.length;
const completedTasks =
tasks.filter(
task =>
task.status === "Done"
).length;
const pendingTasks =
tasks.filter(
task =>
task.status !== "Done"
).length;
const overdueTasks =
tasks.filter(task=>{
    const today =
    new Date()
    .toISOString()
    .split("T")[0];
    return (
        task.dueDate &&
        task.dueDate < today &&
        task.status !== "Done"
    );
}).length;
const completionRate =
totalTasks === 0
?
0
:
Math.round(
(completedTasks / totalTasks) * 100
);
/* =========================
   UPDATE CARDS
========================= */
const updateElement =
(id,value)=>{
    const element =
    document.getElementById(id);
    if(element){
        element.innerText =
        value;
    }
};
updateElement(
"totalTasks",
totalTasks
);
updateElement(
"completedTasks",
completedTasks
);
updateElement(
"pendingTasks",
pendingTasks
);
updateElement(
"totalProjects",
projects.length
);
updateElement(
"completionRate",
completionRate+"%"
);
updateElement(
"teamCount",
users.length
);
/* =========================
   TASK STATUS
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
/* =========================
   CHART
========================= */
const chartCanvas =
document.getElementById(
"taskChart"
);
if(chartCanvas){
if(window.taskChartInstance){
    window.taskChartInstance.destroy();
}
window.taskChartInstance =
new Chart(
chartCanvas,
{
type:"doughnut",
data:{
labels:[
"To Do",
"In Progress",
"Done"
],
datasets:[{
label:"Tasks",
data:[
todoCount,
progressCount,
doneCount
]
}]
},
options:{
responsive:true,
maintainAspectRatio:false,
plugins:{
legend:{
position:"bottom"
}
}
}
});
}
/* =========================
   RECENT ACTIVITY
========================= */
const recentActivity =
document.getElementById(
"recentActivity"
);
if(recentActivity){
recentActivity.innerHTML="";
if(tasks.length===0){
recentActivity.innerHTML=
`
<li>
No recent activity
</li>
`;
}
else{
tasks
.slice()
.reverse()
.slice(0,5)
.forEach(task=>{
recentActivity.innerHTML +=
`
<li>
<i class="fas fa-check-circle"></i>
${task.title}
- ${task.status}
</li>
`;
});
}
}
/* =========================
   NOTIFICATION COUNT
========================= */
const notificationButton =
document.querySelector(
".fa-bell"
);
if(notificationButton){
if(overdueTasks > 0){
notificationButton.style.color =
"red";
notificationButton.title =
`${overdueTasks} overdue tasks`;
}
}
