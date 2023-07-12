const Sequelize = require('sequelize');
const sequeilize = require ('../data/database');

const todoList = sequeilize.define('todo',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    todo:{
        type : Sequelize.STRING,
        allowNull : false
    },
    desc:{
        type : Sequelize.STRING,
        allowNull : false
    },
    flag: {
        type : Sequelize.BOOLEAN,
        allowNull : false
    }

});

module.exports = todoList;