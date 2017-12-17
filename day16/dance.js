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

  for (var i = 0; i < input.length; i++) {
    

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
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
