const backendURL = "http://localhost:8080";

const addQuestionBtn = document.querySelector(".add_question_btn");
addQuestionBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  const token = tokenCookie ? tokenCookie.split("=")[1] : null;

  const isVisibleErrorMsg = document.querySelector(".form_error_msg");
  if (isVisibleErrorMsg) {
      isVisibleErrorMsg.remove();
  }

  const questionElement = document.getElementById("question_name");
  const answerElements = document.querySelectorAll(".answer_wrapper");

  let isValidForm = true;
  const answers = [];

  if (!questionElement) {
    isValidForm = false;
  }

  answerElements.forEach((answer) => {
    const answerText = answer.children.item(0).value;
    const isAnswerCorrect = answer.children.item(1).checked;

    if (!answerText || !isAnswerCorrect) {
      isValidForm = false;
    }

    answers.push({ answer: answerText, isCorrect: isAnswerCorrect });
  });

  
  if (!isValidForm) {
    const errorMessageElement = document.createElement("p");
    errorMessageElement.classList.add("form_error_msg");
    errorMessageElement.innerText =
        "Musisz uzupełnić wszystkie pola";
    addQuestionBtn.before(errorMessageElement);
    return;
  }

  const postBody = {
    questionName: questionElement.value,
    answers,
  };

  const response = await fetch(`${backendURL}`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postBody),
  })

  
});
