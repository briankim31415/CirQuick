import React, {useState, Component} from 'react';
import './App.css';
import './Popup.css';
import './Body.css';
import {Link, useParams} from 'react-router-dom';
import {withRouter} from "react-router";
import {DefaultApi} from 'cirquick';
import Popup from './Popup.js'
import Login from './login';
import axios from "axios"
const client = new DefaultApi({basePath:"https://cirquick.herokuapp.com"});
//test user is gonna be 0a3b60a9-eed7-4892-b480-dc1c3336f8e9, username is dog, pass is cat;

class Blank extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            userId : this.props.match.params.userId,
            dropdown : "",
            buttonPopup: false,
        }

        this.handlePopup = this.handlePopup.bind(this)
        this.handleProjectChange = this.handleProjectChange.bind(this)
    }

    handlePopup = (e) => {
        this.setState({
            buttonPopup: !this.state.buttonPopup
        })
    }

    handleProjectChange = (event) => {
        this.setState({
            dropdown: event.target.value
        })
    }

    render () {
        return (
            <div>
                <h1 id = "head">CIRQUICK</h1>
    
                <div class = "wrapper">
                    <div class = "sidebar">  
                            <button className = "sidebar-button" onClick = {this.handlePopup}>Add New Project</button>                  
                        <br/>
                        <br/>
                        <br/>
                        <Link to={`/dataSet/${this.state.userId}`}>
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
                            <JoinProject userName = {this.state.userId}/>
                            <PopupForm userName = {this.state.userId} pop = {this.handlePopup} buttonPopup={this.state.buttonPopup}/>
                    </div>
                    
                    <div>
                        <Drop handler = {this.handleProjectChange} name = {this.state.dropdown}/>
                        <ProjectBody userId={this.state.userId} projectId={this.state.dropdown}/>
                    </div>

                </div>
            </div>
        )
    }
}

class Drop extends Component {
    constructor(props) {
      super(props);
      this.state = {
          projects: []
      }
    }

    componentDidMount() {
        client.getUserProjects(
            "0a3b60a9-eed7-4892-b480-dc1c3336f8e9" //TODO ..............................................................................
        )
        .then( (res) => {
            this.setState ({
                projects: res.data
            })
        }
        )
    }
  
    render() {
  
      return(
        <div className = "dropdown">
          <form>
            <label className = "drop-label">Search Project</label>
            <br/>

            <select 
                className = "drop"
                value = {this.props.name} 
                onChange = {this.props.handler}>
                {this.state.projects.map(project=>(
                    <option value = {project.projectId}>{project.name}</option>
                ))}
            </select>
          </form>
          {console.log(this.props.name)}
        </div>
      );
  
    }
  }

class ProjectBody extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectId: props.projectId,
            projectName: "", //this comes from the value of the drop down
            resources: ["HW Set 1", "HW Set 2"], //hard coded for now
            totalResoucesUsed: null, //1
            projectResources: [], //1
            userResources: [], //1
            availability: [110, 50], //2,3
            capacity: [150,100], //2,3
            lastchecked: []
        }
    }

    componentDidMount() {
        if (this.state.projectId??null == null) {
            return
        }
        //1   
        client.getProject(
            this.state.projectId,
        )
        .then(res => {
            const defaultCase ={
                usersCheckedOut: [],
                totalResources:0
            }
            let userResources = [];
            let set1 = res.data.resources??{}.HW_SET_1??defaultCase;
            let set2 = res.data.resources??{}.HW_SET_2??defaultCase;
            
            let item = set1.usersCheckedOut.filter(user => user.checkedOutBy === this.props.userId)
            if(item.length<1){
                userResources.push(0)
            }
            else{
                userResources.push(item[0].amount)
            }
        
            item = set2.usersCheckedOut.filter(user => user.checkedOutBy === this.props.userId)
            if(item.length<1){
                userResources.push(0)
            }
            else{
                userResources.push(item[0].amount)
            }
            
            
            this.setState({
                ...this.state,
                totalResourcesUsed: res.data.currentResources,
                projectResources: [1,1],
                userResources: [1,1],
                projectName: res.data.name,
                projectResources: [set1.totalResources, set2.totalResources],
                userResources: userResources,
            })
        });

        let availability = [];
        let capacity = [];
        //2
        Promise.all([
            client.getResource(
                "HW_SET_1"
            ),
            client.getResource(
                "HW_SET_2"
            ),
        ]).then(res => {
            availability.push(res[0].data.availablity);
            availability.push(res[1].data.availablity);
            capacity.push(res[0].data.capacity);
            capacity.push(res[1].data.capacity);
            this.setState({
                ...this.state,
                availability: availability,
                capacity: capacity
            })
        })


    }

    render() {
        return(
            <div className = "projectMain">
                <h1 className="projectHeader">{this.state.projectName}</h1>
                    <div className = "projectInfo">
                        <h2 className="total">Total Resources Used: {this.state.totalResoucesUsed}</h2> 
                        <div className = "resource">
                            <h2 className="resourceHeader">{this.state.resources[0]}</h2>
                                <div className = "resourceContainer">
                                    <div className = "resourceDetail">
                                        <h3>Resources Used by Project: {this.state.projectResources[0]}</h3>
                                        <h3>Resources Used by You: {this.state.userResources[0]}</h3>
                                        <h3>Resources Available: {this.state.availability[0]} / {this.state.capacity[0]}</h3>
                                    </div>
                                    <Form user = {this.props.userId} project = {this.props.projectId} resName = {"HW_SET_1"} userRes = {this.state.userResources[0]} cap = {this.state.capacity[0]} ava = {this.state.availability[0]} cli = {client}/>
                                </div>
                        </div>
                        
                        <div className = "resource">
                            <h2 className="resourceHeader">{this.state.resources[1]}</h2>
                                <div className = "resourceContainer">
                                    <div className = "resourceDetail">
                                        <h3>Resources Used by Project: {this.state.projectResources[1]}</h3>
                                        <h3>Resources Used by You: {this.state.userResources[1]}</h3>
                                        <h3>Resources Available: {this.state.availability[1]} / {this.state.capacity[1]}</h3>
                                    </div>
                                    <Form user = {this.props.userId} project = {this.props.projectId} resName = {"HW_SET_2"} userRes = {this.state.userResources[1]} cap = {this.state.capacity[1]} ava = {this.state.availability[1]}/>
                                </div>
                        </div>
                    </div>
            </div>
        )
    
    }

}

