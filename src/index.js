import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const SETTINGS = {
  errorsCount: 3,
};

ReactDOM.render(
    <App errorsCount={SETTINGS.errorsCount} />,
    document.querySelector(`#root`)
);
