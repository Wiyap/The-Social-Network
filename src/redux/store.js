import thunkMiddleware from 'redux-thunk'
import userConnectionReducer from "./User/userConnectionReducer";
import { createStore, compose, applyMiddleware } from 'redux';


let store = createStore(
  userConnectionReducer,
  compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

store.subscribe(() => console.log(store.getState()));

export default store