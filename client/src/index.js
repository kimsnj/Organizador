import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'

import { membres } from './reducers/Membres'

// Containers
import Full from './containers/Full/'

const rootReducer = combineReducers({
  form: formReducer,
  membres
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
  /* preloadedState, */
  composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));

const history = createBrowserHistory();

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" name="Home" component={Full} />
      </Switch>
    </Router>
  </Provider>
), document.getElementById('root'))
