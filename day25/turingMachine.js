var input = [
`Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`,
puzzleInput
]

var day25 = function() {

  for (var i = 0; i < input.length; i++) {
    var lines = input[i].split(/\n/)
    var beginState = lines[0].split(/\s/)[3].replace('.','')
    var checksumSteps = Number(lines[1].split(/\s/)[5])
    
    var states = {}
    var statesIdx = 3
    while (statesIdx < lines.length) {
      var stateName = lines[statesIdx].split(/\s+/)[2].replace(':','')
      var zWrite = lines[statesIdx+2].split(/\s+/)[5].replace('.','')
      var zMove = lines[statesIdx+3].split(/\s+/)[7].replace('.','') === 'right' ? 1 : -1
      var zNextState = lines[statesIdx+4].split(/\s+/)[5].replace('.','')
      var oWrite = lines[statesIdx+6].split(/\s+/)[5].replace('.','')
      var oMove = lines[statesIdx+7].split(/\s+/)[7].replace('.','') === 'right' ? 1 : -1
      var oNextState = lines[statesIdx+8].split(/\s+/)[5].replace('.','')

      states[stateName] = {
        '0': {
          'write': zWrite,
          'move': zMove,
          'next': zNextState
        },
        '1': {
          'write': oWrite,
          'move': oMove,
          'next': oNextState
        }
      }
      statesIdx += 10
    }
    // console.log(states)

    var tm = [] // turing machine
    var curState = beginState
    var pc = 0
    while(checksumSteps-- > 0) {
      if (tm[pc] === undefined) {
        tm[pc] = '0'
      }
      var command = states[curState][tm[pc]]
      tm[pc] = command.write
      pc += command.move
      curState = command.next
    }
    // console.log(tm)
    var diagnosticChecksum = 0
    $.each(Object.keys(tm), (idx, val) => {
      diagnosticChecksum += (tm[val]==='1'? 1 : 0)
    })

    $('#day25').append(input[i])
      .append('<br>&emsp;')
      .append(diagnosticChecksum)
      .append('<br>')
  }
}

var day25Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day25"><h2>day #25</h2></div>')
  day25()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day25Part2()
  $('#main').append('<br>')
})
