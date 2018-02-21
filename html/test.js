/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint-env browser */

function timeNow () {

  let oldDateObj = new Date()
  let newDateObj = new Date(oldDateObj.getTime() + 30*60000)

  let d = newDateObj
      h = (d.getHours()<10?'0':'') + d.getHours(),
      m = (d.getMinutes()<10?'0':'') + d.getMinutes()
  let time = h + ':' + m

  console.log(time)
}
