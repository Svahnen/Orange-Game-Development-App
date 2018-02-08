/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

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
    clue: '<div class="clue">' +
    '<h2>Clue 1: ' +
    answer[0] +
    '</h2>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313050,
    longitude: 18.109947,
    scaledSize: new google.maps.Size(5, 5),
    title: 'Clue #2',
    icon: iconQuestion,
    clue: '<div class="clue">' +
    '<h2>Clue 2: ' +
    answer[1] +
    '</h2>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.312622,
    longitude: 18.110923,
    scaledSize: new google.maps.Size(5, 5),
    title: 'Clue #3',
    icon: iconQuestion,
    clue: '<div class="clue">' +
    '<h2>Clue 3: ' +
    answer[2] +
    '</h2>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.314193,
    longitude: 18.110961,
    scaledSize: new google.maps.Size(5, 5),
    title: 'Clue #4',
    icon: iconQuestion,
    clue: '<div class="clue">' +
    '<h2>Clue #4 = ' +
    answer[3] +
    '</h2>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313848,
    longitude: 18.111878,
    scaledSize: new google.maps.Size(5, 5),
    title: 'Clue #5',
    icon: iconQuestion,
    clue: '<div class="clue">' +
    '<h2> Clue #5 = ' +
    answer[4] +
    '</h2>' +
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
    '<h1> BOMB! </h1>' + '<b>Time left before the bomb explodes</b>' +
    '<p id="count-down"> </p>' +
    '<div>' + '<p>Hurry up and disarm it!!! </p>' +
    '</div>' +
    '</div>' + '<form id="clueForm" name="clueForm" class="clueForm" onsubmit="return disarmBomb()" method="get">' +
    '<label for="clue1"> Clue 1 </label>' + '<input type="text" id="clue1" name="clue1" class="inputFields"><br>' +
   '<label for="clue2"> Clue 2 </label>' + '<input type="text" id="clue2" name="clue2" class="inputFields"><br>' +
   '<label for="clue3"> Clue 3 </label>' + '<input type="text" name="clue3" id="clue3" class="inputFields"><br>' +
   '<label for="clue4"> Clue 4 </label>' + '<input type="text" id="clue4" name="clue4" class="inputFields"><br>' +
   '<label for="clue5"> Clue 5 </label>' + '<input type="text" name="clue5" id="clue5" class="inputFields"><br>' + '<br>' +
   '<input type="submit" value="DISARM BOMB!" class="btn btn-outline-dark">' +
   '</form>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 58.902486,
    longitude: 17.947655,
    scaledSize: new google.maps.Size(5, 5),
    title: 'Ledtråd Nynäshamn',
    icon: iconQuestion,
    clue: '<div class="clue">' +
    '<h1> Ledtråd Nynäshamn: ' +
    answer[4] +
    '</h1>' +
    '</div>'
  }))

// The for loop runs through the markers of the array and make sure they are printed out on the map
  for (i = 0; i < positionMarkers.length; i++) {
    positionMarkers[i].createClueWindow()
  }
  return positionMarkers
}

let endTime
function disarmBomb () {
  let clue1 = document.forms['clueForm']['clue1'].value
  let clue2 = document.forms['clueForm']['clue2'].value
  let clue3 = document.forms['clueForm']['clue3'].value
  let clue4 = document.forms['clueForm']['clue4'].value
  let clue5 = document.forms['clueForm']['clue5'].value
  if (clue1 === answer[0] && clue2 === answer[1] && clue3 === answer[2] && clue4 === answer[3] && clue5 === answer[4] && timer > 0) {
    endTime = timer
    // Winning modal
    let modalDiv = document.createElement('div')
    let modal = new WinningModal(modalDiv, gameMap)
    gameMap.controls[google.maps.ControlPosition.CENTER].push(modalDiv)

    document.getElementsByClassName('timer')[0].style.display = 'none'
  } else {
    // Losing modal
    let modalDiv = document.createElement('div')
    let modal = new LosingModal(modalDiv, gameMap)
    gameMap.controls[google.maps.ControlPosition.CENTER].push(modalDiv)

    document.getElementsByClassName('timer')[0].style.display = 'none'
  }
  return false
}
