const TryCatch = require("../util/try.catch")

class LotesEtiquetasService {

    static ERROR_REPO = "É necessário fornecer uma model.";

    constructor(repository) {
        this.repository = repository ? repository : new Error(this.ERROR_REPO);
    }

    static build(repository) {
        return repository ? new LotesEtiquetasService(repository) : new Error(this.ERROR_REPO)
    }

    async create(lote_etiqueta) {

        const {ano_colheita, ano_corte, semana_corte, semana_colheita} =lote_etiqueta

        let response

        response = await TryCatch(async () => {
            return await this.repository.findLoteSemanas(ano_colheita, ano_corte, semana_corte, semana_colheita)
        })

        if (response.data) {
            return {
                statusRequest: 200,
                statusResponse: 401,
                message: "O lote informado já existe!",
                data: response.data
            }
        }


        response = await TryCatch(async () => {
            return await this.repository.create(lote_etiqueta)
        })

        if (response.error) {
            return {
                statusRequest: 200,
                statusResponse: 404,
                message: "Não foi possível cadastrar o lote de etiquetas!",
                data: response.data
            }
        }

        return {
            statusRequest: 200,
            statusResponse: 200,
            message: "Lote de Etiquetas cadastrado com sucesso!",
            data: response.data
        }

    }
}

module.exports = LotesEtiquetasService