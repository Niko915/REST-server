
const {Router} = require('express');
const { check } = require('express-validator');


const { cargarArchivos, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.cotroller');
const { coleccionesPermitidas } = require('../helpers/db_validators');
const { validarArchivoSubir } = require('../middlewares/validar_archivo');
const { validarCampos } = require('../middlewares/validar_campos');


const router = Router();

router.post('/',validarArchivoSubir,cargarArchivos);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary/*actualizarImagen*/)

router.get('/:coleccion/:id',[
    check('id','El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
], mostrarImagen)

module.exports = router; 