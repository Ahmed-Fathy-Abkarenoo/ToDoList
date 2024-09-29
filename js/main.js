let toDo = document.querySelector(".todoInput");
let addBtn = document.querySelector(".addBtn");
let today = document.querySelector("#today");
let tomorrow = document.querySelector("#tomorrow");
let todayList = document.querySelector("#todayList");
let tomorrowList = document.querySelector("#tomorrowList");
let selectedAllToday = document.querySelector("#selectedAllToday");
let selectedAllTomorrow = document.querySelector("#selectedAllTomorrow");

let todayBtns = document.querySelector(".today-btns");
let tomorrowBtns = document.querySelector(".tomorrow-btns");
let deleteTodayToDos = todayBtns.firstElementChild;
let deleteTomorrowToDos = tomorrowBtns.firstElementChild;

let toDoListToday = JSON.parse(localStorage.getItem("toDoListToday")) ?? [];
displayToDoToday(toDoListToday);

let toDoListTomorrow =
  JSON.parse(localStorage.getItem("toDoListTomorrow")) ?? [];
displayToDoTomorrow(toDoListTomorrow);

addBtn.addEventListener("click", () => {
  if (today.checked) {
    getToDo();
    clearInput();
    storeToDo(toDoListToday);
    today.checked = false;
  } else if (tomorrow.checked) {
    getToDo();
    clearInput();
    storeToDo(toDoListTomorrow);
    tomorrow.checked = false;
  } else {
    alert("Please select a day");
  }
});

deleteTodayToDos.addEventListener("click", () => {
  let todayChildern = [...todayBtns.children];

  localStorage.removeItem("toDoListToday");
  todayList.innerHTML = "";
  toDoListToday = [];

  selectedAllToday.checked = false;

  todayChildern.forEach((child) => {
    child.disabled = true;
  });
});

deleteTomorrowToDos.addEventListener("click", () => {
  let tomorrowChildern = [...tomorrowBtns.children];

  localStorage.removeItem("toDoListTomorrow");
  tomorrowList.innerHTML = "";
  toDoListTomorrow = [];

  selectedAllTomorrow.checked = false;

  tomorrowChildern.forEach((child) => {
    child.disabled = true;
  });
});

function getToDo() {
  let toDoContent;
  toDoContent = toDo.value;
  if (today.checked) {
    toDoListToday.push(toDoContent);
  } else if (tomorrow.checked) {
    toDoListTomorrow.push(toDoContent);
  }
}

function clearInput() {
  toDo.value = "";
}

function storeToDo(arr) {
  if (today.checked) {
    localStorage.setItem("toDoListToday", JSON.stringify(arr));
    displayToDoToday(arr);
  } else if (tomorrow.checked) {
    localStorage.setItem("toDoListTomorrow", JSON.stringify(arr));
    displayToDoTomorrow(arr);
  }
}

function displayToDoToday(arr) {
  let toDoBox = "";

  for (let i = 0; i < arr.length; i++) {
    toDoBox += `    
              <div
                class="todo d-flex justify-content-between align-items-center shadow-lg border rounded-2 border-danger px-1">
               <div class="d-flex align-items-center justify-content-center gap-2">
                <input type="checkbox" name="todayToDo"  class="todo-selector-today todo-selector"/>
                <p class="todo-today-text text-white mt-3" --data-index="${i}"> ${arr[i]}</p>
               </div>
                <div class="icons" --data-todo-date="todayToDo" --data-index="${i}">
                  <i class="fa-solid fa-check text-success me-3"></i>
                  <i class="fa fa-trash text-danger me-3"></i>
                </div>
              </div>`;
  }
  todayList.innerHTML = toDoBox;

  selectAllToDo();
  deletToDo();
  toDoDone();
}

function displayToDoTomorrow(arr) {
  let toDoBox = "";

  for (let i = 0; i < arr.length; i++) {
    toDoBox += `    
            <div
              class="todo d-flex justify-content-between align-items-center bg-info shadow-lg border rounded-2 px-1">
              <div class="d-flex align-items-center justify-content-center gap-2">
                <input type="checkbox" name="tomorrowToDo" class="todo-selector-tomorrow todo-selector" />
                <p class="todo-tomorrow-text text-dark mt-3" --data-index="${i}"> ${arr[i]}</p>
              </div>
              <div class="icons" --data-todo-date="tomorrowToDo" --data-index="${i}">
                <i class="fa-solid fa-check text-success me-3"></i>
                <i class="fa fa-trash text-danger me-3"></i>
              </div>
            </div>`;
  }
  tomorrowList.innerHTML = toDoBox;

  selectAllToDo();
  deletToDo();
  toDoDone();
}

