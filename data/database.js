const Sequelize = require('sequelize');
const sequeilize = new Sequelize('node-complete','root','Tannu@141',{
    dialect : 'mysql',
    host : 'localhost'

})

module.exports = sequeilize;
