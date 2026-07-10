if(localStorage.getItem("loggedIn") !== "true"){

    window.location.href="login.html";

}



const userForm =
document.getElementById("userForm");


const userContainer =
document.getElementById("userContainer");



let users =
JSON.parse(localStorage.getItem("users")) || [];



renderUsers();



userForm.addEventListener(
"submit",
function(e){


e.preventDefault();



const user = {

id: Date.now(),

name:
document.getElementById("userName").value,


email:
document.getElementById("userEmail").value,


role:
document.getElementById("role").value


};



users.push(user);



localStorage.setItem(
"users",
JSON.stringify(users)
);



renderUsers();



userForm.reset();


});






function renderUsers(){


userContainer.innerHTML="";



users.forEach(user=>{


userContainer.innerHTML += `


<div class="user-card">


<h3>
${user.name}
</h3>


<p>
Email:
${user.email}
</p>


<p>
Role:
<strong>
${user.role}
</strong>
</p>



<button onclick="deleteUser(${user.id})">

Delete

</button>



</div>


`;


});


}






function deleteUser(id){


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