const assert = require('assert')
const User = require('../src/user')


describe('Reading user from database', () => {
    let joe, maria, alex, zach

    beforeEach((done) => {
        maria = new User({
            name: 'Maria'
        })
        alex = new User({
            name: 'Alex'
        })
        zach = new User({
            name: 'Zach'
        })
        joe = new User({
            name: 'Joe'
        })
        Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
            .then(() => {
                done()
            })
    })

    it('Find all user with the name Joe', (done) => {
        User.find({
            name: 'Joe'
        }).then((users) => {
            assert(users[0]._id.toString() === joe._id.toString())
            done()
        })
    })

    it('Find a user with a particular Id', (done) => {
        User.findOne({
            _id: joe._id
        }).then((users) => {
            assert(users.name === 'Joe')
            done()
        })
    })

    it('can skip and limit the result set', (done) => {
        User.find({}).sort({
                name: 1
            }).skip(1).limit(2)
            .then((users) => {
                assert(users.length === 2)
                assert(users[0].name === 'Joe')
                assert(users[1].name === 'Maria')
                done()
            })
    })
})
