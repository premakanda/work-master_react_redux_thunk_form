import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authReducer from "./auth-reducer";
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import tasksReducer from "./tasks-reducer";

let reducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    tasks: tasksReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(ReduxThunk)));

export default store;








