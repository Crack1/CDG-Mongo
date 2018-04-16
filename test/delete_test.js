const assert = require('assert')
const User = require('../src/user')

describe('Removing  user from database', () => {
    let joe
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        })
        joe.save()
            .then(() => {
                assert(!joe.isNew)
                done()
            })
    })

    it('Model Instance Remove', (done) => {
        joe.remove()
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user === null)
                done()
            })
    })
    it('Class Instance Remove', (done) => {
        //remove a bunch of records with some given criteria  
        User.remove({
                name: 'Joe'
            })
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user === null)
                done()
            })
    })
    it('Class method findOneAndRemove', (done) => {
        //remove a bunch of records with some given criteria  
        User.findOneAndRemove({
                name: 'Joe'
            })
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user === null)
                done()
            })
    })
    it('Class method findByIdAndRemove', (done) => {
        //remove a bunch of records with some given criteria  
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user === null)
                done()
            })
    })

})
