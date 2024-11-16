class LoteEtiquetasRepositorySequelize {
    // Variáveis restritas à classe para mensagens de erro
    static ERROR_MODEL_REQUIRED = "É necessário fornecer uma model.";

    constructor(model) {
        this.model = model ? model : new Error(this.ERROR_MODEL_REQUIRED);
    }

    static build(model) {
        return model ? new LoteEtiquetasRepositorySequelize(model) : new Error(this.ERROR_MODEL_REQUIRED);
    }

    async create(lote_etiqueta) {

        const { dataValues } = await this.model.create(lote_etiqueta)

        return dataValues
    }

    async findLoteSemanas(ano_colheita, ano_corte, semana_corte, semana_colheita) {
        const { Op } = require('sequelize'); // Certifique-se de importar o Op
      
        // Realizando a busca usando `Op.and` para combinar as condições
        const response = await this.model.findOne({
          where: {
            [Op.and]: [
              { semana_corte: semana_corte },
              { semana_colheita: semana_colheita },
              { ano_corte: ano_corte },
              { ano_colheita: ano_colheita } // Adiciona a condição para o ano_colheita
            ]
          }
        });
      
        // Retorna os valores ou null se não houver nenhum resultado
        return response ? response.dataValues : null;
      }
      
}

module.exports = LoteEtiquetasRepositorySequelize