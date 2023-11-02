const noteFormElement = document.querySelector(".input-box");
const noteBoxElement = document.querySelector(".input-box .text-box");
const noteContainerElement = document.querySelector(".input-box .container");
const itemsLeftElement = document.getElementById("itemsLeft");
const selectorContainer = document.getElementById("selectors");
const selectors = document.querySelectorAll("p");
const deleteButton = document.getElementById("delete");
const delay = 3000;
const loader = document.getElementById("preloader");
window.addEventListener("load",function(){
  setTimeout(function () {
      loader.classList.add("hide-preloader");
  }, delay);
})

let noteCount = 0;
let filter = "all";
noteFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const noteTitleElement = e.target.querySelector(".noteTitle");
  if (!noteTitleElement.value.trim()) {
    return alert("Note title must be filled!");
  }
  const newNote = {
    title: noteTitleElement.value,
  };
  createNoteElement(newNote);
  noteTitleElement.value = "";
  noteCount++;
  updateItemsLeft();
  applyFilter();
});

function createNoteElement(note) {
  const noteElement = document.createElement("div");
  const checkButtonElement = document.createElement("button");
  const noteTitleElement = document.createElement("p");
  const noteDeleteBtn = document.createElement("img");
  checkButtonElement.className = "check-button";
  noteDeleteBtn.src = `./assets/icon/delete.svg`;
  noteTitleElement.textContent = note.title;
  noteElement.className = "text-box";

  noteDeleteBtn.addEventListener("click", () => {
    deleteNoteElement(noteElement);
  });

  noteElement.append(checkButtonElement, noteTitleElement, noteDeleteBtn);
  noteContainerElement.append(noteElement);
  checkButtonElement.addEventListener("click", () => {
    checkButtonElement.classList.toggle("active");
    checkButtonElement.src = `./assets/icon/check.svg`;
    applyFilter();
  });
}

function deleteNoteElement(element) {
  if (confirm("Are you sure to delete?")) element.remove();
  noteCount--;
  updateItemsLeft();
  applyFilter();
}
function updateItemsLeft() {
  itemsLeftElement.textContent = `${noteCount} item${
    noteCount !== 1 ? "s" : ""
  } left`;
}
function applyFilter() {
  const noteElements = noteContainerElement.querySelectorAll(".text-box");

  noteElements.forEach((noteElement) => {
    const checkButtonElement = noteElement.querySelector(".check-button");
    if (
      filter === "all" ||
      (filter === "active" &&
        !checkButtonElement.classList.contains("active")) ||
      (filter === "completed" &&
        checkButtonElement.classList.contains("active"))
    ) {
      noteElement.style.display = "flex";
    } else {
      noteElement.style.display = "none";
    }
  });
}
selectors.forEach((selector) => {
  selector.addEventListener("click", () => {
    filter = selector.id;
    applyFilter();
    selectors.forEach((s) => {
      s.classList.remove("selected-class");
    });
    selector.classList.add("selected-class");
  });
});
deleteButton.addEventListener("click", () => {
  if (confirm("Are you sure to delete?")) {
    const completedNotes = noteContainerElement.querySelectorAll(
      ".text-box .check-button.active"
    );
    completedNotes.forEach((checkButton) => {
      const noteElement = checkButton.parentElement;
      noteElement.remove();
      noteCount--;
    });
  }
  updateItemsLeft();
  applyFilter();
});
