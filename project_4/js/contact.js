class ContactFormHandler {
  #emailAddress = "";
  #messageTitle = "";
  #messageContent = "";

  #emailElement = null;
  #titleElement = null;
  #messageElement = null;
  #submitBtnElement = null;

  #formFeedbackElement = null;

  #isCorrect = true;
  #isSending = false;

  constructor(emailElemId, titleElemId, textElemId, submitBtnId) {
    this.#emailElement = document.getElementById(emailElemId);
    this.#titleElement = document.getElementById(titleElemId);
    this.#messageElement = document.getElementById(textElemId);
    this.#submitBtnElement = document.getElementById(submitBtnId);

    if (
      !this.#emailElement ||
      !this.#titleElement ||
      !this.#messageElement ||
      !this.#submitBtnElement
    ) {
      throw new Error("invalid IDs provided");
    }

    this.#formFeedbackElement = document.createElement("p");

    this.#submitBtnElement.addEventListener(
      "click",
      this.handleSubmit.bind(this),
    );
  }

  #updateValues() {
    this.#emailAddress = this.#emailElement.value;
    this.#messageTitle = this.#titleElement.value;
    this.#messageContent = this.#messageElement.value;
  }

  #clearMessages() {
    const parentNode = this.#emailElement.parentNode;

    for (const child of parentNode.children) {
      if (child.classList.contains("success_msg")) {
        child.classList.remove("success_msg");
      }

      if (child.classList.contains("error_msg")) {
        child.classList.remove("error_msg");
      }
      if (this.#isCorrect && child.value && child.value.length > 0) {
        child.value = "";
      }
      if (child.classList.contains("error_border")) {
        child.classList.remove("error_border");
      }
      if (child.tagName == "P") {
        child.remove();
      }
    }
  }
  #appendSuccess(element, successMsg) {
    this.#formFeedbackElement.classList.add("success_msg");
    this.#formFeedbackElement.innerText = successMsg;
    element.after(this.#formFeedbackElement);
  }

  #appendError(element, errorMsg) {
    element.classList.add("error_border");
    this.#formFeedbackElement.classList.add("error_msg");
    this.#formFeedbackElement.innerText = errorMsg;
    element.after(this.#formFeedbackElement);
  }

  #validateForm() {
    this.#isCorrect = true;

    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!this.#emailAddress.match(validEmail)) {
      this.#appendError(this.#emailElement, "Niepoprawny adres email");
      this.#isCorrect = false;
      return;
    }

    if (this.#messageTitle.length === 0) {
      this.#appendError(
        this.#titleElement,
        "Musisz wpisać jakiś tytuł wiadomości",
      );
      this.#isCorrect = false;
      return;
    }

    if (this.#messageContent.length === 0) {
      this.#appendError(
        this.#messageElement,
        "Musisz podać jakąś treść wiadomości",
      );
      this.#isCorrect = false;
      return;
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.#isSending) return;
    this.#updateValues();
    this.#clearMessages();
    this.#validateForm();

    if (this.#isCorrect) {
      this.#submitBtnElement.classList.add("active_btn");
      this.#submitBtnElement.innerText = "Wysyłanie...";

      this.#isSending = true;
      this.#clearMessages();
      const response = await fetch(
        `https://formsubmit.co/ajax/kam.kuziora@gmail.com`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            emailFrom: this.#emailAddress,
            title: this.#messageTitle,
            content: this.#messageContent,
          }),
        },
      );
      const responseJson = await response.json();

      if (responseJson.success) {
        this.#appendSuccess(
          this.#messageElement,
          "Pomyślnie wysłano wiadomość",
        );
        this.#submitBtnElement.classList.remove("active_btn");
        this.#submitBtnElement.innerText = "Wyślij";
      }
      this.#isSending = false;
    }
  }
}

const formHandler = new ContactFormHandler(
  "contact_form_email",
  "contact_form_title",
  "contact_form_textarea",
  "contact_form_submit",
);
