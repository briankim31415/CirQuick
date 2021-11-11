import React, { Component } from "react";
import "./App.css";
import { DefaultApi } from "cirquick";
const client = new DefaultApi({ basePath: "https://cirquick.herokuapp.com" });

class signUp extends Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      confirm: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(this.state);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password !== this.state.confirm) {
      alert("Passwords do not match - please try again");
    } else {
      if (this.state.password && this.state.username) {
        client
          .signup({
            username: this.state.username,
            password: this.state.password,
          })
          .then((res) => {
            this.props.history.push("/blank/" + res.data.userId);
          })
          .catch((err) => {
            if (err.response ?? { status: 0 }.status === 500) {
              alert("Username already exists - please try again");
            } else {
              alert("Something went wrong - please try again");
            }
          });
      }
    }
  }

  render() {
    return (
      <div className="signUp">
        <h1 id="header">CIRQUICK</h1>

        <h2>Create an Account</h2>

        <form className="signUp" onSubmit={this.handleSubmit}>
          <input
            id="username"
            type="input"
            name="username"
            placeholder="Username"
            onChange={this.handleChange}
          />
          <br />
          <input
            id="password"
            type="input"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
          <br />
          <input
            id="confirmPassword"
            type="input"
            name="confirm"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
          <br />
          <br />
          <button className="button">Submit</button>
        </form>
      </div>
    );
  }
}

export default signUp;
