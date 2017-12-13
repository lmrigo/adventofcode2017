var input = [
`0: 3
1: 2
4: 4
6: 4`
,puzzleInput
]

var day13 = function() {

  for (var i = 0; i < input.length; i++) {
    var firewall = []
    var reverse = []
    var lines = input[i].split(/\n/)
    $.each(lines, (idx, val) => {
      var parts = val.split(/:\s/)
      var fidx = Number(parts[0])
      var range = Number(parts[1])
      firewall[fidx] = []
      firewall[fidx][0] = true //scanner
      reverse[fidx] = false
      for (var r = 1; r < range; r++) {
        firewall[fidx][r] = false
      }
    })
    //console.log(firewall)

    var myIdx = -1
    var caughts = []
    while (myIdx < firewall.length) {
      myIdx++
      if (firewall[myIdx] !== undefined) {
        if (firewall[myIdx][0]) {
          caughts.push(myIdx)
        }
      }
      // move sensors
      for (var s = 0; s < firewall.length; s++) {
        if (firewall[s] !== undefined) {
          var sidx = firewall[s].findIndex((x) => { return x })
          if (reverse[s]) {
            firewall[s][sidx] = false
            firewall[s][sidx-1] = true
            if ((sidx-1) === 0) {
              reverse[s] = false
            }
          } else {
            firewall[s][sidx] = false
            firewall[s][sidx+1] = true
            if ((sidx+1) === (firewall[s].length-1)) {
              reverse[s] = true
            }
          }
        }
      }
    }

    console.log(caughts)

    var severity = caughts.reduce((acc, val) => {
      return acc + (val * firewall[val].length)
    }, 0)

    $('#day13').append(input[i])
      .append('<br>&emsp;')
      .append(severity)
      .append('<br>')
  }
}

var day13Part2 = function () {

  for (var i = 0; i < input.length; i++) {


    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day13"><h2>day #13</h2></div>')
  day13()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day13Part2()
  $('#main').append('<br>')
})
