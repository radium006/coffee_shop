import React, { Component } from 'react';
import axios from 'axios';
import { privateDecrypt } from 'crypto';
import './orders.css'
const COFFEE_ORDERS_URL = 'http://localhost:3000/coffee/orders'
const DELETE_URL = 'http://localhost:3000/coffee/orders/delete'

class Orders extends Component {

    constructor(props){
        super(props)
       
        
    }

    handleDeleteButton = (e) => {
        axios.post(DELETE_URL, {
            id: e
        })

        
        
        
    }

    render(){

        let orders = this.props.orders

        let orderList = orders.map((order, index) => {
            return(
            <li className = "coffee-order">
                <h4>Order: {order.coffeeOrder}</h4>
                <p>Customer Email: {order.email}</p>
                <p>Order Placed: {order.time}</p>

                <button onClick = {(e) => this.handleDeleteButton(order._id)}>Delete</button>
            </li>
            )
        })
        return(
            <div className = "orderList">
                <ul>
                    {orderList}
                </ul>
            </div>
        )
    }

}

export default Orders