
const {Router} = require('express');
const { check } = require('express-validator');

const {validarCampos,
       validarJWT,
       esAdminRol,
       tieneRol} = require('../middlewares');

const { esRolValido, emailExiste,existeUsuarioPorId } = require('../helpers/db_validators');


const { usuariosGet,
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch } = require('../controllers/usuarios.controller');

const router = Router();

router.get('/',usuariosGet);

router.put('/:id',[
     check('id','No es un ID válido').isMongoId(),
     check('id').custom(existeUsuarioPorId),
     check('rol').custom(esRolValido),
     validarCampos
],usuariosPut); //:id es un parametro de url

router.post('/',[
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('passwd','La contraseña debe tener mas de 6 caracteres').isLength({min:6}),
     check('correo','El correo ingresado no tiene el formato correcto').isEmail(),
     check('correo').custom(emailExiste),
     check('rol').custom(esRolValido),
     validarCampos
],usuariosPost);

router.delete('/:id',[
     validarJWT,
     //esAdminRol,
     tieneRol('ADMIN_ROL','VENTAS_ROL'),
     check('id','No es un ID válido').isMongoId(),
     check('id').custom(existeUsuarioPorId),
     validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);
  

module.exports = router;
