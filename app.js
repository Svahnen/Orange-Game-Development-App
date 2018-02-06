/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

const express = require('express')
const mysql = require('mysql')

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'game',
  database: 'nodemysql'
})

// Connect
db.connect((err) => {
  if (err) {
    throw err
  }
  console.log('MySql Connected')
})

const app = express()

// Create DB
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('Database created')
  })
})
// Create Table
app.get('/createteamstable', (req, res) => {
  let sql = 'CREATE TABLE teams(id int AUTO_INCREMENT, name VARCHAR(255), score VARCHAR(255), PRIMARY KEY (id))'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Teams table created')
  })
})

// Add new team
app.get('/addteam/:teamName/:score', (req, res) => {
  let teamName = `${req.params.teamName}`
  let endScore = `${req.params.score}`
  let team = {name: teamName, score: endScore}
  let sql = 'INSERT INTO teams SET ?'
  let query = db.query(sql, team, (err, result) => {
    if (err) throw err
    console.log('result')
    res.json(teamName + ' won with ' + endScore)
  })
})
// Add new team 2
let teamName2 = 'Team Balloons'
let endScore2 = '14:33'
app.get('/addteam2', (req, res) => {
  let team = {name: teamName2, score: endScore2}
  let sql = 'INSERT INTO teams SET ?'
  let query = db.query(sql, team, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send(teamName2 + ' won with ' + endScore2)
  })
})
// Select singel team
app.get('/getteam/:id', (req, res) => {
  let sql = `SELECT * FROM teams WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send(teamName + ' fetched, with id number ' + `${req.params.id}`)
  })
})
// Get all team information
app.get('/getteams', (req, res) => {
  let sql = 'SELECT * FROM teams'
  let query = db.query(sql, (err, results) => {
    if (err) throw err
    // console.log(results)
    let content = '{scores: ['
    results.forEach((row) => {
      content += `{name: ${row.name}, finished: ${row.score}},`
    })
    content += ']}'
    res.json(content)
  })
})
// Delete a team
app.get('/deleteteam/:id', (req, res) => {
  let sql = `DELETE FROM teams WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Team with id number ' + `${req.params.id}` + ' has been Deleted')
  })
})
// Add new clue
app.get('/addclue', (req, res) => {
  let clue = {title: 'Clue #12', clue: 'answer[11]'}
  let sql = 'INSERT INTO clues SET ?'
  let query = db.query(sql, clue, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Clue added')
  })
})
// Get Random clues
app.get('/getclues', (req, res) => {
  let sql = 'SELECT clue FROM clues ORDER BY RAND() LIMIT 5'
  let query = db.query(sql, (err, results) => {
    if (err) throw err
    // console.log(results)
    let content = 'These are clues selected randomly: <br>'
    results.forEach((row) => {
      content += `${row.name} is in ${row.clue} with id ${row.id}<br>`
    })
    res.json(content)
  })
})

// Change team name
app.get('/updateteamname/:id/:teamname', (req, res) => {
  let sql = `UPDATE teams SET name = '${teamname}' WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Team name has been changed to ' + `${teamname}`)
  })
})

app.get('/test/:mess', (req, res) => {
  res.json('hej ' + `${req.params.mess}`)
})

app.listen('3000', () => {
  console.log('Server running on port: 3000')
})

// app.get('/log/:mess', (req, res) => {
  // res.send('Team name has been changed to ' + `${mess}`)
// })
