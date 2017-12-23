var input = [
`..#
#..
...`
,puzzleInput
]

var day22 = function() {

  for (var i = 0; i < input.length; i++) {
    var grid = []
    var lines = input[i].split(/\n/)
    for (var l = 0; l < lines.length; l++) {
      grid[l] = lines[l].split('')
    }

    // virus
    var v = {
      dir: 'U',
      x: Math.floor(grid.length / 2),
      y: Math.floor(grid[0].length / 2),
      move: function() {
        switch(this.dir) {
          case 'U': this.x--;break;
          case 'L': this.y--;break;
          case 'D': this.x++;break;
          case 'R': this.y++;break;
        }
      }
    }

    var steps = 0
    var limit = 10000
    var infectionCount = 0
    while (steps++ < limit) {
      if (grid[v.x] === undefined) {
        grid[v.x] = []
      }
      if (grid[v.x][v.y] === '#') {
        v.dir = turnRight(v.dir)
        grid[v.x][v.y] = '.'
      } else {
        v.dir = turnLeft(v.dir)
        grid[v.x][v.y] = '#'
        infectionCount++
      }
      v.move()
    }
    // console.log(grid)

    $('#day22').append(input[i])
      .append('<br>&emsp;')
      .append(infectionCount)
      .append('<br>')
  }
}

var turnRight = function(dir) {
  var next = ''
  switch(dir) {
    case 'U': next = 'R';break;
    case 'R': next = 'D';break;
    case 'D': next = 'L';break;
    case 'L': next = 'U';break;
  }
  return next
}
var turnLeft = function(dir) {
  var next = ''
  switch(dir) {
    case 'U': next = 'L';break;
    case 'L': next = 'D';break;
    case 'D': next = 'R';break;
    case 'R': next = 'U';break;
  }
  return next
}

var day22Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day22"><h2>day #22</h2></div>')
  day22()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day22Part2()
  $('#main').append('<br>')
})