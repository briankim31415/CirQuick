import React, {useState, Component} from 'react';
import './App.css';
import './Popup.css';
import './Body.css';
import {Link, useParams} from 'react-router-dom';
import Popup from './Popup';
import {DefaultApi} from 'cirquick';
import Login from './login';
const client = new DefaultApi({basePath:"https://cirquick.herokuapp.com"});

function Blank() {
    const {username} = useParams();
    const {userId} = useParams()//test user is gonna be 0a3b60a9-eed7-4892-b480-dc1c3336f8e9, username is dog, pass is cat;
    const[buttonPopup, setButtonPopup] = useState(false);

    return (
        <div>
            <h1 id = "head">CIRQUICK {username}</h1>

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
                    
                    <JoinProject userName = {username}/>
                </div>

                <div className = "login">
                    <PopupForm userName = {username} button = {buttonPopup} setButton = {setButtonPopup}/>
                </div>

                <div>
                    <Drop username = {username}/>
                    <ProjectBody userId={userId} projectId="d225bd8c-f517-481d-ad29-ae68344a9da8"/>
                </div>
            </div>
        </div>
    )
}

class Drop extends Component {
    constructor(props) {
      super(props);
      this.state = {
        projectName : null,
        projectId : props.projectId
      }

        this.handleDrop = this.handleDrop.bind(this)
    }

    
    handleDrop = (e) => {
        let userProjects = [];
        e.preventDefault();
        client.getProject(
            this.state.projectId
        ).then(res => {
            console.log(res.data);
            userProjects.push(res[0].data.name);
        })
        this.setState({
            ...this.state, 
            projectName: userProjects[0]
        })
    }

    render() {
  
      return(
        <div className = "dropdown">
          <form>
            <label className = "drop-label">Search Project</label>
            <br/>

            <select 
                className = "drop"
                value = {this.state.projectName} 
                onChange = {this.handleDrop}>
              <option value = {this.state.projectName}>{this.state.projectName}</option>
              <option value = "project2">Project_2</option>
            </select>
            <p>{this.state.projectName}</p>
          </form>
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
        //1   
        client.getProject(
            this.state.projectId,
        )
        .then(res => {
            let userResources = [];
            let item = res.data.resources.HW_SET_1.usersCheckedOut.filter(user => user.checkedOutBy === this.props.userId)
            if(item.length<1){
                userResources.push(0)
            }
            else{
                userResources.push(item[0].amount)
            }
            item = res.data.resources.HW_SET_2.usersCheckedOut.filter(user => user.checkedOutBy === this.props.userId)
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
                projectResources: [res.data.resources.HW_SET_1.totalResources, res.data.resources.HW_SET_2.totalResources],
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
    constructor() {
        super ();

        this.state = {
            name: null, // Name of project
            desc: null, // Description of project
        };
        
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd(e) {
        const name = this.state.name;
        const desc = this.state.desc;
        var invalid_input = false;

        // Check for valid input
        if (name === "" || desc === "") {
            invalid_input = true;
            e.preventDefault();
            alert('Invalid input - please try again');
        }

        if (!invalid_input) {
            try {
                // Check if project ID already exists
                client.getProject({
                    id: name    // **Check if right variable!
                });

                e.preventDefault();
                alert('Project already exists - please try again');
            } catch (error) {
                // Create project and add user to it
                client.createProject({
                    "userId": this.props.userName,
                    "description": desc,
                    "name": name
                }).then(res => {
                    console.log(res.data);
                }).catch(err => console.log(err));

                client.addUserToProject({
                    "projectId": name,   // **Check if right variable!
                    "userId": this.props.userName
                }).then(res => {
                    console.log(res.data);
                }).catch(err => console.log(err));

                // Close popup window
                this.props.setTrigger(false);   // **Need to check if this works
            }
        }
    }

    render () {
        return (
            <Popup trigger = {this.props.button} setTrigger = {this.props.setButton}>
                <h2>Add New Project</h2>
                <input 
                    id = "name" 
                    type = "text" 
                    placeholder="Name" 
                    value = {this.state.name} 
                    onChange = {(e) => this.setState(e.target.value)}
                />
                <br/>
                <input 
                    id = "description" 
                    type = "text" 
                    placeholder="Description" 
                    value = {this.state.desc} 
                    onChange = {(e) => this.setState(e.target.value)}
                />
                <br/>   
                <button className = "button" onClick = {this.handleAdd}>Add</button>
            </Popup>
        )
    }
}

class JoinProject extends Component {
    constructor() {
        super ();

        this.state = {
            name: null, // Name of project
        };
        
        this.handleJoin = this.handleJoin.bind(this);
    }

    handleJoin(e) {
        const name = this.state.name;

        try {
            // Find project
            client.getProject({
                id: name     // **Check if right variable!
            });

            // Add user to project
            client.addUserToProject({
                "projectId": name,   // **Check if right variable!
                "userId": this.props.userName
            }).then(res => {
                console.log(res.data);
            }).catch(err => console.log(err));            
        } catch (error) {
            e.preventDefault();
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

export default Blank;