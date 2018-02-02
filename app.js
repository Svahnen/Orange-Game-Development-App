/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

const express = require('express')
const mysql = require('mysql')

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'debian-sys-maint',
  password: 'PTg2JrAD6bLfrVEU',
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

/*db.query('SELECT * FROM clues', (err, rows) => {
  if (err) throw err

  console.log('Data received from Db:\n')
  console.log(rows)
  rows.forEach((row) => {
    console.log(`${row.title} is in ${row.clue}`)
  })
})*/


 const team = {name: 'Team Horses', score: '10:22'}
 db.query('INSERT INTO teams SET ?', team, (err, res) => {
   if (err) throw err
   console.log('Last insert ID:', res.insertId)
 })

 db.query(
  'DELETE FROM teams WHERE ID = ?', [1], (err, result) => {
    if (err) throw err
    console.log(`Deleted ${result.affectedRows}row(s)`)
  }
)

// Create DB
/* app.get('/createdb', (req, res) => {
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

// insert post 1
app.get('/addpost', (req, res) => {
  let post = {title: 'Post One', body: 'This is post number one'}
  let sql = 'INSERT INTO posts SET ?'
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Post 1 added')
  })
})
// Make another post
app.get('/addpost2', (req, res) => {
  let post = {title: 'Post two', body: 'This is post number two'}
  let sql = 'INSERT INTO posts SET ?'
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Post 2 added')
  })
})

// Select posts
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts'
  let query = db.query(sql, (err, results) => {
    if (err) throw err
    // console.log(results)
    res.send(results)
    /* let html = 'This is the rows: <br>'
    results.forEach((row) => {
      html += `${row.title} is in ${row.body} with id ${row.id}<br>`
    })
    res.send(html) */
  })
})
// Select singel post
/*app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Post updated')
  })
})

// Update post
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated Title'
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Post updated')
  })
})
// Delete post
app.get('/deletepost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`
  let query = db.query(sql, (err, result) => {
    if (err) throw err
    console.log('result')
    res.send('Post Deleted')
  })
})

app.listen('8080', () => {
  console.log('Server running on port: 8080')
})*/
