/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

// When the page loads, the line below calls the function below called 'loadgameMap' to load up the map.

google.maps.event.addDomListener(window, 'load', loadGameMap)

// THE MAIN FUNCTION THAT IS CALLED WHEN THE WEB PAGE LOADS

function loadGameMap () {
  // Sets current location as center of the map
  navigator.geolocation.getCurrentPosition(function (position) {
    gameMapCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
    gameMap.setCenter(gameMapCenter)
  })
  let gameMap
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
    latitude: 59.313958,
    longitude: 18.108520,
    title: 'Ledtråd 1',
    icon: 'pins/orange_MarkerC.png',
    clue: '<div class="clue">' +
    '<h1>Ledtråd 1: ' +
    answer[0] +
    '</h1>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313005,
    longitude: 18.108450,
    title: 'Ledtråd 2',
    icon: 'pins/orange_MarkerC.png',
    clue: '<div class="clue">' +
    '<h1>Ledtråd 2: ' +
    answer[1] +
    '</h1>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.312622,
    longitude: 18.110923,
    title: 'Ledtråd 3',
    icon: 'pins/orange_MarkerC.png',
    clue: '<div class="clue">' +
    '<h1>Ledtråd 3: ' +
    answer[2] +
    '</h1>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.314193,
    longitude: 18.110961,
    title: 'Ledtråd 4',
    icon: 'pins/orange_MarkerC.png',
    clue: '<div class="clue">' +
    '<h1>Ledtråd 4: ' +
    answer[3] +
    '</h1>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313848,
    longitude: 18.111878,
    title: 'Ledtråd 5',
    icon: 'pins/orange_MarkerC.png',
    clue: '<div class="clue">' +
    '<h1> Ledtråd 5: ' +
    answer[4] +
    '</h1>' +
    '</div>'
  }))
  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.306214,
    longitude: 18.110301,
    title: 'The Bomb',
    icon: 'pins/red_MarkerQ.png',
    clue: '<div class="clue">' +
    '<h1> BOMBEN</h1>' +
    '<div>' + '<p> <b>Ledtråd</b> som går att styla ' +
    '</div>' +
    '</div>' + '<h5> 1 </h5>' + '<input type="text" name="fname">' + '<h5> 2 </h5>' + '<input type="text" name="fname"><br>' + '<h5> 3 </h5>' + '<input type="text" name="fname"><br>' + '<h5> 4 </h5>' + '<input type="text" name="fname"><br>' + '<h5> 5 </h5>' + '<input type="text" name="fname"><br>' + '<br>' + '<input type="submit" value="Submit">'
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
      // Creates initial self marker
      if (markerSELF === '') {
        positionSelf = showPosition(position, gameMap)
        // Moves self marker if marker is already present
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
    if (distance <= 50) {
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

let answer = [1, 2, 3, 4, 5]