class Form extends Component {
    constructor(props) {
        super (props)
        this.state = {
            amount: null 
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleCheckin = this.handleCheckin.bind(this)
        this.handleCheckout = this.handleCheckout.bind(this)
        
    }

    handleChange(e) {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({
                amount: e.target.value
            })
        }
    }

    handleCheckin(e) {
        const Checkin = this.state.amount
            e.preventDefault();

        if (Checkin > this.props.userRes) {
            alert('User does not have this many resources checked out - please try again');
        }
        else {
            client.checkinResource({
                "projectId": this.props.project,
                "userId": this.props.user,
                "amount": Checkin,
                "hwSetId": this.props.resName
            }).then(res => {
                window.location.reload();
                console.log(res.data);
            }).catch(err=>console.log(err));
        }
    }

    handleCheckout(e) {
        const CheckOut = this.state.amount
        e.preventDefault();

        if (CheckOut > this.props.ava) {
            alert('Not enough resources to checkout - please try again');
        }
        else {
            client.checkoutResource({
                "projectId": this.props.project,
                "userId": this.props.user,
                "amount": CheckOut,
                "hwSetId": this.props.resName
            }).then(res => {
                window.location.reload();
                console.log(res.data);
            }).catch(err=>console.log(err));
        }
    }

    render () {
        return (
            <form className = "checking">
                <input type="text" name="check" placeholder="Amount" value = {this.state.amount} onChange = {this.handleChange}/>

                <div className="buttons">
                    <button className="button1" onClick = {this.handleCheckin}>Check In</button>
                    <button className="button2" onClick = {this.handleCheckout}>Check Out</button>
                </div>

            </form>
        )
    }

}

class PopupForm extends Component {
    constructor(props) {
        super (props);

        this.state = {
            name: null, // Name of project
            desc: null, // Description of project
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    
    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleDescChange(e) {
        this.setState({
            desc: e.target.value
        })
    }

    handleAdd(e) {
        let project_name = this.state.name;
        let desc = this.state.desc;
        let invalid_input = false;
        e.preventDefault();

        // Check for valid input
        if (project_name === null || desc === null) {
            invalid_input = true;
            alert('Invalid input - please try again');
        }

        if (!invalid_input) {
            // Create the project
            try {
                client.createProject({
                    "userId": this.props.userId,
                    "description": desc,
                    "name": project_name
                }).then(res => {
                    console.log(res.data);
                }).catch(err => console.log(err)); 
                alert('Project created');
            } catch (error) {
                alert('Could not add create project - please try again');
            }
        }
    }

    render () {
        return (
            <div className = "pop">
                {console.log(this.props.buttonPopup)}
                {this.props.buttonPopup ? <Popup trigger = {this.props.pop}>
                    <h2>Add New Project</h2>
                    <input 
                        id = "name" 
                        type = "text" 
                        placeholder="Name" 
                        value = {this.state.name} 
                        onChange = {this.handleNameChange}
                    />
                    <br/>
                    <input 
                        id = "description" 
                        type = "text" 
                        placeholder="Description" 
                        value = {this.state.desc} 
                        onChange = {this.handleDescChange}
                    />
                    <br/>   
                    <button className = "button" onClick = {this.handleAdd}>Add</button>
                </Popup>: null}
         </div>
        )
    }
}

class JoinProject extends Component {
    constructor(props) {
        super (props);

        this.state = {
            name: null
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    async handleJoin(e) {
        const project_name = this.state.name;
        e.preventDefault();

        try {
            // Get project ID
            const res = await axios.get(`https://cirquick.herokuapp.com/project?name=${project_name}`);
            let pid = res.data[0].projectId;

            // Check if project ID is correct
            if (res.data[0].name !== project_name) { throw e; }

            // Add user to project
            client.addUserToProject({
                "projectId": pid,
                "userId": this.props.userId
            }).then(res => {
                console.log(res.data);
            }).catch(err => console.log(err));   
            alert('Project successfully added');
        } catch (error) {
            alert('Project does not exist - please try again');
        }
    }

    render () {
        return (
            <div>
                <input 
                    id = "searchID" 
                    className = "sidebar-input" 
                    type = "text" 
                    placeholder="Search Project Name"
                    value = {this.state.name}
                    onChange = {this.handleChange}
                />
                <br/>
                <br/>
                <button className = "sidebar-button" onClick = {this.handleJoin}>Join Project</button>
            </div>
        )
    }
}

export default withRouter(Blank);
