//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../config/config")

//Definição do Model LotesEtiquetas

const LoteEtiquetas = database.define('lotes_etiquetas', {
  id_lote_etiqueta: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  criacao: Sequelize.STRING(15),
  semana_corte: Sequelize.INTEGER,
  semana_colheita: Sequelize.INTEGER,
  etiqueta_inicial: Sequelize.INTEGER,
  etiqueta_final: Sequelize.INTEGER
})

//Exportação da Model
module.exports = LoteEtiquetas
