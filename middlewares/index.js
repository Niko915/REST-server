//Este archivo actua como referenciador, es decir con llamar a este , podemos acceder
//por referencia a los demas middlewares dentro del directorio

const validarCampos = require('../middlewares/validar_campos');
const validarJWT  = require('../middlewares/validarjwt');
const validarRoles = require('../middlewares/validar_roles');


module.exports={
    ...validarCampos,
    ...validarJWT,
    ...validarRoles}