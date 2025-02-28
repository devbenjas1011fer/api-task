const express=require('express');
const ruta=express.Router(); 
ruta.get('/',(_req, res)=>{
    res.send("V1.0.0");
});  

module.exports=ruta;