const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

//database
connection.authenticate().then(
    ()=>{
        console.log("connectado ao database com sucesso!")
    }).catch(error => 
    {
        console.log(error)
    })

// estou dizendo para o Express usar o EJS como View Engine
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/",(req,res) =>
{
    Pergunta.findAll({raw: true, order: [["id","desc"]]}).then(perguntas=>{
        res.render("index",{ perguntas: perguntas})
    })
})

app.get("/perguntar",(req,res) => 
{
    res.render("perguntar")
})

app.post("/salvarpergunta",(req,res) =>
{
    let titulo =  req.body.titulo
    let descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
        }).then(()=>{
            res.redirect("/")
        }).catch(error =>{
            console.log(error)
            res.redirect("/")
        })
})

app.get("/pergunta/:id",(req,res)=>{

    // id da pergunta
    let id = req.params.id

    // pesquisa pergunta por id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta=>{
        if(pergunta != undefined)
        {
            // pesquisa as respostas
            Resposta.findAll({
                where:{idPergunta: pergunta.id},
                order: [["id", "desc"]]
            }).then((respostas)=>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        }
        else
        {
            res.redirect("/")
        }
    })
})

app.post("/responder", (req,res) =>{
    let resposta = req.body.resposta
    let idPergunta = req.body.idPergunta
    Resposta.create({
        resposta: resposta,
        idPergunta: idPergunta
    }).then(()=>{res.redirect("/pergunta/" + idPergunta)})
})

app.listen(8080,(error)=>
{
    if(error)
    {
        console.log("Erro ao iniciar o servidor")
    }
    else
    {
        console.log("O servidor foi iniciado com sucesso na url: localhost:8080")
    }
})