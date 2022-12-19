const path = require('path');
const express = require('express'); 
const ToDosController = require('./controlleres/todos.controller');
const _PORT = process.env.PORT || 3000

// INSTANCIAR LA CLASE CONTROLADORA - LEER DB JSON
const _ToDosController= new ToDosController();
_ToDosController.leerJSON();
// INICIAR EXPRESS
const app = express(); 

//Servir archivos estaticos de la carpeta public
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/public',express.static('public'));

// Escuchamos en la ruta / -> GET
app.get('/',(req,res)=>{
    res.sendFile(path.resolve('./views/users.view.html'));
})

app.get('/todos',(req,res)=>{
    _ToDosController.leerJSON();
    const json = (req.query?.id) ? _ToDosController.getToDo(req.query.id) : _ToDosController.listar;    
    res.send(json);
})

app.post('/todos',(req,res)=>{
    const {title, description} = req.body;
    _ToDosController.createToDo(title, description);
    res.json({"status":"OK"});
})

app.put('/todos',(req,res)=>{
    const {id, title, description,status} = req.body;
    _ToDosController.editToDo(id, title, description, status);
    res.json({"status":"OK"});
})


app.patch('/todos',(req,res)=>{
    const {id} = req.body;
    _ToDosController.completeToDo(id);
    res.json({"status":"OK"});
})


app.delete('/todos',(req,res)=>{
    const {id} = req.body;
    _ToDosController.deleteToDo(id);
    res.json({"status":"OK"});
})
// ESCUCHAR EN UN PUERTO
app.listen(_PORT,()=>{console.log('Escuchando en ',_PORT);})