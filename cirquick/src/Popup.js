import React from 'react';
import './App.css';
import './Popup.css';
import Blank from './blank';
import {Link} from 'react-router-dom';

function Popup(props) {
 return( props.trigger) ? (
  <div className = "popup">
   <div className = "popup-inner">
    <h2 className = "popup-header">CIRQUICK</h2>
    <button className = "close-btn" onClick ={()=> props.setTrigger(false)}>close</button>
    {props.children}
   </div>
  </div>
 ) : "";
}

export default Popup;