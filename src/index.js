import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import questions from "./mocks/questions.js";
import {reducer} from "./reducer.js";

const SETTINGS = {
  errorsCount: 3,
};

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f;

const store = createStore(reducer, reduxDevTools);

ReactDOM.render(
    <Provider store={store}>
      <App
        errorsCount={SETTINGS.errorsCount}
        questions={questions}
      />
    </Provider>,
    document.querySelector(`#root`)
);
