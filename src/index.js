import "./styles/styles.scss";
import {
  generateText,
  createElement,
  validateInput,
  checkAndGenerate,
} from "./util.js";

const initApp = () => {
  // Initializes the app, registers the button click listener
  const newUserButton = document.querySelector("#btnAddUser");
  newUserButton.addEventListener("click", addUser);
};

const addUser = () => {
  // Fetches the user input, creates a new HTML element based on it
  // and appends the element to the DOM
  const newUserNameInput = document.querySelector("input#name");
  const newUserAgeInput = document.querySelector("input#age");

  if (
    !validateInput(newUserNameInput.value, true, false) ||
    !validateInput(newUserAgeInput.value, false, true)
  ) {
    return;
  }

  const userList = document.querySelector(".user-list");
  const outputText = generateText(
    newUserNameInput.value,
    newUserAgeInput.value
  );
  const element = createElement("li", outputText, "user-item");
  userList.appendChild(element);
};

const addUserNew = () => {
  // Fetches the user input, creates a new HTML element based on it
  // and appends the element to the DOM
  const newUserNameInput = document.querySelector("input#name");
  const newUserAgeInput = document.querySelector("input#age");

  const outputText = checkAndGenerate(
    newUserNameInput.value,
    newUserAgeInput.value
  );
  if (!outputText) {
    return;
  }

  const userList = document.querySelector(".user-list");
  const element = createElement("li", outputText, "user-item");
  userList.appendChild(element);
};

// Start the app!
initApp();
