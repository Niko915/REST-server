const { response} = require("express");
const  Categoria  = require('../models/categoria');

// obtenerCategorias - paginado - total - populate(investigar)
const obtenerCategorias = async(req,res=response)=>{
  
    const {desde=0,limite=5} = req.query;
 
    const [total,categorias] = await Promise.all([ //lo de adentro es un filtro
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true})
        .populate('usuario','nombre')
        .skip(Number(desde)) //Desde donde se muestra
        .limit(Number(limite)) //Hasta donde se muestra
    ]);

    res.json({total,categorias});

}

// obtenerCategorias - populate(investigar){obj categoria}
const obtenerCategoria = async(req,res=response)=>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    res.json(categoria);
}

const crearCategoria = async(req,res=response)=>{
    
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDb = await Categoria.findOne({nombre});

    if (categoriaDb) {
        return res.status(400).json({
            msg:`La categoría ${categoriaDb.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario:req.usuario._id
    }

    const categoria = await new Categoria(data);

    //Guardar DB
    await categoria.save();

    res.status(201).json(categoria);
    
}

// actualizarCategoria 
const actualizarCategoria = async(req,res=response)=>{

    const {id} = req.params;
    const {estado,usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});

    res.json(categoria);
}
// borrarCategoria - estado:false
const borrarCategoria = async(req,res=response)=>{

    const {id} = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json( categoriaBorrada );

}


module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}