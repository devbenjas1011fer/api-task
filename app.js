const express=require('express');
const path=require('path');
const session=require('express-session');
const _ = require('./rutas/home_ruta');
const login = require('./rutas/login');
const task = require('./rutas/task');

const app=express();   
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:"cualquier texto",
    resave:true,
    saveUninitialized:true
}));
app.use('/', _); 
app.use('/login', login); 
app.use('/task', task); 

const port=process.env.PORT || 3000 
app.listen(port,()=>{
    console.log("Servidor en el puerto "+port);
});