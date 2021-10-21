import React from 'react';
import './App.css';
import './Popup.css';
import Blank from './Blank';
import {Link} from 'react-router-dom';

function Popup(props) {
 return( props.trigger) ? (
  <div className = "popup">
   <div className = "popup-inner">
    <button className = "close-btn" onClick ={()=> props.setTrigger(false)}>close</button>
    {props.children}
   </div>
  </div>
 ) : "";
}

export default Popup;