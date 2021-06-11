import React, {useState,useContext,useEffect} from 'react';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";


function CustomerOrder() {

    const [orders, setOrders] = useState([]);/*start met lege array, wanneer er dan geen orders zijn, crash appl niet*/
    const [error, setError] = useState(false);
    const token = localStorage.getItem('token');
    const {user}=useContext(AuthContext);
    console.log("username:", user);

    function getOrders() {
        console.log("getOrders")
        fetchData(token)
    }


    async function fetchData(jwtToken) {

        try {
            console.log("Customer1Page")

            const response = await axios.get(`http://localhost:8080/orders/inlog`, {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            })

            console.log("response CustomerOrder", response)
            // ?maak een array waar alle orders in staan
            // const testArray= response.data.
            console.log(response.data.length)


            const piet = response.data
            console.log("piet: ", piet)

            const jaap = response.data[0].ordername;
            console.log("jaap: ", jaap)
            setOrders(response.data)


        } catch (e) {
            setError(true);

        }

    }


    return (
        <section>
            <h3>Customer pagina</h3>
            <button onClick={getOrders}
            >
                Haal orders op
            </button>

            <div>

                <ul>
                    {orders.map((order) => {
                        return <li key={order.id}>
                            <span>ordernummer:</span> {order.ordername} <span>Text: {order.description}</span>
                            {/* **************************************************************** */}
                            {/*per order mappen over de items (altijd minimaal 1 aanwezig*/}
                            <ul>
                                {order.items.map((item) => {
                                    return <li key={item.id}><span>itemname: </span>{item.itemname}
                                    </li>
                                })}
                            </ul>
                            {/* **************************************************************** */}
                        </li>
                    })}

                </ul>
            </div>

            {error && <span>Helaas geen orders</span>}


        </section>
    );
}

export default CustomerOrder;