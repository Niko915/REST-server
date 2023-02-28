
const DbValidators = require('./db_validators');
const generarJWT = require('./generarjwt');
const googleVerify = require('./google_verify');
const subirArchivo = require('./subir_archivo');

module.exports={
    ...DbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}