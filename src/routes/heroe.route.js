const { Router } = require('express');

const { heroeGet,
        heroeIdGet,
        heroeComoGet,
        heroePost
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch
} = require('../controllers/heroe.controller');


const router = Router();

router.get('/', heroeGet);

router.get('/:id', heroeIdGet);

router.get('/como/:termino', heroeComoGet);

//INSERT
router.post('/', heroePost);


//router.put('/:id', usuariosPut);

//router.delete('/:id', usuariosDelete);

//router.patch('/', usuariosPatch);


module.exports = router;