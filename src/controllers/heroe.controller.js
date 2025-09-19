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
        if (unosHeroe) {
            res.json({
                ok: true,
                data: unosHeroe
            });
        }else {
            res.status(204).json({
                ok: false,
                data: unosHeroe
            });
        }
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
        if (results) {
            res.json({
                ok: true,
                data: results,
            });
        }else {
            res.status(404).json({
                ok: false,
                data: results,
            });
        }
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
            //heroeModel.id = newHeroe.null;//Ajusta el, Id del nuevo registro al Heroe
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

///

// Upload single (avatar)
heroeUploadAvatar = (req, res) => {
    const id = req.params.id;
    try {
        if (!req.file) return res.status(400).json({ ok: false, message: 'No se recibió archivo.' });

        // ejemplo: ruta del archivo en servidor
        const fileInfo = {
            originalname: req.file.originalname,
            filename: req.file.filename,
            mimetype: req.file.mimetype,
            size: req.file.size,
            path: req.file.path
        };

        // TODO: actualizar en DB el registro del héroe con fileInfo.filename/path, etc.

        return res.json({ ok: true, message: 'Avatar subido correctamente', id, file: fileInfo });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
};

// Upload multiple files
heroeUploadFiles = (req, res) => {
    const id = req.params.id;
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ ok: false, message: 'No se recibieron archivos.' });
        }

        const files = req.files.map(f => ({
            originalname: f.originalname,
            filename: f.filename,
            mimetype: f.mimetype,
            size: f.size,
            path: f.path
        }));

        // TODO: guardar metadata en DB si hace falta

        return res.json({ ok: true, message: `${files.length} archivos subidos`, id, files });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
};
module.exports = {
    heroeGet,
    heroeIdGet,
    heroeComoGet,
    heroePost,
    heroeUploadAvatar,
    heroeUploadFiles
}