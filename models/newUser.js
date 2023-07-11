const Sequelize = require('sequelize');
const sequeilize = require ('../data/database');

const newUser = sequeilize.define('newUser',{
    id:{
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : Sequelize.STRING,
    email :{
        type : Sequelize.STRING,
        unqiue : true
    },
    phone : {
        type: Sequelize.DOUBLE,
        unqiue : true
    }
})

module.exports = newUser;
