const mongoose = require('mongoose')
const Comment = require('./comment')
const Schema = mongoose.Schema

const blogPostSchema = new Schema({
    title: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required.']
    },
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
})


const BlogPost = mongoose.model('blogPost', blogPostSchema)


module.exports = BlogPost
