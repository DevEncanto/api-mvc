const TryCatch = require("../util/try.catch")

class LotesEtiquetasService {

    static ERROR_REPO = "É necessário fornecer uma model.";

    constructor(repository) {
        this.repository = repository ? repository : new Error(this.ERROR_REPO);
    }

    static build(repository) {
        return repository ? new LotesEtiquetasService(repository) : new Error(this.ERROR_REPO)
    }

    async create(criacao, semana_corte, semana_colheita, etiqueta_inicial, etiqueta_final) {

        let response

        response = await TryCatch(async () => {
            return await this.repository.findLoteSemanas(semana_corte, semana_colheita)
        })

        if (response.data) {
            return {
                status: 401,
                message: "Já existe um lote de etiquetas com as semanas informadas!",
                data: response.data
            }
        }


        response = await TryCatch(async () => {
            return await this.repository.create(criacao, semana_corte, semana_colheita, etiqueta_inicial, etiqueta_final)
        })

        if (response.error) {
            return {
                status: 404,
                message: "Não foi possível cadastrar o lote de etiquetas!",
                data: response.data
            }
        }

        return {
            status: 200,
            message: "Lote de Etiquetas cadastrado com sucesso!",
            data: response.data
        }
        
    }
}

module.exports = LotesEtiquetasService