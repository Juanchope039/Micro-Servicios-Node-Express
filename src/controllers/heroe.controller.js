const { response, request } = require('express')
const { Heroe } = require('../repositories/Heroe.repository');
const { connection } = require('../models/ConnectionLocal');
const {Op} = require("sequelize");

//SELECT * FROM heroe
const heroeGet = async (req, res = response) => {
    try {
        const unosHeroe = await Heroe.findAll();
        res.json({
            ok: true,
            data: unosHeroe
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}


const heroeIdGet = async (req, res = response) => {
    const { id } = req.params;
    try {
        const unHeroe = await Heroe.findByPk(id);
        if (!unHeroe) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un heroe con el id: ' + id
            })
        }
        res.json({
            ok: true,
            data: unHeroe
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })
    }
}


const heroeComoGet = async (req = request, res = response) => {
    const { termino } = req.params;
    try {
        const [results, metadata] = await Heroe.findAll({
            attributes: ['nombre', 'bio'],
            where: {
                nombre: {
                    [Op.like]: `%${termino}%`,
                },
            },
        });
        res.json({ok:true,
            data: results,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        });
    }
};


const heroePost = async (req, res = response) => {
    const { nombre, bio, img, aparicion, casa} = req.body;
    const heroe = new Heroe({
        nombre, bio, img, aparicion, casa
    });

    let newHeroe;
    try {
        await Heroe.sync();
        const existeHeroe = await Heroe.findOne({
            where: { nombre: nombre }
        });

        if (existeHeroe) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un Heroe llamado: ' + nombre
            })
        }

        // Guardar en BD
        newHeroe = await heroe.save();

        //console.log(newHeroe.null);
        //Ajusta el Id del nuevo registro al Heroe
        heroe.id = newHeroe.null;

        res.status(201).json({
            ok: true,
            msg: 'Heroe INSERTADO',
            data: heroe
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }
}


module.exports = {
    heroeGet,
    heroeIdGet,
    heroeComoGet,
    heroePost

}
