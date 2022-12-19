const fs = require('fs');
const ToDo = require('../models/todo.model');
const {leerDB,guardarDB} = require('../helpers/opDB'); 

class ToDosController{
    listado = {};
    constructor(){
        this.listado = {};
    }
    get listar(){
        return Object.keys(this.listado).map((element)=>{
            return this.listado[element];
        })
    }
    leerJSON(){
        const arrayToDos = leerDB();
        arrayToDos.forEach(element => {
            this.listado[element.id] = element;
        });
    }
    getToDo(id){
        return this.listado[id];
    }
    createToDo(title, description){
        const newToDo = new ToDo(title, description);
        const arrayToDos = leerDB();
        arrayToDos.push(newToDo);
        guardarDB(arrayToDos);
    }
    editToDo(id,title, description,status){
        this.listado[id].title = title;
        this.listado[id].description = description;
        this.listado[id].status = status;
        guardarDB(this.listar);
    }
    completeToDo(id){
        this.listado[id].status = true;
        guardarDB(this.listar);
    }
    deleteToDo(id){
        delete this.listado[id];
        guardarDB(this.listar);
    }
}

module.exports = ToDosController;