import React, {useContext, useState} from 'react';
import {NavLink, Route, useHistory} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import styles from "./Navigation.module.css";
import Customer1 from "../../pages/Customer1"


function Navigation({isAuthUser, isAuthCustomer, isAuthAdmin}) {
    const history = useHistory();
    const alles = useContext(AuthContext);

    console.log("alles: ", alles)

    console.log("NAVIGATIONPAGE")
    console.log("isAuthCustomer: ", isAuthCustomer)
    console.log("isAuthUser: ", isAuthUser)
    console.log("isAuthAdmin: ", isAuthAdmin)


    return (
        <nav>

            <div className={styles["nav-container"]}>

                <ul>
                    <li>
                        <NavLink to ="/" exact activeClassName={styles["active-link"]}>
                            Home
                        </NavLink>
                    </li>


                    {((isAuthCustomer === false) && (isAuthUser === false) && (isAuthAdmin === false)) &&
                    <li>
                        <NavLink to="/login" exact activeClassName={styles["active-link"]}>
                            Login
                        </NavLink>
                    </li>}

                    {(isAuthCustomer === true) && (isAuthUser === false) && (isAuthAdmin === false) &&
                    <>
                        <li>
                            <NavLink to="/customer1"  activeClassName={styles["active-link"]}>
                                customer1
                            </NavLink>
                        </li>


                    </>
                    }


                    {((isAuthCustomer === false) && (isAuthUser === true) && (isAuthAdmin === false)) &&
                    <>
                        <li>
                            <NavLink to="/blogposts" activeClassName={styles["active-link"]}>
                                Blogposts
                            </NavLink>
                        </li>


                    </>
                    }

                    {((isAuthCustomer === false) && (isAuthUser === false) && (isAuthAdmin === true)) &&
                    <>

                        <li>
                            <NavLink to="/admin1"  activeClassName={styles["active-link"]}>
                                admin1
                            </NavLink>
                        </li>

                    </>
                    }

                    {((isAuthCustomer === true) || (isAuthUser === true) || (isAuthAdmin === true)) &&
                    <>

                        <li>
                            <NavLink to="/logout"  activeClassName={styles["active-link"]}>
                                Uitloggen
                            </NavLink>

                        </li>
                    </>
                    }


                </ul>

            </div>

            {/*  dit uitproberen*/}

            {/*<Customer1/>*/}


        </nav>
    );
}

export default Navigation;