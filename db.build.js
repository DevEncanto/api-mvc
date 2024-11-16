const { hash } = require("./src/util/hash");

(async () => {
    const database = require("./src/sequelize/config/config")

    const LoteEtiquetas = require("./src/sequelize/models/lotes.etiquetas.model")
    const Etiquetas = require("./src/sequelize/models/etiquetas.model")
    const Usuarios = require("./src/sequelize/models/usuarios.model")
    const Permissoes = require("./src/sequelize/models/permissoes.model")
    const Permissoes_Usuarios = require("./src/sequelize/models/permissoes.usuarios.model")
    const Pessoas = require("./src/sequelize/models/pessoas.model")

    await database.sync({force: true})
    console.log("Oi")
    await Usuarios.create({
        usuario: "gabriel_vogais",
        senha: await hash("teste")
    })
    console.log("Executei")
    process.exit(0)
})();