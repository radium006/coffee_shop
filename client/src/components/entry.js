import React, { Component } from 'react';
import axios from 'axios'
const COFFEE_ORDERS_URL = 'http://localhost:3000/coffee/orders'

class Entry extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            order : {}
        }
        

        this.handleButtonClicked = this.handleButtonClicked.bind(this)
    }

    handleButtonClicked(){
        
        let order = this.state.order
        
        var today = new Date()
        var time = today.getHours() + ":" + today.getMinutes()
        axios.post(COFFEE_ORDERS_URL,{
            coffeeOrder: order.coffeeOrder,
            email: order.email,
            time: time,
            completed: false
        })

        
        fetch(COFFEE_ORDERS_URL)
        .then(response => response.json())
        .then(json => {
            console.log("from server", json)
            this.setState({
                orders: json
            },() => {
                this.props.handleAddOrder(this.state.orders)
            })
            })
        
       
          
    }

    handleBoxOnChange = (e) => {

        this.setState({
            order: {
                ...this.state.order,
                [e.target.name] : e.target.value
            }
        })

    }

    render(){
        return(
            
            <div className = "entryForm">
                <h1>Enter New Order:</h1>
                <input type = "text" name='coffeeOrder' onChange={this.handleBoxOnChange} placeholder="Coffee Order"/>
                <input type = "email" name='email' onChange={this.handleBoxOnChange} placeholder="Customer Email"/>
                
                <button onClick={this.handleButtonClicked}>Submit</button>
            </div>
        )
    }
}

export default Entry