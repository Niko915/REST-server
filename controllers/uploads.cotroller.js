const { v4: uuidv4 } = require('uuid');
const path= require('path')

const { response } = require("express");

const cargarArchivos=(req,res=response)=>{

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({msg:'No hay archivos que subir'});
      return;
    }
  
    if (!req.files.archivo) {
        res.status(400).json({msg:'No hay archivos que subir'});
        return;
    }  
 
    const {archivo} = req.files;
    const nombreCortado = archivo.name.split('.');
    const extension = nombreCortado[nombreCortado.length-1];

    //validar la extensión
    const extensionesValidas=['png','jpg','jpeg','gif','pdf','txt']
    if (!extensionesValidas.includes(extension)) {
      return res.status(400).json({
        msg:`La extensión ${extension}, no está permitida`
      })
    }
  
   const nombreTemp = uuidv4()+'.'+extension;
   const uploadPath =path.join( __dirname, '../uploads/',nombreTemp);
  
   archivo.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).json({err});
      }
  
      res.json({msg:'File uploaded to ' + uploadPath});
    });

}

module.exports={
    cargarArchivos
}