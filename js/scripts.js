// Seleção de elementos
const listTasks = []
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelEditBtn = document.querySelector("#cancel-edit-btn")
const searchInput = document.querySelector("#seach-input")
const eraseBtn = document.querySelector("#erase-button")
const filter = document.querySelector("#filter-select")

// Variáveis auxiliadoras 
let stateSelect 
let oldInputValue

// Funções

const addTask = text =>{
    const task = {
        id:listTasks.length+1,
        nome: text,
        estado: "todo"
    }
    clearTodo()
    listTasks.push(task)
    readList(listTasks)
}

const readList = list =>{
    if(list.length===0){
        clearTodo()
        alert("Não foi inserido nenhum texto")
    }
    list.forEach((task)=>{
        const todo = document.createElement("div")
        todo.classList.add("todo-item")
        if(task.estado==="done"){
            todo.classList.add("done")
        }
        const todoTitle = document.createElement("h3")
        todoTitle.innerText=task.nome
        todo.appendChild(todoTitle)
        const doneBtn = document.createElement("button")
        doneBtn.classList.add("finish-todo")
        doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
        todo.appendChild(doneBtn)
        const editBtn = document.createElement("button")
        editBtn.classList.add("edit-todo")
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
        todo.appendChild(editBtn)
        const removeBtn = document.createElement("button")
        removeBtn.classList.add("remove-todo")
        removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        todo.appendChild(removeBtn)
        todoList.appendChild(todo)
        todoInput.value=""
    })
}

const removeList = (item)=>{
    const index = listTasks.findIndex(obj => obj.nome === item);
    if (index !== -1) {
        listTasks.splice(index, 1);
    }
}

const editName= (newText)=>{
    const itemEdit = listTasks.find(e=>e.nome===oldInputValue)
    itemEdit.nome=newText
}

const editState = (itemState)=>{
    const stateEdit = listTasks.find(item=>item.nome===itemState)
    if(stateEdit.estado==="todo"){
        stateEdit.estado="done"
    } else{
        stateEdit.estado==="todo"
    }
}

const filterTasks = (state)=>{
    console.log("Selecionou FilterTasks")
    if(state==="all"){
        clearTodo()
        console.log("Selecionou ALL")
        readList(listTasks)
    }
    if(state==="todo"){
        console.log("Selecionou TODO")
        clearTodo()
        const tasksTodo = listTasks.filter(item=>item.estado==="todo")
        readList(tasksTodo)
    }
    if(state==="done"){
        console.log("Selecionou DONE")
        clearTodo()
        const tasksDone = listTasks.filter(item=>item.estado==="done")
        readList(tasksDone)
    } else{
        console.log("NADA PEGANDO")
        console.log(state)
    }
} 

const searchForText = (text)=>{
    const listSearch = listTasks.filter(item => {
        return item.nome.includes(text);
    });
    if(listSearch.length>0){
        clearTodo()
        readList(listSearch)
    }else(
        todoList.innerHTML='<p class="no-found">Nenhum elemento encontrado</ps'
    )
}

const toggleForms=()=>{
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const getValue = item =>{
    stateSelect= item.value
}

const clearTodo = ()=>{
    todoList.innerHTML=""
}
// Eventos 
todoForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const inputValue = todoInput.value
    if(inputValue){
        addTask(inputValue)
    }
})

document.addEventListener("click", (e)=>{
    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText
    }
    if(targetEl.classList.contains("finish-todo")){
        todoTitle = parentEl.querySelector("h3").innerText
        parentEl.classList.toggle("done")
        editState(todoTitle,listTasks)
    }
    if(targetEl.classList.contains("remove-todo")){
        todoTitle = parentEl.querySelector("h3").innerText
        parentEl.remove()
        removeList(todoTitle,listTasks)
    }
    if(targetEl.classList.contains("edit-todo")){
        toggleForms()
        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

cancelEditBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    toggleForms()
})

editForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const editInputValue = editInput.value
    if (editInputValue){
        editName(editInputValue,listTasks)
    }
    toggleForms()
    clearTodo()
    readList(listTasks)
})

filter.addEventListener("change",(event)=>{
    getValue(event.target)
    filterTasks(stateSelect)
})

searchInput.addEventListener("keyup",()=>{
    const text = searchInput.value
    searchForText(text)
    searchInput.focus()
})