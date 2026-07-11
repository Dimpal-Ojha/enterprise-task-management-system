/* LOGIN PROTECTION */

if(localStorage.getItem("loggedIn") !== "true"){

    window.location.href="login.html";

}


/* ELEMENTS */

const projectForm =
document.getElementById("projectForm");

const projectContainer =
document.getElementById("projectContainer");

const projectSearch =
document.getElementById("projectSearch");

const totalProjects =
document.getElementById("totalProjects");

const activeProjects =
document.getElementById("activeProjects");

const completedProjects =
document.getElementById("completedProjects");


/* DATA */

let projects =
JSON.parse(localStorage.getItem("projects")) || [];


let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];



renderProjects();

updateProjectStats();



/* CREATE PROJECT */

projectForm.addEventListener(
"submit",
function(e){

e.preventDefault();


const name =
document.getElementById("projectName")
.value
.trim();


const status =
document.getElementById("projectStatus")
.value;



if(name===""){

alert("Project name required");

return;

}



const exists =
projects.some(
project =>
project.name.toLowerCase()
===
name.toLowerCase()
);



if(exists){

alert("Project already exists");

return;

}



const project={

id:Date.now(),

name:name,

status:status,

createdAt:
new Date()
.toLocaleDateString()

};



projects.push(project);



localStorage.setItem(
"projects",
JSON.stringify(projects)
);



projectForm.reset();


renderProjects();

updateProjectStats();


});





/* RENDER PROJECTS */


function renderProjects(){


projectContainer.innerHTML="";



let filteredProjects=[...projects];



if(projectSearch){

const search =
projectSearch.value
.toLowerCase();


if(search){

filteredProjects =
filteredProjects.filter(
project =>
project.name
.toLowerCase()
.includes(search)
);

}

}





if(filteredProjects.length===0){


projectContainer.innerHTML=`

<div class="project-card">

<h3>
No Projects Found
</h3>

<p>
Create a new project.
</p>

</div>

`;


return;

}




filteredProjects.forEach(project=>{


const projectTasks =
tasks.filter(
task =>
task.project===project.name
);



const total =
projectTasks.length;



const completed =
projectTasks.filter(
task =>
task.status==="Done"
).length;



const progress =
total===0
?
0
:
Math.round(
(completed/total)*100
);





projectContainer.innerHTML+=`


<div class="project-card">


<h2>

${project.name}

</h2>



<p>

Status:

<strong>

${project.status}

</strong>

</p>



<p>

Created:

${project.createdAt}

</p>




<p>

Total Tasks:

<strong>

${total}

</strong>

</p>



<p>

Completed:

<strong>

${completed}

</strong>

</p>





<div class="progress-bar">

<div class="progress-fill"
style="width:${progress}%">

</div>

</div>



<p>

Progress:

<strong>
${progress}%
</strong>

</p>




<div class="project-actions">


<button onclick="editProject(${project.id})">

<i class="fas fa-edit"></i>

Edit

</button>



<button onclick="deleteProject(${project.id})">

<i class="fas fa-trash"></i>

Delete

</button>



</div>



</div>


`;



});


}






/* EDIT PROJECT */


function editProject(id){


const project =
projects.find(
project =>
project.id===id
);



if(!project)
return;



const newName =
prompt(
"Enter new project name",
project.name
);



if(
newName===null ||
newName.trim()===""
)
return;




const oldName =
project.name;



tasks =
tasks.map(task=>{


if(task.project===oldName){

task.project=
newName.trim();

}


return task;


});



project.name =
newName.trim();



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






/* DELETE PROJECT */


function deleteProject(id){


const project =
projects.find(
project =>
project.id===id
);



if(!project)
return;




if(
!confirm(
"Delete project and related tasks?"
)
)
return;




tasks =
tasks.filter(
task =>
task.project!==project.name
);



projects =
projects.filter(
project =>
project.id!==id
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

updateProjectStats();


}







/* PROJECT STATS */


function updateProjectStats(){


if(!totalProjects)
return;



totalProjects.innerText =
projects.length;



activeProjects.innerText =
projects.filter(
project =>
project.status==="Active"
).length;



completedProjects.innerText =
projects.filter(
project =>
project.status==="Completed"
).length;



}






/* SEARCH */


if(projectSearch){


projectSearch.addEventListener(
"input",
renderProjects
);


}
