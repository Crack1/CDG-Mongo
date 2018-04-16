const assert = require('assert')
const User = require('../src/user')

describe('Validating Records', () => {

    it('Requires a user name', (done) => {
        const user = new User({
            name: undefined
        })
        const validateResult = user.validateSync()
        const {
            message
        } = validateResult.errors.name
        assert(message === 'Name is required.')
        done()
    })

    it('Name should have more than 2 characters', (done) => {
        const user = new User({
            name: 'Al'
        })
        const validateResult = user.validateSync()
        const {
            message
        } = validateResult.errors.name
        assert(message === 'Name must be longer than 2 characters')
        done()
    })

    it('Dissallow invalid record form being saved', (done) => {
        const user = new User({
            name: 'Al'
        })
        user.save()
            .catch((valdiationResults) => {
                const {
                    message
                } = valdiationResults.errors.name
                assert(message === 'Name must be longer than 2 characters')
                done()
            })

    })

})
