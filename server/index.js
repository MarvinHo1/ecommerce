const express = require('express')
const app = express()
const port = 3000
const db = require('../database/postgres')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');

console.log(db);

  
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// app.get('/users', db.getUsers)
// app.get('/users/:id', db.getUserById)
// app.post('/users', db.createUser)
// app.put('/users/:id', db.updateUser)
// app.delete('/users/:id', db.deleteUser)


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))