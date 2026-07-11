// =========================
// LOGIN CHECK
// =========================

if(localStorage.getItem("loggedIn") !== "true"){

    window.location.href="login.html";

}


// =========================
// ELEMENTS
// =========================

const form =
document.getElementById("taskForm");


const taskList =
document.getElementById("taskList");


const projectSelect =
document.getElementById("project");


const assigneeSelect =
document.getElementById("assignee");


const searchInput =
document.getElementById("search");


const filterPriority =
document.getElementById("filterPriority");



// =========================
// DATA
// =========================

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];


let projects =
JSON.parse(localStorage.getItem("projects")) || [];


let users =
JSON.parse(localStorage.getItem("users")) || [];



// =========================
// INITIAL LOAD
// =========================

loadProjects();

loadUsers();

renderTasks();




// =========================
// LOAD PROJECTS
// =========================

function loadProjects(){


    projectSelect.innerHTML =
    `
    <option value="">
    Select Project
    </option>
    `;


    projects.forEach(project=>{


        projectSelect.innerHTML +=

        `
        <option value="${project.name}">
        ${project.name}
        </option>
        `;


    });


}




// =========================
// LOAD USERS
// =========================

function loadUsers(){


    assigneeSelect.innerHTML =

    `
    <option value="">
    Assign User
    </option>
    `;



    users.forEach(user=>{


        assigneeSelect.innerHTML +=

        `
        <option value="${user.name}">
        ${user.name}
        </option>
        `;


    });


}






// =========================
// CREATE TASK
// =========================


form.addEventListener(
"submit",
function(e){


e.preventDefault();



const project =
projectSelect.value;



if(project===""){


alert(
"Please select project"
);


return;


}



const task = {


id:Date.now(),


title:
document
.getElementById("title")
.value
.trim(),



priority:
document
.getElementById("priority")
.value,



project:project,



assignee:
assigneeSelect.value ||
"Unassigned",



dueDate:
document
.getElementById("dueDate")
.value,



description:
document
.getElementById("description")
.value
.trim(),



status:
"To Do",



createdAt:
new Date()
.toLocaleDateString()



};



tasks.push(task);



localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);



renderTasks();



form.reset();



});







// =========================
// RENDER TASKS
// =========================


function renderTasks(){


taskList.innerHTML="";



let filteredTasks =
[...tasks];



const search =
searchInput.value
.toLowerCase();



if(search){


filteredTasks =
filteredTasks.filter(task=>

task.title
.toLowerCase()
.includes(search)

);


}




if(
filterPriority.value !== "All"
){


filteredTasks =
filteredTasks.filter(task=>

task.priority ===
filterPriority.value

);


}






filteredTasks.forEach(task=>{



const today =
new Date()
.toISOString()
.split("T")[0];



const overdue =

task.dueDate &&

task.status !== "Done" &&

task.dueDate < today;





let priorityClass =
"priority-low";



if(task.priority==="Critical"){

priorityClass =
"priority-critical";

}

else if(task.priority==="High"){

priorityClass =
"priority-high";

}

else if(task.priority==="Medium"){

priorityClass =
"priority-medium";

}





taskList.innerHTML +=

`

<tr class="${overdue ? "overdue":""}">


<td>
${task.title}
</td>



<td class="${priorityClass}">
${task.priority}
</td>



<td>
${task.project}
</td>



<td>
${task.assignee || "Unassigned"}
</td>



<td>
${task.dueDate || "-"}
</td>



<td>
${task.description || "-"}
</td>





<td>


<select
onchange="changeStatus(${task.id},this.value)">



<option value="To Do"

${task.status==="To Do"?"selected":""}>

To Do

</option>




<option value="In Progress"

${task.status==="In Progress"?"selected":""}>

In Progress

</option>





<option value="Done"

${task.status==="Done"?"selected":""}>

Done

</option>



</select>



</td>





<td>


<button onclick="editTask(${task.id})">

Edit

</button>



<button onclick="deleteTask(${task.id})">

Delete

</button>



</td>



</tr>


`;



});


}








// =========================
// EDIT TASK
// =========================


function editTask(id){


const task =
tasks.find(
t=>t.id===id
);



if(!task)
return;



const title =
prompt(
"Task Title",
task.title
);



if(title===null)
return;




const priority =
prompt(
"Priority",
task.priority
);



if(priority===null)
return;





const assignee =
prompt(
"Assigned User",
task.assignee
);




task.title =
title;



task.priority =
priority;



task.assignee =
assignee || "Unassigned";





localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);



renderTasks();


}







// =========================
// DELETE TASK
// =========================


function deleteTask(id){


if(
!confirm(
"Delete this task?"
)

)
return;



tasks =
tasks.filter(
task=>task.id!==id
);



localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);



renderTasks();


}








// =========================
// STATUS CHANGE
// =========================


function changeStatus(
id,
newStatus
){



tasks =
tasks.map(task=>{


if(task.id===id){


task.status =
newStatus;


}


return task;


});




localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);



renderTasks();


}







// =========================
// SEARCH FILTER
// =========================


searchInput.addEventListener(
"input",
renderTasks
);



filterPriority.addEventListener(
"change",
renderTasks
);
