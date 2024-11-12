class LoteEtiquetasRepositorySequelize {
    // Variáveis restritas à classe para mensagens de erro
    static ERROR_MODEL_REQUIRED = "É necessário fornecer uma model.";

    constructor(model) {
        this.model = model ? model : new Error(this.ERROR_MODEL_REQUIRED);
    }

    static build(model) {
        return model ? new LoteEtiquetasRepositorySequelize(model) : new Error(this.ERROR_MODEL_REQUIRED);
    }

    async create(criacao, semana_corte, semana_colheita, etiqueta_inicial, etiqueta_final) {

        const { dataValues } = await this.model.create({
            criacao: criacao,
            semana_corte: semana_corte,
            semana_colheita: semana_colheita,
            etiqueta_inicial: etiqueta_inicial,
            etiqueta_final: etiqueta_final
        })

        return dataValues
    }

    async findLoteSemanas(semana_corte, semana_colheita) {

        const { Op } = require('sequelize');  // Certifique-se de importar o Op

        const response = await this.model.findOne({
            where: {
                [Op.or]: [
                    { semana_corte: semana_corte },
                    { semana_colheita: semana_colheita }
                ]
            }
        });

        return response ? response.dataValues : null
    }
}

module.exports = LoteEtiquetasRepositorySequelize