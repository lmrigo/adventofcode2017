var input = [
'0  2 7    0'
 ,puzzleInput
]

var day6 = function() {

  for (var i = 0; i < input.length; i++) {
    var blocks = $.map(input[i].split(/\s+/), function (val) {
      return Number(val)
    })

    var cycles = 0
    var history = {}
    var infiniteLoopFound = false
    while (!infiniteLoopFound) {
      var state = blocks2String(blocks)
      if (history[state] === undefined) {
        history[state] = true
        blocks = redistributeBlocks(blocks)
        cycles++
      } else {
        infiniteLoopFound = true
      }
    }

    // console.log()
    $('#day6').append(input[i])
      .append('<br>&emsp;')
      .append(cycles)
      .append('<br>')
  }
}

var blocks2String = function (blocks) {
  return blocks.reduce(function (acc, val) {
    return acc + ',' +  val
  })
}

var redistributeBlocks = function (blocks) {
  // find highest
  var max = -1
  var maxIdx = -1
  for (var b = 0; b < blocks.length; b++) {
    if (blocks[b] > max) {
      max = blocks[b]
      maxIdx = b
    }
  }
  // redistribute
  blocks[maxIdx] = 0
  var b = maxIdx
  while (max > 0) {
    b = (b + 1) % blocks.length
    blocks[b]++
    max--
  }
  return blocks
}


var day6Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}


$(function (){
  $('#main').append('<div id="day6"><h2>day #6</h2></div>')
  day6()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day6Part2()
  $('#main').append('<br>')
})
