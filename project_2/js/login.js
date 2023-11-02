const backendURL = "http://localhost:8080";

window.onload = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

    const isTokenAvaliable = tokenCookie ? tokenCookie.split("=")[1] : null;

    if (isTokenAvaliable) {
        window.location.pathname = "/";
    }
};

const loginButton = document.getElementById("login-btn");
loginButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const isVisibleErrorMsg = document.querySelector(".form_error_msg");
    if (isVisibleErrorMsg) {
        isVisibleErrorMsg.remove();
    }

    const errorMessageElement = document.createElement("p");
    errorMessageElement.classList.add("form_error_msg");

    let loginInputElement = document.getElementById("login_username");
    let passwordInputElement = document.getElementById("login_password");

    const login = loginInputElement.value;
    const password = passwordInputElement.value;

    if (!login || !password) {
        errorMessageElement.innerText =
            "Musisz podać login i hasło aby się zalogować";
        passwordInputElement.after(errorMessageElement);
        return;
    }
    const response = await fetch(`${backendURL}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: login, password }),
    });
    const responseJson = await response.json();

    const { token, username, _id } = responseJson;

    if (!token || !username) {
        errorMessageElement.innerText = "Podane login i hasło nie są prawdziwe";
        passwordInputElement.after(errorMessageElement);
        return;
    }

    errorMessageElement.remove();

    document.cookie = `token=${token}; path=/; SameSite=None; Secure`;

    localStorage.setItem("username", username);
    localStorage.setItem("id", _id);

    window.location.pathname = "/";
});
