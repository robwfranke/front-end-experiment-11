import React, {useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import Overview from './pages/Overview';
import Home from './pages/Home';
import Login from './pages/Login';
import BlogPost from './pages/BlogPost';
import Navigation from './components/Navigation';
import Admin1 from "./pages/Admin1";
import Customer1 from "./pages/Customer1";

function PrivateRoute({children,isAuthCustomer, isAuthUser, isAuthAdmin, ...rest}) {
  // omdat we nog steeds alle mogelijke properties zoals exact etc. op Route willen zetten, kunnen we met de ...rest operator zeggen:
  // al die andere props die je verder nog ontvangt, zet die ook allemaal maar op <Route>
  return (
      <Route {...rest}>
        {(isAuthUser || isAuthAdmin || isAuthCustomer) ? children : <Redirect to="/login"/>}
      </Route>
  )
}

function App() {
  // We houden in de state bij of iemand is "ingelogd" (simpele versie)
  const [isAuthenticatedCustomer, toggleIsAuthenticatedCustomer] = useState(false);
  const [isAuthenticatedUser, toggleIsAuthenticatedUser] = useState(false);
  const [isAuthenticatedAdmin, toggleIsAuthenticatedAdmin] = useState(false);

  return (
      <div>
        <Navigation
            isAuthCustomer={isAuthenticatedCustomer}
            isAuthUser={isAuthenticatedUser}
            isAuthAdmin={isAuthenticatedAdmin}

            toggleAuthCustomer={toggleIsAuthenticatedCustomer}
            toggleAuthUser={toggleIsAuthenticatedUser}
            toggleAuthAdmin={toggleIsAuthenticatedAdmin}
        />


        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="/login">
            <Login toggleAuthCustomer={toggleIsAuthenticatedCustomer}
                   toggleAuthUser={toggleIsAuthenticatedUser}
                   toggleAuthAdmin={toggleIsAuthenticatedAdmin}/>
          </Route>

          <PrivateRoute exact path="/customer1" isAuthCustomer={isAuthenticatedCustomer}>
            <Customer1/>
          </PrivateRoute>

          <PrivateRoute exact path="/blogposts" isAuthUser={isAuthenticatedUser}>
            <Overview/>
          </PrivateRoute>
          <PrivateRoute exact path="/blog/:id" isAuthUser={isAuthenticatedUser}>
            <BlogPost/>
          </PrivateRoute>

          <PrivateRoute exact path="/admin1" isAuthAdmin={isAuthenticatedAdmin}>
            <Admin1/>
          </PrivateRoute>






        </Switch>
      </div>
  );
}

export default App;
