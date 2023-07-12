const todoList = require('../models/todo');

exports.addTodo = async(req,res,next)=>{
    const {todo,desc} = req.body;
    const flag = false;
    const data = await todoList.create({
        todo : todo,
        desc : desc,
        flag : flag
    })
    console.log("add todo");
    res.status(201).json({newtodoList : data});
}

exports.getTodos =  async(req,res,next)=>{
    const todos = await todoList.findAll();
    res.status(200).json({allTodos : todos});
}

exports.getTodo = async(req,res,next)=>{
    const todoId = req.params.id;
    const todo = await todoList.findByPk(todoId);
    res.status(200).json({allTodo: todo});
}

exports.putTodo = async(req, res, next) => {
    const todoId = req.params.id;
    console.log(todoId);
    const todo = await todoList.findByPk(todoId);
    todo.flag = true;
    console.log(todo);
    await todo.save();
    console.log(todo);
}

exports.deleteTodo = async(req,res,next)=>{
    const todoId = req.params.id;
    await todoList.destroy({where:{id : todoId}});
    res.sendStatus(200);
}