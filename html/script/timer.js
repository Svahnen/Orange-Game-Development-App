/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

// Timer runs from the start of the game
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
      // Losing modal
      let modalDiv = document.createElement('div')
      let modal = new LosingModal(modalDiv, gameMap)
      gameMap.controls[google.maps.ControlPosition.CENTER].push(modalDiv)

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
