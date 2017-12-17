var input = [
's1,x3/4,pe/b'
,puzzleInput
]

var genProgs = function() {
  return 'abcdefghijklmnop'.split('')
}

var genProgs5 = function() {
  return 'abcde'.split('')
}

var day16 = function() {

  for (var i = 0; i < input.length; i++) {
    var progs = i===0?genProgs5():genProgs()
    var instructions = input[i].split(',')
    // console.log(instructions.length)
    for (var j = 0; j < instructions.length; j++) {
      var ins = instructions[j]
      var command = ins.charAt(0)
      if (command ==='s') {
        var count = Number(ins.substr(1))
        var piece = progs.splice(progs.length-count, count)
        progs = piece.concat(progs)
      } else if (command === 'x') {
        var idxs = $.map(ins.substr(1).split('/'), (x) => { return Number(x) })
        var aux = progs[idxs[0]]
        progs[idxs[0]] = progs[idxs[1]]
        progs[idxs[1]] = aux
      } else if (command === 'p') {
        var vals = ins.substr(1).split('/')
        var idxs = $.map(vals, (x) => {
          return progs.indexOf(x)
        })
        progs[idxs[0]] = vals[1]
        progs[idxs[1]] = vals[0]
      }
      // if (j%1000===0) {
      //   console.log(j)
      // }
    }

    var final = progs.join('')

    $('#day16').append(input[i])
      .append('<br>&emsp;')
      .append(final)
      .append('<br>')
  }
}

var day16Part2 = function () {

  for (var i = 1; i < input.length; i++) {
    var progs = i===0?'abcde':'abcdefghijklmnop'
    var rawInstructions = input[i].split(',')
    var instructions = []
    for (var j = 0; j < rawInstructions.length; j++) {
      var ins = rawInstructions[j]
      var command = ins.charAt(0)
      if (command ==='s') {
        var count = Number(ins.substr(1))
        instructions.push(['s',count])
      } else if (command === 'x') {
        var idxs = $.map(ins.substr(1).split('/'), (x) => { return Number(x) })
        instructions.push(['x',idxs[0],idxs[1]])
      } else if (command === 'p') {
        var vals = ins.substr(1).split('/')
        instructions.push(['p',vals])
      }
    }
    // console.log(instructions.length)
    //100k = pclhmengojfdkaib
    //200k = nogfkpaecjmihdbl

    var start = 0
    var rounds = i===0?2:1000000000
    // every 60 rounds it goes back to starting point
    rounds = rounds % 60
    for (var r = start; r < rounds; r++) {
      for (var j = 0; j < instructions.length; j++) {
        var ins = instructions[j]
        var command = ins[0]
        if (command ==='s') {
          var idx = ins[1]
          progs = progs.slice(-idx) + progs.slice(0,-idx)
        } else if (command === 'x') {
          if (ins[1] < ins[2]) {
            progs = progs.slice(0,ins[1]) + progs.charAt(ins[2])
                  + progs.slice(ins[1]+1,ins[2]) + progs.charAt(ins[1])
                  + progs.slice(ins[2]+1)
          } else {
            progs = progs.slice(0,ins[2]) + progs.charAt(ins[1])
                  + progs.slice(ins[2]+1,ins[1]) + progs.charAt(ins[2])
                  + progs.slice(ins[1]+1)
          }
        } else if (command === 'p') {
          var vals = ins[1]
          var idxA = progs.indexOf(vals[0])
          var idxB = progs.indexOf(vals[1])
          if (idxA < idxB) {
            progs = progs.slice(0,idxA) + vals[1]
                  + progs.slice(idxA+1,idxB) + vals[0]
                  + progs.slice(idxB+1)
          } else {
            progs = progs.slice(0,idxB) + vals[0]
                  + progs.slice(idxB+1,idxA) + vals[1]
                  + progs.slice(idxA+1)
          }
        }
      }
      if (progs==='abcdefghijklmnop') {
        console.log(r+1)
      }

      // if ((r+1)%5000===0) {
      //   console.log(r+1, progs)
      // }
    }
    
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(progs)
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day16"><h2>day #16</h2></div>')
  day16()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day16Part2()
  $('#main').append('<br>')
})

/*

    var rounds = i===0?2:1000000000
    for (var r = 0; r < rounds; r++) {
      // console.log(instructions.length)
      for (var j = 0; j < instructions.length; j++) {
        var ins = instructions[j]
        var command = ins.charAt(0)
        if (command ==='s') {
          var count = Number(ins.substr(1))
          var piece = progs.splice(progs.length-count, count)
          progs = piece.concat(progs)
        } else if (command === 'x') {
          var idxs = $.map(ins.substr(1).split('/'), (x) => { return Number(x) })
          var aux = progs[idxs[0]]
          progs[idxs[0]] = progs[idxs[1]]
          progs[idxs[1]] = aux
        } else if (command === 'p') {
          var vals = ins.substr(1).split('/')
          var idxs = $.map(vals, (x) => {
            return progs.indexOf(x)
          })
          progs[idxs[0]] = vals[1]
          progs[idxs[1]] = vals[0]
        }
      }
      if (r%1000000===0) {
        console.log(r+1, progs.join(''))
      }
    }
    var final = progs.join('')
*/