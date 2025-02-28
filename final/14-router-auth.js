const express = require('express')
const app = express()
const peopleRouter = require('./routes/people') // Import your router file

// Middleware to parse JSON body
app.use(express.json())

// Use the router at `/api/people`
app.use('/api/people', peopleRouter)

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
