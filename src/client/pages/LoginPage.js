import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions';
import requireNoAuth from '../components/hocs/requireNoAuth';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleSubmit() {
    this.props.signin(this.state);
  }

  render() {
    return (
      <div className="container">
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
        <button className="styled-button" onClick={this.handleSubmit.bind(this)}>Login</button>
        <Link to="/signup">Sign up instead</Link>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default {
  component: connect(mapStateToProps, { signin })(
    requireNoAuth(LoginPage)
)};
