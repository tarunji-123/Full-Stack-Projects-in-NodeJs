const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequeilize = require('./data/database');
const newUserRoutes = require('./routes/user');

const expenseRouter = require('./routes/expense');
const todoListRouter = require('./routes/todo');

const app = express();
app.use(cors());

// const todoList = require('./models/todo');

app.use(bodyParser.json({extended : false}));
app.use('/user',newUserRoutes);
app.use('/expenses',expenseRouter);
app.use('/todo',todoListRouter);

// app.post('/todo/add-todos', async(req,res,next)=>{
//     const {todo,desc} = req.body;
//     const flag = false;
//     const data = await todoList.create({
//         todo : todo,
//         desc : desc,
//         flag : flag
//     })
//     console.log("add todo");
//     res.status(201).json({newtodoList : data});
// })

// app.get('/todo/get-todos', async(req,res,next)=>{
//     const todos = await todoList.findAll();
//     res.status(200).json({allTodos : todos});
// })

// app.get('/todo/get-todos/:id', async(req,res,next)=>{
//     const todoId = req.params.id;
//     const todo = await todoList.findByPk(todoId);
//     res.status(200).json({allTodo: todo});
// })

// app.put('/todo/get-todos/:id',async(req,res,next)=>{
//     const todoId = req.params.id;

// })
// app.put('/todo/get-todos/:id',async(req,res,next)=>{
//     const todoId = req.params.id;
//     console.log(todoId);
//     const extra = await todoList.findByPk(todoId);
//     extra.flag = true;
//     await extra.save();
    
//     console.log(extra);
// })


// app.put('/todo/get-todos/:id', async(req, res, next) => {
//     const todoId = req.params.id;
  
//     const todo = await todoList.findByPk(todoId);
// todo.flag = true;
// await todo.save();
//     console.log(todo);
//   });

// app.delete('/todo/delete-todos/:id', async(req,res,next)=>{
//     const todoId = req.params.id;
//     await todoList.destroy({where:{id : todoId}});
//     res.sendStatus(200);
// })

sequeilize.sync()
.then(result => console.log('database synced'))
.catch(err => console.log(err));

app.listen(3000);

