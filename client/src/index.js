import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'

// Containers
import Full from './containers/Full/'

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const history = createBrowserHistory();

ReactDOM.render((
  <Provider store={store}>
    <HashRouter history={history}>
      <Switch>
        <Route path="/" name="Home" component={Full} />
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'))
