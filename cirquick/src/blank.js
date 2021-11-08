import React, {useState, Component} from 'react';
import './App.css';
import './Popup.css';
import './Body.css';
import {Link, useParams} from 'react-router-dom';
import {withRouter} from "react-router";
import {DefaultApi} from 'cirquick';
const client = new DefaultApi({basePath:"https://cirquick.herokuapp.com"});
//test user is gonna be 0a3b60a9-eed7-4892-b480-dc1c3336f8e9, username is dog, pass is cat;

class Blank extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            userID : this.props.match.params.userId,
            dropdown : ""
        }

        this.handleProjectChange = this.handleProjectChange.bind(this)
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
                        
                        <input id = "searchID" className = "sidebar-input" type = "input" placeholder="Search Project ID"/>
                        <br/>
                        <br/>
                        <button className = "sidebar-button">Join Project</button>
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
            "0a3b60a9-eed7-4892-b480-dc1c3336f8e9"
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
            let userResources = [];
            if(res.data.resources.HW_SET_1 !== undefined){
                let item = res.data.resources.HW_SET_1.usersCheckedOut.filter(user => user.checkedOutBy === this.props.userId)
                if(item.length<1){
                    userResources.push(0)
                }
                else{
                    userResources.push(item[0].amount)
                }
            }
            if(res.data.resources.HW_SET_2 !== undefined){
                let item = res.data.resources.HW_SET_2.usersCheckedOut.filter(user => user.checkedOutBy === this.props.userId)
                if(item.length<1){
                    userResources.push(0)
                }
                else{
                    userResources.push(item[0].amount)
                }
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

export default withRouter(Blank);