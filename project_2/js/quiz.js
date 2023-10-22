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
const questionNumberElement = document.querySelector(".question_number");

let correctSum = 0;
let currentQuestionIndex = 0;
let username = "";

nextButton.addEventListener("click", () => {
  const selectedButton = document.querySelector(".selected");
  if (questions[currentQuestionIndex].answers[selectedButton.id].correct) {
    correctSum++;
  }
  currentQuestionIndex++;
  setNextQuestion();
});

restartButton.addEventListener("click", () => {
  startForm.classList.remove("hidden");
  correctSum = 0;
  username = "";
  finishScreen.classList.add("hidden");
});

cancelButton.addEventListener("click", () => {
  correctSum = 0;
  username = "";
  questionContainerElement.classList.add("hidden");
  nextButton.classList.add("hidden");
  startForm.classList.remove("hidden");
});

entryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstNameInput = document.getElementById("first_name");

  if (firstNameInput.value == "") {
    if (!document.querySelector(".form_error_msg")) {
      const errorMessageElement = document.createElement("p");
      errorMessageElement.classList.add("form_error_msg");
      errorMessageElement.innerText =
        "Musisz podać swoję imię aby kontynuować!";
      firstNameInput.after(errorMessageElement);
    }

    firstNameInput.classList.add("missing");
  } else {
    if (firstNameInput.classList.contains("missing")) {
      firstNameInput.classList.remove("missing");
      const errorMessageElement = document.querySelector(".form_error_msg");
      errorMessageElement.remove();
    }
    username = firstNameInput.value;
    firstNameInput.value = "";
    startQuiz();
  }
});

const startQuiz = () => {
  startForm.classList.add("hidden");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hidden");
  setNextQuestion();
};

const setNextQuestion = () => {
  resetState();
  if (questions.length <= currentQuestionIndex) {
    finishQuiz();
  } else {
    showQuestion(currentQuestionIndex);
  }
};

const showQuestion = (currentQuestionIndex) => {
  const question = questions[currentQuestionIndex];
  questionNumberElement.innerText = `Pytanie nr ${currentQuestionIndex + 1} z ${questions.length}:`;
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
  const resultMsgElement = document.querySelector(".result_msg");
  const scoreResult = document.querySelector(".result");

  resultMsgElement.innerText = `Brawo ${username} właśnie ukończyłeś/aś nasz quiz`;
  finishScreen.classList.remove("hidden");
  questionContainerElement.classList.add("hidden");
  scoreResult.innerText = `Uzyskano ${correctSum}/${questions.length} punktów`;
};
