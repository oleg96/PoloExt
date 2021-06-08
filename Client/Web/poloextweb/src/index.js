import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducers/index.js';
import thunk from 'redux-thunk';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm.js';
import Overview from './components/Overview/Overview.js';
import Calculator from './components/Calculator/Calculator.js';
import Poloniex from './components/Poloniex/Poloniex.js';
import Nicehash from './components/Nicehash/Nicehash.js';
import Credentials from './components/Credentials/Credentials.js';
import App from './components/App/App.js';
import NotFound from './components/NotFound/NotFound.js';
import Auth from './security/auth.js';
import './stylesheets/main.scss';

const composeEnhancers = compose;

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact={true} path="/login" component={LoginForm} />
          <AuthenticatedRoute exact={true} path="/overview" component={Overview} />
          <AuthenticatedRoute exact={true} path="/calculator" component={Calculator} />
          <AuthenticatedRoute exact={true} path="/poloniex" component={Poloniex} />
          <AuthenticatedRoute exact={true} path="/nicehash" component={Nicehash} />
          <AuthenticatedRoute exact={true} path="/credentials" component={Credentials} />
          <Redirect exact={true} from="/logout" to="/login" />
          <Redirect exact={true} from="/" to="/overview" />
          <Route path="**" component={NotFound} />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

function AuthenticatedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => Auth.isUserAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
}
