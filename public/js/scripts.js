function clearForm(){
    document.getElementById('title').value='';
    document.getElementById('description').value='';
    document.getElementById('status').value='';
}

async function submitForm(){
    const title = document.getElementById('title').value; if(title.trim()===""){ alert('Ingrese Titulo'); return false;}
    const description = document.getElementById('description').value; if(description.trim()===""){ alert('Ingrese Description'); return false;}
    const status = document.getElementById('status').checked; 
    const objToDo = {title, description, status}

    const response = await fetch(window.location.href+'todos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objToDo) 
    });

    if(response.status === 200){
        clearForm();
        listarToDos();
    }
}

async function editForm(){
    const id = document.getElementById('id').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').checked;

    const objToDo = {id, title, description, status}

    const response = await fetch(window.location.href+'todos', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objToDo) 
    });

    if(response.status === 200){
        document.getElementById('id').value="";
        document.getElementById('btnCrear').style.display = 'block';
        document.getElementById('btnEditar').style.display = 'none';
        clearForm();
        listarToDos();
    }
}
async function deleteToDo(idToDo){
    const response = await fetch(window.location.href+'todos', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:idToDo}) 
    });

    if(response.status === 200){
        listarToDos();
    }
}
async function completeToDo(idToDo){
    if(!confirm("Seguro de confirmar Tarea?")) return false;
    const response = await fetch(window.location.href+'todos', {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id:idToDo}) 
    });

    if(response.status === 200){
        listarToDos();
    }
}
async function getToDo(idToDo){
    const response = await fetch(window.location.href+'ToDos?id='+idToDo, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
   
    if(response.status === 200){
        
        const {id,title,description,status} = await response.json();
        document.getElementById('btnCrear').style.display = 'none';
        document.getElementById('btnEditar').style.display = 'block';
        document.getElementById('id').value=id;
        document.getElementById('title').value=title;
        document.getElementById('description').value=description;
        document.getElementById('status').checked = (status === 'false') ? false : true;
    }
}


async function listarToDos() {
    const response = await fetch(window.location.href+'todos');
    const objeto = await response.json();
    const listado = document.getElementById('listado');
    let html = '';
    objeto.forEach(element => {
        const btnConfirmar = element.status === false ? `<button onclick="completeToDo('${element.id}')">CONFIRMAR</button>` : '';
        html += `<div class='ToDo'>
            <p>${element.title} - ${element.description} - ${element.status}</p> 
            <div class='botonesForm'>
                <button onclick="getToDo('${element.id}')">EDITAR</button>
                <button onclick="deleteToDo('${element.id}')">DELETE</button>
                ${btnConfirmar}
            </div>
        </div>`;
    });
    listado.innerHTML = html;
} listarToDos()