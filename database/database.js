const Sequelize = require('sequelize');

                                //nome do bd, usuário, senha do usuário
const connection = new Sequelize('', '', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;