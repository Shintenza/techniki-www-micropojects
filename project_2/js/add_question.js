const backendURL = "http://localhost:8080";

const addQuestionBtn = document.querySelector(".add_question_btn");
addQuestionBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

  const token = tokenCookie ? tokenCookie.split("=")[1] : null;

  const isVisibleErrorMsg = document.querySelector(".form_error_msg");
  const isVisibleSuccessMsg = document.querySelector(".form_error_msg");

  if (isVisibleErrorMsg) {
    isVisibleErrorMsg.remove();
  }
  if (isVisibleSuccessMsg) {
    isVisibleSuccessMsg.remove();
  }

  const errorMessageElement = document.createElement("p");

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

    if (!answerText) {
      isValidForm = false;
    }

    answers.push({ answer: answerText, isCorrect: isAnswerCorrect });
  });

  if (!isValidForm) {
    errorMessageElement.classList.add("form_error_msg");
    errorMessageElement.innerText = "Musisz uzupełnić wszystkie pola";
    addQuestionBtn.before(errorMessageElement);
    return;
  }

  const postBody = {
    question: questionElement.value,
    answers,
  };

  const response = await fetch(`${backendURL}/quiz/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postBody),
  });

  if (response.status != 200) {
    errorMessageElement.classList.add("form_error_msg");
    errorMessageElement.innerText = "Nie udało się dodać pytania";
    addQuestionBtn.before(errorMessageElement);
  } else {
    errorMessageElement.classList.add("form_success_msg");
    errorMessageElement.innerText = "Pomyślnie dodano pytanie";
    addQuestionBtn.before(errorMessageElement);

    answerElements.forEach((answer) => {
      const answerText = answer.children.item(0).value;
      answerText.value = '';
      questionElement.value = '';
    });
  }
});
