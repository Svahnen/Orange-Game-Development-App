/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

function WinningModal (controlDiv, gameMap) {
    // Set CSS for the control border.
  let controlUI = document.createElement('div')
  controlUI.style.backgroundColor = 'rgb(252, 249, 237)'
  controlUI.style.border = '2px solid green'
  controlUI.style.borderRadius = '3px'
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  controlUI.style.marginBottom = '22px'
  controlUI.style.textAlign = 'center'
  controlDiv.appendChild(controlUI)

  let time = (1800 - endTime)
  let minutes = Math.floor(time / 60)
  let seconds = time - minutes * 60
  let displayTime = minutes + ':' + seconds
    // Set CSS for the control interior.
  let controlText = document.createElement('div')
  controlText.style.color = 'rgb(81, 186, 42)'
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
  controlText.style.fontSize = '20px'
  controlText.style.lineHeight = '38px'
  controlText.style.paddingLeft = '50px'
  controlText.style.paddingRight = '50px'
  controlText.style.paddingTop = '10px'
  controlText.style.paddingBottom = '10px'
  controlText.innerHTML =
  '<h1> Winner </h1>' +
  '<h6> You won with the record time of: <br>' +
  '</h6>' + '<h3><b>' + displayTime + '</b></h3>' +
  '<div class="modal-buttons">' +
  '<a href="http://orange-dev.duckdns.org/" role="button" class="btn btn-outline-success mb-md-1">New Game</a> <br>' +
  '<a href="http://orange-dev.duckdns.org:3002/" role="button" class="btn btn-outline-success mb-md-1">Leaderboard</a>' +
  '</div>'
  controlUI.appendChild(controlText)
}

function LosingModal (controlDiv, gameMap) {
    // Set CSS for the control border.
  let controlUI = document.createElement('div')
  controlUI.style.backgroundColor = 'rgb(252, 249, 237)'
  controlUI.style.border = '2px solid red'
  controlUI.style.borderRadius = '3px'
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  controlUI.style.marginBottom = '22px'
  controlUI.style.textAlign = 'center'
  controlUI.title = 'Click to recenter the map'
  controlDiv.appendChild(controlUI)

  // Set CSS for the control interior.
  let controlText = document.createElement('div')
  controlText.style.color = 'rgb(247, 138, 149)'
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
  controlText.style.fontSize = '20px'
  controlText.style.lineHeight = '38px'
  controlText.style.paddingLeft = '50px'
  controlText.style.paddingRight = '50px'
  controlText.style.paddingTop = '10px'
  controlText.style.paddingBottom = '20px'
  controlText.innerHTML =
  '<h1> Loser! </h1>' +
  '<h6> You did not disarm the bomb </h6><br>' +
  '<div class="modal-buttons">' +
  '<a href="http://orange-dev.duckdns.org/" role="button" class="btn btn-outline-danger">New Game</a> <br>' +
  '<a href="http://orange-dev.duckdns.org:3002/" role="button" class="btn btn-outline-danger">Leaderboard</a>' +
  '</div>'
  controlUI.appendChild(controlText)
}

function TimerModal (controlDiv, gameMap) {
  // Set CSS for the control border.
  let controlUI = document.createElement('div')
  controlUI.style.backgroundColor = 'rgb(252, 249, 237)'
  controlUI.style.border = '2px solid blue'
  controlUI.style.borderRadius = '3px'
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)'
  controlUI.style.marginBottom = '22px'
  controlUI.style.textAlign = 'center'
  controlUI.title = 'Click to recenter the map'
  controlDiv.appendChild(controlUI)

  // Set CSS for the control interior.
  let controlText = document.createElement('div')
  controlText.style.color = 'rgb(80, 97, 229)'
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif'
  controlText.style.fontSize = '20px'
  controlText.style.lineHeight = '38px'
  controlText.style.paddingLeft = '50px'
  controlText.style.paddingRight = '50px'
  controlText.innerHTML = 'timer'
  controlUI.appendChild(controlText)
}
