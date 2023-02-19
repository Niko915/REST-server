const { response } = require("express");
const  Producto  = require('../models/producto');


const obtenerProductos = async(req,res=response)=>{
  
    const {desde=0,limite=5} = req.query;
 
    const [total,productos] = await Promise.all([ //lo de adentro es un filtro
        Producto.countDocuments({estado:true}),
        Producto.find({estado:true})
        .populate('usuario','nombre')
        .populate('categoria','nombre')
        .skip(Number(desde)) //Desde donde se muestra
        .limit(Number(limite)) //Hasta donde se muestra
    ]);

    res.json({total,productos});

}

const obtenerProducto = async(req,res=response)=>{
    const {id} = req.params;
    const producto = await Producto.findById(id)
    .populate('usuario','nombre')
    .populate('categoria','nombre');

    res.json(producto);
}

const crearProducto = async(req,res=response)=>{
    
    const {estado,usuario,...body} = req.body;

    const productoDb = await Producto.findOne({ nombre: body.nombre });

    if ( productoDb ) {
        return res.status(400).json({
            msg:`El producto ${productoDb.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = await new Producto(data);

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);
    
}

const actualizarProducto = async(req,res=response)=>{

    const {id} = req.params;
    const {estado,usuario, ...data} = req.body;

    if (data.nombre) {  
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json(producto);
}

const borrarProducto = async(req,res=response)=>{

    const {id} = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json( productoBorrado );

}


module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}