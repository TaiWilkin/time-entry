import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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

  head() {
    return (
      <Helmet>
        <title>Entries App: Signup</title>
        <meta property="og:title" content="Entries App: Signup" />
      </Helmet>
    );
  }

  render() {
    return (
      <div className="container">
        {this.head()}
        <label>
          Username:
          <input
            type="text"
            name="username"
            onChange={e => this.setState({ username: e.target.value })}
            value={this.state.username}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={e => this.setState({ password: e.target.value })}
            value={this.state.password}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={e => this.setState({ email: e.target.value })}
            value={this.state.email}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
        </label>
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
