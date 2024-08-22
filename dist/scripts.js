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
let currentEditTaskId = null;
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

  renderTaskList();
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
                <div class="absolute inset-y-2 flex items-center pointer-events-none start-0 ps-3">
                  <i class="text-gray-400 me-2 bi bi-calendar-event"></i>
                </div>
                <input id="task-date-${task.id}" datepicker datepicker-autohide datepicker-format="mm/dd/yyyy" type="text" value="${task.date}" class=" datepicker px-2 py-1 text-base text-green-500 bg-transparent border border-gray-400 rounded ps-10 placeholder:text-green-500">
                <div class="absolute inset-y-2 flex items-center pointer-events-none end-0 ps-3">
                  <i class="text-gray-400 me-2 bi bi-x-lg"></i>
                </div>
              </div>
              <!-- Priority -->
              <div class="flex relative items-center ">
              <button id="dropdownButton-${task.id}" data-dropdown-toggle="dropdown-${task.id}" 
                class="items-center inline-flex  w-32 px-2 py-1 mt-3 text-sm text-center text-gray-400 bg-transparent border border-gray-400 rounded font-base"
                type="button">
                <i class="text-gray-400 me-2 bi bi-flag"></i>
                <span id="task-priority-display-${task.id}">${task.priority}</span>
              </button>
              <!--Priority Dropdown menu -->
              <div id="dropdown-${task.id}" class="z-10 right-full hidden bg-white divide-gray-100 rounded shadow absolute top-11 w-44 left-0">
                <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownButton-${task.id}">
                  <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P1"><i class="text-red-500 me-2 bi bi-flag-fill"></i>Priority 1</a></li>
                  <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P2"><i class="text-orange-500 me-2 bi bi-flag-fill"></i>Priority 2</a></li>
                  <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P3"><i class="text-blue-500 me-2 bi bi-flag-fill"></i>Priority 3</a></li>
                  <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P4"><i class="text-green-500 me-2 bi bi-flag-fill"></i>Priority 4</a></li>
                </ul>
              </div>
              </div>
            </div>
          </div>
          <div class="flex relative items-center ml-auto ">
            <button onclick="dropdown(${task.id})
            "data-dropdown-toggle="dropdownDots-${task.id}" 
              class="z-10 inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded focus:ring-0 focus:outline-none" type="button">
              <i class="bi bi-three-dots-vertical"></i>
            </button>
            <!-- Dropdown menu -->
            <div id="dropdownDots-${task.id}" class="hidden w-32 bg-white divide-y divide-gray-100 rounded shadow absolute end-0 top-7">
              <ul class="m-2 text-sm text-gray-400">
                <li><a onClick="showEditModal(${task.id})" href="#" class="block px-1 py-1 hover:bg-gray-100">Edit</a></li>
                <li><a onClick="showConfirmModal(${task.id})" href="#" class="block px-1 py-1 hover:bg-gray-100">Delete</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr class="mt-3 border-t border-gray-300">
        <div id="edit-buttons-${task.id}" class="mt-3 flex justify-end gap-3 end-0 edit-buttons hidden">
          <button onClick="cancelTask(${task.id})" class="px-4 py-2 font-bold text-white bg-gray-400 rounded-lg">Cancel</button>
          <button onClick="saveTask(${task.id})" class="px-4 py-2 font-bold text-white bg-teal-300 rounded-lg">Save</button>
        </div>
      </div>
    `;
    taskList.innerHTML += taskHTML;
  });

  addCheckboxEventListeners();
  cancelTask();
  addEditForm();
}

//Function update name, description MAIN TASK in edit modal
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("modal-task-name");
  const descriptionInput = document.getElementById("modal-task-description");

  if (nameInput && descriptionInput) {
    nameInput.addEventListener("change", (e) => {
      const newNameValue = e.target.value;

      tasks = tasks.map((task) => ({
        ...task,
        name: task.id === currentEditTaskId ? newNameValue : task.name,
      }));
      renderTaskList();
    });

    descriptionInput.addEventListener("change", (e) => {
      const newDescriptionValue = e.target.value;

      tasks = tasks.map((task) => ({
        ...task,
        description:
          task.id === currentEditTaskId
            ? newDescriptionValue
            : task.description,
      }));
      renderTaskList();
    });
  }
});

// Update Priority for MAIN TASK in modal edit
document.querySelectorAll("#dropdownEditForm a").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    const priority = e.target.dataset.priority;

    const priorityMap = {
      P1: "P1",
      P2: "P2",
      P3: "P3",
      P4: "P4",
    };

    const modalPriorityElement = document.getElementById("modal-task-priority");
    modalPriorityElement.textContent = priorityMap[priority] || "Priority";

    tasks = tasks.map((task) => ({
      ...task,
      priority:
        task.id === currentEditTaskId
          ? modalPriorityElement.textContent
          : task.priority,
    }));
    renderTaskList();
  });
});

// // Function edit due day in modal edit
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("modal-task-due-date")
    .addEventListener("changeDate", function (event) {
      const selectedDate = formatDate(event.target.value);

      tasks = tasks.map((task) => ({
        ...task,
        date: task.id === currentEditTaskId ? selectedDate : task.date,
      }));
      renderTaskList();
    });
});

// Double click to EDIT SUBTASK
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

// Handle Cancel button when Add Task click
function cancelTask() {
  const form = document.getElementById("task-form");
  form.classList.add("hidden");

  document.getElementById("mainTask").value = "";
  document.getElementById("mainDescription").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("selectedPriority").innerText = "Priority";
}

// Show option Edit or Delete
function dropdown(taskId) {
  const menu = document.getElementById(`dropdownDots-${taskId}`);
  menu.classList.toggle("hidden");
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
// FUNCTION NOT YET COMPLETE
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

//  Function Show Confirm Delete Modal
function showConfirmModal(taskId) {
  const confirmModal = document.getElementById("confirmModal");
  let EditForm = document.getElementById("crud-modal");

  confirmModal.classList.remove("hidden");

  // Handle Cancel button click
  let cancelButton = document.getElementById("cancelButton");
  cancelButton.onclick = function () {
    confirmModal.classList.add("hidden");
  };

  // Handle Delete button click
  let deleteButton = document.getElementById("deleteButton");
  deleteButton.onclick = function () {
    deleteTask(taskId);
    confirmModal.classList.add("hidden");
    EditForm.classList.add("hidden");
  };
}

//  Function Show Edit Modal
function showEditModal(taskId) {
  currentEditTaskId = taskId;
  let EditForm = document.getElementById("crud-modal");
  EditForm.classList.remove("hidden");

  // Handle Close button click in Edit Form
  let closeEditForm = document.getElementById("closeEditForm");
  closeEditForm.onclick = function () {
    EditForm.classList.add("hidden");
  };

  // Handle Delete button click
  let delTask = document.getElementById("Del-task");
  delTask.onclick = function () {
    showConfirmModal(taskId);
  };

  // Get MAINTASK value in Modal Edit
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return;

  document.getElementById("modal-task-name").value = task.name;
  document.getElementById("modal-task-description").value = task.description;
  document.getElementById("modal-task-due-date").value = task.date;

  // Set priority
  const priorityElement = document.getElementById("modal-task-priority");
  priorityElement.textContent = `P${task.priority.charAt(1)}`;
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

document.getElementById("text").innerText = document.title;

// SUBTASK

// Add Subtask
let subTasks = [];
let id = 1;
function addSubtask(event) {
  event.preventDefault();
  const subtaskName = document.getElementById("subTask").value;
  const subtaskDescription = document.getElementById("subDescription").value;
  const subtaskDate = formatDate(
    document.getElementById("datepicker-sub").value
  );
  const subtaskPriority = document.getElementById("subPriority").innerText;

  let newSubtask = {
    id: id++,
    name: subtaskName,
    description: subtaskDescription,
    date: subtaskDate,
    priority: subtaskPriority,
    isCompleted: false,
  };

  subTasks.push(newSubtask);
  console.log(subTasks);

  // Add the subtask
  renderSubtasks();
  // // Reset the form
  cancelSubtask();
}

// Function Show SubTask in Edit Form
function renderSubtasks() {
  const subtaskList = document.getElementById("subtaskList");
  subtaskList.innerHTML = "";

  subTasks.forEach((subtask) => {
    const completedClass = subtask.isCompleted ? "checked" : "";
    const subtaskChecked = subtask.isCompleted ? "checked" : "";
    const subtaskHTML = `
      <div id="subTask-${subtask.id}" class="flex ps-10 mb-2 subTask">
      <div class=" items-start gap-2 ">
      <div class="flex ${completedClass}">
      <input ${subtaskChecked} id="mark-${subtask.id}" type="checkbox" class="w-4 h-4 mt-2 bg-gray-100 border-gray-300 rounded-full focus:ring-0">
      <div>
        <div>
        <input id="subtask-name-${subtask.id}" type="text" value="${subtask.name}" class="border-none block w-full py-1.5 text-sm placeholder:text-gray-400" placeholder="Subtask name" readonly>
        </div>
      <div class="mt-1">
      <input id="subtask-description-${subtask.id}" type="text" value="${subtask.description}" class="border-none block w-full py-1.5 text-sm placeholder:text-gray-300" placeholder="Subtask Description" readonly>
    </div>
    </div>
    </div>
    <div class="flex gap-3 ms-3">
    <!-- Date Picker -->
    <div class="relative mt-3">
      <div class="absolute inset-y-2 flex items-center pointer-events-none start-0 ps-3">
        <i class="text-gray-400 me-2 bi bi-calendar-event"></i>
      </div>
      <input id="subtask-date-${subtask.id}" datepicker datepicker-autohide datepicker-format="mm/dd/yyyy" type="text" value="${subtask.date}" class=" datepicker px-2 py-1 text-base text-green-500 bg-transparent border border-gray-400 rounded ps-10 placeholder:text-green-500">
      <div class="absolute inset-y-2 flex items-center pointer-events-none end-0 ps-3">
        <i class="text-gray-400 me-2 bi bi-x-lg"></i>
      </div>
    </div>
    <!-- Priority -->
    <div class="flex relative items-center ">
    <button id="subdropdownButton-${subtask.id}" data-dropdown-toggle="dropdownSub-${subtask.id}" 
      class="items-center inline-flex  w-32 px-2 py-1 mt-3 text-sm text-center text-gray-400 bg-transparent border border-gray-400 rounded font-base"
      type="button">
      <i class="text-gray-400 me-2 bi bi-flag"></i>
      <span>${subtask.priority}</span>
    </button>
    <!--Priority Dropdown menu -->
    <div id="dropdownSub-${subtask.id}" class="z-10 right-full hidden bg-white divide-gray-100 rounded shadow absolute top-11 w-44 left-0">
      <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownButton-${subtask.id}">
        <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P1"><i class="text-red-500 me-2 bi bi-flag-fill"></i>Priority 1</a></li>
        <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P2"><i class="text-orange-500 me-2 bi bi-flag-fill"></i>Priority 2</a></li>
        <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P3"><i class="text-blue-500 me-2 bi bi-flag-fill"></i>Priority 3</a></li>
        <li><a href="#" class="block px-4 py-1 dropdown-item" data-priority="P4"><i class="text-green-500 me-2 bi bi-flag-fill"></i>Priority 4</a></li>
      </ul>
    </div>
    </div>
   
  </div>
  </div>
  <button onclick="deleteSubtask(${subtask.id})" type="button" 
  class="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto">
  <i class="text-red-600 bi bi-x-circle"></i>
