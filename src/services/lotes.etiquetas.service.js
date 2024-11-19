const { Op } = require("sequelize");
const EtiquetasRepositorySequelize = require("../repositories/etiquetas.repository");
const Etiquetas = require("../sequelize/models/etiquetas.model");
const TryCatch = require("../util/try.catch");
const LoteEtiquetasRepositorySequelize = require("../repositories/lote.etiquetas.repository.sequelize");
const LoteEtiquetas = require("../sequelize/models/lotes.etiquetas.model");

class LotesEtiquetasService {

    static ERROR_REPO = "É necessário fornecer uma model.";

    constructor(repository) {
        this.repository = repository ? repository : new Error(this.ERROR_REPO);
    }

    static build(repository) {
        return repository ? new LotesEtiquetasService(repository) : new Error(this.ERROR_REPO)
    }

    async create(lote_etiqueta) {

        const { ano_colheita, ano_corte, semana_corte, semana_colheita } = lote_etiqueta

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

    async update(lt1) {

        let response
        const { id_lote_etiqueta, ano_colheita, ano_corte, semana_corte, semana_colheita } = lt1
        const aRepository = new EtiquetasRepositorySequelize(Etiquetas)

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


        const where = {
            [Op.and]: [
                { id_lote_etiqueta: id_lote_etiqueta },  // Adicionando a condição para o campo id_lote_etiqueta
                { status: { [Op.ne]: "Sem uso" } },  // A condição já existente
            ]
        };

        response = await TryCatch(async () => {
            return await aRepository.findAllWhere(where)
        })

        if (response.error) {
            return {
                statusRequest: 200,
                statusResponse: 401,
                message: "Não foi possível editar o lote de etiquetas!",
                data: response.data
            }
        }

        const etiquetas_lote = response.data
        const lt2 = await this.repository.finOne(id_lote_etiqueta)

        console.log("=============EDIÇÃO=============")
        console.log("Etiqueta Encontradas!")
        console.log(JSON.parse(JSON.stringify(etiquetas_lote)))
        console.log(JSON.parse(JSON.stringify(lt1)))
        console.log(JSON.parse(JSON.stringify(lt2)))

        const total_lt1 = lt1.etiqueta_final - lt1.etiqueta_inicial + 1
        const total_lt2 = lt2.etiqueta_final - lt2.etiqueta_inicial + 1

        console.log(`Total lt1: ${total_lt1}`)
        console.log(`Total lt2: ${total_lt2}`)

        if (total_lt1 === total_lt2) {
            console.log("Nenhuma Alteração")
        }

        if (total_lt1 > total_lt2) {
            console.log("Aumentar Etiquetas")
            
            console.log("Etiqueta Complementares!")
            console.log(this.generateEtiquetasIncrement(id_lote_etiqueta, lt1, lt2))
        }
        if (total_lt1 < total_lt2) {
            console.log("Diminuir Etiquetas")
            console.log(this.generateEtiquetasIncrement(id_lote_etiqueta, lt1, lt2))
        }


        return {
            statusRequest: 200,
            statusResponse: 200,
            message: "Lote de Etiquetas editado com sucesso!",
            data: response.data
        }
    }
    generateEtiquetasIncrement(id_lote_etiqueta, lt1, lt2){

        let etiquetasComplementares = []
        
        for (let i = lt1.etiqueta_inicial; i == 0; i--) {
            etiquetasComplementares.push()
        }
        for (let j = lt2.etiqueta_final + 1; j <= lt1.etiqueta_final; j++) {
            etiquetasComplementares.push({
                id_lote_etiqueta,
                etiqueta: String(j).padStart(4, '0'),
                data: lt2.criacao,
                semana_colheita: lt2.semana_colheita,
                longitude: 0,
                latitude: 0
            })
        }
        return etiquetasComplementares
    }

    generateEtiquetasDecrement(id_lote_etiqueta, lt1, lt2){
        let etiquetasComplementares = []
        
        for (let i = lt1.etiqueta_inicial; i == 0; i--) {
            etiquetasComplementares.push({
                id_lote_etiqueta,
                etiqueta: String(i).padStart(4, '0'),
                data: lt1.criacao,
                semana_colheita: lt1.semana_colheita,
                longitude: 0,
                latitude: 0
            })
        }
        console.log(lt1.etiqueta_final)
        console.log(lt2.etiqueta_final)
        for (let j = lt2.etiqueta_final; j > lt1.etiqueta_final; j--) {
            console.log(j)
            etiquetasComplementares.push({
                id_lote_etiqueta,
                etiqueta: String(j).padStart(4, '0'),
                data: lt2.criacao,
                semana_colheita: lt2.semana_colheita,
                longitude: 0,
                latitude: 0
            })
        }
        return etiquetasComplementares
    }


}

module.exports = LotesEtiquetasService