/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

// When the page loads, the line below calls the function below called 'loadgameMap' to load up the map.

google.maps.event.addDomListener(window, 'load', loadGameMap)

// THE MAIN FUNCTION THAT IS CALLED WHEN THE WEB PAGE LOADS

function loadGameMap () {
  let gameMapCenter = new google.maps.LatLng(58.902708, 17.944074)

  gameMapZoom = 16
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
  let gameMap = new google.maps.Map(document.getElementById('game-map'), gameMapOptions)
  let positionMarkers = loadMapMarkers(gameMap)
  getLocation(gameMap, positionMarkers)
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
    this.configuration.marker = this.getMarker()
    this.configuration.marker.addListener('click', () => {
      this.configuration.infowindow.open(this.configuration.gameMap, this.configuration.marker)
    })
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
function loadMapMarkers (gameMap) {
  let positionMarkers = []
  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.312601,
    longitude: 18.106447,
    title: 'Usa Pizza',
    icon: 'pins/green_MarkerB.png',
    clue: '<div class="clue">' +
    '<h1> Ledtråd</h1>' +
    '<div>' +
    '<p><b>Ledtråd</b> som går att styla ' +
    '</div>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.311326,
    longitude: 18.116483,
    title: 'Henkans Pizza',
    icon: 'pins/orange_MarkerC.png',
    clue: '<div class="clue">' +
    '<h1> Ledtråd Henkans</h1>' +
    '<div>' +
    '<p><b>Ledtråd</b> som går att styla ' +
    '</div>' +
    '</div>'
  }))

// The for loop runs through the markers of the array and make sure they are printed out on the map
  for (i = 0; i < positionMarkers.length; i++) {
    positionMarkers[i].createClueWindow()
  }
  return positionMarkers
}
// Gets the current position of a self and finds out if the clue should be displayed or not
let positionSelf
function getLocation (gameMap, positionMarkers) {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
      if (markerSELF === '') {
        positionSelf = showPosition(position, gameMap)
      } else {
        markerSELF.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude))
      }
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
    if (distance <= 200) {
      positionMarkers[i].openClueWindow()
    } else {
      positionMarkers[i].closeClueWindow()
    }
    console.log(distance)
  }
}
// Places a pink marker of your own position
let markerSELF = ''
function showPosition (position, gameMap) {
  let positionSelf = new ClueMarker({
    gameMap: gameMap,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    title: 'Self',
    icon: 'pins/pink_MarkerA.png'
  })
  markerSELF = positionSelf.getMarker()
  return positionSelf
}

// let loopFunction = function (gameMap, positionMarkers) {
//   if (markerSELF !== '') {
//     markerSELF.setMap(null)
//   }
//   return getLocation(gameMap, positionMarkers)
// }
//
// let intervalFunction = function (gameMap, positionMarkers) {
//   loopFunction(gameMap, positionMarkers)
//   return window.setTimeout(intervalFunction.bind(null, gameMap, positionMarkers), 10000)
// }
