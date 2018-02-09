/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

const serverIp = 'https://192.168.43.98:3001'

// Read teams from DB and save into the teams variable
let teams
function readTeams () {
  fetch(serverIp + '/getteams')
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    teams = data
  })
}

// Read bomb from DB and save into the bomb variable
let bomb
function readBomb () {
  fetch(serverIp + '/getbomb')
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    bomb = data[0]
  })
}

// Read beenToLocations from DB and save into the beenToLocations variable
let beenToLocations
function readbeenToLocations () {
  fetch(serverIp + '/getbeentolocations')
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    beenToLocations = data
  })
}

// Creates a dummy database
let createDummyData = function () {
  setTimeout(() => fetch(serverIp + '/createteamstable'), 0)
  setTimeout(() => fetch(serverIp + '/createcluestable'), 200)
  setTimeout(() => fetch(serverIp + '/createvisitedtable'), 400)
  setTimeout(() => fetch(serverIp + '/createbombtable'), 600)
  setTimeout(() => console.log('Tables created'), 600)
  setTimeout(() => fetch(serverIp + '/addteam/TeamOne/3000/'), 800)
  setTimeout(() => fetch(serverIp + '/addteam/Team2/2000/'), 1000)
  setTimeout(() => fetch(serverIp + '/addteam/Team3/1200/'), 1200)
  setTimeout(() => fetch(serverIp + '/addclue/0/59.313304/18.111540'), 1400)
  setTimeout(() => fetch(serverIp + '/addclue/1/59.313050/18.109947/'), 1600)
  setTimeout(() => fetch(serverIp + '/addclue/2/59.312622/18.110923/'), 1800)
  setTimeout(() => fetch(serverIp + '/addclue/3/59.314193/18.110961/'), 2000)
  setTimeout(() => fetch(serverIp + '/addclue/4/59.313848/18.111878/'), 2200)
  setTimeout(() => fetch(serverIp + '/addbomb/59.312370/18.108613'), 2400)
  setTimeout(() => fetch(serverIp + '/addvisited/6'), 2600)
  setTimeout(() => fetch(serverIp + '/addvisited/2'), 2800)
  setTimeout(() => console.log('Data incerted'), 3000)
}

function testLog () {
  setTimeout(function () {
    console.log('hi after 2 sec')
  }, 2000)
}
