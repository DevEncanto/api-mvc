const { compare } = require("../util/hash");
const { gerarToken } = require("../util/jwt");
const TryCatch = require("../util/try.catch")

class UsuariosService {

    static ERROR_REPO = "É necessário fornecer uma model.";

    constructor(repository) {
        this.repository = repository ? repository : new Error(this.ERROR_REPO);
    }

    static build(repository) {
        return repository ? new UsuariosService(repository) : new Error(this.ERROR_REPO)
    }

    async create(usuario, senha) {

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

    async authenticate(usuario, senha) {
        let [error, data] = [null, null];

        ({ error, data } = await TryCatch(async () => {
            return await this.repository.findUser(usuario)
        }));

        if (error || data == null) {
            return res.json({
                status: 401,
                message: "Falha ao realizar o login!",
                data: data
            });
        }

        const senhaCorreta = await compare(senha, data.senha)

        if (!senhaCorreta) {
            return {
                status: 405,
                message: "Os dados fornecidos estão incorretos!",
                data: ""
            }
        }

        const token = await gerarToken(data.idUsuario);

        return {
            status: 200,
            message: "Login realizado com sucesso",
            data: {
                token: token,
                idUsuario: data.idUsuario
            }
        }
    }
}

module.exports = UsuariosService