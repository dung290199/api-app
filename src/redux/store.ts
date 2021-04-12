import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../redux/reducers/index';
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

// const middleware = [thunk];

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
export default store;
