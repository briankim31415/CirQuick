import React from 'react';
import Login from './login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import signUp from './signUp';
import datasets from './datasets';
import blank from './blank';

function App() {
  return(
    
    <Router>
      <div>

        <Switch>
          <Route path="/signUp" exact component = {signUp}></Route>
          <Route path="/dataSet" exact component = {datasets}></Route>
          <Route path="/blank/:username" component = {blank}></Route>
          <Route exact path="/" exact component = {Login}></Route>
        </Switch>
        
      </div>
    </Router>
  );

}

export default App;
