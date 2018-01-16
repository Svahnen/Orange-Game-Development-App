/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

// When the page loads, the line below calls the function below called 'loadgameMap' to load up the map.

google.maps.event.addDomListener(window, 'load', loadGameMap)

// THE MAIN FUNCTION THAT IS CALLED WHEN THE WEB PAGE LOADS

function loadGameMap () {
  let gameMapCenter = new google.maps.LatLng(59.313298, 18.110403)

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
  intervalFunction(gameMap, positionMarkers)
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
// Creates new markers on the current Position
  getMarker () {
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
    this.configuration.marker.addListener('click', function () {
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
    latitude: 59.313038,
    longitude: 18.109588,
    title: 'Ledtråd 1',
    icon: 'pins/orange_MarkerC.png',
    clue: '<div class="clue">' +
    '<h1> Ledtråd 1</h1>' +
    '<div>' +
    '<p>1</p> ' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313082,
    longitude: 18.110079,
    title: 'Ledtråd 2',
    icon: 'pins/orange_MarkerC.png',
    clue: '<div class="clue">' +
    '<h1> Ledtråd 2</h1>' +
    '<div>' +
    '<p>2</p> ' +
    '</div>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313495,
    longitude: 18.110326,
    title: 'Ledtråd 3',
    icon: 'pins/orange_MarkerC.png',
    clue: '<div class="clue">' +
    '<h1> Ledtråd 3</h1>' +
    '<div>' +
    '<p>3</p> ' +
    '</div>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313412,
    longitude: 18.110581,
    title: 'Ledtråd 4',
    icon: 'pins/orange_MarkerC.png',
    clue: '<div class="clue">' +
    '<h1> Ledtråd 4</h1>' +
    '<div>' +
    '<p>4</p> ' +
    '</div>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313581,
    longitude: 18.110593,
    title: 'Ledtråd 5',
    icon: 'pins/orange_MarkerC.png',
    clue: '<div class="clue">' +
    '<h1> Ledtråd 5</h1>' +
    '<div>' +
    '<p>5</p> ' +
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
let posSelf
function getLocation (gameMap, positionMarkers) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let positionSelf = showPosition(position, gameMap)
      getDistances(positionSelf, positionMarkers)
      posSelf = position
    }, function (error) {
      console.log(error)
    })
  }
}
// Calculates the distance between PositionSelf and all markers and opens up Clue windows if you are within 5 meters of the markers position
function getDistances (positionSelf, positionMarkers) {
  for (i = 0; i < positionMarkers.length; i++) {
    let distance = positionMarkers[i].getDistanceBetween(positionSelf)
    if (distance <= 217) {
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

let loopFunction = function (gameMap, positionMarkers) {
  if (markerSELF !== '') {
    markerSELF.setMap(null)
  }
  return getLocation(gameMap, positionMarkers)
}

let intervalFunction = function (gameMap, positionMarkers) {
  loopFunction(gameMap, positionMarkers)
  return window.setTimeout(intervalFunction.bind(null, gameMap, positionMarkers), 10000)
}
