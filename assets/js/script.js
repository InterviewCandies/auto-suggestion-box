import Factory from "./factory.js";

// getting all required elements
const autoComplete = document.querySelector(".autocomplete");
const inputBox = autoComplete.querySelector("input[type=text]");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const numberInput = document.querySelector("input[type=number]");
const icon = autoComplete.querySelector(".icon").querySelector("i");

let numberLettersToDisplay = 1;
let sections = [];

checkboxes.forEach((checkbox) => {
  sections.push(checkbox.value);
  checkbox.onchange = () => {
    if (checkbox.checked) {
      sections.push(checkbox.value);
      inputBox.dispatchEvent(new Event("keyup"));
      document.getElementsByClassName(checkbox.name)[0].style.display = "block";
    } else {
      sections = sections.filter((item) => item != checkbox.value);
      document.getElementsByClassName(checkbox.name)[0].style.display = "none";
    }
  };
});

// Clear data when click on "close" icon
icon.onclick = () => {
  inputBox.value = "";
  inputBox.dispatchEvent(new Event("keyup"));
};

numberInput.onchange = (e) => {
  numberLettersToDisplay = e.target.value;
};

// Fetch data when users type
inputBox.onkeyup = (e) => {
  let userData = e.target.value;

  if (userData.length) icon.className = "fa fa-close";
  else icon.className = "fa fa-search";

  if (numberLettersToDisplay > 0 && userData.length >= numberLettersToDisplay) {
    sections.forEach((item) =>
      searchOnClassName(userData, ...Factory.createBlock(item))
    );
  } else {
    autoComplete.classList.remove("active"); //hide autocomplete box
  }
};

// Decide displayed sections on Runtime
function searchOnClassName(userData, url, className, target) {
  fetch(url)
    .then((response) => response.json())
    .then((suggestions) => {
      showSuggestions(
        className.display(className.filter(suggestions, userData)),
        target
      );
      autoComplete.classList.add("active");
    })
    .catch((err) => console.log(err));
}

function showSuggestions(list, target) {
  let listData;
  if (!list.length) {
    listData = "<li>" + "No result" + "</li>";
  } else {
    listData = list.join("");
  }
  target.innerHTML = listData;
}
