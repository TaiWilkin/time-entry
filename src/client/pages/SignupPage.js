import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup } from '../actions';
import requireNoAuth from '../components/hocs/requireNoAuth';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      name: '',
    };
  }

  handleSubmit() {
    this.props.signup(this.state);
  }

  render() {
    return (
      <div className="container">
        Username:
        <input
          type="text"
          name="username"
          onChange={e => this.setState({ username: e.target.value })}
          value={this.state.username}
        />
        Password:
        <input
          type="password"
          name="password"
          onChange={e => this.setState({ password: e.target.value })}
          value={this.state.password}
        />
        Email:
        <input
          type="email"
          name="email"
          onChange={e => this.setState({ email: e.target.value })}
          value={this.state.email}
        />
        Name:
        <input
          type="text"
          name="name"
          onChange={e => this.setState({ name: e.target.value })}
          value={this.state.name}
        />
        <button className="styled-button" onClick={this.handleSubmit.bind(this)}>Sign up</button>
        <Link to="/login">Log in instead</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default {
  component: connect(mapStateToProps, { signup })(
    requireNoAuth(SignupPage)
  )};
