class EtiquetasRepositorySequelize {
    // Variáveis restritas à classe para mensagens de erro
    static ERROR_MODEL_REQUIRED = "É necessário fornecer uma model.";

    constructor(model) {
        this.model = model ? model : new Error(this.ERROR_MODEL_REQUIRED);
    }

    static build(model) {
        return model ? new EtiquetasRepositorySequelize(model) : new Error(this.ERROR_MODEL_REQUIRED);
    }

    async create(etiquetas) {

        const { dataValues } = await this.model.bulkCreate(etiquetas)

        return dataValues
    }

    async list(id_lote_etiqueta) {
        return await this.model.findAll({
            where: {
                id_lote_etiqueta
            }
        })
    }

    async findAllWhere(where) {
        return await this.model.findAll({
            where: where
        })
    }

    async delete(id_lote_etiqueta) {
        return await this.model.delete({
            where: {
                id_lote_etiqueta
            }
        })
    }

}

module.exports = EtiquetasRepositorySequelize