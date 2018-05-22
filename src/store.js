import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import logger from 'redux-logger'

import reducers from "./reducers"

import api from './middlewares/api';
import session from './middlewares/session';

const middleware = applyMiddleware(
    thunk,
    logger,
    api,
    session
);

const store = createStore(reducers, middleware);

export default store
