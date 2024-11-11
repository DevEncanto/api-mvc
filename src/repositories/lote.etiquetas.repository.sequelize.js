class LoteEtiquetasRepositorySequelize extends LoteEtiquetasRepository {
    // Variáveis restritas à classe para mensagens de erro
    static ERROR_MODEL_REQUIRED = "É necessário fornecer uma model.";
    static ERROR_METHOD_NOT_IMPLEMENTED = "Método 'create' não implementado.";

    constructor(model) {
        super();
        this.model = model ? model : new Error(this.ERROR_MODEL_REQUIRED);
    }

    static build(model) {
        return model ? new LoteEtiquetasRepositorySequelize(model) : new Error(this.ERROR_MODEL_REQUIRED);
    }

    async Pcreate() {
        const data = {

        }

        await this.model.create(data)
    }
}
