const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const Post = require('./schemas/post')
const PORT = 3000
const app = new express()

app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost/coffee_shop');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
    console.log('Connected to the database')

})

app.post('/coffee/orders/delete', (req, res) => {
    let id = req.body.id

    Post.deleteOne({
        _id: id
    },(error, post) => {
        console.log(error)
        Post.find({},(error, orders) => {
            
            if(error){
                res.status(500).json({error: 'Something went wrong'})
                return
            }
            console.log('Order deleted probably')
            res.json(orders)
        })
    })

    

    
})

app.get('/coffee/orders', (req,res) => {
    Post.find({},(error, posts) => {
        
        if(error){
            res.status(500).json({error: 'Something went wrong'})
            return
        }
        res.json(posts)
    })
})

app.post('/coffee/orders',(req,res) => {
    coffeeOrder = req.body.coffeeOrder
    email = req.body.email
    time = req.body.time
    completed = req.body.completed

    let post = new Post({coffeeOrder: coffeeOrder, email: email, time: time, completed: completed})

    post.save((error, newPost) => {
        
        if(error) {
            res.status(500).json({error: "Unable to create post!"})
            return
        }
    })
})



app.listen(PORT,() => {
    console.log('Server is running my guy...')
})