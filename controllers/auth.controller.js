const { response } = require("express");

const login = (req,res = response)=>{
    res.json({msg:ok});
}

module.exports={login}