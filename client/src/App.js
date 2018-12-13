import React, { Component } from 'react';
import Entry from './components/entry'
import Orders from './components/orders'
import axios from 'axios'
const COFFEE_ORDERS_URL = 'http://localhost:3000/coffee/orders'

class App extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      orders: []
    }
  }

  addUpdateOrders = (orders) => {
    this.setState({
      orders: orders
    })
  }
  
  updateList = () => {
    axios.get(COFFEE_ORDERS_URL).then((response) => {
      console.log(response.data)
      this.setState({
          orders: response.data
      })
  
    })
  }

  
  render() {
    if(this.state.orders !== undefined){
      this.updateList()
    }
    return (
      <div className="App">
        <Entry handleAddOrder = {this.addUpdateOrders}/>
        <Orders orders = {this.state.orders} handleAddOrder = {this.addUpdateOrders}/>
      </div>

    );
  }
}

export default App;
