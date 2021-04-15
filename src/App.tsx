import React, { useEffect, useState, FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import routes from './routes';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import store from './redux/store';

const App = () => {
  // let isLogin = false;
  // const [isLogin, setIsLogin] = useState(false);
  // const check = useSelector((state: any) => state.authReducer.isLogin);

  // useEffect(() => {
  //   // console.log("useEffect App component----", typeof store.getState().authReducer.isLogin);
  //   // // const temp = store.getState().authReducer.isLogin;
    
  //   if (isLogin !== check) {
  //     setIsLogin(check);
  //   }
  //   // props.history.listen(() => {
  //   //   setIsLogin(false);
  //   // });
  //   console.log("useEffect isLogin: ", isLogin);

  //   // setIsLogin(temp);
  // }, [isLogin]);

  return (
    <div className="App">
      <Router>
        <NavBar />
        {/* <div>
          { isLogin ?  : <h1>Have to login</h1> }
        </div> */}
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
