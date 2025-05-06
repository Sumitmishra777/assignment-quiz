const questionsRound1 = [
  { q: "What is 2 + 2?", options: ["3", "4", "5"], answer: 1 },
  {
    q: "Capital of France?",
    options: ["Berlin", "London", "Paris"],
    answer: 2,
  },
  {
    q: "HTML stands for?",
    options: ["Hyper Text Markup Language", "Hot Mail", "How to Make Lasagna"],
    answer: 0,
  },
  { q: "5 * 3 equals?", options: ["8", "15", "20"], answer: 1 },
  { q: "Color of sky?", options: ["Blue", "Red", "Green"], answer: 0 },
  { q: "Fastest animal?", options: ["Lion", "Cheetah", "Tiger"], answer: 1 },
  { q: "JavaScript is?", options: ["Language", "Fruit", "Drink"], answer: 0 },
  { q: "2^3 equals?", options: ["6", "8", "9"], answer: 1 },
  { q: "Which is a browser?", options: ["Chrome", "Paint", "Word"], answer: 0 },
  { q: "Square root of 16?", options: ["4", "6", "8"], answer: 0 },
];

let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 60;
let timer;

const submitBtn = document.getElementById("submit-btn");
const questionContainer = document.getElementById("question-container");
const timerElement = document.getElementById("time");
const resultElement = document.getElementById("result");

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      finishRound1();
    }
  }, 1000);
}

function displayQuestion() {
  const q = questionsRound1[currentQuestionIndex];
  questionContainer.innerHTML = `
    <p>${q.q}</p>
    ${q.options
      .map(
        (opt, i) =>
          `<label class="option"><input type="radio" name="option" value="${i}" /> ${opt}</label>`
      )
      .join("")}
  `;
}

function validateAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Select an answer!");
    return false;
  }
  localStorage.setItem("round1Answers", JSON.stringify(userAnswers));

  userAnswers.push(parseInt(selected.value));
  return true;
}

submitBtn.addEventListener("click", () => {
  if (!validateAnswer()) return;

  if (currentQuestionIndex < questionsRound1.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    finishRound1();
  }
});

function finishRound1() {
  clearInterval(timer);
  let score = 0;
  userAnswers.forEach((ans, idx) => {
    if (ans === questionsRound1[idx].answer) score++;
  });

  resultElement.innerHTML = `Score: ${score} / ${questionsRound1.length}`;

  if (score >= 7) {
    resultElement.innerHTML += "<br>You passed! Redirecting to Round 2...";
    localStorage.setItem("round1Passed", "true");
    setTimeout(() => {
      window.location.href = "round2.html";
    }, 2000);
  } else {
    resultElement.innerHTML += "<br>You failed Round 1.";
    localStorage.setItem("round1Passed", "false");
  }
}

displayQuestion();
startTimer();
