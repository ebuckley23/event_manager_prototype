import React from 'react';
import {Route, Switch, BrowserRouter as Router, Redirect} from 'react-router-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import EventManager from './components/EventManager';
import asyncComponent from './components/AsyncComponent';

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : _ => _;

const configureStore = () => createStore(
  rootReducer,
  process.env.NODE_ENV === 'development'
    ? compose(applyMiddleware(promiseMiddleware()), reduxDevTools)
    : applyMiddleware(promiseMiddleware())
);

const Events = asyncComponent(() => import('./routes/events'));
const Registration = asyncComponent(() => import('./routes/registration'));
const SignIn = asyncComponent(() => import('./routes/sign_in'));
const Awards_Generator = asyncComponent(() => import('./routes/award_generator'));
const Admin = asyncComponent(() => import('./routes/admin'));

const AppRoutes = () => (
  <Switch>
    <Route exact path='/' component={Events} />
    <Route exact path='/registration/:eventId' component={Registration} />
    <Route exact path='/admin' component={Admin} />
    <Route path='/sign_in/:eventId' component={SignIn} />
    <Route path='/award_generator/:eventId' component={Awards_Generator} />
  </Switch>
);
export default() => (
  <Provider store={configureStore()}>
    <Router>
      <Route render={props => (
        <EventManager {...props}>
          <AppRoutes />
        </EventManager>
      )}
      />
    </Router>
  </Provider>
);