import React, {useState, Component} from 'react';
import './App.css';
import './Popup.css';
import './Body.css';
import {Link, useParams} from 'react-router-dom';
import Popup from './Popup';
import {DefaultApi} from 'cirquick';
import axios from 'axios';
const client = new DefaultApi({basePath:"https://cirquick.herokuapp.com"});

function Blank() {
    const {userId} = useParams()//test user is gonna be 0a3b60a9-eed7-4892-b480-dc1c3336f8e9, username is dog, pass is cat;
    const[buttonPopup, setButtonPopup] = useState(false);

    return (
        <div>
            <h1 id = "head">CIRQUICK</h1>

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
                    <Drop />
                    <ProjectBody userName={userId} projectId="d225bd8c-f517-481d-ad29-ae68344a9da8"/>
                </div>
            </div>
        </div>
    )
}

class Drop extends Component {
    constructor(props) {
      super(props);
      this.state = {
        projectName : ''
      }
    }
  
    handleProjectChange = (event) => {
        this.setState({
            projectName: event.target.value
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
                onChange = {this.handleProjectChange}>
              <option value = "project1">Project_1</option>
              <option value = "project2">Project_2</option>
            </select>
            <p>{this.state.projectName}</p>
          </form>
        </div>
      );
  
    }
  }

class ProjectBody extends Component {

    constructor() {
        super()
        this.state = {
            projectId: "d225bd8c-f517-481d-ad29-ae68344a9da8",
            projectName: "n", //this comes from the value of the drop down
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
            "d225bd8c-f517-481d-ad29-ae68344a9da8"
        )
        .then(res => {
            this.setState({
                totalResourcesUsed: res.data.currentResources,
                projectResources: [1,1],
                userResources: [1,1],
                projectName: res.data.name,
                // projectResources: [res.data.resources.HW_SET_1.totalResouces, res.data.resources.HW_SET_2.totalResouces],
                // userResources: [res.data.resources.HW_SET_1.usersCheckedOut.find(x=>x.checkedOutBy === this.props.userName).amount,
                //     res.data.resources.resources.HW_SET_2.usersCheckedOut.find(x=>x.checkedOutBy === this.props.userName).amount]
            })
        });

        //2
        client.getResource({
            id: "HW_SET_1"
        })
        .then(res => {
            this.setState({
                availability: [res.data.availability],
                capacity: [res.data.capacity]
            })
        })

        //3
        client.getResource({
            id: "HW_SET_2"
        })
        .then(res => {
            let data = res.data;
            this.setState( prevState => ({
                availability: [prevState.availability, data.availability],
                capacity: [prevState.capacity, data.capacity]
            }))
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
                                    <Form user = {this.props.userName} project = {this.props.projectID} resName = {this.state.resources[0]} userRes = {this.state.userResources[0]} cap = {this.state.capacity[0]} ava = {this.state.availability[0]} cli = {client}/>
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
                                    <Form user = {this.props.userName} project = {this.props.projectID} resName = {this.state.resources[1]} userRes = {this.state.userResources[1]} cap = {this.state.capacity[1]} ava = {this.state.availability[1]}/>
                                </div>
                        </div>
                    </div>
            </div>
        )
    
    }

}

class Form extends Component {
    constructor() {
        super ()
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

        if (Checkin > this.props.user) {
            alert('User does not have this many resources checked out - please try again');
            e.preventDefault();
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

        if (CheckOut > this.props.ava) {
            alert('Not enough resources to checkout - please try again');
            e.preventDefault();
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
                <input type="text" name="check" placeholder="Amoun" value = {this.state.amount} onChange = {this.handleChange}/>

                <div className="buttons">
                    <button className="button1" onClick = {this.handleCheckin}>Check In</button>
                    <button className="button2" onClick = {this.handleCheckout}>Check Out</button>
                </div>

            </form>
        )
    }

}

export default Blank;