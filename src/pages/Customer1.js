import React, {useEffect, useState} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";

function Customer1() {

    const [orders, setOrders]=useState();
    const token = localStorage.getItem('token');


function test1(){
    console.log("test1")
    fetchData(token)
    }


    async function fetchData(jwtToken){

        try{
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
const piet=response.data
            console.log("piet: ",piet)

            const jaap =response.data[0].ordername;
            console.log("jaap: ",jaap)


        }catch(e){


        }

    }




  return (
    <section>
      <h1>Customer1 pagina</h1>
      <h2>Customer1</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque doloremque officiis quae tempore voluptatum! Harum mollitia necessitatibus, officiis porro quia quidem sit. Accusamus adipisci aliquid autem blanditiis, commodi culpa dignissimos dolorem eaque earum fugiat ipsum iure laboriosam odit perspiciatis provident quam quasi qui reprehenderit ullam vero. Consequatur ipsum magnam maiores modi nam praesentium quia? Adipisci corporis et illum minus, porro quae recusandae. Ab accusantium architecto autem deleniti dolor dolorem ea earum, error esse laborum minus molestias nam neque nisi numquam porro quasi quidem quis quo repellendus sit unde voluptas. Animi consequuntur dicta error expedita iusto officiis perspiciatis reiciendis ut voluptatum.</p>

        <div>



        </div>

        <button onClick={test1}
        >
            hallo
        </button>


    </section>
  );
}

export default Customer1;