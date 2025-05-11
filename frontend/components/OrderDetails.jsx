import React, { useState , useEffect } from 'react';
import axios from 'axios';
import getUserId from '../getUserId';

const OrderDetails = () => {

    const [orders , setOrders] = useState([])

    const getOrders = async ()=>{
        const orders = await axios.post("http://localhost:5000/orders",{
            uId : await getUserId()
        })
        .then((response)=>{
            setOrders(response.data)
            console.log(response.data)
        })
        .catch((err)=>{
            console.log(err)
            alert("No orders Found")
        })
    }

    useEffect(() => {
      getOrders()
    }, []);

  return (
    <div className='order-detail-outer-cont'>
      {
        orders.map((order , index)=>{
            return(
                <div key={index} className='order-detail-cont'>
                    <img src={order.items[0].image} alt="" className='order-d-image'/>
                    <h3>{order.items[0].name}</h3>
                    <p className='gray'>Quantity : {order.items[0].quantity}</p>
                    <p className='gray'>Price : {order.items[0].price}</p>
                </div>
            )
        })
      }
    </div>
  );
}

export default OrderDetails;
