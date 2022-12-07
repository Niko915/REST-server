
const {Router} = require('express');
const { check } = require('express-validator');

const { login, googleIdentity } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('passwd','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('id_token','id_token es necesario').not().isEmpty(),
    validarCampos
],googleIdentity);


module.exports = router; 