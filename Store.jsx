

import { createStore } from 'redux';
import rootReducer from './reducers/Index';

let store;
let reduxDevTools;
if (typeof window !== 'undefined') {
  
   reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  store = createStore(rootReducer, reduxDevTools);
} else {
  store = createStore(rootReducer,reduxDevTools);
}

export default store;