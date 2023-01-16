const Sequelize = require("sequelize")
const connection = new Sequelize("db_guia_perguntas","root","Lasanha2805g",
{
    host: "localhost",
    dialect: "mysql"
})

module.exports = connection;