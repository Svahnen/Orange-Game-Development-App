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
    mapTypeControl: false,
    styles: mapStyle
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
    title: 'Clue #1',
    icon: 'images/question.png',
    clue: '<div class="clue">' +
    '<h1>Clue #1 = ' +
    answer[0] +
    '</h1>' +
    '</div>'
  }))

  positionMarkers.push(new ClueMarker({
    gameMap: gameMap,
    latitude: 59.313005,
    longitude: 18.108450,
    title: 'Clue #2',
    icon: 'images/question.png',
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
    title: 'Clue #3',
    icon: 'images/question.png',
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
    title: 'Clue #4',
    icon: 'images/question.png',
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
    title: 'Clue #5',
    icon: 'images/question.png',
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
    title: 'The Bomb',
    icon: 'images/bomb.png',
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
    icon: 'images/player1.png'
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
  let minutes = (60 * 0.20)
  display = document.getElementsByClassName('timer')[0]
  countDownTimer(minutes, display)
}

// TODO: Add this function to switchIcons function later
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

let mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      },
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      },
      {
        "weight": 4.5
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "weight": 2
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "simplified"
      },
      {
        "weight": 1.5
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#4cb1ba"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