function selectAllToDo() {
  selectedAllToday.addEventListener("click", () => {
    let todayChildern = [...todayBtns.children];
    let todoSelectorToday = document.querySelectorAll(".todo-selector-today");
    let toDoTodayText = document.querySelectorAll(".todo-today-text");

    if (toDoListToday.length > 0 && selectedAllToday.checked) {
      todoSelectorToday.forEach((todo) => {
        todo.checked = true;
      });

      todayChildern.forEach((child) => {
        child.disabled = false;
      });
    } else {
      todoSelectorToday.forEach((todo) => {
        todo.checked = false;
      });

      todayChildern.forEach((child) => {
        child.disabled = true;
      });
    }

    todayBtns.lastElementChild.addEventListener("click", () => {
      toDoTodayText.forEach((todoText) => {
        todoText.classList.add("text-decoration-line-through");
      });
    });
  });

  selectedAllTomorrow.addEventListener("click", () => {
    let tomorrowChildern = [...tomorrowBtns.children];
    let todoSelectorTomorrow = document.querySelectorAll(
      ".todo-selector-tomorrow"
    );
    let toDoTomorrowText = document.querySelectorAll(".todo-tomorrow-text");

    if (toDoListTomorrow.length > 0 && selectedAllTomorrow.checked) {
      todoSelectorTomorrow.forEach((todo) => {
        todo.checked = true;
      });

      tomorrowChildern.forEach((child) => {
        child.disabled = false;
      });
    } else {
      todoSelectorTomorrow.forEach((todo) => {
        todo.checked = false;
      });

      tomorrowChildern.forEach((child) => {
        child.disabled = true;
      });
    }

    tomorrowBtns.lastElementChild.addEventListener("click", () => {
      toDoTomorrowText.forEach((todoText) => {
        todoText.classList.add("text-decoration-line-through");
      });
    });
  });
}

function deletToDo() {
  let toDoDate;
  let toDoIndex;
  let icons = document.querySelectorAll(".icons");

  icons.forEach((toDoIcons) => {
    toDoIcons.addEventListener("click", (e) => {
      toDoDate = toDoIcons.getAttribute("--data-todo-date");
      toDoIndex = toDoIcons.getAttribute("--data-index");

      if (e.target == toDoIcons.lastElementChild) {
        if (toDoDate === "todayToDo") {
          toDoListToday.splice(toDoIndex, 1);
          localStorage.setItem("toDoListToday", JSON.stringify(toDoListToday));
          displayToDoToday(toDoListToday);
        } else if (toDoDate === "tomorrowToDo") {
          toDoListTomorrow.splice(toDoIndex, 1);
          localStorage.setItem(
            "toDoListTomorrow",
            JSON.stringify(toDoListTomorrow)
          );
          displayToDoTomorrow(toDoListTomorrow);
        }
      }
    });
  });
}

function toDoDone() {
  let toDoDate;
  let toDoIndex;
  let icons = document.querySelectorAll(".icons");
  let toDoTodayText = document.querySelectorAll(".todo-today-text");
  let toDoTomorrowText = document.querySelectorAll(".todo-tomorrow-text");

  icons.forEach((toDoIcons) => {
    toDoIcons.addEventListener("click", (e) => {
      toDoDate = toDoIcons.getAttribute("--data-todo-date");
      toDoIndex = toDoIcons.getAttribute("--data-index");

      if (e.target == toDoIcons.firstElementChild) {
        if (toDoDate === "todayToDo") {
          toDoTodayText.forEach((toDo) => {
            if (toDoIndex == toDo.getAttribute("--data-index"))
              toDo.classList.add("text-decoration-line-through");
          });
        } else if (toDoDate === "tomorrowToDo") {
          toDoTomorrowText.forEach((toDo) => {
            if (toDoIndex == toDo.getAttribute("--data-index"))
              toDo.classList.add("text-decoration-line-through");
          });
        }
      }
    });
  });
}
