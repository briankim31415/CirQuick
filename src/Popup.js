import React, {Component} from 'react';
import './App.css';
import './Popup.css';
import Blank from './blank';
import {Link} from 'react-router-dom';

class Popup extends Component {
    constructor(props) {
     super(props);
     this.state = {
        trigger: true
     }
    }
   
    handleTrigger = (e) => {
        this.props.trigger();
    }
   
    render() {
        return(
            <div className = "popup">
            <div className = "popup-inner">
                <h2 className = "popup-header">CIRQUICK</h2>
                <button className = "close-btn" onClick ={this.handleTrigger}>close</button>
                {this.props.children}
            </div>
            </div>
        );
    }
}

export default Popup;