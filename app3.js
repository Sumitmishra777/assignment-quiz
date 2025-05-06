// Restrict access if Round 2 not passed
if (localStorage.getItem("round2Passed") !== "true") {
  alert("Access denied. Complete Round 2 first.");
  window.location.href = "index.html";
}

// Round 3: True/False Tough Questions
const questionsRound3 = [
  { q: "Quantum entanglement defies classical physics.", answer: true },
  { q: "Black holes emit light from their core.", answer: false },
  { q: "The Turing test evaluates AI intelligence.", answer: true },
  { q: "Entropy decreases in a closed system.", answer: false },
  { q: "Pi is an irrational number.", answer: true },
];

let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 45;
let timer;

const submitBtn = document.getElementById("submit-btn");
const questionContainer = document.getElementById("question-container");
const timerElement = document.getElementById("time");
const resultElement = document.getElementById("result");

// Start the countdown timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      finishRound3();
    }
  }, 1000);
}

// Show the current True/False question
function displayQuestion() {
  const q = questionsRound3[currentQuestionIndex];
  questionContainer.innerHTML = `
    <p>${q.q}</p>
    <label class="option"><input type="radio" name="option" value="true" /> True</label>
    <label class="option"><input type="radio" name="option" value="false" /> False</label>
  `;
}

// Check selected answer
function validateAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an answer!");
    return false;
  }
  userAnswers.push(selected.value === "true");
  localStorage.setItem("round3Answers", JSON.stringify(userAnswers));

  return true;
}

// Handle submit button click
submitBtn.addEventListener("click", () => {
  if (!validateAnswer()) return;

  if (currentQuestionIndex < questionsRound3.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    finishRound3();
  }
});

// Evaluate Round 3 and go to certificate
function finishRound3() {
  clearInterval(timer);
  let score = 0;
  userAnswers.forEach((ans, idx) => {
    if (ans === questionsRound3[idx].answer) score++;
  });

  resultElement.innerHTML = `Final Round Score: ${score} / ${questionsRound3.length}`;
  submitBtn.style.display = "none";
  localStorage.setItem("round3Score", score.toString());

  setTimeout(() => {
    window.location.href = "certificate.html";
  }, 2500);
}

// Init
displayQuestion();
startTimer();
