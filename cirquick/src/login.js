import React from 'react';
import './App.css';

function Login() {
 return(
  <div className = "login">
   <h1 className = "header">CIRQUICK</h1>

   <h2>LOG IN</h2>

   <h4>Username</h4>
   <input id = "username" type = "input"/>
   <h4>Password</h4>
   <input id = "password" type = "input"/>

   <br/>
   <br/>
   
   <button className = "button">Submit</button>
   <h5>Create an account</h5>
  </div>
 );
}

export default Login;