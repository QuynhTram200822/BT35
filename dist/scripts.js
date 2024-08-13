// Show form Add Task
const btnAdd = document.querySelector(".button--add-task");
const taskForm = document.querySelector("#task-form");

const addButton = function () {
  taskForm.classList.remove("hidden");
};

//Function Select priority
document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.getElementById("dropdown");
  const selectedPriority = document.getElementById("selectedPriority");

  dropdown.addEventListener("click", function (event) {
    if (event.target && event.target.matches(".dropdown-item")) {
      const priorityValue = event.target.getAttribute("data-priority");
      selectedPriority.textContent = priorityValue;
    }
  });
});

// Function change date follow the format in UI
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

//Function Add Task
let tasks = [];
let idCounter = 1;
function addTask() {
  const taskName = document.getElementById("mainTask").value;
  const taskDescription = document.getElementById("mainDescription").value;
  const taskDate = formatDate(document.getElementById("datepicker").value);
  const taskPriority = document.querySelector("#selectedPriority").innerText;

  let newTask = {
    id: idCounter++,
    name: taskName,
    description: taskDescription,
    date: taskDate,
    priority: taskPriority,
    isCompleted: false,
  };

  tasks.push(newTask);
  console.log(tasks);
  // Add the task
  renderTaskList();

  // Reset the form
  cancelTask();
}

function renderTaskList() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const completedClass = task.isCompleted ? "checked" : ""; // add class "checked" if completed
    const radioboxChecked = task.isCompleted ? "checked" : "";

    const taskHTML = `
    <div class="mx-2 mt-3  ">
    <div class="flex items-start justify-between p-4  ">
        <div class=" " >
            <div class="flex items-start gap-2 ${completedClass} ">
                <input id="checkbox-${task.id}" type="checkbox" class="w-4 h-4 mt-2 bg-gray-100 border-gray-300 rounded focus:ring-0">
                <input  ${radioboxChecked} id="mark-single-${task.id}" type="checkbox" class="w-4 h-4 mt-2 bg-gray-100 border-gray-300 rounded-full focus:ring-0">
              
                <div>
                    <div class="">
                        <input type="text" value="${task.name}" class="border-none block w-full py-1.5 text-sm placeholder:text-gray-400" placeholder="Task name" readonly>
                    </div>
                    <div class="mt-1">
                        <input type="text" value="${task.description}" class="border-none block w-full py-1.5 text-sm placeholder:text-gray-300" placeholder="Description" readonly>
                    </div>
                </div>
            </div>
            <div class="flex gap-3 mt-3">
                <div class="relative ">
                    <div class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                        <i class="text-gray-400 me-2 bi bi-calendar-event"></i>
                    </div>
                    <input type="text" value="${task.date}" class="px-2 py-1 text-base text-green-500 bg-transparent border border-gray-400 rounded ps-10 placeholder:text-green-500" placeholder="Today" readonly>
                    <div class="absolute inset-y-0 flex items-center pointer-events-none end-0 ps-3">
                    <i class="text-gray-400 me-2 bi bi-x-lg"></i>
                  </div>
                </div>
                <button data-dropdown-toggle="dropdown"
                class="items-center w-32 px-2 py-1 text-sm text-center text-gray-400 bg-transparent border border-gray-400 rounded font-base"
                type="button">
                <i class="text-gray-400 me-2 bi bi-flag"></i>
                <span>${task.priority}</span>
              </button>
            </div>
  
        </div>
        <div class="flex items-center ml-auto">
                <button onClick="dropdown(${task.id})" id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots"
                  data-dropdown-offset-distance="-38" data-dropdown-offset-skidding="70"
                  class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded focus:ring-0 focus:outline-none"
                  type="button">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
  
                <!-- Dropdown menu -->
                <div id="dropdownDots" class="z-10 hidden w-32  bg-white divide-y divide-gray-100 rounded shadow">
                  <ul class="m-2 text-sm text-gray-400 " >
                    <li>
                      <a href="#" class="block px-1 py-1 hover:bg-gray-100">Edit</a>
                    </li>
                    <li>
                      <a onClick="showConfirmModal(${task.id})" href="#" class="block px-1 py-1 hover:bg-gray-100">Delete</a>
                    </li>
                  </ul>
                </div>
              </div>
        </div>
    </div>
    <hr class="mt-3 border-t border-gray-300">
  </div>
  `;
    taskList.innerHTML += taskHTML;
  });

  addCheckboxEventListeners();

  cancelTask();
}

function dropdown() {
  const menu = document.getElementById("dropdownDots");
  menu.classList.toggle("hidden");
}

// Handle Cancel button click
function cancelTask() {
  const form = document.getElementById("task-form");
  form.classList.add("hidden");

  document.getElementById("mainTask").value = "";
  document.getElementById("mainDescription").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("selectedPriority").innerText = "Priority";
}

// Function Edit Task

// Function Delete Task
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);

  renderTaskList();
}

function showConfirmModal(taskId) {
  const confirmModal = document.getElementById("confirmModal");
  confirmModal.classList.toggle("hidden");

  // Handle Cancel button click
  let cancelButton = document.getElementById("cancelButton");
  cancelButton.onclick = function () {
    confirmModal.style.display = "none";
  };

  // Handle Delete button click
  let deleteButton = document.getElementById("deleteButton");
  deleteButton.onclick = function () {
    deleteTask(taskId);
    confirmModal.style.display = "none";
  };
}

// Function mark completed
function addCheckboxEventListeners() {
  tasks.forEach((task) => {
    const markSingle = document.getElementById(`mark-single-${task.id}`);
    markSingle.addEventListener("change", function () {
      task.isCompleted = this.checked;
      renderTaskList();
    });
  });
}
