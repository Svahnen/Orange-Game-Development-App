/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

// Create the variables that will be used within the map configuration options.
// The latitude and longitude of the center of the map.
//  let gameMapCenter = new google.maps.LatLng(59.313316, 18.110538)

let gameMapCenter = getLocation()

// The degree to which the map is zoomed in. This can range from 0 (least zoomed) to 21 and above (most zoomed).
gameMapZoom = 16
// The max and min zoom levels that are allowed.
let gameMapZoomMax = 21
let gameMapZoomMin = 6
// These options configure the setup of th     e map.
let gameMapOptions = {
  center: gameMapCenter,
  zoom: gameMapZoom,
  // The type of map. In addition to ROADMAP, the other 'premade' map styles are SATELLITE, TERRAIN and HYBRID.
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  maxZoom: gameMapZoomMax,
  minZoom: gameMapZoomMin,
  // Turn off the map controls as we will be adding our own later.
  panControl: false,
  mapTypeControl: false
}
// Create the variable for the main map itself.
let gameMap
// When the page loads, the line below calls the function below called 'loadgameMap' to load up the map.
google.maps.event.addDomListener(window, 'load', loadGameMap)
// THE MAIN FUNCTION THAT IS CALLED WHEN THE WEB PAGE LOADS --------------------------------------------------------------------------------
function loadGameMap () {
  // The empty map variable ('gameMap') was created above. The line below creates the map, assigning it to this variable. The line below also loads the map into the div with the id 'game-map' (see code within the 'body' tags below), and applies the 'gameMapOptions' (above) to configure this map.
  gameMap = new google.maps.Map(document.getElementById('game-map'), gameMapOptions)
  // Calls the function below to load up all the map markers.
  loadMapMarkers()
}
// Function that loads the map markers.
function loadMapMarkers () {
  // GLASTONBURY -----------------
  // Setting the position of the Glastonbury map marker.
  let markerPositionSundsvall = new google.maps.LatLng(62.389920, 17.317393)
  // Creating the Glastonbury map marker.
  markerSundsvall = new google.maps.Marker({
    // uses the position set above.
    position: markerPositionSundsvall,
    // adds the marker to the map.
    map: gameMap,
    title: 'Ingen aning',
    icon: 'pins/green_MarkerB.png'
  })
  let markerPositionArlanda = new google.maps.LatLng(59.649762, 17.923781)
  // Creating the Glastonbury map marker.
  markerArlanda = new google.maps.Marker({
    // uses the position set above.
    position: markerPositionArlanda,
    // adds the marker to the map.
    map: gameMap,
    title: 'Flyg, yaaaay!',
    icon: 'pins/orange_MarkerC.png'
  })
}

function getLocation () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (callback) {
      showPosition(callback)
    }, function (error) {
      console.log(error)
    })
  }
}

function showPosition (position) {
  markerPositionSELF = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
  markerSELF = new google.maps.Marker({
    position: markerPositionSELF,
    map: gameMap,
    title: 'Self',
    icon: 'pins/pink_MarkerA.png'
  })
}
getLocation()
