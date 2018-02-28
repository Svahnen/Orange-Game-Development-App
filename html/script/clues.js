/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

// loadMapMarkers creates an array that contains all markers and initiates the markers
// loadMapMarkers creates an array that contains all markers and initiates the markers
let positionMarkers = []
function loadMapMarkers (gameMap) {
  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313304,
    longitude: 18.111540,
    scaledSize: new google.maps.Size(5, 5),
    title: 'Clue #1',
    icon: iconQuestion,
    answer: answer[0],
    clue: '<div class="clue clue1">' +
    '<h3> The Blue Wire: </h3><br>' +
    '<p><b> How many moons does planet Terrus have?</b></p>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313050,
    longitude: 18.109947,
    scaledSize: new google.maps.Size(5, 5),
    title: 'Clue #2',
    icon: iconQuestion,
    answer: answer[1],
    clue: '<div class="clue clue2">' +
    '<h3> The Purple Wire: </h3><br>' +
    '<p><b>What even, postive number <br> has the same answer when  <br>' +
    'multiplied together as when added together?</b></p>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.312622,
    longitude: 18.110923,
    scaledSize: new google.maps.Size(5, 5),
    title: 'Clue #3',
    icon: iconQuestion,
    answer: answer[2],
    clue: '<div class="clue clue3">' +
    '<h3> The Orange Wire: </h3><br>' +
    '<p><b> Which number are you left with <br> when you do a full round down on PI?</b></p>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.314193,
    longitude: 18.110961,
    scaledSize: new google.maps.Size(5, 5),
    title: 'Clue #4',
    icon: iconQuestion,
    answer: answer[3],
    clue: '<div class="clue clue4">' +
    '<h3> The Green Wire: </h3><br>' +
    '<p><b> What English word is as long as it is valued? </b></p>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313848,
    longitude: 18.111878,
    scaledSize: new google.maps.Size(5, 5),
    title: 'Clue #5',
    icon: iconQuestion,
    answer: answer[4],
    clue: '<div class="clue clue5">' +
    '<h3> The Red Wire: </h3><br>' +
    '<p><b>Mr. Smith has 4 daughters.' +
    '<br> Each of his daughters has a brother.<br>' +
    'How many children does Mr. Smith have?</b></p> ' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.312370,
    longitude: 18.108613,
    scaledSize: new google.maps.Size(5, 5),
    title: 'The Bomb',
    icon: iconQuestion,
    clue: '<div class="clue">' +
    '<h3>THE BOMB! </h3>' +
    '<div>' + '<h6> Hurry up and disarm it!!!</h6>' +
    '<h6>Make sure to cut the cables <br> at the right place!</h6>' +
    '<span class="infoTimer"></span>' +
    '</div>' + '<form id="clueForm" name="clueForm" class="clueForm" onsubmit="return disarmBomb()" method="get">' +
   '<input type="range" min="1" max="5" value="0" step="1" class="all-sliders slider1" id="clue1"><br>' +
   '<input type="range" min="1" max="5" value="0" step="1" class="all-sliders slider2" id="clue2"><br>' +
   '<input type="range" min="1" max="5" value="0" step="1" class="all-sliders slider3" id="clue3"><br>' +
   '<input type="range" min="1" max="5" value="0" step="1" class="all-sliders slider4" id="clue4"><br>' +
   '<input type="range" min="1" max="5" value="0" step="1" class="all-sliders slider5" id="clue5"><br>' + '<br>' +
   '<input type="submit" value="DISARM BOMB!" class="btn btn-outline-dark">' +
   '</form>' + '</div>'
  }))

// The for loop runs through the markers of the array and make sure they are printed out on the map
  for (i = 0; i < positionMarkers.length; i++) {
    positionMarkers[i].createClueWindow()
  }
  return positionMarkers
}

function disarmBomb () {
  let clue1 = document.forms['clueForm']['clue1'].value
  let clue2 = document.forms['clueForm']['clue2'].value
  let clue3 = document.forms['clueForm']['clue3'].value
  let clue4 = document.forms['clueForm']['clue4'].value
  let clue5 = document.forms['clueForm']['clue5'].value
  if (clue1 === answer[0] && clue2 === answer[1] && clue3 === answer[2] && clue4 === answer[3] && clue5 === answer[4] && timer > 0) {
    document.getElementsByClassName('timer')[0].style.display = 'none'
    document.getElementsByClassName('infoTimer')[0].style.display = 'none'
    let time = (1800 - timer)
    setCurrentGameScore(time)
    changeCurrentGameStatus(1)
    setTimeout(() => {
      addWinningTeam(time, currentTeamName)
    }, 3000)
  } else {
    // Losing modal
    changeCurrentGameStatus(2)
    let modalDiv = document.createElement('div')
    let modal = new LosingModal(modalDiv, gameMap)
    gameMap.controls[google.maps.ControlPosition.CENTER].push(modalDiv)

    document.getElementsByClassName('timer')[0].style.display = 'none'
    document.getElementsByClassName('infoTimer')[0].style.display = 'none'
  }
  return false
}
