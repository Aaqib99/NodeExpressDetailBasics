const express = require('express')
const app = express()
const router = express.Router()

// Import controller functions
const {
    getPeople,
    createPerson,
    createPersonPostman,
    updatePerson,
    deletePerson,
} = require('../controllers/people') // Make sure the path is correct

// Middleware to parse JSON body
app.use(express.json())

// Define routes
router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(deletePerson)

app.use('/api/people', router) // Mount the router

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
