class LoteEtiquetasRepository {
    static error = "Essa classe não pode ser instanciada, somente extendida";

    constructor() {
        if (this.constructor === LoteEtiquetasRepository) {
            throw new Error(this.error);
        }

        // Obter o nome dos métodos da classe base (exceto o construtor)
        const prototype = LoteEtiquetasRepository.prototype
        const classObject = Object.getOwnPropertyNames(prototype)
        const baseMethods = classObject.filter(method => method !== 'constructor');
        // Filtra o método 'constructor'

        // Verificar se os métodos estão implementados na classe filha
        baseMethods.forEach(method => {
            if (this[method] === undefined) {
                throw new Error(`Método '${method}' não implementado.`);
            }
        });
    }

    // Métodos 'placeholder' que devem ser implementados pelas subclasses
    Pcreate() {
        // Este método deve ser implementado nas classes filhas
    }

    Glist() {
        // Este método deve ser implementado nas classes filhas
    }
}
