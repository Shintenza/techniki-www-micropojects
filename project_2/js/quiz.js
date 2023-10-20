const questions = [
  {
    question: "Example question",
    answers: [
      { text: "answer A", correct: false },
      { text: "answer B", correct: true },
      { text: "answer C", correct: false },
      { text: "answer D", correct: false }
    ]
  },
  {
    question: "Second Example question",
      answers: [
        { text: "answer A", correct: false },
        { text: "answer B", correct: false },
        { text: "answer C", correct: true },
        { text: "answer D", correct: false }
      ]
  }
]


const startForm = document.getElementById("entry_form_container")
const entryForm = document.querySelector('.entry_form')
const entryButton = document.getElementById("enter-btn")
const nextButton = document.getElementById("next_button")
const cancelButton = document.getElementById("cancel_button")
const questionContainerElement = document.getElementById("question_container")
const answerElement = document.getElementById('answer-buttons')
const questionElement = document.getElementById('question')
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
let count, currentQuestionIndex

let correctSum = 0

const cancelQuiz = () =>{
  correctSum = 0
  questionContainerElement.classList.add('hidden')
  nextButton.classList.add('hidden')
  startForm.classList.remove('hidden')

  console.log('canceled quiz try')
}





cancelButton.addEventListener("click", cancelQuiz)


entryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstName = document.getElementById("first_name");
  let lastName = document.getElementById("last_name");
  let email = document.getElementById("email")

  if (firstName.value == "" || lastName.value == "" || email.value == "") {
    console.log("error help please")
  } 
  else{
    startQuiz();
  }
});






const startQuiz = () => {
  startForm.classList.add('hidden')
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hidden')
  setNextQuestion()
}
entryButton.addEventListener('click', startQuiz)



const setNextQuestion = () => {
  resetState()
  showQuestion(currentQuestionIndex)
}


const showQuestion = (currentQuestionIndex) => {
  const question = questions[currentQuestionIndex]
  questionElement.innerText = question.question
  question.answers.forEach((answer, count) =>{
    const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('answer')
        button.setAttribute('id', count)
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerElement.appendChild(button)
  })
}


const resetState = () => {
  clearStatusClass(document.body)
  nextButton.classList.add('hidden')
  while(answerElement.firstChild){
      answerElement.removeChild(answerElement.firstChild)
  }
}

const selectAnswer = (e) =>{
  const selectedButton = e.target
  if(questions[currentQuestionIndex].answers[selectedButton.id].correct){
    correctSum++;
  }
  nextButton.classList.remove('hidden')
}

const setStatusClass = (element, correct) =>{
  clearStatusClass(element)

  if(correct){
      element.classList.add('correct')
  }
  else{
      element.classList.add('wrong')
  }
}

const clearStatusClass = (element) =>{
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


