/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

// When the page loads, the line below calls the function below called 'loadgameMap' to load up the map.

google.maps.event.addDomListener(window, 'load', loadGameMap)

// Icons
let iconBomb = {
  url: 'images/bomb.png', // url
  scaledSize: new google.maps.Size(30, 30) // size
}

let iconQuestion = {
  url: 'images/question.png', // url
  scaledSize: new google.maps.Size(20, 25) // size
}

let iconPlayer = {
  url: 'images/player1.png', // url
  scaledSize: new google.maps.Size(23, 25) // size
}

let iconClue = {
  url: 'images/clue.png', // url
  scaledSize: new google.maps.Size(22, 27) // size
}

// THE MAIN FUNCTION THAT IS CALLED WHEN THE WEB PAGE LOADS
let gameMap
function loadGameMap () {
  // Sets current location as center of the map
  navigator.geolocation.getCurrentPosition(function (position) {
    gameMapCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
    gameMap.setCenter(gameMapCenter)
  })
  let gameMapCenter
  let gameMapZoom = 16
  let gameMapZoomMax = 21
  let gameMapZoomMin = 6
  let gameMapOptions = {
    center: gameMapCenter,
    zoom: gameMapZoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    maxZoom: gameMapZoomMax,
    minZoom: gameMapZoomMin,
    panControl: false,
    mapTypeControl: false
  }
  gameMap = new google.maps.Map(document.getElementById('game-map'), gameMapOptions)
  loadMapMarkers(gameMap)
  getLocation(gameMap, positionMarkers)
  for (let i = 0; i < beenToLocations.length; i++) {
    if (positionMarkers[beenToLocations[i]].configuration.title === 'The Bomb') {
      switchIcon(positionMarkers[beenToLocations[i]], iconBomb)
      addClickEvent(positionMarkers[beenToLocations[i]])
    } else {
      switchIcon(positionMarkers[beenToLocations[i]], iconClue)
      addClickEvent(positionMarkers[beenToLocations[i]])
    }
  }
}

// Class to control the map markers
class ClueMarker {
  constructor (configuration) {
    this.configuration = configuration
  }
// Creates a new LatLng objects
  getLatLng () {
    return new google.maps.LatLng(this.configuration.latitude, this.configuration.longitude)
  }
// Adds all markers on map
  getMarker () {
    return new google.maps.Marker({
      position: this.getLatLng(),
      map: this.configuration.gameMap,
      title: this.configuration.title,
      icon: this.configuration.icon
    })
  }

// Moves marker for current position
  moveMarker () {
    return new google.maps.Marker({
      position: this.getLatLng(),
      map: this.configuration.gameMap,
      title: this.configuration.title,
      icon: this.configuration.icon
    })
  }

  // Creates a new Clue info window
  createClueWindow () {
    this.configuration.infowindow = new google.maps.InfoWindow({
      content: this.configuration.clue
    })
    // Function for opening a Cluemarker on a marker click event
    // TODO: Figure out if this part is needed or needs to be moved to get info windows
    // to only open when already visited
    this.configuration.marker = this.getMarker()
    // this.configuration.marker.addListener('click', () => {
    //   this.configuration.infowindow.open(this.configuration.gameMap, this.configuration.marker)
    // })
  }

  // Function which opens an InfoWindow on a marker
  openClueWindow () {
    this.configuration.infowindow.open(this.configuration.gameMap, this.configuration.marker)
  }
  // Function which closes an InfoWindow on a marker
  closeClueWindow () {
    this.configuration.infowindow.close()
  }
  // Finds the distance between two points
  getDistanceBetween (clueMarker) {
    let distanceResult = google.maps.geometry.spherical.computeDistanceBetween(clueMarker.getLatLng(), this.getLatLng())
    return distanceResult
  }
}

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
    '<h1>Clue #1 = ' +
    answer[0] +
    '</h1>' +
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
    '<h1>Clue #2 = ' +
    answer[1] +
    '</h1>' +
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
    '<h1>Clue #3 = ' +
    answer[2] +
    '</h1>' +
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
    '<h1>Clue #4 = ' +
    answer[3] +
    '</h1>' +
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
    '<h1> Clue #5 = ' +
    answer[4] +
    '</h1>' +
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
   '<input type="submit" value="DISARM BOMB!" class="submitButton">' +
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

