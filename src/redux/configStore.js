import { applyMiddleware, combineReducers, createStore } from "redux";
import dict from './modules/dict'
import thunk from 'redux-thunk'

const middlewares = [thunk]
// combineReducers로 리듀서 파일을 묶어준다.
const rootReducer = combineReducers({dict});
// applyMiddleware로 사용된 미들웨어 들도 모아준다.
const enhancer = applyMiddleware(...middlewares)
// 미들웨어와 리듀서들을 모아 createStore로 스토어를 생성해준다.
const store = createStore(rootReducer, enhancer)

export default store;