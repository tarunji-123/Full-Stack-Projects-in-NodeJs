var form = document.getElementById('my-form');
var remItem = document.getElementById('remItem');
var doneItem = document.getElementById('doneItem');

var todoInput = document.getElementById('todo');
var descInput = document.getElementById('desc');

form.addEventListener("submit", addTodo);

window.addEventListener('load', showTodos);

async function addTodo(e) {
  e.preventDefault();

  const todo = todoInput.value;
  const desc = descInput.value;
  const flag = false;
  if (todo !== "" && desc !== "") {
    let user = {
      todo,
      desc,
      flag,
    };

    try {
      const response = await axios.post("http://localhost:3000/todo/add-todos", user);
      console.log(response.data);
      await showTodos();
    } catch (err) {
      console.log(err);
    }
  } else {
    form.reset();
  }
  form.reset();
}

async function showTodos() {
  remItem.innerHTML = "";
  doneItem.innerHTML = "";

  try {
    const response = await axios.get("http://localhost:3000/todo/get-todos");
    response.data.allTodos.forEach((userData) => {
      if (userData.flag == false) {

        remItem.innerHTML += `
          <li>
            ${userData.todo}  -  ${userData.desc}
            <input type="button" class="btn btn-danger btn-sm mx-2 delete" value="Delete" onclick="deleteTodo('${userData.id}')"> 
            <input type="button" class="btn btn-success btn-sm mx-2 done" value="Done" onclick="doneTodo(event,'${userData.id}')"> 
          </li>`;
      } else {
        doneItem.innerHTML += `
          <li>
            ${userData.todo}  -  ${userData.desc}
            <input type="button" class="btn btn-danger btn-sm mx-2 delete" value="Delete" onclick="deleteTodo('${userData.id}')"> 
          </li>`;
      }
    });
  } catch (err) {
    console.log(err);
  }
};

async function deleteTodo(id) {
  try {
    const response = await axios.delete(`http://localhost:3000/todo/delete-todos/${id}`);
    console.log(response.data);
    await showTodos();
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}

async function doneTodo(event, _id) {
  var listItem = event.target.parentNode;

  try {
    const response = await axios.get(`http://localhost:3000/todo/get-todos/${_id}`);
    response.data.allTodo.flag = true;

    let todo = response.data.allTodo.todo;
    let desc = response.data.allTodo.desc;
    let flag = response.data.allTodo.flag;
    let myNewUser = {
      todo,
      desc,
      flag,
    };

    try {
      const updateResponse = await axios.put(`http://localhost:3000/todo/get-todos/${_id}` , myNewUser);
      console.log(updateResponse.data);
    //   listItem.remove();
      await showTodos();
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
}

// async function doneUser(event, _id) {
//     var listItem = event.target.parentNode;
  
//     try {
//       const response = await axios.get(`http://localhost:3000/todo/get-todos/${_id}`);
//       response.data.flag = true;
  
//       const updateResponse = await axios.put(`http://localhost:3000/todos/get-todos/${_id}`, );
//       console.log(updateResponse.data);
//       listItem.remove();
//       await showUsers();
//     } catch (err) {
//       console.log(err);
//     }
//   }
