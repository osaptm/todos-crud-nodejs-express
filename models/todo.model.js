const { v4: uuidv4 } = require('uuid');

class ToDo{
    id = '';
    title = '';
    description = '';
    status = '';
    constructor(title, description){
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.status = false
    }
}

module.exports = ToDo;