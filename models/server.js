const express = require('express')
const cors = require('cors');

const {dbConnect} = require('../db/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;   
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth'
        //conectar a DB
        this.conectarDb();

        //middlewares
        this.middlewares();


        //rutas de la aplicacion
        this.routes();
    }

    async conectarDb(){
        await dbConnect();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y pareseo del body
        this.app.use(express.json());

        //directorio público
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`App funcionando en el puerto ${this.port}`)});
    }
};



module.exports = Server;