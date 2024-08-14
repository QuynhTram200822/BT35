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
    const completedClass = task.isCompleted ? "checked" : "";
    const radioboxChecked = task.isCompleted ? "checked" : "";

    const taskHTML = `
      <div id="edit-form-${task.id}" class="mx-2 mt-3 edit-form">
        <div class="flex items-start justify-between p-4">
          <div>
            <div class="flex items-start gap-2 ${completedClass}">
              <input id="checkbox-${task.id}" type="checkbox" class="w-4 h-4 mt-2 bg-gray-100 border-gray-300 rounded focus:ring-0">
              <input ${radioboxChecked} id="mark-single-${task.id}" type="checkbox" class="w-4 h-4 mt-2 bg-gray-100 border-gray-300 rounded-full focus:ring-0">
              <div>
                <div>
                  <input id="task-name-${task.id}" type="text" value="${task.name}" class="border-none block w-full py-1.5 text-sm placeholder:text-gray-400" placeholder="Task name" readonly>
                </div>
                <div class="mt-1">
                  <input id="task-description-${task.id}" type="text" value="${task.description}" class="border-none block w-full py-1.5 text-sm placeholder:text-gray-300" placeholder="Description" readonly>
                </div>
              </div>
            </div>
            <div class="flex gap-3 ms-3">
              <!-- Date Picker -->
              <div class="relative mt-3">
                <div class="absolute flex items-center pointer-events-none start-0 ps-3">
                  <i class="text-gray-400 me-2 bi bi-calendar-event"></i>
                </div>
                <input id="task-date-${task.id}" type="text" value="${task.date}" class=" datepicker px-2 py-1 text-base text-green-500 bg-transparent border border-gray-400 rounded ps-10 placeholder:text-green-500">
                <div class="absolute inset-y-2 flex items-center pointer-events-none end-0 ps-3">
                  <i class="text-gray-400 me-2 bi bi-x-lg"></i>
                </div>
              </div>
              <!-- Priority -->
              <button id="dropdownButton-${task.id}" data-dropdown-toggle="dropdown-${task.id}"
                class="items-center w-32 px-2 py-1 mt-3 text-sm text-center text-gray-400 bg-transparent border border-gray-400 rounded font-base"
                type="button">
                <i class="text-gray-400 me-2 bi bi-flag"></i>
                <span>${task.priority}</span>
              </button>
              <!--Priority Dropdown menu -->
              <div id="dropdown-${task.id}" class="z-10 hidden bg-white  divide-gray-100 rounded shadow w-44">
                <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownButton-${task.id}">
                  <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P1"><i class="text-red-500 me-2 bi bi-flag-fill"></i>Priority 1</a></li>
                  <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P2"><i class="text-orange-500 me-2 bi bi-flag-fill"></i>Priority 2</a></li>
                  <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P3"><i class="text-blue-500 me-2 bi bi-flag-fill"></i>Priority 3</a></li>
                  <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P4"><i class="text-green-500 me-2 bi bi-flag-fill"></i>Priority 4</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="flex items-center ml-auto">
            <button onClick="dropdown(${task.id})" id="dropdownMenuIconButton-${task.id}" data-dropdown-toggle="dropdownDots-${task.id}"
              data-dropdown-offset-distance="-38" data-dropdown-offset-skidding="70"
              class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded focus:ring-0 focus:outline-none" type="button">
              <i class="bi bi-three-dots-vertical"></i>
            </button>
            <!-- Dropdown menu -->
            <div id="dropdownDots-${task.id}" class="z-10 hidden w-32 bg-white divide-y divide-gray-100 rounded shadow">
              <ul class="m-2 text-sm text-gray-400">
                <li><a href="#" class="block px-1 py-1 hover:bg-gray-100">Edit</a></li>
                <li><a onClick="showConfirmModal(${task.id})" href="#" class="block px-1 py-1 hover:bg-gray-100">Delete</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr class="mt-3 border-t border-gray-300">
        <div id="edit-buttons-${task.id}" class="mt-3 flex justify-end gap-3 end-0 edit-buttons hidden">
          <button onClick="cancelEdit(${task.id})" class="px-4 py-2 font-bold text-white bg-gray-400 rounded-lg">Cancel</button>
          <button onClick="saveTask(${task.id})" class="px-4 py-2 font-bold text-white bg-teal-300 rounded-lg">Save</button>
        </div>
      </div>
    `;
    taskList.innerHTML += taskHTML;

    // Initialize datepicker
    // const datepickerElement = document.getElementById(`task-date-${task.id}`);
    // if (datepickerElement) {
    //   // Initialize your datepicker library if needed
    //   // e.g., $(datepickerElement).datepicker();
    //
  });

  addCheckboxEventListeners();
  cancelTask();
  addEditForm();
}

