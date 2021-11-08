import React, {Component} from 'react';
import './App.css';
import './Popup.css';
import {Link} from 'react-router-dom';
import { DefaultApi } from "cirquick";
const client = new DefaultApi({ basePath: "https://cirquick.herokuapp.com" });

class Login extends Component {
    constructor(props) {

        super();

        this.state = {
            username : null,
            password : null
        }

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
        var invalid_user = false;
        const name = this.state.username;
        const pw = this.state.password;

        if(name === "" || pw === "") {
            invalid_user = true;
            e.preventDefault();
            alert("Invalid input - Please try again");
        }
        
        
        client.signin({
            username: name,
            password: pw
        }).then(res => {
            if(res.data.error ) {
               // alert("Invalid username or password")
                alert(res.data.error)
            }else {
                this.props.history.push("/blank/" + res.data.userId);
            }
        }).catch((err) => {
            alert("Invalid username or password")
        });
    
        

    }

    render() {
        return(
            <div className = "login">
                <h1 id = "header">CIRQUICK</h1>
            
                <h2>LOG IN</h2>

                <form className = "login" onSubmit = {this.handleSubmit}>

                <input id = "username" type = "input" name ="username" placeholder="Username" onChange = {this.handleChange}/>
                <br/>
                <br/>
                <input id = "password" type = "input" name = "password" placeholder="Password" onChange = {this.handleChange}/>

                <br/>
                <br/>
                
                
                <button className = "button">Submit</button>
                

                <br/>
                <br/>

                <Link to = "/signUp">
                    <button className = "newAccount">Create an account</button>
                </Link>
            </form>
            </div>
        )
    }
}
export default Login;