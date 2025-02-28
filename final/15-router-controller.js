const express = require('express')
const app = express()
let { people } = require('../data')

// Middleware to parse JSON body
app.use(express.json())

app.get("/",(req, res) => {
  res.status(200).json({ success: true, data: people })
})

app.post("/welcome",(req, res) => {
  const { name } = req.body
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' })
  }
  res.status(201).send({ success: true, person: name })
})

// app.post("/post",(req, res) => {
//   const { name } = req.body
//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, msg: 'please provide name value' })
//   }
//   res.status(201).send({ success: true, data: [...people, name] })
// })

app.put("/:id",(req, res) => {
  const { id } = req.params
  const { name } = req.body

  const person = people.find((person) => person.id === Number(id))

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` })
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).json({ success: true, data: newPeople })
})

app.delete("/:id",(req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id))
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` })
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  )
  return res.status(200).json({ success: true, data: newPeople })
})

// module.exports = {
//   getPeople,
//   createPerson,
//   createPersonPostman,
//   updatePerson,
//   deletePerson,
// }

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})