/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

let timer
function countDownTimer (duration, display) {
  timer = duration
  let interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10)

    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    display.textContent = minutes + ':' + seconds
    let display2 = document.getElementsByClassName('infoTimer')[0]
    if (display2) {
      display2.textContent = minutes + ':' + seconds
    }

    if (--timer < 0) {
      // Losing modal
      changeCurrentGameStatus(2)
      let modalDiv = document.createElement('div')
      let modal = new LosingModal(modalDiv, gameMap)
      gameMap.controls[google.maps.ControlPosition.CENTER].push(modalDiv)

      clearInterval(interval)
      document.getElementsByClassName('timer')[0].style.display = 'none'
      document.getElementsByClassName('infoTimer')[0].style.display = 'none'
    }
  }, 1000)
}
// Starts the timer without displaying it when browser loads
setTimeout(function () {
  // let minutes = 1800
  let minutes = convertToSeconds(diff(currentTime(), currentGameTime))
  diff(currentTime(), currentGameTime)
  display = document.getElementsByClassName('timer')[0]
  document.getElementsByClassName('timer')[0].style.display = 'none'
  countDownTimer(minutes, display)
}, 3000)

function diff (start, end) {
  start = start.split(':')
  end = end.split(':')
  let startDate = new Date(0, 0, 0, start[0], start[1], 0)
  let endDate = new Date(0, 0, 0, end[0], end[1], 0)
  let diff = endDate.getTime() - startDate.getTime()
  let minutes = Math.floor(diff / 1000 / 60)
  diff -= minutes * 1000 * 60
  let seconds = Math.floor(diff / 1000 / 60)
  return (minutes <= 9 ? '0' : '') + minutes + ':' + (seconds <= 9 ? '0' : '') + seconds
}
