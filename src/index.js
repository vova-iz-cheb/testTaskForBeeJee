import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import user from './reducers/userReducer';
import tasks from './reducers/taskReducer';

const mainReducer = combineReducers({
  user,
  tasks,
});

const store = createStore(mainReducer);
if (localStorage.getItem('token')) {
  // инициализацию юзера
  store.dispatch({ type: 'LOGIN_SUCCESS' });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
