
const LoteEtiquetas = require("../entities/lote.etiquetas")
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
        const lote_etiquetas = LoteEtiquetas.create(
            criacao,
            semana_corte,
            semana_colheita,
            etiqueta_inicial,
            etiqueta_final
        )

        const { error, data } = await TryCatch(async () => {
            await this.repository.create(lote_etiquetas)
        })

        if (error) {
            return {
                status: 404,
                message: "Não foi possível cadastrar o lote de etiquetas!",
                data: data
            }
        }

        return {
            status: 200,
            message: "Lote de Etiquetas cadastrado com sucesso!",
            data: data
        }
    }
}

module.exports = LotesEtiquetasService