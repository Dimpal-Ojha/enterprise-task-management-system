if(localStorage.getItem("loggedIn") !== "true"){
    window.location.href = "login.html";
}


let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];


const todo =
document.getElementById("todo");

const progress =
document.getElementById("progress");

const done =
document.getElementById("done");


let draggedTaskId = null;



function renderBoard(){

    todo.innerHTML = "";
    progress.innerHTML = "";
    done.innerHTML = "";


    tasks.forEach(task => {


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


        card.classList.add(
            "task-card"
        );


        if(isOverdue){

            card.classList.add(
                "overdue"
            );

        }


        card.draggable = true;

        card.dataset.id =
        task.id;



        let priorityClass = "";

        if(task.priority === "High"){

            priorityClass =
            "priority-high";

        }
        else if(task.priority === "Medium"){

            priorityClass =
            "priority-medium";

        }
        else{

            priorityClass =
            "priority-low";

        }



        card.innerHTML = `

            <h3>
                ${task.title}
            </h3>


            <p>
                Project:
                ${task.project || "-"}
            </p>


            <p class="${priorityClass}">
                Priority:
                ${task.priority}
            </p>


            <p>
                Due:
                ${task.dueDate || "-"}
            </p>


            <p>
                ${task.description || ""}
            </p>


            <p>
                Status:
                ${task.status}
            </p>

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



renderBoard();





const columns =
document.querySelectorAll(".column");



columns.forEach(column => {


    column.addEventListener(
        "dragover",
        (e)=>{

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