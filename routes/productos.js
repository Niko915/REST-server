const {Router} = require('express');
const { check } = require('express-validator');


const { crearProducto,
        obtenerProductos,
        obtenerProducto,
        actualizarProducto,
        borrarProducto} = require('../controllers/productos.controller');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db_validators');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares/index');

const router = Router();

// Obtener todas los productos - publico
router.get('/',obtenerProductos);

// Obtener un producto por id - publico
router.get('/:id',[
    check('id','No es un id de Mongo').isMongoId(),
    validarCampos,
    check('id').custom(existeProductoPorId)
],obtenerProducto);

// Crear producto - privado - cualquiera persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre de producto es obligatorio').not().isEmpty(),
    check('categoria','No es un id de mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto);

// Actualizar - privado - cualquiera persona con un token valido
router.put('/:id',[
    validarJWT,
    //check('categoria','No es un id de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto);

// Borrar un producto - Admin => poner en estado false
router.delete('/:id',[
validarJWT,
esAdminRol,
check('id','No es un id de Mongo').isMongoId(),
check('id').custom(existeProductoPorId),
validarCampos
],borrarProducto);

module.exports = router; 