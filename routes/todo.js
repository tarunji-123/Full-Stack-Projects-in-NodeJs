const express = require('express');

const todoListController = require('../controllers/todolist');

const router = express.Router();

router.post('/add-todos',todoListController.addTodo);

router.get('/get-todos',todoListController.getTodos);

router.get('/get-todos/:id',todoListController.getTodo);

router.put('/get-todos/:id',todoListController.putTodo);

router.delete('/delete-todos/:id',todoListController.deleteTodo);

module.exports = router;