</button>
      </div>
      <hr class="mt-3 border-t border-gray-300">

      <div id="editSub-buttons-${subtask.id}" class="mt-3 flex justify-end gap-3 end-0 editSub-buttons hidden">
          <button onclick="cancelEdit(${subtask.id})" class="px-4 py-2 font-bold text-white bg-gray-400 rounded-lg" type="button">Cancel</button>
          <button onclick="saveEdit(${subtask.id})" class="px-4 py-2 font-bold text-white bg-teal-300 rounded-lg" >Save</button>
        </div>
    </div>
    `;
    subtaskList.innerHTML += subtaskHTML;
  });

  markSubTaskCompleted();
  addEditSubtask();
}

// Function mark SUBTASK completed
function markSubTaskCompleted() {
  subTasks.forEach((subtask) => {
    const markCompleted = document.getElementById(`mark-${subtask.id}`);
    markCompleted.addEventListener("change", function () {
      subtask.isCompleted = this.checked;
      renderTaskList();
    });
  });
}

// Handle when clicking on CANCEL button in EDIT form
function cancelSubtask() {
  document.getElementById("subTask").value = "";
  document.getElementById("subDescription").value = "";
  document.getElementById("datepicker-sub").value = "";
  document.getElementById("subPriority").innerText = "Priority";
}

// Function Delete Subtask
function deleteSubtask(subtaskId) {
  subTasks = subTasks.filter((subtask) => subtask.id !== subtaskId);

  renderSubtasks();
}

// Dropdown priority for subtask
document.addEventListener("DOMContentLoaded", function () {
  const subDropdown = document.getElementById("sub-dropdown");
  const selectedPrioritySub = document.getElementById("subPriority");

  subDropdown.addEventListener("click", function (event) {
    if (event.target && event.target.matches(".dropdown-item")) {
      const priorityValue = event.target.getAttribute("data-priority");
      selectedPrioritySub.textContent = priorityValue;

      subDropdown.classList.add("hidden");
    }
  });
});

// Handle when clicked on Cancel Edit SUBTASK
function cancelEdit(subtaskId) {
  // Find the subtask element and edit buttons
  const subtaskElement = document.getElementById(`subTask-${subtaskId}`);
  const editButtons = document.getElementById(`editSub-buttons-${subtaskId}`);

  // Restore the original values of the subtask
  const originalSubtask = subTasks.find((subtask) => subtask.id === subtaskId);

  subtaskElement.querySelector(`#subtask-name-${subtaskId}`).value =
    originalSubtask.name;
  subtaskElement.querySelector(`#subtask-description-${subtaskId}`).value =
    originalSubtask.description;
  subtaskElement.querySelector(`#subtask-date-${subtaskId}`).value =
    originalSubtask.date;
  subtaskElement.querySelector(
    `#subdropdownButton-${subtaskId} span`
  ).textContent = originalSubtask.priority;

  // Hide the edit buttons and set inputs back to read-only
  editButtons.classList.add("hidden");
  subtaskElement.querySelectorAll("input").forEach((input) => {
    input.setAttribute("readonly", "readonly");
  });
}

