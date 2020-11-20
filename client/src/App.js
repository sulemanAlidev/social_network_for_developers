import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/layout/auth/Login';
import Register from "./components/layout/auth/Register"
import Dashboard from "./components/layout/dashboard/Dashboard"
import { Provider } from "react-redux";
import store from './redux/store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken'
import {logoutUser, setCurrentUser} from  './redux/actions/authActions';
import CreateProfile from './components/layout/create-profile/CreateProfile'


import PrivateRoute from './components/layout/common/PrivateRoute'




import {BrowserRouter as Router, Route, Switch  } from "react-router-dom";

import './App.css';
import { clearCurrentProfile } from './redux/actions/profileActions';

// check for token 

if(localStorage.jwtToken){
  //set auth token header  auth 
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info  and expression
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated 
  store.dispatch(setCurrentUser(decoded));
  //check for expired token 
  const currentTime = Date.now()/1000;
  if(decoded.exp <currentTime){
    //logout user 
    store.dispatch(logoutUser());
    // Clear Current Profile
    store.dispatch(clearCurrentProfile());

    //redirect to login 
    window.location.href='/login';
  }


}



function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
        <Navbar/>
     <Route exact path='/' component={Landing} />
     <div className='container'>
     <Route exact path='/register' component={Register} />
     <Route exact path='/login' component={Login} />
     <Switch>
     <PrivateRoute exact path='/dashboard' component={Dashboard} />

     </Switch>
     <Switch>
     <PrivateRoute exact path='/create-profile' component={CreateProfile} />

     </Switch>
      </div>
        <Footer/>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
