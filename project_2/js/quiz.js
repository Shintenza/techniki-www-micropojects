const questions = JSON.parse(localStorage.getItem("questions"))
const selectedAnswers = []
const backendURL = "http://localhost:8080";

const nextButton = document.getElementById("next_button");
const cancelButton = document.getElementById("cancel_button");
const questionContainerElement = document.getElementById("question_container");
const answersElement = document.getElementById("answers");
const questionElement = document.getElementById("question");
const finishScreen = document.querySelector(".result_container");
const restartButton = document.getElementById("restart");
const questionNumberElement = document.querySelector(".question_number");


let currentQuestionIndex = 0;


nextButton.addEventListener("click", () => {
  const selectedButton = document.querySelector(".selected");

  const selectedAnswer = {questionID: questions[currentQuestionIndex]._id,
  givenAnswerID: questions[currentQuestionIndex].answers[selectedButton.id]._id}
  currentQuestionIndex++;

  selectedAnswers.push(selectedAnswer)
  console.log(selectedAnswer)
  setNextQuestion();
});

restartButton.addEventListener("click", () => {
  window.location.pathname = "/"
  localStorage.removeItem("questions")
  currentQuestionIndex = 0
  finishScreen.classList.add("hidden");
});

cancelButton.addEventListener("click", () => {
  localStorage.removeItem("questions")
  currentQuestionIndex = 0
  questionContainerElement.classList.add("hidden");
  nextButton.classList.add("hidden");
  window.location.pathname = "/"
});



const startQuiz = () => {
  currentQuestionIndex = 0;
  
  setNextQuestion();
};

window.onload = startQuiz

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
  questionElement.innerText = question.questionName;
  question.answers.forEach((answer, count) => {
    const button = document.createElement("button");
    button.innerText = answer.answer;
    button.classList.add("answer");
    button.setAttribute("id", count);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answersElement.appendChild(button);
  });
};

const resetState = () => {
  nextButton.classList.add("hidden");
  while (answersElement.firstChild) {
    answersElement.removeChild(answersElement.firstChild);
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

const finishQuiz = async () => {

  const userID = localStorage.getItem("id")
  const token = getTokenFromCookie()

  const response = await fetch(`${backendURL}/quiz/verify`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID,
      answers: selectedAnswers
    }),
  });
  const { score } = await response.json();
  console.log(score);





  const scoreResult = document.querySelector(".result");

  finishScreen.classList.remove("hidden");
  questionContainerElement.classList.add("hidden");
  scoreResult.innerText = `Uzyskano ${score}/${questions.length} punktów`;
};


const getTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

  const token = tokenCookie ? tokenCookie.split("=")[1] : null;
  console.log(token);
  return token;
};



