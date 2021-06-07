import React from 'react';
import {useHistory} from 'react-router-dom';


function Login({toggleAuthCustomer,toggleAuthUser, toggleAuthAdmin}) {
    let history = useHistory();


    function signInCustomer() {
     toggleAuthCustomer(true);
        toggleAuthUser(false);
        toggleAuthAdmin(false);
        history.push('/');
    }

    function signInUser() {
        toggleAuthCustomer(false);
        toggleAuthUser(true);
        toggleAuthAdmin(false);
        history.push('/');
    }

    function signInAdmin() {
        toggleAuthCustomer(false);
        toggleAuthUser(false);
        toggleAuthAdmin(true);
        history.push('/');
    }


    return (

        <>

            <h1>Login pagina</h1>
            <section>
                <button type="button" onClick={signInCustomer}>
                    Customer Inloggen
                </button>
            </section>


            <section>
                <button type="button" onClick={signInUser}>
                    User Inloggen
                </button>
            </section>

            <section>
                <button type="button" onClick={signInAdmin}>
                    Admin Inloggen
                </button>
            </section>
        </>
    );
}

export default Login;