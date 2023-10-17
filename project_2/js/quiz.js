const startForm = document.getElementById("entry_form_container");
const entryButton = document.getElementById("enter-btn");
const questionContainerElement = document.getElementById("question_container")


const startQuiz = () => {
  startForm.classList.add('hidden')
  questionContainerElement.classList.remove('hidden')
}

entryButton.addEventListener('click', startQuiz)