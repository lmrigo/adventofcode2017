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

    //console.log(caughts)

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

    var delay = i===0 ? 0  : 31000
    var finish = false
    while (!finish){
      // if (delay % 1000 === 0) {console.log(delay)}
      var time = delay
      reset(firewall, time)
      var myIdx = -1
      while (myIdx < firewall.length) {
        myIdx++
        time++
        if (firewall[myIdx] !== undefined) {
          if (firewall[myIdx][0]) {
            delay += 1 // jump 2 at a time
            //only on even numbers because [1] has only 2 positions
            break
          }
        }

        // move sensors
        for (var si = myIdx; si < firewall.length; si++) { // only update from myIdx forward
          if (firewall[si] !== undefined) {
            var pos = sensorPos(time,firewall[si].length)
            for (var sj = 0; sj < firewall[si].length; sj++) {
              firewall[si][sj] = (sj === pos)
            }
          }
        }

      }

      finish = myIdx >= firewall.length
      // if (delay > 15) break
    }

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(delay)
      .append('<br>')
  }

}

var reset = function(firewall, time) {
  for (var i = 0; i < firewall.length; i++) {
    if (firewall[i]) {
      var pos = sensorPos(time,firewall[i].length)
      for (var j = 0; j < firewall[i].length; j++) {
        firewall[i][j] = (j === pos)
      }
    }
  }
}

var sensorPos = function(time, range) {
  var pos = 0
  var mod = time % (range + (range - 2))
  if (mod >= range) {
    var posAhead = mod % (range-1)
    pos = range - posAhead -1
  } else {
    pos = mod
  }
  return pos
}


$(function (){
  $('#main').append('<div id="day13"><h2>day #13</h2></div>')
  day13()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day13Part2()
  $('#main').append('<br>')
})
