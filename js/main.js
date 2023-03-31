const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks =[]


if (tasks.leght > 0){
    checkEmptyList()
}



if(localStorage.getItem('tasks')){
    console.log(localStorage.getItem('tasks'));
    console.log(JSON.parse(localStorage.getItem('tasks')))

    tasks = JSON.parse(localStorage.getItem('tasks'))

}

tasks.forEach(function(task){
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'

    const taskHTML =  `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${task.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
</li>`

tasksList.insertAdjacentHTML('beforeend', taskHTML)
})



// checkEmptyList()




form.addEventListener('submit', submitHundler)

function submitHundler(event){
    event.preventDefault()
    

    const taskText = taskInput.value

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }

    tasks.push(newTask)

    saveToLocalStorage()

    console.log(tasks);

    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title'

    const taskHTML =  `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
</li>`

tasksList.insertAdjacentHTML('beforeend', taskHTML)

taskInput.value = ''

taskInput.focus()

checkEmptyList()





}

tasksList.addEventListener('click', deleteTask)

function deleteTask(event){
    if(event.target.dataset.action === 'delete'){
        const parentNode = event.target.closest('.list-group-item')

        const id = Number(parentNode.id)
        
        const index = tasks.findIndex((tasks) => tasks.id === id)

        saveToLocalStorage()

        
        tasks.splice(index, 1)


        parentNode.remove()


    }

checkEmptyList()

}

tasksList.addEventListener('click', doneTask)

function doneTask(event){
    if (event.target.dataset.action === 'done'){
        const parentNode = event.target.closest('.list-group-item')

        const id = Number(parentNode.id)

        const task = tasks.find((task) => task.id === id )
                
            

        task.done = !task.done

        saveToLocalStorage()

        console.log(task);

        const taskTitle = parentNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
    }

}

function checkEmptyList(){
    if (tasks.length === 0){
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li> `
    tasksList.insertAdjacentHTML('afterbegin', emptyListHTML )
    }

    if(tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null
    }
}


function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}



