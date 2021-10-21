import React from 'react';
import './App.css';
import './Popup.css';
import {Link} from 'react-router-dom';

function Login() {
    return(
            <div className = "login">
                <h1 id = "header">CIRQUICK</h1>
            
                <h2>LOG IN</h2>

                <input id = "username" type = "input" placeholder="Username"/>
                <br/>
                <input id = "password" type = "input" placeholder="Password"/>

                <br/>
                <br/>
                
                <Link to  = "/dataSet">
                    <button className = "button">Submit</button>
                </Link>

                <br/>
                <br/>

                <Link to = "/signUp">
                    <button className = "newAccount">Create an account</button>
                </Link>

            </div>
    );
}

export default Login;