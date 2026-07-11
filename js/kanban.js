// =========================
// LOGIN CHECK
// =========================

if(localStorage.getItem("loggedIn") !== "true"){

    window.location.href = "login.html";

}


// =========================
// LOAD TASKS
// =========================

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

console.log("Tasks Loaded:", tasks);


// =========================
// COLUMNS
// =========================

const todo =
document.getElementById("todo");

const progress =
document.getElementById("progress");

const done =
document.getElementById("done");


let draggedTaskId = null;


// =========================
// RENDER BOARD
// =========================

function renderBoard(){


    todo.innerHTML = "";

    progress.innerHTML = "";

    done.innerHTML = "";



    tasks.forEach(task=>{


        const today =
        new Date()
        .toISOString()
        .split("T")[0];



        const isOverdue =
        task.dueDate &&
        task.status !== "Done" &&
        task.dueDate < today;



        const card =
        document.createElement("div");



        card.className =
        "task-card";



        if(isOverdue){

            card.classList.add(
                "overdue"
            );

        }



        card.draggable = true;

        card.dataset.id =
        task.id;



        let priorityClass =
        "priority-low";



        if(task.priority === "Critical"){

            priorityClass =
            "priority-critical";

        }

        else if(task.priority === "High"){

            priorityClass =
            "priority-high";

        }

        else if(task.priority === "Medium"){

            priorityClass =
            "priority-medium";

        }



        card.innerHTML = `

        <h3>
        ${task.title}
        </h3>


        <p>
        <strong>Project:</strong>
        ${task.project || "-"}
        </p>


        <p class="${priorityClass}">
        <strong>Priority:</strong>
        ${task.priority}
        </p>


        <p>
        <strong>Due:</strong>
        ${task.dueDate || "-"}
        </p>


        <p>
        <strong>Assigned:</strong>
        ${task.assignee || "Unassigned"}
        </p>


        <p>
        ${task.description || ""}
        </p>


        ${
            isOverdue
            ?
            `
            <p class="priority-high">
            ⚠️ OVERDUE
            </p>
            `
            :
            ""
        }


        `;



        card.addEventListener(
            "dragstart",
            ()=>{

                draggedTaskId =
                task.id;

            }
        );



        if(task.status === "To Do"){

            todo.appendChild(card);

        }


        else if(task.status === "In Progress"){

            progress.appendChild(card);

        }


        else if(task.status === "Done"){

            done.appendChild(card);

        }


    });


}



// =========================
// INITIAL LOAD
// =========================

renderBoard();



// =========================
// DRAG DROP
// =========================

const columns =
document.querySelectorAll(".column");



columns.forEach(column=>{


    column.addEventListener(
        "dragover",
        e=>{

            e.preventDefault();

        }
    );



    column.addEventListener(
        "drop",
        ()=>{


            const newStatus =
            column.dataset.status;



            tasks =
            tasks.map(task=>{


                if(task.id == draggedTaskId){

                    task.status =
                    newStatus;

                }


                return task;


            });



            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );



            renderBoard();


        }
    );


});
