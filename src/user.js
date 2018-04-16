const mongoose = require('mongoose')
const PostSchema = require('./post')
const BlogPost = require('./blogPost')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required.']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
})

UserSchema.virtual('postCount').get(function () {
    return this.posts.length
})

UserSchema.pre('remove', function (next) {
    const BlogPost = mongoose.model('blogPost')
    //this === joe
    // this will be is a reference of the instance used
    BlogPost.remove({
        _id: {
            $in: this.blogPosts
        }
    }).then(() => {
        next()
    })
})

const User = mongoose.model('user', UserSchema)


module.exports = User

/*  gratismas.org
https://mega.nz/#!QTQTRZLa!niwHmXlRvL_cbQbP370Se9ABEbpu9_txrE8we507Ndw
https://mega.nz/#!8XRBwS5Y!TacCQ5QuzGUxOkV-vuf-hwT8MShaAY__27arhxIotOk
*/
