const {Schema,model}=require('mongoose')
/* 
{   EJEMPLO DEL DOC
    nombre:'asd',
    correo:'asdasd@adasd.com',
    passwd:'encriptado',
    img:'1231231',
    rol:'cumer',
    estado:true, //o false si el usuario ha sido 'eliminado'
    google:true
}

*/
const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    passwd:{
        type:String,
        required:[true,'La contraseña es obligatorio']
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:[true],
        // enum:['ADMIN_ROL','USER_ROL'] 
        //Está comentado porque sinó fai override da validacion en db
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
});

UsuarioSchema.methods.toJSON = function(){
    const {__v,passwd,...usuario} = this.toObject();
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema) 