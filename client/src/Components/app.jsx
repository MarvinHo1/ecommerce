import React from 'react';
import Login from './login/login.jsx'
import UserRegister from './login/register.jsx'


class Ecommerce extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }
  render() {
    return (
      <div>Welp World is Shit
      <Login />
      <UserRegister />
      </div>
    )
  }
}

export default Ecommerce;
