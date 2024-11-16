//Importação do Sequelize
const Sequelize = require("sequelize")

//Importação da Conexão com o Banco de Dados
const database = require("../config/config")

const Usuarios = require("./usuarios.model")
const Etiquetas = require("./etiquetas.model")

//Definição do Model LotesEtiquetas

const LoteEtiquetas = database.define('lotes_etiquetas', {
  id_lote_etiqueta: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  id_usuario: Sequelize.INTEGER,
  criacao: Sequelize.STRING(15),
  semana_corte: Sequelize.INTEGER,
  semana_colheita: Sequelize.INTEGER,
  ano_corte: Sequelize.INTEGER,
  ano_colheita: Sequelize.INTEGER,
  etiqueta_inicial: Sequelize.INTEGER,
  etiqueta_final: Sequelize.INTEGER
})

LoteEtiquetas.belongsTo(Usuarios, {
  constraint: true,
  foreignKey: "id_usuario"
})

LoteEtiquetas.hasMany(Etiquetas, {
  constraint: true,
  foreignKey: 'id_lote_etiqueta'
})

Etiquetas.belongsTo(LoteEtiquetas,  {
  constraint: true,
  foreignKey: 'id_lote_etiqueta'
})

//Exportação da Model
module.exports = LoteEtiquetas
