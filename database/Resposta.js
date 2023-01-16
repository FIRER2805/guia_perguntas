const Sequelize = require("sequelize")
const connection = require("./database")

const Resposta = connection.define("resposta",{
    resposta:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    idPergunta:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false}).then(()=>{console.log("Tudo certo na tabela resposta")})

module.exports = Resposta