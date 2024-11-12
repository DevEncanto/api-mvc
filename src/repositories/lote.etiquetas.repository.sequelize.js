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
        const data = {
            criacao: lote_etiqueta.criacao,
            semana_corte: lote_etiqueta.semana_corte,
            semana_colheita: lote_etiqueta.semana_colheita,
            etiqueta_inicial: lote_etiqueta.etiqueta_inicial,
            etiqueta_final: lote_etiqueta.etiqueta_final
        }
        return await this.model.create(data)
    }
}

module.exports = LoteEtiquetasRepositorySequelize