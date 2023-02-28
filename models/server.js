const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {dbConnect} = require('../db/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;   
        
        this.rutas={
            auth:'/api/auth',
            buscar:'/api/buscar',
            usuarios:'/api/usuarios',
            categorias:'/api/categorias',
            productos:'/api/productos',
            uploads:'/api/uploads'
        }
        
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

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true //OJO CUIDADO si queremos que solo se pueda guardar en carpetas creadas manualmente esta opcion se pone en false (controlar donde se guardan las cosas)
        }));
    }

    routes(){
        this.app.use(this.rutas.auth, require('../routes/auth'));
        this.app.use(this.rutas.buscar, require('../routes/buscar'));
        this.app.use(this.rutas.usuarios, require('../routes/user'));
        this.app.use(this.rutas.categorias, require('../routes/categorias'));
        this.app.use(this.rutas.productos, require('../routes/productos'));
        this.app.use(this.rutas.uploads, require('../routes/uploads'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`App funcionando en el puerto ${this.port}`)});
    }
};



module.exports = Server;