var input = [
`0
3
0
1
-3`
 ,puzzleInput
]

var day5 = function() {

  for (var i = 0; i < input.length; i++) {
    var steps = 0
    var jumps = $.map(input[i].split(/\s/), function(val) {
      return Number(val)
    })
    var pc = 0
    var jump = jumps[pc]
    while (jump !== undefined) {
      var prevPc = pc
      var nextPc = pc + jump
      jumps[prevPc] = jumps[prevPc] + 1
      steps++
      pc = nextPc
      jump = jumps[pc]
    }

    // console.log()
    $('#day5').append(input[i])
      .append('<br>&emsp;')
      .append(steps)
      .append('<br>')
  }
}

var day5Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var steps = 0
    var jumps = $.map(input[i].split(/\s/), function(val) {
      return Number(val)
    })
    var pc = 0
    var jump = jumps[pc]
    while (jump !== undefined) {
      var prevPc = pc
      var nextPc = pc + jump
      if (jump >= 3) {
        jumps[prevPc] = jumps[prevPc] - 1
      } else {
        jumps[prevPc] = jumps[prevPc] + 1
      }
      steps++
      pc = nextPc
      jump = jumps[pc]
    }

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(steps)
      .append('<br>')
  }

}


$(function (){
  $('#main').append('<div id="day5"><h2>day #5</h2></div>')
  day5()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day5Part2()
  $('#main').append('<br>')
})
