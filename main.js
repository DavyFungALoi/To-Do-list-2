

/*DOM related things */

const projectcontainer=document.getElementById('project-output')
const projectinputname = document.querySelector('[data-title-project]')
const projectdeletebutton = document.querySelector('[data-delete-project-button')

/*Local Storage */
const LOCAL_STORAGE_LIST_KEY = 'project.lists'
let projectlist= JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []

/* projectlists */

const projectlistFactory = (title) => {
  return {
     title: title,
     id: Date.now().toString(),
     Todolist:[]};
};

function newProject() {
  const projectName = projectinputname.value
  if (projectName == null || projectName === "") return
  const output = projectlistFactory(projectName)
  projectlist.push(output)
  projectinputname.value =null
  saveAndRender() 
}

function render() {
  renderProject()

let selectedList = projectlist.find(projectlist => projectlist.id === selectedListId)
 if (selectedList = null) {
   listContainer.style.display = "none"
   
 }
 else listContainer.style.display = ""
 renderToDoList(selectedList)
 

}

function renderProject() {
  projectcontainer.innerHTML=""
  projectlist.forEach((projectlist) => {
    let projectinfo = document.createElement("li")
    projectinfo.classList.add('projectinfo')
    projectinfo.dataset.listId = projectlist.id
    projectinfo.innerHTML = projectlist.title
    projectcontainer.appendChild(projectinfo)    
 
 
 });
}
projectcontainer.addEventListener('click', e=> {
  if (e.target.tagName.toLowerCase() === 'li') {
      selectedListId = e.target.dataset.listId
      
         
  }
})
projectdeletebutton.addEventListener('click', e => {
  projectlist = projectlist.filter(projectlist => projectlist.id !== selectedListId)
  selectedListId = null
  saveAndRender() 
})

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(projectlist))
}

function saveAndRender() {
  save()
  render()
  

}
renderProject()

/* To-Do-Lists */


/* To-Do-Lists DOM */

let toDoListTitle = document.getElementById("title")
let toDoListdescription = document.getElementById("description")
let toDoListdueDate = document.getElementById("due-date")
const listContainer = document.getElementById("to-do-output")

 const toDoListFactory = (title, description, dueDate, priority) => {
    return {
       title: title,
       description: description,
       dueDate: dueDate,
       priority: priority,
       id: Date.now().toString(),
       };
  };
function getToDoInput() {
    const listName = toDoListTitle.value
    const listDescription = toDoListdescription.value
    const listDueDate = toDoListdueDate.value
    if (listName  == null || listName  === "") return
    const listoutput =  toDoListFactory(listName, listDescription,listDueDate)
    const selectedList = projectlist.find(projectlist => projectlist.id === selectedListId)
    selectedList.Todolist.push(listoutput)
    renderToDoList(selectedList)
      
}
function renderToDoList(selectedList)
 {  listContainer.innerHTML=""
    selectedList.Todolist.forEach((Todolist) => {
    let todoinfo = document.createElement("div")
    todoinfo.classList.add('todoinfo')
    todoinfo.innerHTML= Todolist.title + " " + Todolist.description + " " + Todolist.dueDate
    listContainer.appendChild(todoinfo)
  })
}
  /* renderToDoList()*/


/*
const Todolist = []
function submittodo() {
  document.getElementById("to-do-output").innerHTML=""
    let title = document.getElementById("title").value
    let description = document.getElementById("description").value
    let dueDate = document.getElementById("due-date").value
  Todolist.push(toDoListFactory(title, description, dueDate))
  Todolist.forEach((Todolist, index) => {
    let todoinfo = document.createElement("div")
    todoinfo.classList.add('todoinfo')
    todoinfo.innerHTML= Todolist.title + " " + Todolist.description + " " + Todolist.dueDate
    document.getElementById("to-do-output").appendChild(todoinfo)
    
  });
        
}
*/

