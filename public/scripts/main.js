const root = document.getElementById('root');
const url = "http://localhost:7000";

function fetchTodos() {
    fetch(`${url}/api/todos`)
        .then(response => response.json())
        .then(todos => {

            let divs =  renderTodos(todos);
            divs.forEach((div) => {
                document.getElementById('root').appendChild(div);
            })
        });

}

function deleteTodo(id){
    fetch(`${url}/api/todos/${id}`,{method:"DELETE"} )
    .then( todos => {
        document.getElementById(`item${id}`).remove();
    })
    .catch(error => console.log(error))
}

function createTodo(){
   let  todoinput = document.getElementById('todoinput');

    fetch(`${url}/api/todos`,
     { headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
         method :"POST", 
         
         body: JSON.stringify({todo: `${todoinput.value}`})})
         .then(response => response.json())
        .then(todoitem => {
        let div =  renderTodo(todoitem);
         document.getElementById('root').appendChild(div);
    })
}


function editTodo(id){
    let edit = document.getElementById(`edit${ id }`);
    
    if (edit.textContent === 'Edit') {
        let p = document.getElementById(`todoitem${id}`)  
        let todo = p.innerText;
        p.remove();
        let input = document.createElement(`input`);
        input.id = `input${id}`
        edit.textContent = 'Save';
        document.getElementById(`item${id}`).prepend(input);
        input.value = todo;
    } else {
        let input = document.getElementById(`input${id}`);

        fetch(`${url}/api/todos/${id}`,
        { headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
             method :"PUT", 
             
             body: JSON.stringify({todo: `${input.value}`})})
             .then( () => {
                let input = document.getElementById(`input${id}`);
                let p = document.createElement('p');
                p.id = `todoitem${id}`;
                p.innerText = input.value;
                input.remove();
                document.getElementById(`item${id}`).prepend(p)
                edit.textContent = 'Edit';
                
             }
                 
             )
             .catch(error => console.log(error));

             
        }
    }
    


function renderTodo({todo, _id}) {
    const id = _id;
    let p = document.createElement('P');
    p.id = `todoitem${id}`
    let node = document.createTextNode(`${todo}`);
    p.appendChild(node);
    let btnd = document.createElement('BUTTON');
    btnd.textContent = 'Delete';
    btnd.onclick = () => deleteTodo(id);
    let btne = document.createElement('BUTTON');
    btne.textContent = 'Edit';
    btne.id = `edit${id}`
    btne.onclick = () => editTodo(id);
    const div = document.createElement('div');
    div.id = `item${id}`;
    div.appendChild(p);
    div.appendChild(btne);
    div.appendChild(btnd);
    return div;
}

function renderTodos(todos) {
    const todosElements = todos.map((todo) => {
      return renderTodo(todo)
    });
    return todosElements;
}





window.onload = function() {
    let create = document.getElementById('create');
    create.onclick = createTodo;
    fetchTodos();
};