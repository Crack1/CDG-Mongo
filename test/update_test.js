const assert = require('assert')
const User = require('../src/user')


describe('Reading user from database', () => {
    let joe
    beforeEach((done) => {
        joe = new User({
            name: 'Joe',
            likes: 0
        })
        joe.save()
            .then(() => {
                assert(!joe.isNew)
                done()
            })
    })

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1)
                assert(users[0].name === 'Alex')
                done()
            })
    }

    it('Instance type using set and save', (done) => {
        joe.set('name', 'Alex')
        assertName(joe.save(), done)

    })

    it('A model instance can update', (done) => {
        assertName(joe.update({
            name: 'Alex'
        }), done)
    })
    it('A model class can Update', (done) => {
        assert(User.update({
            name: 'Joe'
        }, {
            name: 'Alex'
        }))
        done()
    })

    it('A model class can Update one record', (done) => {
        assert(User.findOneAndUpdate({
            name: 'Joe'
        }, {
            name: 'Alex'
        }))
        done()
    })
    it('A model class can find one record and Update by ID', (done) => {
        assert(User.findByIdAndUpdate(joe._id, {
            name: 'Alex'
        }))
        done()
    })
    it('A model class can Update the post count by 1', (done) => {
        User.update({
                name: 'Joe'
            }, {
                $inc: {
                    likes: 1
                }
            })
            .then(() => User.findOne({
                name: 'Joe'
            }))
            .then((user) => {
                assert(user.likes === 1)
                done()
            })

    })
})
