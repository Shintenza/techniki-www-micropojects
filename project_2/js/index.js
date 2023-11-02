const backendURL = "http://localhost:8080";

const ifLoggedIn = () => {
    const username = localStorage.getItem("username");
    const userID = localStorage.getItem("id");
    const authorizationReq = document.querySelector(".auth_req");
    const menu = document.querySelector(".menu");
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

    const token = tokenCookie ? tokenCookie.split("=")[1] : null;

    if (token && username && userID) {
        authorizationReq.classList.add("hidden");
        menu.classList.remove("hidden");
        const usernameGreeting = document.querySelector(".menu_greeting");
        usernameGreeting.innerText = `Witaj ${username}`;
    }
};

window.onload = ifLoggedIn;

const startQuizButton = document.querySelector(".start_quiz_btn");

startQuizButton.addEventListener("click", async () => {
    const token = getTokenFromCookie();

    const response = await fetch(`${backendURL}/quiz`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const responseJson = await response.json();
    localStorage.setItem("questions", JSON.stringify(responseJson));
    window.location.pathname = "/pages/quiz.html";
});

const viewHistoryButton = document.querySelector('.history_quiz_btn');

viewHistoryButton.addEventListener("click", ()=>{
    window.location.pathname = '/pages/latest_results.html'
})

const getTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

    const token = tokenCookie ? tokenCookie.split("=")[1] : null;
    console.log(token);
    return token;
};
