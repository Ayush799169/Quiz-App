const questions = [
  {
    question: "What is JavaScript?",
    options: ["Programming Language", "Game", "Movie", "Car"],
    answer: "Programming Language",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Leveler",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Mozilla", "Netscape", "Microsoft"],
    answer: "Netscape",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Styled Sections",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "HTML mein heading tag kaun sa hai?",
    options: ["<head>", "<h1>", "<heading>"],
    answer: "<h1>",
  },
  {
    question: "CSS ka kaam kya hai?",
    options: [
      "Page ko structure dena",
      "Page ko style dena",
      "Functionality dena",
    ],
    answer: "Page ko style dena",
  },
  {
    question: "HTML tag to image dikhane ke liye?",
    options: ["<img>", "<image>", "<pic>"],
    answer: "<img>",
  },
  {
    question: "JavaScript file ka extension kya hota hai?",
    options: [".js", ".java", ".javascript"],
    answer: ".js",
  },
  {
    question: "What symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "<!-- -->", "#"],
    answer: "//",
  },
  {
    question: "What symbol is used for comments in JavaScript?",
    options: ["//", "/* */", "<!-- -->", "#"],
    answer: "//",
  },
];

let currentQuestionIndex = 0;
let score = localStorage.getItem("quizScore")
  ? parseInt(localStorage.getItem("quizScore"))
  : 0;
let time = 0;
let timerInterval;
let autoNextTimeout;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const questionTrackerEl = document.getElementById("question-tracker");
const nextBtn = document.getElementById("next-btn");
const resetBtn = document.getElementById("reset-btn");

function loadQuestion() {
  clearInterval(timerInterval);
  clearTimeout(autoNextTimeout);
  time = 0;
  updateTimerDisplay();
  startTimer();

  const currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;
  questionTrackerEl.innerText = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "inline-block";

  currentQuestion.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => handleAnswer(btn, option));
    optionsEl.appendChild(btn);
  });

  // Auto move after 15 sec
  autoNextTimeout = setTimeout(() => {
    nextBtn.click();
  }, 15000);
}

function handleAnswer(btn, selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((button) => {
    button.disabled = true;
    if (button.innerText === currentQuestion.answer) {
      button.classList.add("correct");
    } else if (button.innerText === selectedOption) {
      button.classList.add("wrong");
    }
  });

  if (selectedOption === currentQuestion.answer) {
    score++;
    localStorage.setItem("quizScore", score);
  }

  clearInterval(timerInterval);
  clearTimeout(autoNextTimeout);

  // Auto next after 1 sec of selection
  setTimeout(() => {
    nextBtn.click();
  }, 1000);
}

function showScore() {
  questionEl.innerText = "";
  optionsEl.innerHTML = "";
  questionTrackerEl.innerText = "";
  timerEl.innerText = "";
  nextBtn.style.display = "none";
  scoreEl.innerText = `Your Score: ${score} / ${questions.length}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  timerEl.innerText = ` Timer: ${time}s`;
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  localStorage.removeItem("quizScore");
  scoreEl.innerText = "";
  loadQuestion();
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    clearInterval(timerInterval);
    clearTimeout(autoNextTimeout);
    showScore();
  }
});

resetBtn.addEventListener("click", resetQuiz);

window.onload = () => {
  loadQuestion();
};
