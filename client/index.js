import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App.jsx';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/store.js';
import { render } from 'react-dom'
import promise from 'redux-promise';

// import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(promise, thunk))(createStore);

const store = createStoreWithMiddleware(reducers)


render((
  <Provider store={store}>
    <BrowserRouter>
      <App store={store}/>
    </BrowserRouter>
  </Provider>
  ), document.getElementById('app'))

