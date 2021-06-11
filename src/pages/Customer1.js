import React, {useState} from 'react';
import axios from "axios";

function Customer1() {

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(false);
    const token = localStorage.getItem('token');


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

            console.log("response Customer1", response)
            // ?maak een array waar alle orders in staan
            // const testArray= response.data.
            console.log(response.data.length)

            // if (response.data.length=0){
            //
            //     console.log("lengte =0")
            //     setError(true)
            // }

            const piet = response.data
            console.log("piet: ", piet)

            const jaap = response.data[0].ordername;
            console.log("jaap: ", jaap)
            setOrders(piet)


        } catch (e) {


        }

    }


    return (
        <section>
            <h3>Customer1 pagina</h3>
            <button onClick={getOrders}
            >
                Haal orders op
            </button>

            <div>

<ul>
                {orders.map((order) => {
                    return <li key={order.id}>
                        <span>ordernummer:</span> {order.ordername} <span>Text: {order.description}</span>
<ul>
                        {order.items.map((item) => {
                            return <li key={item.id}><span>itemname: </span>{item.itemname}
                            </li>


                        })}
</ul>

                    </li>
                })}

</ul>
            </div>


        </section>
    );
}

export default Customer1;