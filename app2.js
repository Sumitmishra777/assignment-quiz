// Redirect if Round 1 not passed
if (localStorage.getItem("round1Passed") !== "true") {
  alert("You are not allowed to access Round 2.");
  window.location.href = "index.html";
}

// Round 2 questions
const questionsRound2 = [
  { q: "Capital of Japan?", options: ["Beijing", "Seoul", "Tokyo"], answer: 2 },
  {
    q: "Einstein's theory?",
    options: ["Evolution", "Relativity", "Gravity"],
    answer: 1,
  },
  {
    q: "Largest ocean?",
    options: ["Atlantic", "Indian", "Pacific"],
    answer: 2,
  },
  {
    q: "Who painted Mona Lisa?",
    options: ["Da Vinci", "Van Gogh", "Picasso"],
    answer: 0,
  },
  {
    q: "Language for styling web pages?",
    options: ["HTML", "CSS", "JS"],
    answer: 1,
  },
  {
    q: "Planet known as red?",
    options: ["Mars", "Venus", "Saturn"],
    answer: 0,
  },
  { q: "H2O is?", options: ["Hydrogen", "Water", "Oxygen"], answer: 1 },
  { q: "India's capital?", options: ["Mumbai", "Delhi", "Kolkata"], answer: 1 },
  {
    q: "Fastest land vehicle?",
    options: ["Plane", "Car", "Rocket car"],
    answer: 2,
  },
  { q: "5 + 7?", options: ["12", "10", "13"], answer: 0 },
];

let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 60;
let timer;

const submitBtn = document.getElementById("submit-btn");
const questionContainer = document.getElementById("question-container");
const timerElement = document.getElementById("time");
const resultElement = document.getElementById("result");

// Start countdown
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      finishRound2();
    }
  }, 1000);
}

// Show current question
function displayQuestion() {
  const q = questionsRound2[currentQuestionIndex];
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

// Validate selected option
function validateAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Select an answer!");
    return false;
  }
  userAnswers.push(parseInt(selected.value));
  localStorage.setItem("round2Answers", JSON.stringify(userAnswers));

  return true;
}

// On submit button click
submitBtn.addEventListener("click", () => {
  if (!validateAnswer()) return;

  if (currentQuestionIndex < questionsRound2.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    finishRound2();
  }
});

// End of Round 2
function finishRound2() {
  clearInterval(timer);
  let score = 0;
  userAnswers.forEach((ans, idx) => {
    if (ans === questionsRound2[idx].answer) score++;
  });

  resultElement.innerHTML = `Round 2 Score: ${score} / ${questionsRound2.length}`;
  submitBtn.style.display = "none";

  if (score >= 7) {
    localStorage.setItem("round2Passed", "true");
    resultElement.innerHTML += "<br>You passed! Redirecting to Round 3...";
    setTimeout(() => {
      window.location.href = "round3.html";
    }, 2000);
  } else {
    localStorage.setItem("round2Passed", "false");
    resultElement.innerHTML += "<br>You failed Round 2.";
  }
}

// Initialize
displayQuestion();
startTimer();
