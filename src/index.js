import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import questions from "./mocks/questions.js";

const SETTINGS = {
  errorsCount: 3,
};

ReactDOM.render(
    <App
      errorsCount={SETTINGS.errorsCount}
      questions={questions}
    />,
    document.querySelector(`#root`)
);
