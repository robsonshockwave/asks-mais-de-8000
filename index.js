const express = require("express");
const app = express();
const connection = require("./database/database");
const Pergunta = require("./database/ModelPergunta");
const Resposta = require("./database/ModelResposta");

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    });

// Dizendo para o express usar o EJS como View engine
app.set('view engine', 'ejs');
// Dizendo que quer utilizar um arquivbo estático
app.use(express.static('public'));
//Body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({ raw: true, order:[
        ['id', 'DESC'] // ASC = Crescente || DESC = Decrescente
    ] }).then(pergunta => {
        res.render("index", {
            perguntas: pergunta
        });
    });
    //res.send("Bem vindo ao meu site!");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
})

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;

    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) { // Pergunta encontrada
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
        } else { // Não encontrada
            res.render("index");
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
})

app.listen(8080, () => {
    console.log("App rodando!");
});