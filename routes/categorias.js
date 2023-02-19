const {Router} = require('express');
const { check } = require('express-validator');


const { crearCategoria,
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria} = require('../controllers/categorias.controller');
const { existeCategoriaPorId } = require('../helpers/db_validators');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares/index');

const router = Router();

// Obtener todas las categorias - publico
router.get('/',obtenerCategorias);

// Obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id de Mongo').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId)
], obtenerCategoria);

// Crear categoria - privado - cualquiera persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre de catergoría es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

// Actualizar - privado - cualquiera persona con un token valido
router.put('/:id',[
    validarJWT,
    check('id','No es un id de Mongo').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria);

// Borrar una categoria - Admin => poner en estado false
router.delete('/:id',[
validarJWT,
esAdminRol,
check('id','No es un id de Mongo').isMongoId(),
validarCampos,
check('id').custom(existeCategoriaPorId),
validarCampos
],borrarCategoria);

module.exports = router; 