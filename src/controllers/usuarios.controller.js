const UsuariosRepositorySequelize = require("../repositories/usuarios.repository.sequelize");
const Usuarios = require("../sequelize/models/usuarios.model");
const UsuariosService = require("../services/usuarios.service");


class UsuariosController {
    constructor() { }

    static build() {
        return new UsuariosController();
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
        res.status(status = 200).json(json = {}).send()
    }

    async gList() {

    }

    async pLogin(req, res) {
        const { usuario, senha } = req.body

        const aRepository = UsuariosRepositorySequelize.build(Usuarios)
        const aService = UsuariosService.build(aRepository)

        const { status, data, message } = await aService.authenticate(
            usuario,
            senha
        );

        const json = {
            data: { ...data },
            message: message
        }
        
        res.status(status).json(json).send()
    }
}

module.exports = UsuariosController