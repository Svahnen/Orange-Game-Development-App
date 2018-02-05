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
app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Posts table created')
  })
})

// Add new team
let teamName = 'Team Anna'
let endScore = '23:33'
app.get('/addteam', (req, res) => {
  let team = {name: teamName, score: endScore}
  let sql = 'INSERT INTO teams SET ?'
  let query = db.query(sql, team, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send(teamName + ' won with ' + endScore)
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
    let content = 'These are the teams and their scores: <br><br>'
    results.forEach((row) => {
      content += `${row.name} finished in ${row.score} <br>`
    })
    res.send(content)
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
    res.send(content)
  })
})

// Change team name
app.get('/updateteamname/:id', (req, res) => {
  let newName = 'Team Blue'
  let sql = `UPDATE teams SET name = '${newName}' WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Team name has been changed to ' + `${newName}`)
  })
})

app.listen('3000', () => {
  console.log('Server running on port: 3000')
})
