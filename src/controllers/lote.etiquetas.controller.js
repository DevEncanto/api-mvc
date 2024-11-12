const LoteEtiquetasRepositorySequelize = require("../repositories/lote.etiquetas.repository.sequelize");
const LotesEtiquetasService = require("../services/lotes.etiquetas.service")
const LoteEtiquetas = require("../sequelize/models/lotes.etiquetas.model")

class LoteEtiquetasController {
    constructor() { }

    static build() {
        return new LoteEtiquetasController();
    }

    // Método que gera as rotas
    static generateRoutes() {
        const controllerInstance = this.build();

        // Remove "Controller" do nome da classe
        const className = this.name.replace(/Controller$/, '');

        // Gera o nome base do path, separando as palavras e tornando minúsculas
        let pathBase = className.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

        // Corrige a pluralização para evitar repetição de "s"
        if (!pathBase.endsWith('s')) {
            pathBase += 's';
        }

        // Mapeamento das iniciais para os métodos HTTP
        const methodMap = {
            p: 'post',
            g: 'get',
            d: 'delete',
            u: 'put'
        };

        return Object.getOwnPropertyNames(this.prototype)
            .filter(methodName => methodName !== 'constructor' && methodName !== 'generateRoutes')
            .map(methodName => {
                const methodType = methodName.charAt(0).toLowerCase(); // Extrai a inicial do método
                const httpMethod = methodMap[methodType]; // Obtém o método HTTP a partir do mapeamento

                if (!httpMethod) {
                    throw new Error(`Método desconhecido: ${methodName}`);
                }

                // Gera o path para a rota, removendo a primeira letra do método e colocando em minúsculas
                const path = `/${pathBase}/${methodName.slice(1).toLowerCase()}`;

                return {
                    path: path, // Nome da rota
                    method: httpMethod, // Método HTTP
                    controller: controllerInstance[methodName].bind(controllerInstance) // Vincula o método ao contexto da instância
                };
            });
    }


    async pCreate(req, res) {
        const { criacao, semana_corte, semana_colheita, etiqueta_inicial, etiqueta_final } = req.body;

        const aRepository = LoteEtiquetasRepositorySequelize.build(LoteEtiquetas);
        const aService = LotesEtiquetasService.build(aRepository)


        const { status, data } = await aService.create(
            criacao,
            semana_corte,
            semana_colheita,
            etiqueta_inicial,
            etiqueta_final
        );

        res.status(status).json(data).send();
    }

    async gList(){

    }
}

module.exports = LoteEtiquetasController