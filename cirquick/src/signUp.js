import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import Cirquick from './CirQuick-backend-client';
const client = new Cirquick.DefaultApi({basePath:"https://cirquick.herokuapp.com"});

class signUp extends Component {
    constructor() {
        super()

        this.state = {
            username: null,
            password: null,
            confirm: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSignUp = this.handleSignUp(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSignUp(e) {
        let error 

        if (this.state.password !== this.state.confirm) {
            alert('Passwords do not match - please try again');
            e.preventDefault();
        }
        else {
            client.signup({
                password: this.state.password,
                username: this.state.username
            }).then(res => {
                console.log(res.data);
            }).catch(err=> error = err)

            if (error.code === 11000) {
                alert('This username already exists! Please try a different username')
            }
            else {
                this.props.history.push("/blank/" + this.state.username)
            }
        }
    }

    render () {
        return (
            <div className = "signUp">
                    <h1 id = "header">CIRQUICK</h1>

                    <h2>Create an Account</h2>

                    <form className = "signUp">
                            <input id = "username" type = "input" name = "username" placeholder="Username" onChange = {this.handleChange}/>
                        <br/>
                            <input id = "password" type = "input" name = "password" placeholder="Password"/>
                        <br/>
                            <input id = "confirmPassword" type = "input" name = "confirm" placeholder="Confirm Password"/>
                        <br/>
                        <br/>
                        <button className = "button">Submit</button>
                    </form>

            </div>
        )
    }
}

export default signUp;