let questions = [];
let currentQuestionIndex = 0;
let prizeMoney = 0;
let health = 3;
let time = document.querySelector(".timer");


async function loadQuiz() {
  try {
    const response = await fetch("question.json");
    const data = await response.json();
    questions = data;
    displayQuestions(currentQuestionIndex);
    // Half(currentQuestionIndex);
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
    .setAttribute("style", "background-image : url(peakpx.jpg); ");
  // .setAttribute("style", "background-image : none");

  let startButton = document.querySelector("#button");
  startButton.setAttribute("style", "visibility : hidden;");

  let container = document.querySelector(".container1");
  container.setAttribute("style", "visibility : visible; margin-top: -3cm");
  loadQuiz();
}

let startQuiz = () => {
  const loadDeleteSOund = document.getElementById("Welcome");
  // loadDeleteSOund.play();
  setTimeout(() => start(), 1000);
};
function checkanswer(e, question) {
  let selected = e.innerText;
  const options = document.querySelector(".options");
  let halfOption = questions[currentQuestionIndex].options;
  let halfstr = "";

  if (selected === question.answer) {
    prizeMoney += 1000 * (currentQuestionIndex + 1);
    e.setAttribute("style", "background-color: Green");
    e.innerHTML =
      selected + `<i class="fa-solid fa-check" style="font-size: 50px"></i>`;
    document.getElementById("correct").play();
  } else {
    health--;
    e.setAttribute("style", "background-color: #ff0800");
    document.getElementById("wrong").play();
    halfOption.forEach((option) => {
      if (option === question.answer) {
        halfstr += `<div class="option" style="background-color: Green">${option}</div>`;
      } else if (option === selected && selected !== question.answer) {
        halfstr += `<div class="option" style="background-color: #ff0800">${option} <i class="fa-solid fa-xmark" style="font-size: 50px"></i></div>`;
      } else {
        halfstr += `<div class="option">${option}</div>`;
      }
    });
    options.innerHTML = halfstr;
  }

  // Move to next question
  currentQuestionIndex++;
  setTimeout(() => displayQuestions(currentQuestionIndex), 4000);
}

function selectOption(e) {
  const question = questions[currentQuestionIndex];
  e.setAttribute("style", "background-color: #FFBF00; color : white");
  const loadDeleteSOund = document.getElementById("Suspense");
  loadDeleteSOund.play();
  setTimeout(() => checkanswer(e, question), 3000);
}

function displayQuestions(index) {
    
  const loadDeleteSOund = document.getElementById("Question");
  loadDeleteSOund.play();
  let healthLifestr = "";
  let healthLife = document.querySelector(".Healthlife");

  if (index >= questions.length || health <= 0) {
    let container = document.querySelector(".container1");

    container.setAttribute("style", "visibility : hidden");
    let logo = document.querySelector(".logo");
    const loadDeleteSOund = document.getElementById("Welcome");
    loadDeleteSOund.play();
    logo.setAttribute("style", "visibility : visibile");
    logo.innerText = ` Winner!    
    Prize: $${prizeMoney}`;
    document.getElementById("progress").innerText = `Prize: $${prizeMoney}`;

    return;
  }
  for (let index = 0; index < health; index++) {
    // console.log(index);

    healthLifestr += `<i class="fa-solid fa-heart" ></i>`;
  }
  healthLife.innerHTML = healthLifestr;
  const question = questions[index];

  document.getElementById("question").innerText = question.question;
  const options = document.querySelector(".options");
  let optionstr = "";
  let questionOption = question.options;

  questionOption.map((option) => {
    // console.log(?
    optionstr += `<div class="option" value="${option}" onclick="selectOption(this, '${option}')" ">${option}</div>`;
  });
  options.innerHTML = optionstr;
  document.getElementById("result").innerText = "";
  updateProgress();
}

function updateProgress() {
  document.getElementById("progress").innerText = `Prize: $${prizeMoney}`;
}

function useLifeline() {
  const loadDeleteSOund = document.getElementById("ringtone");
  loadDeleteSOund.play();
  const toastLiveExample = document.getElementById("liveToast");

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();

  document.querySelector("#call").setAttribute("style", "visibility : hidden");
}
function randomrumber() {
  let randomrumber = Math.floor(Math.random() * 4);
  return randomrumber;
}

function Half(index) {
  let halfOption = questions[currentQuestionIndex].options;

  let random = randomrumber();
  let c = 0;
  let halfstr = "";
  if (halfOption[random] == questions[currentQuestionIndex].answer) {
    if (random < 3) {
      random++;
    } else {
      random--;
    }
  }
  const options = document.querySelector(".options");
  halfOption.map((option, i) => {
    if (random == i || questions[currentQuestionIndex].answer == option) {
      halfstr += `<div class="option" value="${option}" onclick="selectOption(this, '${option}')" ">${option}</div>`;
    } else {
      halfstr += `<div class="option" value="${option}" onclick="selectOption(this, '${option}')" "></div>`;
    }
  });

  options.innerHTML = halfstr;

  document.querySelector("#half").setAttribute("style", "visibility : hidden");
}
function SureAnswer() {
  let halfOption = questions[currentQuestionIndex].options;

  let halfstr = "";
  const options = document.querySelector(".options");
  halfOption.map((option, i) => {
    if (questions[currentQuestionIndex].answer == option) {
      halfstr += `<div class="option" value="${option}" onclick="selectOption(this, '${option}')" ">${option}</div>`;
    } else {
      halfstr += `<div class="option" value="${option}" onclick="selectOption(this, '${option}')" "></div>`;
    }
  });



  options.innerHTML = halfstr;
  document
    .querySelector("#SureAnswer")
    .setAttribute("style", "visibility : hidden");
}
