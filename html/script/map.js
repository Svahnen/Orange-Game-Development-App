/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

// this function includes all necessary js files for the application
function include (file) {
  let script = document.createElement('script')
  script.src = file
  script.type = 'text/javascript'
  script.defer = true

  document.getElementsByTagName('head').item(0).appendChild(script)
}
/* include any js files here */
include('script/clues.js')
include('script/functions.js')
include('script/icons.js')
include('script/timer.js')

// When the page loads, the line below calls the function below called 'loadgameMap' to load up the map.
google.maps.event.addDomListener(window, 'load', readbeenToLocations)
google.maps.event.addDomListener(window, 'load', loadGameMap)
google.maps.event.addDomListener(window, 'load', getCurrentTeamName)

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
    mapTypeControl: false,
    styles: mapStyle
  }
  gameMap = new google.maps.Map(document.getElementById('game-map'), gameMapOptions)
  loadMapMarkers(gameMap)
  getLocation(gameMap, positionMarkers)
  for (let i = 0; i < beenToLocations.length; i++) {
    if (positionMarkers[beenToLocations[i]].configuration.title === 'The Bomb') {
      switchIcon(positionMarkers[beenToLocations[i]], iconBomb)
      addClickEvent(positionMarkers[beenToLocations[i]])
      showBombTimer(positionMarkers[beenToLocations[i]])
    } else {
      switchIcon(positionMarkers[beenToLocations[i]], iconClue)
      addClickEvent(positionMarkers[beenToLocations[i]])
    }
  }
}
