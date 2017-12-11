var input = [
'ne,ne,ne',
'ne,ne,sw,sw',
'ne,ne,s,s',
'se,se',
'se,sw,se,sw,sw',
's,s,sw'
,puzzleInput
]

var day11 = function() {

  for (var i = 0; i < input.length; i++) {
    var x = 0
    var y = 0
    var z = 0
    var steps = 0

    var path = input[i].split(',')
    // console.log(path)
    for (var j = 0; j < path.length; j++) {
      var direction = path[j]
      switch (direction) {
        case 'nw': y++; x--; break;
        case 'n': y++; z--; break;
        case 'ne': x++; z--; break;
        case 'se': y--; x++; break;
        case 's': y--; z++; break;
        case 'sw': z++; x--; break;
      }
      steps++
    }
    var distance = Math.max(Math.abs(x), Math.abs(y), Math.abs(z))
    $('#day11').append(input[i])
      .append('<br>&emsp;')
      .append(distance)
      .append('<br>')
  }
}


var day11Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day11"><h2>day #11</h2></div>')
  day11()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day11Part2()
  $('#main').append('<br>')
})