// Handle when clicked on Save Edit SUBTASK
function saveEdit(subtaskId) {
  // Find the subtask element and edit buttons
  const subtaskElement = document.getElementById(`subTask-${subtaskId}`);
  const editButtons = document.getElementById(`editSub-buttons-${subtaskId}`);

  // Retrieve the updated values from the subtask element
  const nameInput = subtaskElement.querySelector(`#subtask-name-${subtaskId}`);
  const descriptionInput = subtaskElement.querySelector(
    `#subtask-description-${subtaskId}`
  );
  const dateInput = subtaskElement.querySelector(`#subtask-date-${subtaskId}`);
  const prioritySpan = subtaskElement.querySelector(
    `#subdropdownButton-${subtaskId} span`
  );

  const updatedName = nameInput.value;
  const updatedDescription = descriptionInput.value;
  const updatedDate = dateInput.value;
  const updatedPriority = prioritySpan.textContent;

  // Find the index of the subtask in the subTasks array
  const subtaskIndex = subTasks.findIndex((task) => task.id === subtaskId);

  // Update the subtask in the array
  if (subtaskIndex !== -1) {
    subTasks[subtaskIndex].name = updatedName;
    subTasks[subtaskIndex].description = updatedDescription;
    subTasks[subtaskIndex].date = updatedDate;
    subTasks[subtaskIndex].priority = updatedPriority;
  }

  // Hide the edit buttons
  editButtons.classList.add("hidden");

  // Set inputs back to read-only mode
  subtaskElement.querySelectorAll("input").forEach((input) => {
    input.setAttribute("readonly", "readonly");
  });

  renderSubtasks();
}

