/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

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
    this.configuration.infowindow.addListener('closeclick', () => {
      document.getElementsByClassName('timer')[0].style.display = 'block'
    })
    // Function for opening a Cluemarker on a marker click event
    this.configuration.marker = this.getMarker()
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
      } else {
        getLocationRun = true
        showPosition(position, gameMap)
      }
      currentPosition = position
      getDistances(positionSelf, positionMarkers)
    }, function (error) {
      console.log(error)
    })
  }
}

let loopTimerCheck = function () {
  readbeenToLocations()
  for (i = 0; i < positionMarkers.length; i++) {
    if (beenToLocationCheck(i)) {
      addClickEvent(positionMarkers[i])
      if (positionMarkers[i].configuration.title === 'The Bomb') {
        switchIcon(positionMarkers[i], iconBomb)
        showBombTimer()
      } else {
        switchIcon(positionMarkers[i], iconClue)
      }
    }
  }
}

setInterval(loopTimerCheck, 5000)

// Calculates the distance between PositionSelf and all markers and opens up Clue windows if you are within 5 meters of the markers position
function getDistances (positionSelf, positionMarkers) {
  for (i = 0; i < positionMarkers.length; i++) {
    let distance = positionMarkers[i].getDistanceBetween(positionSelf)
    if (distance <= 50) {
      addClickEvent(positionMarkers[i])
      console.log(positionMarkers[i])
      if (positionMarkers[i].configuration.title === 'The Bomb') {
        switchIcon(positionMarkers[i], iconBomb)
        // showBombTimer()
      } else {
        switchIcon(positionMarkers[i], iconClue)
      }
      if (beenToLocationCheck(i)) {
        console.log('Already been at ' + i)
      } else {
        addBeenToLocations(i)
        console.log('Pushing new location ' + i)
      }
    }
    // else {
    //   positionMarkers[i].closeClueWindow()
    // }
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

let answer = ['1', '2', '3', '4', '5']

let switchIcon = function (theMarker, icon) {
  theMarker.configuration.marker.icon = icon
  theMarker.configuration.marker.setMap(null)
  theMarker.configuration.marker.setMap(gameMap)
}

let beenToLocations = []

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
    if (theMarker.configuration.title === 'The Bomb') {
      document.getElementsByClassName('timer')[0].style.display = 'none'
    }
  })
}
