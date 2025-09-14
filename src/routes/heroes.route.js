const { Router } = require('express');

const { heroesGet,
        heroeIdGet,
        heroesComoGet,
        heroesPost
    //pruebaPost,
    //pruebaPut,
    //pruebaDelete,
    //pruebaPatch
} = require('../controllers/heroes.controller');


const router = Router();

router.get('/', heroesGet);

router.get('/:id', heroeIdGet);

router.get('/como/:termino', heroesComoGet);

//INSERT
router.post('/', heroesPost);


//router.put('/:id', usuariosPut);

//router.delete('/:id', usuariosDelete);

//router.patch('/', usuariosPatch);


module.exports = router;