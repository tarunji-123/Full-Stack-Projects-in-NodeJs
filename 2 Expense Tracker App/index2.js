var form = document.getElementById('my-form');
var item = document.getElementById('items');

var amountInput = document.getElementById('amount');
var descInput = document.getElementById('desc');
var categoryInput = document.getElementById('category');

form.addEventListener("submit",addExpense);
window.addEventListener('load',showExpense);

function addExpense(e){
    e.preventDefault();

    const amount = amountInput.value;
    const desc = descInput.value;
    const category = categoryInput.value;

    if(amount !=="" && desc !== "" && category !==""){
        let exp = {
            amount,
            desc,
            category
        };

        axios
        .post('http://localhost:3000/expenses/add-exp',exp)
        .then((response)=>{
            console.log(response.data);
            showExpense();
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    form.reset();
}

function showExpense(){
    item.innerHTML = "";
    axios
    .get("http://localhost:3000/expenses/get-exp")
    .then((response)=>{
        console.log(response.data.allExpenses);
        response.data.allExpenses.forEach((expData)=> {
            item.innerHTML += `
            <li class= "fw-bold fs-5 my-1"> 
            ${expData.amount}-
            ${expData.desc}-
            ${expData.category}
            <input type="button" class="btn btn-danger" value = "Delete" onclick = "deleteExpense('${expData.id}')">
            <input type="button" class="btn btn-success" value = "Edit" onclick = "editExpense('${expData.id}')">
            </li>`;
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}

function deleteExpense(id){
    console.log('delete fxn run');
    axios
    .delete(`http://localhost:3000/expenses/delete-exp/${id}`)
    .then((response)=>{
        console.log(response.data);
        showExpense();
        console.log(response.data);
    })
    .catch((err)=>{
        console.log(err);
    })
}

function editExpense(id){
    axios
    .get(`http://localhost:3000/expenses/get-exp/${id}`)
    .then((response)=>{
        const expense = response.data;
        const amount = expense.allExp.amount;
        const desc = expense.allExp.desc;
        const category = expense.allExp.category;

        amountInput.value = amount;
        descInput.value = desc;
        categoryInput.value = category;
        axios
        .delete(`http://localhost:3000/expenses/delete-exp/${id}`)
        .then((response)=>{
            console.log(response.data);
            showExpense();
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}