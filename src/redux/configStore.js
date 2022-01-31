import { combineReducers, createStore } from "redux";
import dict from './modules/dict'



const rootReducer = combineReducers({dict});

const store = createStore(rootReducer)

export default store;