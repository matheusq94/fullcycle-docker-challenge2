const express = require('express')
const mysql = require('mysql')

const app = express()

const port = 3000

const config = {
    host: 'database-container',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connection = mysql.createConnection(config)

app.get('/', (request, response) => {
    const { name } = request.query

    if (name) {
        connection.query(`INSERT INTO people SET nome=?`, name,
        (error) => {
            if (error) {
                return response.send(`Houve um erro na inserção dos dados no banco. (${error.message})`)
            }
        }) 
    }

    connection.query('SELECT * FROM `people`', (error, result) => {
        if (error) {
            return response.send(`Houve um erro ao buscar dados do banco (${error.message})`)
        }

        return response.send(`
            <h1>Full Cycle Rocks!
            <ul>
                ${result.reduce((agg, cur) => agg + `<li>${cur.nome}</li>`, "")}
            </ul>
        `)
    })
})

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`)
})