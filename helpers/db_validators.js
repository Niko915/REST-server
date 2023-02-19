const Rol = require('../models/rol');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

/* Validadores de roles*/

const esRolValido = async(rol="")=>{
    const existeRol = await Rol.findOne({rol});
    if (!existeRol) {
         throw new Error(`El rol: ${rol} , no está registrado en la BD`);
    }
}

/* Validadores de usuarios */

const emailExiste = async (correo="")=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error('Este correo ya ha sido registrado');
    }
}

const existeUsuarioPorId = async (id="")=>{
    const existeUsuario = await Usuario.findOne({id});
    if(!existeUsuario){
        throw new Error(`El usuario correspondiente al id : ${id} , no existe`);
    }
}

/* Validadores de categorias*/

const existeCategoriaPorId = async(id="")=>{
    const existeCategoria = await Categoria.findOne({id});
    if(!existeCategoria){
        throw new Error(`El id : ${id} , no existe`);
    }
}

/* Validadores de productos */

const existeProductoPorId = async(id="")=>{
    const existeProducto = await Producto.findOne({id});
    if(!existeProducto){
        throw new Error(`El id : ${id} , no existe`);
    }
}

module.exports={
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
};