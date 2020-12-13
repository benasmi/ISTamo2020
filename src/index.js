import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginPage from './pages/LoginPage';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";
import history from './helpers/history'
import {AuthenticatedRoute} from './components/AuthenticatedRoute'
import {ToastProvider} from "./contexts/ToastContext";

ReactDOM.render(
  <React.StrictMode>
      <ToastProvider>
          <Router history={history}>
              <Switch>
                  <Redirect exact from="/" to="/app/news"/>
                  <Redirect exact from="/app" to="/app/news"/>
                  <AuthenticatedRoute path="/app" component={App}/>
                  <Route path="/login" component={LoginPage}/>
              </Switch>
          </Router>
      </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);