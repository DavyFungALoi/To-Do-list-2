/*DOM related things */

const projectcontainer = document.getElementById("project-output");
const projectinputname = document.querySelector("[data-title-project]");
const projectdeletebutton = document.querySelector(
  "[data-delete-project-button"
);

let toDoListTitle = document.getElementById("title");
let toDoListdescription = document.getElementById("description");
let toDoListdueDate = document.getElementById("due-date");
const listContainer = document.getElementById("to-do-output");
const listDisplayContainer = document.querySelector("[list-display-container]")

/*Local Storage */
const LOCAL_STORAGE_LIST_KEY = "project.lists";
let projectlist =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

  

/* projectlists */

const projectlistFactory = (title) => {
  return {
    title: title,
    id: Date.now().toString(),
    Todolist: [],
  };
};

function newProject() {
  const projectName = projectinputname.value;
  if (projectName == null || projectName === "") return;
          const output = projectlistFactory(projectName);
  projectlist.push(output);
  projectinputname.value = null;
  saveAndRender();
}

function render() {
  renderProject();
  console.log("hello")
  let selectedList = projectlist.find(
    (projectlist) => projectlist.id === selectedListId
  );
  console.log(selectedList)
  if (selectedList= null) {
    console.log("empty")
    listDisplayContainer.style.display = 'none'
  } else listDisplayContainer.style.display = "";
    clearElement(listContainer)
    renderToDoList(selectedListId)
    
   
}

function renderProject() {
  projectcontainer.innerHTML = "";
  projectlist.forEach((projectlist) => {
    let projectinfo = document.createElement("li");
    projectinfo.classList.add("projectinfo");
    projectinfo.dataset.listId = projectlist.id;
    projectinfo.innerHTML = projectlist.title;
    projectcontainer.appendChild(projectinfo);
  });
}
projectcontainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
      saveAndRender()
    }
});
projectdeletebutton.addEventListener("click", (e) => {
  projectlist = projectlist.filter(
    (projectlist) => projectlist.id !== selectedListId
  );
  selectedListId = null;
  saveAndRender();
});

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(projectlist));
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function saveAndRender() {
  save();
  render();
}
render()

/* To-Do-Lists */


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
  const listName = toDoListTitle.value;
  const listDescription = toDoListdescription.value;
  const listDueDate = toDoListdueDate.value;
  if (listName == null || listName === "") return;
  const listoutput = toDoListFactory(listName, listDescription, listDueDate);
  let selectedList = projectlist.find(
    (projectlist) => projectlist.id === selectedListId
  );
  selectedList.Todolist.push(listoutput);
  renderToDoList(selectedListId);
}
function renderToDoList(selectedListId) {
  let selectedList = projectlist.find(
    (projectlist) => projectlist.id === selectedListId
  )
     selectedList.Todolist.forEach((todo) => {
    let todoinfo = document.createElement("div");
    todoinfo.classList.add("todoinfo");
    todoinfo.innerHTML =
      todo.title + " " + todo.description + " " + todo.dueDate;
    listContainer.appendChild(todoinfo);
  });
}
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}