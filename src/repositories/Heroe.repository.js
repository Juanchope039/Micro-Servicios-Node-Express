const {HeroeSchema} = require("../schemas/Heroe.Schema");
const {HeroeModel} = require("../models/inbound/HeroePost.dto.model");
const {Op} = require("sequelize");

class HeroeRepository {

    /** Crea un nuevo token */
    static async findHeroeByName(nombre) {
        return HeroeSchema.findOne({
            where: { nombre: nombre }
        });
    }

    /** Crea un nuevo token */
    static async createTableIfNotExist() {
        return HeroeSchema.sync();
    }

    /** Crea un nuevo token */
    static async createNewHeroe(heroModel = HeroeModel) {
        const schema = new HeroeSchema(heroModel);
        return schema.save();
    }

    /** Crea un nuevo token */
    static async findAllHeroes() {
        return HeroeSchema.findAll();
    }

    /** Crea un nuevo token */
    static async findAllHeroesByLikeName(termino) {
        return HeroeSchema.findAll({
            attributes: ['nombre', 'bio'],
            where: {
                nombre: {
                    [Op.like]: `%${termino}%`,
                },
            },
        });
    }

    /** Crea un nuevo token */
    static async findByIDHeroe(id) {
        return HeroeSchema.findByPk(id);
    }
}

module.exports = HeroeRepository;