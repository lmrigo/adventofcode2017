var input = [
'3'
,puzzleInput
]

var day17 = function() {

  for (var i = 0; i < input.length; i++) {
    var buffer = [0]
    var pos = 0
    var steps = Number(input[i])
    var spins = 2018
    for (var j = 1; j < spins; j++) {
      pos = (pos + steps) % buffer.length
      buffer.splice(pos+1,0,j)
      pos++
    }
    //console.log(buffer)
    var idx = buffer.indexOf(2017)
    // console.log(buffer[idx-3], buffer[idx-2], buffer[idx-1], buffer[idx], buffer[idx+1], buffer[idx+2], buffer[idx+3])
    var answer = buffer[idx+1]

    $('#day17').append(input[i])
      .append('<br>&emsp;')
      .append(answer)
      .append('<br>')
  }
}

var day17Part2 = function () {

  for (var i = 1; i < input.length; i++) {
    // var buffer = [0]
    var pos = 0
    var steps = Number(input[i])
    var spins = 50000000
    var numNextToZero = -1
    var buffLen = 1
    for (var j = 1; j < spins; j++) {
      // pos = (pos + steps) % buffer.length
      // buffer.splice(pos+1,0,j)
      pos = (pos + steps) % buffLen
      if (pos === 0) {
        numNextToZero = j
      }
      buffLen++
      pos++
      // if (j%1000000===0) {
      //   console.log(j,pos,numNextToZero)
      // }
    }
    //console.log(buffer)
    // var idx = buffer.indexOf(0)
    // console.log(buffer[idx-3], buffer[idx-2], buffer[idx-1], buffer[idx], buffer[idx+1], buffer[idx+2], buffer[idx+3])
    // var answer = buffer[idx+1]
    var answer = numNextToZero

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(answer)
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day17"><h2>day #17</h2></div>')
  day17()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day17Part2()
  $('#main').append('<br>')
})
