import React, { Component } from "react";
import swal from "sweetalert";
import { Button, TextField, Link } from "@material-ui/core";
import { withRouter } from "./utils";
const axios = require("axios");

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirm_password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  validateEmail = (email) => {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  validatePassword = (password) => {
    // Password validation regex patterns
    const lengthPattern = /.{8,}/;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const numericPattern = /\d/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      lengthPattern.test(password) &&
      uppercasePattern.test(password) &&
      lowercasePattern.test(password) &&
      numericPattern.test(password) &&
      specialCharPattern.test(password)
    );
  };

  register = () => {
    const { username, password, confirm_password } = this.state;

    // Validations
    if (!this.validateEmail(username)) {
      swal({
        text: "Please enter a valid email address.",
        icon: "error",
        type: "error"
      });
      return;
    }

    if (!this.validatePassword(password)) {
      swal({
        text: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric value, and one special character.",
        icon: "error",
        type: "error"
      });
      return;
    }

    if (password !== confirm_password) {
      swal({
        text: "Passwords do not match.",
        icon: "error",
        type: "error"
      });
      return;
    }

    axios.post('http://localhost:2000/register', {
      username: username,
      password: password,
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      // this.props.history.push('/');
      this.props.navigate("/");
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  render() {
    return (
      <div style={{ marginTop: '200px' }}>
        <div>
          <h2>Register</h2>
        </div>

        <div>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
            placeholder="User Name"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
            placeholder="Password"
            required
          />
          <br /><br />
          <TextField
            id="standard-basic"
            type="password"
            autoComplete="off"
            name="confirm_password"
            value={this.state.confirm_password}
            onChange={this.onChange}
            placeholder="Confirm Password"
            required
          />
          <br /><br />
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            disabled={this.state.username === '' || this.state.password === ''}
            onClick={this.register}
          >
            Register
          </Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            // href="/"
            component="button"
            style={{ fontFamily: "inherit", fontSize: "inherit" }}
            onClick={() => {
              this.props.navigate("/");
            }}
          >
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);