import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import { logger } from "redux-logger";
import users from "./reducers/usersReducer";

let store = createStore(users, applyMiddleware(promiseMiddleware, logger));

export default store;
