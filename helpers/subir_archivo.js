const { v4: uuidv4 } = require('uuid');
const path= require('path')


const subirArchivo=(files,extensionesValidas=['png','jpg','jpeg','gif','pdf','txt'],carpeta='')=>{

    return new Promise((resolve,reject)=>{

        const { archivo } = files == undefined ? reject('Debe añadir un archivo'):files;
        
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1];
    
        //validar la extensión
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no está permitida`);
        }
      
       const nombreTemp = uuidv4()+'.'+extension;
       const uploadPath =path.join( __dirname, '../uploads/',carpeta,nombreTemp);

       archivo.mv(uploadPath, function(err) {
          if (err) {
           reject(err)
          }
      
         resolve(nombreTemp);
        });
    
    });

}


module.exports={
    subirArchivo
}