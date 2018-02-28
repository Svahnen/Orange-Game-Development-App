/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

const serverIp = 'https://orange-dev.duckdns.org:3001'

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
let readbeenToLocations = function () {
  fetch(serverIp + '/getbeenToLocations')
  .then((res) => res.json())
  .then((data) => {
    beenToLocations = data
  })
}

let addBeenToLocations = function (locationNr) {
  fetch(serverIp + '/addbeenToLocations/' + locationNr + '/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
}

// Creates a dummy database //
let createTeamsTable = function () {
  console.log('Started')
  fetch(serverIp + '/createteamstable', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  .then(console.log('Done'))
}

let createCluesTable = function () {
  console.log('Started')
  fetch(serverIp + '/createcluestable', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  .then(console.log('Done'))
}

let createBeenToLocationsTable = function () {
  console.log('Started')
  fetch(serverIp + '/createBeenToLocationstable', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  .then(console.log('Done'))
}

let createBombTable = function () {
  console.log('Started')
  fetch(serverIp + '/createbombtable', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  .then(console.log('Done'))
}

let createCurrentGameTable = function () {
  console.log('Started')
  fetch(serverIp + '/createcurrentgametable/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  .then(console.log('Done'))
}

let createTeams = function () {
  console.log('Started')
  fetch(serverIp + '/addteam/Team3/1200/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  setTimeout(() => fetch(serverIp + '/addteam/TeamOne/3000/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  }), 1000)
  setTimeout(() => fetch(serverIp + '/addteam/Team2/2000/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  }), 2000)
  setTimeout(() => console.log('Done'), 3000)
}

let addWinningTeam = function (score, name) {
  console.log('Started')
  fetch(serverIp + '/addteam/' + currentTeamName + '/' + score, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  setTimeout(() => console.log('Done'), 2000)
}

let createClues = function () {
  console.log('Started')
  fetch(serverIp + '/addclue/0/59.313304/18.111540/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  setTimeout(() => fetch(serverIp + '/addclue/1/59.313050/18.109947/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  }), 1000)
  setTimeout(() => fetch(serverIp + '/addclue/2/59.312622/18.110923/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  }), 2000)
  setTimeout(() => fetch(serverIp + '/addclue/3/59.314193/18.110961/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  }), 3000)
  setTimeout(() => fetch(serverIp + '/addclue/4/59.313848/18.111878/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  }), 4000)
  setTimeout(() => console.log('Done'), 5000)
}

let createBeenToLocations = function () {
  console.log('Started')
  fetch(serverIp + '/addbeenToLocations/6/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  setTimeout(() => fetch(serverIp + '/addbeenToLocations/2/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  }), 1000)
  setTimeout(() => console.log('Done'), 2000)
}

let createBomb = function () {
  console.log('Started')
  fetch(serverIp + '/addbomb/59.312370/18.108613/', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  setTimeout(() => console.log('Done'), 1000)
}

let createNewGame = function () {
  console.log('Started')

  fetch(serverIp + '/startgame/orange/' + timeNow(), {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  setTimeout(() => console.log('Done'), 1000)
}

// Get local time and add 30 min
function timeNow () {
  let oldDateObj = new Date()
  let newDateObj = new Date(oldDateObj.getTime() + 30 * 60000)
  let d = newDateObj
  let h = (d.getHours() < 10 ? '0' : '') + d.getHours()
  let m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
  let localTime = h + ':' + m
  return localTime
}

let currentTeamName
let getCurrentTeamName = function () {
  fetch(serverIp + '/getcurrentteamname')
  .then((res) => res.json())
  .then((data) => {
    // console.log(data)
    currentTeamName = data[0]
  })
  return currentTeamName
}

let changeCurrentGameStatus = function (status) {
  console.log('Started')
  fetch(serverIp + '/setcurrentgamestatus/' + status, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  .then(console.log('Done'))
}

let winnerTime
let getWinnerTime = function () {
  fetch(serverIp + '/getcurrentgamescore')
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    winnerTime = data[0]
  })
  .then(() => {
    return winnerTime
  })
}

let setCurrentGameScore = function (score) {
  console.log('Started')
  fetch(serverIp + '/setcurrentgamescore/' + score, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    }
  })
  .then(console.log('Done'))
}

let currentGameTime
let getCurrentGameTime = function () {
  fetch(serverIp + '/gettime')
  .then((res) => res.json())
  .then((data) => {
    currentGameTime = data[0]
  })
}
