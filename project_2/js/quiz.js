const startForm = document.getElementById("entry_form_container");
const entryForm = document.querySelector(".entry_form");
const entryButton = document.getElementById("enter-btn");
const nextButton = document.getElementById("next_button");
const cancelButton = document.getElementById("cancel_button");
const questionContainerElement = document.getElementById("question_container");
const answerElement = document.getElementById("answer-buttons");
const questionElement = document.getElementById("question");
const finishScreen = document.querySelector(".result_container");
const restartButton = document.getElementById("restart");

let correctSum = 0;
nextButton.addEventListener("click", () => {
  const selectedButton = document.querySelector(".selected");
  if (questions[currentQuestionIndex].answers[selectedButton.id].correct) {
    correctSum++;
  }
  currentQuestionIndex++;
  console.log(correctSum);
  setNextQuestion();
});

restartButton.addEventListener("click", () => {
  startForm.classList.remove("hidden");
  correctSum = 0;
  finishScreen.classList.add("hidden");
});

let count, currentQuestionIndex;

const cancelQuiz = () => {
  correctSum = 0;
  questionContainerElement.classList.add("hidden");
  nextButton.classList.add("hidden");
  startForm.classList.remove("hidden");

  console.log("canceled quiz try");
};

cancelButton.addEventListener("click", cancelQuiz);

entryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstName = document.getElementById("first_name");
  let lastName = document.getElementById("last_name");
  let email = document.getElementById("email");

  if (firstName.value == "" || lastName.value == "" || email.value == "") {
    console.log("error help please");
  } else {
    startQuiz();
  }
});

const startQuiz = () => {
  startForm.classList.add("hidden");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hidden");
  setNextQuestion();
};
entryButton.addEventListener("click", startQuiz);

const setNextQuestion = () => {
  resetState();
  if (questions.length <= currentQuestionIndex) {
    finishQuiz();
    console.log(currentQuestionIndex);
  } else {
    showQuestion(currentQuestionIndex);
  }
};

const showQuestion = (currentQuestionIndex) => {
  const question = questions[currentQuestionIndex];
  questionElement.innerText = question.question;
  question.answers.forEach((answer, count) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer");
    button.setAttribute("id", count);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerElement.appendChild(button);
  });
};

const resetState = () => {
  clearStatusClass(document.body);
  nextButton.classList.add("hidden");
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
};

const selectAnswer = (e) => {
  const selectedAnswerButton = document.querySelector(".selected");
  if (selectedAnswerButton) {
    selectedAnswerButton.classList.remove("selected");
  }

  const selectedButton = e.target;

  nextButton.classList.remove("hidden");
  selectedButton.classList.add("selected");
};

const finishQuiz = () => {
  finishScreen.classList.remove("hidden");
  questionContainerElement.classList.add("hidden");
  const scoreResult = document.querySelector(".result");
  scoreResult.innerText = `Uzyskano ${correctSum}/${questions.length} punktów`;
};