// function Edit SUBTASK
function addEditSubtask() {
  const editSub = document.querySelectorAll(".subTask");

  editSub.forEach((form) => {
    form.addEventListener("dblclick", (event) => {
      event.preventDefault();

      const editSubButtons = document.querySelector(".editSub-buttons");
      const subtaskNameInput = form.querySelector('input[id^="subtask-name-"]');
      const subtaskDescriptionInput = form.querySelector(
        'input[id^="subtask-description-"]'
      );
      const taskDateInput = form.querySelector('input[id^="subtask-date-"]');
      const dropdownButton = form.querySelector(
        '[data-dropdown-toggle^="dropdownSub-"]'
      );
      const dropdownMenu = document.getElementById(
        `dropdown-${form.id.split("-").pop()}`
      );

      if (editSubButtons) {
        editSubButtons.classList.remove("hidden");

        if (subtaskNameInput) subtaskNameInput.removeAttribute("readonly");
        if (subtaskDescriptionInput)
          subtaskDescriptionInput.removeAttribute("readonly");

        // Add event listener to handle date change
        if (taskDateInput) {
          taskDateInput.addEventListener("change", (event) => {
            const newDate = formatDate(event.target.value);
            const subtaskId = form.id.split("-").pop();
            const subtask = subTasks.find((subtask) => subtask.id == subtaskId);
            if (subtask) subtask.date = newDate;
          });
        }

        // Show dropdown and update priority
        if (dropdownButton) {
          dropdownButton.addEventListener("click", () => {
            if (dropdownMenu) {
              dropdownMenu.classList.toggle("hidden");
            }
          });
        }

        const dropdownItems = document.querySelectorAll(".dropdown-item");
        dropdownItems.forEach((item) => {
          item.addEventListener("click", (event) => {
            const newPriority = event.target.getAttribute("data-priority");
            const subtaskId = form.id.split("-").pop();
            const subtask = subTasks.find((subtask) => subtask.id == subtaskId);
            if (subtask) {
              subtask.priority = newPriority;
              const prioritySpan = form.querySelector(
                '[data-dropdown-toggle^="dropdownSub-"] span'
              );
              if (prioritySpan) {
                prioritySpan.textContent = newPriority;
              }
              if (dropdownMenu) {
                dropdownMenu.classList.add("hidden");
              }
            }
          });
        });
      }
    });
  });
}
