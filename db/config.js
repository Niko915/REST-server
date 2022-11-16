const mongoose = require('mongoose');

const dbConnect = async()=>{
    //al tratarse de una conexion a db , esta puede fallar por eso el try catch
    try {
        mongoose.connect(process.env.MONGODB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
       });

       console.log('Base de datos online')

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la DB');
    }
}


module.exports={
    dbConnect
}