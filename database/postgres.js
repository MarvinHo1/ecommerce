const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ecommerce',
  host: 'localhost',
  database: 'users',
  password: 'password',
})

const getUsers = (req, res) => {
  // console.log(res)
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)
    // return results.rows
    res.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, res, hashedPass) => {
  // console.log(request.body)
  const { name, email } = request.body
  // console.log(hashedPass)
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    results.rows.find(users => {
      if (users.email === email ) {
        console.log('i Made it here')
        return res.send('User already registered')
      }
    })
    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name,email,hashedPass], (error, results) => {
      if (error) {
        throw error
      }
      console.log('who am I Success')
      return res.send('User has been registered')
    })
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}