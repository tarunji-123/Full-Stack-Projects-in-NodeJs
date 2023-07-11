var form = document.getElementById('my-form');
var item = document.getElementById('item');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');

form.addEventListener("submit",addUser)
window.addEventListener('load',function(){
    showUsers();
});

function addUser(e){
    e.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;

    if(name !== "" && email !== "" && phone !== ""){
        let user = {
            name,
            email,
            phone
        };
        axios.post("http://localhost:3000/user/add-user",user)
        .then((response)=>{
            console.log(response.data);
            showUsers();
        })
        .catch((err)=>{
            console.log(err);
        })
    }else{
        form.reset();
    }
    form.reset();
}

function showUsers() {
    item.innerHTML = "";
    axios
        .get("http://localhost:3000/user/get-user")
        .then((response) => {
            console.log(response.data.allUsers);
            response.data.allUsers.forEach((userData) => {
                item.innerHTML += `
                    <li>
                    ${userData.name}
                    ${userData.email}
                    <input type="button" class="btn btn-danger" value="Delete" onclick="deleteUser('${userData.id}')">
                    <input type="button" class="btn btn-success" value="Edit" onclick="editUser(event, '${userData.id}')">
                    </li>`;
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

async function deleteUser(id){
    console.log("delte fxn run");
    await axios
    .delete(`http://localhost:3000/user/delete-user/${id}`)
    .then((response)=>{
        console.log(response.data);
        showUsers();
        console.log(response.data);
    })
    .catch((err)=>{
        console.log(err);
    })
}

async function editUser (e, _id) {
    const userResponse = await axios.get(`http://localhost:3000/user/get-user/${_id}`);
    
    const userData = userResponse.data;
    console.log(userData);
    const name = userData.allUser.name;
    console.log(name);
    const email = userData.allUser.email;
    const phone = userData.allUser.phone;

    nameInput.value = name;
    emailInput.value = email;
    phoneInput.value = phone;
    axios
        .delete(`http://localhost:3000/user/delete-user/${_id}`)
        .then((response) => {
            console.log(response.data);
            showUsers();
        })
        .catch((err) => {
            console.log(err);
        });
}
