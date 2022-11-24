
const {Router} = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar_campos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('passwd','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);


module.exports = router; 