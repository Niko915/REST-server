const path = require('path');
const fs   = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers/subir_archivo");

const Usuario = require('../models/usuario');
const Producto = require('../models/producto');


const cargarArchivos= async(req,res=response)=>{

  try {

    const nombre = await subirArchivo(req.files,undefined,'pdf');
    res.json({nombre});

   } catch (msg) {

    res.status(400).json({msg})

   }

}


const actualizarImagen = async (req,res=response)=>{

  const {id,coleccion} = req.params

  let modelo;

  switch (coleccion) {
    case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) {
          return res.status(400).json({msg:`No existe un usuario con el id ${id}`});
        }
    break;
      
    case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({msg:`No existe un producto con el id ${id}`});
        }
    break;

    default:
      return res.status(500).json({msg:'Aún sin implementar'})
  }
  
  // Limpiar imágenes previas
  if ( modelo.img ) {
  // Hay que borrar la imagen del servidor
    const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );

      if ( fs.existsSync( pathImagen ) ) {
          fs.unlinkSync( pathImagen );
      }

  }


  const nombre = await subirArchivo(req.files,undefined,coleccion);
  modelo.img = nombre;

  await modelo.save();


  res.json(modelo)
}


const mostrarImagen = async (req,res=response)=>{

  const {id,coleccion} = req.params

  let modelo;

  switch (coleccion) {
    case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) {
          return res.status(400).json({msg:`No existe un usuario con el id ${id}`});
        }
    break;
      
    case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({msg:`No existe un producto con el id ${id}`});
        }
    break;

    default:
      return res.status(500).json({msg:'Aún sin implementar'})
  }
  
  // Limpiar imágenes previas
  if ( modelo.img ) {
  // Hay que borrar la imagen del servidor
    const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
    if ( fs.existsSync( pathImagen ) ) {
      return res.sendFile(pathImagen);
    }

  }

  if ( !modelo.img ) {
    const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    if ( fs.existsSync( pathImagen ) ) {
      return res.sendFile(pathImagen);
    }
  
  }
  
}

const actualizarImagenCloudinary = async (req,res=response)=>{

  const {id,coleccion} = req.params

  let modelo;

  switch (coleccion) {
    case 'usuarios':
        modelo = await Usuario.findById(id);
        if (!modelo) {
          return res.status(400).json({msg:`No existe un usuario con el id ${id}`});
        }
    break;
      
    case 'productos':
        modelo = await Producto.findById(id);
        if (!modelo) {
          return res.status(400).json({msg:`No existe un producto con el id ${id}`});
        }
    break;

    default:
      return res.status(500).json({msg:'Aún sin implementar'})
  }
  
  // Limpiar imágenes previas
  if ( modelo.img ) {
    const public_id = modelo.img.split('/').pop().split('.').shift();

    await cloudinary.uploader.destroy(`Assets/${coleccion}/${public_id}`);
  }

  const { tempFilePath } = req.files.archivo;
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

  modelo.img = secure_url;
  await modelo.save;
  
  res.json(modelo);
  /* const nombre = await subirArchivo(req.files,undefined,coleccion);
  modelo.img = nombre;

  await modelo.save();


  res.json(modelo) */
}



module.exports={
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}