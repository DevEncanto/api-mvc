//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../config/config")

//Definição do Model LotesEtiquetas

const Etiquetas = database.define('etiquetas', {
    id_etiqueta: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data: Sequelize.STRING(15),
    semana_colheita: Sequelize.INTEGER,
    etiqueta: Sequelize.STRING(7),
    status: {
        defaultValue: "Sem uso",
        type: Sequelize.STRING(30)
    },
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE
})




//Exportação da Model
module.exports = Etiquetas
