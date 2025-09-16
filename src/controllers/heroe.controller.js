const { response, request } = require('express')
const HeroeRepository = require("../repositories/Heroe.repository");
const HeroeMapper = require("../mapper/Heroe.Mapper");

const showError = (res, error) => {
    console.log(error);
    res.status(512).json({
        ok: false,
        msg: 'Hable con el Administrador',
        err: error
    });
    return res;
};
//SELECT * FROM heroe
const heroeGet = async (req, res = response) => {
    try {
        const unosHeroe = await HeroeRepository.findAllHeroes();
        res.json({
            ok: true,
            data: unosHeroe
        });
    } catch (error) {
        showError(res, error);
    }
}

const heroeIdGet = async (req, res = response) => {
    const { id } = req.params;
    try {
        const unHeroe = await HeroeRepository.findByIDHeroe(id);
        if (!unHeroe) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un heroe con el id: ' + id
            })
        }else {
            res.json({
                ok: true,
                data: unHeroe
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

const heroeComoGet = async (req = request, res = response) => {
    const { termino } = req.params;
    try {
        const [results, metadata] = await HeroeRepository.findAllHeroesByLikeName(termino);
        res.json({ok:true,
            data: results,
        });
    } catch (error) {
        showError(res, error);
    }
};

const heroePost = async (req, res = response) => {
    const heroeModel = HeroeMapper.toHeroeDTO(req.body);
    let newHeroe;
    try {
        await HeroeRepository.createTableIfNotExist()
        const existeHeroe = await HeroeRepository
            .findHeroeByName(heroeModel.nombre);

        if (existeHeroe) {
            return res.status(412).json({
                ok: false,
                msg: 'Ya existe un Heroe llamado: ' + heroeModel.nombre
            })
        }else{
            newHeroe = await HeroeRepository.createNewHeroe(heroeModel)// Guardar en BD
            //heroeModel.id = newHeroe.null;//Ajusta el Id del nuevo registro al Heroe

            res.status(201).json({
                ok: true,
                msg: 'Heroe INSERTADO',
                data: newHeroe,
            });
        }
    } catch (error) {
        showError(res, error);
    }
}

module.exports = {
    heroeGet,
    heroeIdGet,
    heroeComoGet,
    heroePost
}