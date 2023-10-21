const questions = [
  {
    question: "Którego tagu używa się do listy numerowanej w HTML?",
    answers: [
      { text: "ul", correct: false },
      { text: "li", correct: false },
      { text: "lu", correct: false },
      { text: "ol", correct: true },
    ],
  },
  {
    question:
      "Jak zapisać link na stronie, który będzie podpisany „Tu jest link” w HTML?",
    answers: [
      { text: "<a>Tu jest link</a>", correct: false },
      { text: "<a src=https://www.link.com/>Tu jest link</a>", correct: false },
      { text: "<a href=https://www.link.com/>Tu jest link</a>", correct: true },
      {
        text: "<a this=https://www.link.com/>Tu jest link</a>",
        correct: false,
      },
    ],
  },
  {
    question: "Który tag używa się do podkreślania tekstu w HTML?",
    answers: [
      { text: "<underlined>", correct: false },
      { text: "<ul>", correct: false },
      { text: "<c>", correct: false },
      { text: "<u>", correct: true },
    ],
  },
  {
    question:
      "Jakiej właściwości trzeba użyć, aby zmienić kolor tła elementu w CSS?",
    answers: [
      { text: "background-color", correct: true },
      { text: "background-colour", correct: false },
      { text: "color", correct: false },
      { text: "coloring", correct: false },
    ],
  },
  {
    question: "Jak napisać komentarz w CSS?",
    answers: [
      { text: "//", correct: false },
      { text: "/* */", correct: true },
      { text: "#", correct: false },
      { text: "<comment></comment>", correct: false },
    ],
  },
  {
    question: "Jak napisać komentarz w HTML?",
    answers: [
      { text: "//", correct: false },
      { text: "/* */", correct: false },
      { text: "<!-- -->", correct: true },
      { text: "<comment></comment>", correct: false },
    ],
  },
  {
    question:
      "W kodzie poniżej w jakiej kolejności jest definiowany rozmiar krawędzi? p {margin: 10px 20px 30px 100px;}",
    answers: [
      { text: "Górna, dolna, prawa, lewa", correct: false },
      { text: "Dolna, górna, prawa, lewa", correct: false },
      { text: "Górna, prawa, dolna, lewa", correct: true },
      { text: "Prawa, lewa, dolna, górna", correct: false },
    ],
  },
  {
    question:
      "Jakiej właściwości użyć, aby zmienić tylko szerokość dolnego obramowania elementu?",
    answers: [
      { text: "border-bottom", correct: false },
      { text: "border-width", correct: false },
      { text: "border-bottom-width", correct: true },
      { text: "border-width-bottom", correct: false },
    ],
  },
  {
    question: "Jakiego stopnia jest największy numer nagłówka w HTML?",
    answers: [
      { text: "h5", correct: false },
      { text: "h6", correct: true },
      { text: "h7", correct: false },
      { text: "h8", correct: false },
    ],
  },
  {
    question: "Jakiej właściwości trzeba użyć, aby ustawić daną czcionkę?",
    answers: [
      { text: "font-family", correct: true },
      { text: "font-name", correct: false },
      { text: "font-style", correct: false },
      { text: "font-styling", correct: false },
    ],
  },
  {
    question: "Co powoduje tag <s> w HTML-u?",
    answers: [
      { text: "pochylenie tekstu", correct: false },
      { text: "przekreślenie tekstu", correct: true },
      { text: "podkreślenie tekstu", correct: false },
      { text: "pogrubienie tekstu", correct: false },
    ],
  },
];