// Gets the current position of a self and finds out if the clue should be displayed or not
let position
let currentPosition
let getLocationRun = false
function getLocation (gameMap, positionMarkers) {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
      // Creates initial self marker
      if (getLocationRun) {
        // Updates the acctual marker on the map
        markerSELF.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude))
        // Updates the saved lat/long position in the variable that stores the location
        positionSelf.configuration.latitude = position.coords.latitude
        positionSelf.configuration.longitude = position.coords.longitude
        console.log('Efter')
      } else {
        getLocationRun = true
        console.log('Först')
        showPosition(position, gameMap)
      }
      currentPosition = position
      getDistances(positionSelf, positionMarkers)
    }, function (error) {
      console.log(error)
    })
  }
}

// Calculates the distance between PositionSelf and all markers and opens up Clue windows if you are within 5 meters of the markers position
function getDistances (positionSelf, positionMarkers) {
  for (i = 0; i < positionMarkers.length; i++) {
    let distance = positionMarkers[i].getDistanceBetween(positionSelf)
    if (distance <= 50) {
      positionMarkers[i].openClueWindow()
      addClickEvent(positionMarkers[i])
      console.log(positionMarkers[i])
      if (positionMarkers[i].configuration.title === 'The Bomb') {
        switchIcon(positionMarkers[i], iconBomb, showBombTimer())
      } else {
        switchIcon(positionMarkers[i], iconClue)
      }
      if (beenToLocationCheck(i)) {
        console.log('Already been at ' + i)
      } else {
        beenToLocations.push(i)
        console.log('Pushing new location ' + i)
      }
    } else {
      positionMarkers[i].closeClueWindow()
    }
    // console.log(distance)
  }
}

// Places a pink marker of your own position
let markerSELF = ''
let positionSelf
function showPosition (position, gameMap) {
  positionSelf = new ClueMarker({
    gameMap: gameMap,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    title: 'Self',
    icon: iconPlayer
  })
  markerSELF = positionSelf.getMarker()
  return positionSelf
}

let timer
function countDownTimer (duration, display) {
  timer = duration
  let interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    display.textContent = minutes + ':' + seconds

    if (--timer < 0) {
      alert('You have lost the game')
      clearInterval(interval)
      document.getElementsByClassName('timer')[0].style.display = 'none'
    }
  }, 1000)
}

window.onload = function () {
  let minutes = (60 * 30)
  display = document.getElementsByClassName('timer')[0]
  countDownTimer(minutes, display)
}

let showBombTimer = function () {
  document.getElementsByClassName('timer')[0].style.display = 'block'
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
    alert('You made it! ***WINNING!*** ' + endTime)
    document.getElementsByClassName('timer')[0].style.display = 'none'
  } else {
    alert('You are dead AF!')
    document.getElementsByClassName('timer')[0].style.display = 'none'
  }
  return false
}

let answer = ['1', '2', '3', '4', '5']

let switchIcon = function (theMarker, icon) {
  theMarker.configuration.marker.icon = icon
  theMarker.configuration.marker.setMap(null)
  theMarker.configuration.marker.setMap(gameMap)
}

let beenToLocations = [
  6,
  2
]

let beenToLocationCheck = function (a) {
  for (let i = 0; i < beenToLocations.length; i++) {
    if (beenToLocations[i] === a) {
      return true
    }
  } return false
}

let addClickEvent = function (theMarker) {
  theMarker.configuration.marker.addListener('click', () => {
    theMarker.configuration.infowindow.open(theMarker.configuration.gameMap, theMarker.configuration.marker)
  })
}
