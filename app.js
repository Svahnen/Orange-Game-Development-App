/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

const express = require('express')
const mysql = require('mysql')

const app = express()

app.listen('3000', () => {
  console.log('Server started on port 3000')
})
