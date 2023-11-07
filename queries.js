const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'db.vrexxhuudsofddtidury.supabase.co',
  database: 'postgres',
  password: 'cET5cARFtz_IrgCJLDwvEydGkzbP0_fy',
  port: 5432,
})

const getCurriculo = (request, response) => {
  pool.query('SELECT * FROM curriculo ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCurriculoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCurriculo = (request, response) => {
  const { Nome, Endereco, Formacao } = request.body

  pool.query('INSERT INTO curriculo (Nome, Endereco, Formacao) VALUES ($1, $2, $3, )', [Nome, Endereco, Formacao], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateCurriculo = (request, response) => {
  const id = parseInt(request.params.id)
  const {Nome, Endereco, Formacao} = request.body

  pool.query(
    'UPDATE curriculo SET Nome = $1, Endereco = $2, Formacao= $3 WHERE id = $4',
    [Nome, Endereco, Formacao, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteCurriculo = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getCurriculo,
  getCurriculoById,
  createCurriculo,
  updateCurriculo,
  deleteCurriculo,
}