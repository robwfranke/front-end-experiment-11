import React, {createContext, useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import {useHistory} from 'react-router-dom';
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const history = useHistory();

    // state voor de gebruikersdata, object voorgebruikersdata
    const [authState, setAuthState] = useState({
        // hier komt later nog een object bij
        user: null,
        status: 'pending',
        loginStatus: false,
    });

    //******************************************************************************
    async function fetchUserData(jwtToken) {
        console.log('AuthContext loginFunction ')
        console.log('AuthContext jwtToken', jwtToken)
        //we hebben de jwt token nodig om daaruit de user id te halen
        //Hier gebruiken we de package npm install jwt-deco
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub;

        console.log('AuthContext jwt DECODED', decoded);
        // gebruikersdata ophalen
        try {
            /*BACK TICK!!!!!*/
            const response = await axios.get(`http://localhost:3000/600/users/${userId}`, {
                //    authorisaton header, object key bevat -, daarom ""
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`, /*BACK TICK!!!!!*/
                }
            })
            //check wat je binnen krijgt

            console.log("token van backend",response.data.accessToken)

            console.log('AuthContext AA',response);
//die data gebruiken om de context te vullen

            setAuthState({
                ...authState,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status:'done',
            });


            console.log("authState", authState)
            console.log("status", authState.status)

        } catch (e) {
            console.error(e);
        }
    }
    //******************************************************************************



    // wanneer de applicatie geladen wordt willen we checken of er een token is, als die er is, maar er is
    // geen gebruiker dan willen we alsnog de gebruikersdata ophalen

    useEffect(()=>{
        //is er een token in de local storage (token!==) maar geen gegevens (authState.user === null)
        // (want daar zit ook user gegevens in) haal dan gegevens op

        console.log('AuthContext.js, useEffect gestart')

        const token =localStorage.getItem('token');
        if(token !== null && authState.user === null){

            console.log('AuthContext.js, Token afvragen ER IS EEN TOKEN')
            fetchUserData(token);

        }else {


            //is er een token
            //is er GEEN user?
            //haal data dan op (zoals bij login)

            //zo nee, dan geen user maar wel de status op 'done' zetten
            setAuthState({
                user: null,
                status: 'done',
            });
        }
    },[]);


    //inlogfunctie
    // de jwtToken (anyName), wordt meegegeven vanuit de signin.js page
    // vanuit:  login(response.data.accessToken)
    async function loginFunction(jwtToken) {

        //jwt token in de local storage
        localStorage.setItem('token', jwtToken);

        // gebruikersdata ophalen
        fetchUserData(jwtToken);
        history.push('/profile')

    }



    //uitlogfunctie

    function logoutFunction() {

        //leeghalen van de localstorage (localStorage.clear())
        // en de user in de context weer op nul zetten  : les 10 02:48:00
        console.log('Logout!')
    }



    //omdat authState een object is,
    // en we nog steeds gebruik willen maken van de automatische state updates zullen we de authState "spreadden"
    // copieer en verwijs naar dat object. als er dan wat veranderd wordt de inhoud van authState direct geplaatst in data

    const data = {
        ...authState,
        login: loginFunction,
        logout: logoutFunction,
    }


    console.log("auth authstate", authState)

    // geef const data mee aan de <AuthContext.Provider>
    return (

        <AuthContext.Provider value={data}>

            {/*   <AuthContext.Provider value={{
                ...authState,
                login: loginFunction,
                logout: logoutFunction,
        }}>*/}
            {/*profile pagina pas weergeven als data niet meer pending staat */}
            {authState.status === 'done'
                ? children
                : <p>Loading...</p>
            }
        </AuthContext.Provider>
    );

}

export default AuthContextProvider;