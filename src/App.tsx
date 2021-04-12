import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import routes from './routes';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map( data => {
            return (
              <Route exact={data.exact} path={data.path} component={data.component}/>
            )
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
