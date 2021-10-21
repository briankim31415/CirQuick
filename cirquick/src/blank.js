import React, {useState, Component} from 'react';
import './App.css';
import './Popup.css';
import './Body.css';
import {Link} from 'react-router-dom';
import Dropdown from './Dropdown';
import Popup from './Popup';

function Blank() {
    const[buttonPopup, setButtonPopup] = useState(false);

    return (
        <div>
            <h1 id = "header">CIRQUICK</h1>

            <div class = "wrapper">

                <div class = "sidebar">
                
                    <button className = "sidebar-button" onClick = {() => setButtonPopup(true)}>Add New Project</button>
                
                    <br/>
                    <br/>
                    <br/>
                
                    <Link to = "/dataSet">
                    <button className = "sidebar-button">Data Download</button>
                    </Link>
                    <br/>
                    <br/>
                    <br/>
                    <Link to = "/">
                    <button className = "sidebar-button">Log Out</button>
                    </Link>
                    <br/>
                    <br/>
                    <br/>
                    
                    <input id = "searchID" className = "sidebar-input" type = "input" placeholder="Search Project ID"/>
                    <br/>
                    <br/>
                    <button className = "sidebar-button">Join Project</button>
                </div>

                <div className = "login">
                    <Popup trigger = {buttonPopup} setTrigger = {setButtonPopup}>
                        <h2>Add New Project</h2>
                        <input id = "name" type = "input" placeholder="Name"/>
                        <br/>
                        <input id = "description" type = "input" placeholder="Description"/>
                        <br/>
                        <input id = "projectID" type = "input" placeholder="Project ID"/>
                        <br/>   
                        <button className = "button">Add</button>
                    </Popup>
                </div>

                <div>
                    <Dropdown />
                    <ProjectBody />
                </div>
            </div>
        </div>
    )
}

class ProjectBody extends Component {

    constructor() {
        super()
        this.state = {
            projectName: "Project_1",
            resources: ["HW Set 1", "HW Set 2"],
            totalResoucesUsed: 50,
            projectResources: [30, 20],
            userResources: [20, 20],
            availability: [110, 50],
            totalResouces: [150,100],
            lastchecked: []
        }
    }

    render() {
        return(
<div className = "projectMain">
        <h1 className="projectHeader">{this.state.projectName}</h1>
            <div className = "projectInfo">
                <h2 className="total">Total Resources Used: {this.state.totalResoucesUsed}
                </h2> 
                <div className = "resource">
                    <h2 className="resourceHeader">{this.state.resources[0]}</h2>
                        <div className = "resourceContainer">
                            <div className = "resourceDetail">
                                <h3>Resources Used by Project: {this.state.projectResources[0]}</h3>
                                <h3>Resources Used by You: {this.state.userResources[0]}</h3>
                                <h3>Resources Available: {this.state.availability[0]} / {this.state.totalResouces[0]}</h3>
                            </div>
                            <form className = "checking">
                                <input type="text" name="check" placeholder="Amount" value={this.state.lastchecked[0]} />
                                <div className="buttons">
                                    <button className="button1">Check In</button>
                                    <button className="button2">Check Out</button>
                                </div>
                            </form>
                        </div>
                </div>
                <div className = "resource">
                    <h2 className="resourceHeader">{this.state.resources[1]}</h2>
                        <div className = "resourceContainer">
                            <div className = "resourceDetail">
                                <h3>Resources Used by Project: {this.state.projectResources[1]}</h3>
                                <h3>Resources Used by You: {this.state.userResources[1]}</h3>
                                <h3>Resources Available: {this.state.availability[1]} / {this.state.totalResouces[1]}</h3>
                            </div>
                            <form className = "checking">
                                <input type="text" name="check" placeholder="Amount" value={this.state.lastchecked[0]} />
                                <div className="buttons">
                                    <button className="button1">Check In</button>
                                    <button className="button2">Check Out</button>
                                </div>
                            </form>
                        </div>
                </div>
        </div>
    </div>
        )
    
    }

}

export default Blank;