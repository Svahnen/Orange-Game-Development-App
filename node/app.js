/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

const express = require('express')
const mysql = require('mysql')
const https = require('https')
const http = require('http')
const fs = require('fs')
const cors = require('cors')
const app = express()

const options = {
  key: fs.readFileSync('../cert/key.pem'),
  cert: fs.readFileSync('../cert/cert.pem')
}

// This enables Cors
app.use(cors())

// Create DB connection
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

// Create DB
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('Database created')
  })
})

// >>> Teams Start >>>

// Create teams Table
app.get('/createteamstable/', (req, res) => {
  let sql = 'CREATE TABLE teams(id int AUTO_INCREMENT, name VARCHAR(255), score INT(255), PRIMARY KEY (id))'
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

// Select single team
app.get('/getteam/:id', (req, res) => {
  let sql = `SELECT * FROM teams WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('fetched, with id number ' + `${req.params.id}`)
  })
})

// !!!!!!!!!!!!!!!!!!!!
// !!!! This works !!!!
// !!!!!!!!!!!!!!!!!!!!

app.get('/getteams', (req, res) => {
  let sql = 'SELECT * FROM teams'
  let content = []
  let query = db.query(sql, (err, results) => {
    if (err) throw err
    results.forEach((row) => {
      content.push({time: row.score, name: row.name})
    })
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

// Change team name
app.get('/updateteamname/:id/:teamname', (req, res) => {
  let sql = `UPDATE teams SET name = '${teamname}' WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Team name has been changed to ' + `${teamname}`)
  })
})

// <<< Teams Stop <<<

// >>> Clues Start >>>

// Create clues Table
app.get('/createcluestable/', (req, res) => {
  let sql = 'CREATE TABLE clues(id int AUTO_INCREMENT, clue VARCHAR(255), latitude VARCHAR(255), longitude VARCHAR(255), PRIMARY KEY (id))'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Clues table created')
  })
})

// Add new clue
app.get('/addclue/:clueNumber/:latitude/:longitude', (req, res) => {
  let clueNumber = `${req.params.clueNumber}`
  let latCoord = `${req.params.latitude}`
  let longCoord = `${req.params.longitude}`
  let clue = {clue: clueNumber, latitude: latCoord, longitude: longCoord}
  let sql = 'INSERT INTO clues SET ?'
  let query = db.query(sql, clue, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('RESULT')
  })
})

app.get('/getclues', (req, res) => {
  let sql = 'SELECT * FROM clues'
  let content = []
  let query = db.query(sql, (err, results) => {
    if (err) throw err
    results.forEach((row) => {
      content.push({clue: row.clue, latitude: row.latitude, longitude: row.longitude})
    })
    res.json(content)
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

// <<< Clues Stop <<<

// >>> beenToLocations Start >>>

// Create beenToLocations Table
app.get('/createbeenToLocationstable/', (req, res) => {
  let sql = 'CREATE TABLE beenToLocations(id int AUTO_INCREMENT, location VARCHAR(255), PRIMARY KEY (id))'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Locations table created')
  })
})

// Add new beenToLocations
app.get('/addbeenToLocations/:location', (req, res) => {
  let beenToLocationsLocation = `${req.params.location}`
  let location = {location: beenToLocationsLocation}
  let sql = 'INSERT INTO beenToLocations SET ?'
  let query = db.query(sql, location, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('RESULT')

  })
})

app.get('/getbeenToLocations', (req, res) => {
  let sql = 'SELECT * FROM beenToLocations'
  let content = []
  let query = db.query(sql, (err, results) => {
    if (err) throw err
    results.forEach((row) => {
      content.push(Number(row.location))
    })
    res.json(content)
  })
})

app.get('/deletelocations/', (req, res) => {
  let sql = `TRUNCATE TABLE beenToLocations`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('RESULT')
  })
})

// <<< beenToLocation Stop <<<

// >>> Bomb Start >>>

// Create bomb Table
app.get('/createbombtable/', (req, res) => {
  let sql = 'CREATE TABLE bomb(id int AUTO_INCREMENT, latitude VARCHAR(255), longitude VARCHAR(255), PRIMARY KEY (id))'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Bomb table created')
  })
})

// Add new bomb
app.get('/addbomb/:lat/:long', (req, res) => {
  let lat = `${req.params.lat}`
  let long = `${req.params.long}`
  let bomb = {latitude: lat, longitude: long}
  let sql = 'INSERT INTO bomb SET ?'
  let query = db.query(sql, bomb, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('RESULT')
  })
})

app.get('/getbomb', (req, res) => {
  let sql = 'SELECT * FROM bomb'
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    res.json(result)
  })
})

// <<< Bomb Stop <<<

// >>> Current Game Start >>>

// Create current game table
app.get('/createcurrentgametable/', (req, res) => {
  let sql = 'CREATE TABLE currentGame(id int AUTO_INCREMENT, team VARCHAR(255), time VARCHAR(255), status INT(1), score INT(255), PRIMARY KEY (id))'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Current game table created')
  })
})

// Add new game
app.get('/startgame/:teamname/:time', (req, res) => {
  let teamname = `${req.params.teamname}`
  let time = `${req.params.time}`
  let game = {team: teamname, time: time}
  let sql = 'INSERT INTO currentGame SET ?'
  let query = db.query(sql, game, (err, result) => {
    if (err) throw err
    console.log('Current game created')
    res.send('GAME STARTED')
  })
})

app.get('/gettime', (req, res) => {
  let sql = 'SELECT time FROM currentGame'
  let content = []
  let query = db.query(sql, (err, results) => {
    if (err) throw err
    results.forEach((row) => {
      content.push(row.time)
    })
    res.json(content)
  })
})

app.get('/getcurrentteamname', (req, res) => {
  let sql = 'SELECT team FROM currentGame'
  let content = []
  let query = db.query(sql, (err, results) => {
    if (err) throw err
    results.forEach((row) => {
      content.push(row.team)
    })
    res.json(content)
  })
})

// Change status on current game
app.get('/setcurrentgamestatus/:status', (req, res) => {
  let status = `${req.params.status}`
  let query = db.query('UPDATE currentGame SET status = ' + status, (err, result) => {
    if (err) throw err
    console.log('Current game status changed')
    res.send('GAME STATUS CHANGED')
  })
})

app.get('/getcurrentgamestatus', (req, res) => {
  let sql = 'SELECT status FROM currentGame'
  let content = []
  let query = db.query(sql, (err, results) => {
    if (err) throw err
    results.forEach((row) => {
      content.push(row.status)
    })
    res.json(content)
  })
})

// Change status on current game
app.get('/setcurrentgamescore/:score', (req, res) => {
  let score = `${req.params.score}`
  let query = db.query('UPDATE currentGame SET score = ' + score, (err, result) => {
    if (err) throw err
    console.log('Current game score changed')
    res.send('GAME SCORE CHANGED')
  })
})

app.get('/getcurrentgamescore', (req, res) => {
  let sql = 'SELECT score FROM currentGame'
  let content = []
  let query = db.query(sql, (err, results) => {
    if (err) throw err
    results.forEach((row) => {
      content.push(row.score)
    })
    res.json(content)
  })
})

app.get('/deletecurrentgame/', (req, res) => {
  let sql = `TRUNCATE TABLE currentGame`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('RESULT')
  })
})

// <<< Current Game Stop <<<

http.createServer(app).listen(3000, () => {
  console.log('HTTP Server running on port: 3000')
})
https.createServer(options, app).listen(3001, () => {
  console.log('HTTPS Server running on port: 3001')
})
