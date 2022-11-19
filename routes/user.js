
const {Router} = require('express');
const { check } = require('express-validator');


const {validarCampos} = require('../middlewares/validar_campos');
const { esRolValido } = require('../helpers/db_validators');

const { usuariosGet,
     usuariosPut, 
     usuariosPost, 
     usuariosDelete, 
     usuariosPatch } = require('../controllers/usuarios.controller');

const router = Router();

router.get('/',usuariosGet);

router.put('/:id',usuariosPut); //:id es un parametro de url

router.post('/',[
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('passwd','La contraseña debe tener mas de 6 caracteres').isLength({min:6}),
     check('correo','El correo ingresado no tiene el formato correcto').isEmail(),
     check('rol').custom(esRolValido),
     validarCampos
],usuariosPost);

router.delete('/',usuariosDelete);

router.patch('/', usuariosPatch);
  

module.exports = router;
