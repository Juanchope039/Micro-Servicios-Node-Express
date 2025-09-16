const {HeroeModel} = require("../models/inbound/HeroePost.dto.model");

class HeroeMapper{

    static toHeroeDTO(data) {
        let heroeDto = new HeroeModel();
        heroeDto.nombre = data.nombre;
        heroeDto.bio = data.bio;
        heroeDto.img = data.img;
        heroeDto.aparicion = Date.parse(data.aparicion);
        heroeDto.casa = data.casa;

        return heroeDto;
    }
}

module.exports = HeroeMapper;