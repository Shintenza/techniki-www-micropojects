window.onload = async () => {
  const backendURL = "http://localhost:8080";
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));

  const token = tokenCookie ? tokenCookie.split("=")[1] : null;

  const userID = localStorage.getItem("id");

  if (!token || !userID) {
    window.location.pathname = "/";
    return;
  }

  const response = await fetch(
    `${backendURL}/quiz/get-user-results?id=${userID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const responseJson = await response.json();

  const containerElem = document.querySelector(".container");

  if (responseJson.length == 0) {
    const responseElem = document.createElement('p');
    responseElem.innerText = 'brak wcześniejszych podejść do quizu';
    containerElem.appendChild(responseElem);
    return;
  }

  responseJson.forEach((result) => {
    containerElem.appendChild(
      createResultContainer(result.timestamp, result.score),
    );
  });
};

const createResultContainer = (date, score) => {
  const dateObj = new Date(date);

  const formatOptions = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat('pl-PL', formatOptions);
  const formattedDate = formatter.format(dateObj);

  const resContainer = document.createElement("div");
  resContainer.classList.add("result_box");
  const dateElem = document.createElement("p");
  const scoreElem = document.createElement("p");
  dateElem.innerText = `Data: ${formattedDate}`;
  scoreElem.innerText = `Punkty: ${score}`;
  resContainer.appendChild(dateElem);
  resContainer.appendChild(scoreElem);

  return resContainer;
};
