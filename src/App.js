import React, {useContext, useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Overview from './pages/Overview';
import Home from './pages/Home';
import Login from './pages/Login';
import BlogPost from './pages/BlogPost';
import Navigation from './components/Navigation';
import Admin1 from "./pages/Admin1";
import Customer1 from "./pages/Customer1";
import {AuthContext} from "./context/AuthContext";



function PrivateRoute({children,isAuthCustomer, isAuthUser, isAuthAdmin, ...rest}) {
  // omdat we nog steeds alle mogelijke properties zoals exact etc. op Route willen zetten, kunnen we met de ...rest operator zeggen:
  // al die andere props die je verder nog ontvangt, zet die ook allemaal maar op <Route>
  return (
      <Route {...rest}>
        {(isAuthUser || isAuthAdmin || isAuthCustomer) ? children : <Redirect to="/login"/>}
      </Route>
  )
}

function App(isAuthenticatedCustomer,toggleIsAuthenticatedCustomer,isAuthenticatedUser,toggleIsAuthenticatedUser,isAuthenticatedAdmin,toggleIsAuthenticatedAdmin) {

    // let role = "empty"
    // const totalAuth = useContext(AuthContext);
    // if (totalAuth.user !== null) {
    //     role = totalAuth.user.role;
    // }
    // console.log("alles: ", totalAuth)
    // console.log("alles: ", totalAuth)

    const {role}= useContext(AuthContext);
    console.log("Navigation, role uit authcontext: ", role)
    let isAuthCustomer = false;
    let isAuthUser = false;
    let isAuthAdmin = false;

    if (role=="ADMIN"){isAuthAdmin = true}
    if (role=="COMPANY_USER"){isAuthUser = true}
    if (role=="CUSTOMER"){isAuthCustomer = true}

    console.log("APP.js, ADMIN: ", isAuthAdmin)
    console.log("APP.js, COMPANY_USER: ", isAuthUser)
    console.log("APP.js, CUSTOMER: ", isAuthCustomer)



  return (
      <div>
        <Navigation
           isAuthCustomer={ isAuthCustomer}
           isAuthUser={isAuthUser}
        isAuthAdmin={isAuthAdmin}

        />


        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="/login">
                          <Login />
          </Route>

          <PrivateRoute exact path="/customer1" isAuthCustomer={isAuthCustomer}>
            <Customer1/>
          </PrivateRoute>

          <PrivateRoute exact path="/blogposts" isAuthUser={isAuthUser}>
            <Overview/>
          </PrivateRoute>
          <PrivateRoute exact path="/blog/:id" isAuthUser={isAuthUser}>
            <BlogPost/>
          </PrivateRoute>

          <PrivateRoute exact path="/admin1" isAuthAdmin={isAuthAdmin}>
            <Admin1/>
          </PrivateRoute>






        </Switch>
      </div>
  );
}

export default App;
