import React, {useContext, useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Overview from './pages/Overview';
import Home from './pages/Home';
import Login from './pages/Login';
import BlogPost from './pages/BlogPost';
import Navigation from './components/navigation/Navigation';
import Admin1 from "./pages/Admin1";
import Customer1 from "./pages/Customer1";
import Logout from "./pages/Logout";
import Registration from "./pages/registration/Registration";


import {AuthContext} from "./context/AuthContext";


function PrivateRoute({children, isAuthCustomer, isAuthUser, isAuthAdmin, ...rest}) {
    // omdat we nog steeds alle mogelijke properties zoals exact etc. op Route willen zetten, kunnen we met de ...rest operator zeggen:
    // al die andere props die je verder nog ontvangt, zet die ook allemaal maar op <Route>
    return (
        <Route {...rest}>
            {(isAuthUser || isAuthAdmin || isAuthCustomer) ? children : <Redirect to="/home"/>}

        </Route>
    )
}

function App() {


    const {role} = useContext(AuthContext);
    console.log("Navigation, role uit authcontext: ", role)
    let isAuthCustomer = false;
    let isAuthUser = false;
    let isAuthAdmin = false;

    if (role == "ADMIN") {
        isAuthAdmin = true
    }
    if (role == "COMPANY_USER") {
        isAuthUser = true
    }
    if (role == "CUSTOMER") {
        isAuthCustomer = true
    }

    console.log("APP.js, ADMIN: ", isAuthAdmin)
    console.log("APP.js, COMPANY_USER: ", isAuthUser)
    console.log("APP.js, CUSTOMER: ", isAuthCustomer)


    return (
        <div>
            <Navigation
                isAuthCustomer={isAuthCustomer}
                isAuthUser={isAuthUser}
                isAuthAdmin={isAuthAdmin}
            />


            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>

                <Route path="/login">
                    <Login/>
                </Route>

                <Route path="/logout">
                    <Logout/>
                </Route>

                <Route path="/registration">
                    <Registration/>
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
