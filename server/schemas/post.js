const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    coffeeOrder: String,
    email: String,
    time: String, 
    completed: Boolean
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post