const express=require('express');
const path=require('path');
const session=require('express-session');
const _ = require('./rutas/home');
const login = require('./rutas/login');
const task = require('./rutas/task');
const memoryTask = require('./models/task/methods');
const fs = require('fs');

const app=express();   

/**
 * DB Memory Conection
 */

const dataManager = require('./models/conection');

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