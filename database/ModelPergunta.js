const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('pergunta', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNUll: false
    }
});

Pergunta.sync({force: false}).then(() => {
    console.log('Tabela criada!');
});

module.exports = Pergunta;