const toDoTask = document.querySelector(".todo-list");

const txt = document.querySelector(".txt-box");
const add = document.querySelector(".Add-btn");
const clear = document.querySelector(".clear");

let isEdited = false;
let currentText;

const alertMsg = document.querySelector(".msg");

add.addEventListener("click", () => {
  if (txt.value && !isEdited) {
    addTask();
  } else if (txt.value && isEdited) {
    currentText.textContent = txt.value;
    txt.value = "";
    add.value = "Add";
    isEdited = false;
    saveTask();
  } else {
    alertMsg.innerText = "Please Enter Your Task";
    setTimeout(() => {
      alertMsg.innerText = "";
    }, 1000);
  }
});

clear.addEventListener("click", () => {
  toDoTask.innerHTML = "";
  localStorage.clear();
});

function addTask() {
  toDoTask.innerHTML += `
  <div class="d-flex justify-content-between align-items-center border-bottom px-3 task-list">
      <li class="fs-3 px-3 todo-task" >${txt.value}</li>
      <div class="update-btns">
          <i class="fas fa-edit fs-2 edit-btn"></i>
          <i class="fas fa-trash fs-2 del-btn"></i>
          <i class="fas fa-check fs-2 status-btn"></i>
      </div>

</div>`;
  txt.value = "";
  saveTask();
}

toDoTask.addEventListener("click", (e) => {
  if (e.target.classList.contains("del-btn")) {
    delToDo(e);
  }
  if (e.target.classList.contains("edit-btn")) {
    updateToDo(e);
  }
  if (e.target.classList.contains("status-btn")) {
    statusToDo(e);
  }
});

function delToDo(e) {
  e.target.parentElement.parentElement.remove();
  alertMsg.innerText = "Your task delete";
  saveTask();
}

function updateToDo(e) {
  currentText = e.target.parentElement.previousElementSibling;
  txt.value = currentText.textContent;
  isEdited = true;
  add.value = "Update";
}

function statusToDo(e) {
  currentText = e.target.parentElement.previousElementSibling;
  currentText.classList.toggle("strike");
  saveTask();
}

function saveTask() {
  localStorage.setItem("data", toDoTask.innerHTML);
}
function showTask() {
  toDoTask.innerHTML = localStorage.getItem("data");
}
showTask();
