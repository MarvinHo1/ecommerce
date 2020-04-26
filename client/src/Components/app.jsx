import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation
} from "react-router-dom";
import Login from './login/login.jsx';
import UserRegister from './login/register.jsx';
import Home from './landing_page/home.jsx';
import Nav from './navbar/nav.jsx';
import Test from './landing_page/test.jsx';


class Ecommerce extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/test" exact component={Test} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={UserRegister} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default Ecommerce;
