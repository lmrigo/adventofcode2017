var input = [
`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`
,puzzleInput
]

var day24 = function() {

  for (var i = 0; i < input.length; i++) {
    var components = []
    var lines = input[i].split(/\n/)
    $.each(lines, (idx, val) => {
      var ports = val.split(/\//)
      components.push({p1: Number(ports[0]), p2: Number(ports[1])})
    })

    var genNextStates = function(state) {
      var nextStates = []
      $.each(components, (idx, val) => {
        if(state.idxsUsed.includes(idx)) {
          return true
        } else {
          if (val.p1 === state.nextPort) {
            var newState = {
              nextPort: val.p2,
              sum: state.sum + (val.p1 + val.p2),
              idxsUsed: state.idxsUsed.slice()
            }
            newState.idxsUsed.push(idx)
            nextStates.push(newState)
          } else if (val.p2 === state.nextPort) {
            var newState = {
              nextPort: val.p1,
              sum: state.sum + (val.p1 + val.p2),
              idxsUsed: state.idxsUsed.slice()
            }
            newState.idxsUsed.push(idx)
            nextStates.push(newState)
          }
        }
      }) 
      return nextStates
    }

    // find init components
    var initComps = components.filter((x) => {
      return x.p1 === 0 || x.p2 === 0
    })

    var nextStates = []
    $.each(initComps, (idx, val) => {
      if (val.p1 === 0) {
        nextStates.push({
          nextPort: val.p2,
          sum: (val.p1 + val.p2),
          idxsUsed: [components.indexOf(val)]
        })
      } else {
        nextStates.push({
          nextPort: val.p1,
          sum: (val.p1 + val.p2),
          idxsUsed: [components.indexOf(val)]
        })
      }
    })
    // console.log(nextStates)
    // console.log(components)

    var maxStrength = -1
    var steps = 0
    while (nextStates.length > 0) {
      // shift too slow
      // if (nextStates.length % 10000 === 0) {
      //   console.log(nextStates.length, maxStrength)
      // }
      // var state = nextStates.shift()

      // if (steps++ % 10000 === 0) {
      //   console.log(steps, maxStrength)
      // }
      var state = nextStates.pop()
      if (state.sum > maxStrength) {
        maxStrength = state.sum
      }
      nextStates.push(...genNextStates(state))
    }
    //> que 1701

    $('#day24').append(input[i])
      .append('<br>&emsp;')
      .append(maxStrength)
      .append('<br>')
  }
}

var day24Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day24"><h2>day #24</h2></div>')
  day24()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day24Part2()
  $('#main').append('<br>')
})