function addEditForm() {
  const editForms = document.querySelectorAll(".edit-form");

  editForms.forEach((form) => {
    form.addEventListener("dblclick", () => {
      const editButtons = form.querySelector(".edit-buttons");
      const taskNameInput = form.querySelector('input[id^="task-name-"]');
      const taskDescriptionInput = form.querySelector(
        'input[id^="task-description-"]'
      );
      const taskDateInput = form.querySelector('input[id^="task-date-"]');
      const dropdownButton = form.querySelector(
        '[data-dropdown-toggle^="dropdown-"]'
      );

      if (editButtons) {
        editButtons.classList.remove("hidden");

        if (taskNameInput) taskNameInput.removeAttribute("readonly");
        if (taskDescriptionInput)
          taskDescriptionInput.removeAttribute("readonly");

        // Add event listener to handle date change
        if (taskDateInput) {
          taskDateInput.addEventListener("change", (event) => {
            const newDate = formatDate(event.target.value);
            const taskId = form.id.split("-").pop();
            const task = tasks.find((task) => task.id == taskId);
            if (task) task.date = newDate;
          });
        }

        // Show dropdown and update priority
        if (dropdownButton) {
          dropdownButton.addEventListener("click", () => {
            const dropdownMenu = document.getElementById(
              `dropdown-${form.id.split("-").pop()}`
            );
            if (dropdownMenu) {
              dropdownMenu.classList.toggle("hidden");
            }
          });
        }

        const dropdownItems = form.querySelectorAll(".dropdown-item");
        dropdownItems.forEach((item) => {
          item.addEventListener("click", (event) => {
            const newPriority = event.target.getAttribute("data-priority");
            const taskId = form.id.split("-").pop();
            const task = tasks.find((task) => task.id == taskId);
            if (task) {
              task.priority = newPriority;
              form.querySelector(
                '[data-dropdown-toggle^="dropdown-"] span'
              ).textContent = newPriority;
            }
          });
        });
      }
    });
  });
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

function dropdown() {
  const menu = document.getElementById("dropdownDots");
  menu.classList.toggle("hidden");
}

// Function Edit Task
function enableEditMode(taskId) {
  const form = document.getElementById(`edit-form-${taskId}`);
  const inputs = form.querySelectorAll('input[type="text"]');
  const editButtons = form.querySelector(".edit-buttons");

  // Enable editing for inputs
  inputs.forEach((input) => input.removeAttribute("readonly"));

  // Show the Save and Cancel buttons
  editButtons.classList.remove("hidden");
}

function saveTask(taskId) {
  const form = document.getElementById(`edit-form-${taskId}`);
  const inputs = form.querySelectorAll('input[type="text"]');
  const editButtons = form.querySelector(".edit-buttons");

  // Save the updated values
  const updatedTask = {
    id: taskId,
    name: inputs[0].value,
    description: inputs[1].value,
    date: inputs[2].value,
    priority: form.querySelector("button span").textContent,
  };

  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = updatedTask;
  }
  // Disable editing and hide buttons
  inputs.forEach((input) => input.setAttribute("readonly", "readonly"));
  editButtons.classList.add("hidden");

  renderTaskList();
}

function cancelEdit(taskId) {
  const form = document.getElementById(`edit-form-${taskId}`);
  const inputs = form.querySelectorAll('input[type="text"]');
  const editButtons = form.querySelector(".edit-buttons");

  // Disable editing and hide buttons
  inputs.forEach((input) => input.setAttribute("readonly", "readonly"));
  editButtons.classList.add("hidden");
}

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
