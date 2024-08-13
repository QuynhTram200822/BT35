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
      // const priorityText = event.target.textContent.trim();
      const priorityValue = event.target.getAttribute("data-priority");
      selectedPriority.textContent = priorityValue;
    }
  });
});

//Function Select Due Date
// document.addEventListener("DOMContentLoaded", function () {
//   // Initialize datepicker
//   const datepickerElement = document.getElementById("datepicker");
//   const datepicker = new Datepicker(datepickerElement, {
//     format: "mm/dd/yyyy",
//     autohide: true,
//   });

//   // Add event listener to capture date change
//   datepickerElement.addEventListener("changeDate", function () {
//     // Get the selected date from the datepicker input value
//     const selectedDate = datepickerElement.value;
//     if (selectedDate) {
//       // Format the date
//       const formattedDate = formatDate(new Date(selectedDate));
//       console.log("Formatted Date:", formattedDate);
//       // Update the input field with the formatted date
//       datepickerElement.value = formattedDate;
//     }
//   });

//   // Function to format the date
//   function formatDate(date) {
//     if (!date) return ""; // Handle case where no date is selected
//     const options = { year: "numeric", month: "short", day: "2-digit" };
//     return new Intl.DateTimeFormat("en-US", options).format(date);
//   }
// });

//Function Add Task
let tasks = [];
let idCounter = 1;
function addTask() {
  // event.preventDefault();
  const taskName = document.getElementById("mainTask").value;
  const taskDescription = document.getElementById("mainDescription").value;
  const taskDate = document.getElementById("datepicker").value;
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
    const completedClass = task.isCompleted ? "checked" : ""; // Thêm lớp nếu đã hoàn thành
    const radioboxChecked = task.isCompleted ? "checked" : ""; // Đánh dấu ô kiểm nếu đã hoàn thành

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
                <div class="relative max-w-40">
                    <div class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                        <i class="text-gray-400 me-2 bi bi-calendar-event"></i>
                    </div>
                    <input type="text" value="${task.date}" class="px-2 py-1 text-base text-green-500 bg-transparent border border-gray-400 rounded ps-10 max-w-40 placeholder:text-green-500" placeholder="Today" readonly>
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

  // Re-render the task list to reflect the deletion
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

function addCheckboxEventListeners() {
  tasks.forEach((task) => {
    const markSingle = document.getElementById(`mark-single-${task.id}`);
    markSingle.addEventListener("change", function () {
      task.isCompleted = this.checked;
      renderTaskList();
    });
  });
}
