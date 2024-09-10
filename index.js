let questions = [];
let currentQuestionIndex = 0;
let prizeMoney = 0;
let health = 3;
async function loadQuiz() {
  try {
    const response = await fetch("question.json");
    const data = await response.json();
    questions = data;
    displayQuestions(currentQuestionIndex);
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
  }
}
function start() {
  const row1 = document
    .querySelector(".row1")
    .setAttribute("style", "visibility : hidden");
  const wrapper = document
    .querySelector(".wrapper")
    .setAttribute("style", "background-image : url(peakpx.jpg)");
  // .setAttribute("style", "background-image : none");

  let startButton = document.querySelector("#Start");
  startButton.setAttribute("style", "visibility : hidden");
  let container = document.querySelector(".container1");
  container.setAttribute("style", "visibility : visible");
  loadQuiz();
}

let startQuiz = () => {
  const loadDeleteSOund = document.getElementById("Welcome");
  // loadDeleteSOund.play();
  setTimeout(() => start(), 3000);
};
function checkanswer(e, question) {
  let selected = e.innerText;

  if (selected === question.answer) {
    prizeMoney += 1000;
    e.setAttribute("style", "background-color: Green");
    const loadDeleteSOund = document.getElementById("correct");
    loadDeleteSOund.play();
    document.getElementById("result").innerText = "Correct!";
  } else {
    e.setAttribute("style", "background-color: Red");
    const loadDeleteSOund = document.getElementById("wrong");
    loadDeleteSOund.play();
    document.getElementById("result").innerText = "Wrong!";
    let healthLifestr = "";
    let healthLife = document.querySelector(".Healthlife");
    for (let index = 0; index < healthLife; index++) {
      healthLifestr += `<i class="fa-solid fa-heart" style="color: white"></i>`;
    }
    healthLife.innerHTML = healthLifestr;
  }

  currentQuestionIndex++;
  setTimeout(() => displayQuestions(currentQuestionIndex), 3000);
}
function selectOption(e) {
  const question = questions[currentQuestionIndex];
  e.setAttribute("style", "background-color: yellow; color : white");

  setTimeout(() => checkanswer(e, question), 3000);
}

function displayQuestions(index) {
  const loadDeleteSOund = document.getElementById("Question");
  loadDeleteSOund.play();

  if (index >= questions.length) {
    let container = document.querySelector(".container1");

    container.setAttribute("style", "visibility : hidden");
    document.getElementById("result").innerText = "Game Over!";
    document.getElementById(
      "progress"
    ).innerText = `Prize Money: $${prizeMoney}`;

    return;
  }
  const question = questions[index];

  document.getElementById("question").innerText = question.question;
  const options = document.querySelector(".options");
  let optionstr = "";
  let questionOption = question.options;

  questionOption.map((option) => {
    // console.log(?
    optionstr += `<div class="option" value="${option}" onclick="selectOption(this, '${option}')">${option}</div>`;
  });
  options.innerHTML = optionstr;
  document.getElementById("result").innerText = "";
  updateProgress();
}

function updateProgress() {
  document.getElementById("progress").innerText = `Prize Money: $${prizeMoney}`;
}

function useLifeline(type) {
  document.getElementById("result").innerText = `Lifeline used: ${type}`;
}
