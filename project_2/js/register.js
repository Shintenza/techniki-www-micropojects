const backendURL = "http://localhost:8080";

window.onload = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

  const isTokenAvaliable = tokenCookie ? tokenCookie.split("=")[1] : null;

  if (isTokenAvaliable) {
    window.location.pathname = "/";
  }
};

const loginButton = document.getElementById("register_btn");
loginButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const isVisibleErrorMsg = document.querySelector(".form_error_msg");
  if (isVisibleErrorMsg) {
    isVisibleErrorMsg.remove();
  }

  const errorMessageElement = document.createElement("p");
  errorMessageElement.classList.add("form_error_msg");

  const loginInputElement = document.getElementById("register_username");
  const passwordInputElement = document.getElementById("register_password");
  const firstNameInputElement = document.getElementById("register_first_name");
  const lastNameInputElenent = document.getElementById("register_last_name");

  const login = loginInputElement.value;
  const password = passwordInputElement.value;
  const firstName = firstNameInputElement.value;
  const lastName = lastNameInputElenent.value;

  if (!login || !password || !firstName || !lastName) {
    errorMessageElement.innerText =
      "Musisz uzupełnić wszystkie pola aby się zarejestrować";
    passwordInputElement.after(errorMessageElement);
    return;
  }

  const response = await fetch(`${backendURL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: login, password, firstName, lastName }),
  });

  const responseJson = await response.json();
  const { token, username, _id, role } = responseJson;

  if (!token || !username) {
    errorMessageElement.innerText = "Nie udało się założyć konta";
    passwordInputElement.after(errorMessageElement);
    return;
  }

  errorMessageElement.remove();

  document.cookie = `token=${token}; path=/; SameSite=None; Secure`;

  localStorage.setItem("username", username);
  localStorage.setItem("id", _id);
  localStorage.setItem("role", role);

  window.location.pathname = "/";
});
