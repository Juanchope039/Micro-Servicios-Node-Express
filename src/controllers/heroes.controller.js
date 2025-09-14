const { response, request } = require('express')
const { Heroes } = require('../models/mySqlHeroes.model');
const { bdmysqlNube,bdmysql } = require('../repositories/mySqlConnection');

//SELECT * FROM heroes
const heroesGet = async (req, res = response) => {

    try {
        const unosHeroes = await Heroes.findAll();

        res.json({
            ok: true,
            data: unosHeroes
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

        const unHeroe = await Heroes.findByPk(id);

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


    /*
    const query = req.query;


    //Desestructuracion de argumentos
    const { q, nombre = 'No name', apikey, page=1, limit=10} = req.query;


    //res.send('Hello World')
    res.json({
        //ok:true,
        msg:'get API - Controller',
        query,
        q,
        nombre,
        apikey,
        page,
        limit
       })


      */
}


const heroesComoGet = async(req = request, res = response) => {

    const { termino } = req.params;

    try {
        const [results, metadata] = await bdmysql.query(
            "SELECT nombre,bio" +
            " FROM heroes" +
            " WHERE nombre LIKE '%" + termino + "%'" +
            " ORDER BY nombre"
        );

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


const heroesPost = async (req, res = response) => {

    const { nombre, bio, img, aparicion , casa,id} = req.body;

    const heroe = new Heroes({ nombre, bio,img, aparicion, casa });


    try {

        const existeHeroe = await Heroes.findOne({ where: { nombre: nombre} });


        if (existeHeroe) {
            return res.status(400).json({ok:false,
                msg: 'Ya existe un Heroe llamado: ' + nombre
            })
        }


        // Guardar en BD
        newHeroe = await heroe.save();

        //console.log(newHeroe.null);
        //Ajusta el Id del nuevo registro al Heroe
        heroe.id = newHeroe.null;


        res.json({ok:true,
            msg:'Heroe INSERTADO',
            data:heroe
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ok:false,
            msg: 'Hable con el Administrador',
            err: error
        })

    }



}


module.exports = {
    heroesGet,
    heroeIdGet,
    heroesComoGet,
    heroesPost

}
