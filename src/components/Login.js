import React from 'react';
import axios from 'axios';

import Auth from '..lib/auth';
//add flash when created

class Login extends React.Component {
  constructor() {
    super();
    this.state = { credentials: null };
  }

  handleChange(e) {
    const credentials = { ...this.state.credentials, [e.target.name]: e.target.value };
    this.setState({ credentials, error: ''});
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/login', this.state.credentials)
      .then( res => {
        //store the token in localStorage for use later...
        Auth.setToken(res.data.token);
        //add flash message here
        this.props.history.push('/products');
      })
      .catch(() => this.setState({ error: 'Invalid credentials' }));
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className={`input ${this.state.error ? 'is-danger' : ''}`}
              name="email"
              placeholder="Email"
              onChange={this.handleChange} />
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${this.state.error ? 'is-danger' : ''}`}
              name="password"
              type="password"
              placeholder="Password" onChange={this.handleChange} />
          </div>
          {this.state.error && <small className="help is-danger">{this.state.error}</small>}
        </div>

        <button className="button is-primary">Submit</button>
      </form>
    );
  }


}

export default Login;
