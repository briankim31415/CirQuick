import React from 'react';
import './App.css';
import Blank from './Blank';
import {Link} from 'react-router-dom';


function signUp() {
    return(
        <div className = "signUp">
                <h1 id = "header">CIRQUICK</h1>

                <h2>Create an Account</h2>

                <input id = "username" type = "input" placeholder="Username"/>
                <br/>
                <input id = "password" type = "input" placeholder="Password"/>
                <br/>
                <input id = "confirmPassword" type = "input" placeholder="Confirm Password"/>

                <br/>
                <br/>
                
                <Link to = "/dataSet">
                    <button className = "button">Submit</button>
                </Link>

            </div>
    )
}

export default signUp;