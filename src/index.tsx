import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app";
import reducer from "./reducer/reducers";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperation, AuthorizationStatus, ActionCreator} from "./reducer/user/user";
import {createAPI} from "./api";
import thunk from "redux-thunk";


const onUnauthorized = () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));

const api = createAPI(onUnauthorized);

const store = createStore(reducer, compose(
    applyMiddleware(thunk.withExtraArgument(api)),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
));

store.dispatch(DataOperation.loadQuestions());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
