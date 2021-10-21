import {useState} from "react";
function Dropdown() {
 const [isActive, setIsActive] = useState(false)
 return(
  <div className = "dropdown">
   <div className = "dropdown-btn" onClick = {(e) => setIsActive(!isActive)}>Search Projects</div>
   {isActive && (
   <div className = "dropdown-content">
    <div className="dropdown-item">Project 1</div>
    <div className="dropdown-item">Project 2</div>
   </div>
   )}
  </div>
 )
};

export default Dropdown;