const assert = require('assert')
const User = require('../src/user')


describe('Subdocuments', () => {
    it('Can create sub documents', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: "PostTitle"
            }]
        })
        joe.save()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user.posts[0].title === "PostTitle")
                done()
            })

    })

    it('Can add Subdocuments to an existing Record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        })
        joe.save()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                user.posts.push({
                    title: "New Post"
                })
                return user.save()
            })
            .then(() => {
                return User.findOne({
                    name: 'Joe'
                })
            })
            .then((user) => {
                assert(user.posts[0].title === "New Post")
                done()
            })
    })

    it('Can remove Subdocuments to an existing Record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: 'New title'
            }]
        })
        joe.save()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                //   const post = user.posts[0]
                user.posts[0].remove()
                return user.save()
            })
            .then(() => {
                return User.findOne({
                    name: 'Joe'
                })
            })
            .then((user) => {
                assert(user.posts.length === 0)
                done()
            })
    })
})
