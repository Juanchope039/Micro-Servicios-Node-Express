const { Router } = require('express');
const upload = require('../middlewares/upload.middleware');


const { heroeGet,
        heroeIdGet,
        heroeComoGet,
        heroePost,
        heroeUploadAvatar,
        heroeUploadFiles
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

router.post('/:id/avatar', upload.single('avatar'), heroeUploadAvatar);

// subir múltiples archivos (campo "files")
router.post('/:id/files', upload.array('files', 5), heroeUploadFiles);


//router.put('/:id', usuariosPut);

//router.delete('/:id', usuariosDelete);

//router.patch('/', usuariosPatch);


module.exports = router;