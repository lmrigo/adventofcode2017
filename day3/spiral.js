var input = [
  '1',
  '12',
  '23',
  '1024',
  puzzleInput
]

var day3 = function() {

  var gridSize = 326000
  var i = 1
  var grid = []
  grid[0] = []
  grid[0][0] = i++ //1
  grid[1] = []
  grid[1][0] = i++ //2
  var x = 1
  var y = 0
  var minX = 0
  var minY = 0
  var steps = 1
  var repeat = false
  var direction = 0 // 0^ 1< 2V 3>
  while ( i < gridSize) {
    var stepsLeft = steps
    if (!repeat) {
      steps++
    }
    repeat = !repeat
    while (stepsLeft--) {
      switch (direction) {
        case 0: y++;break;
        case 1: x--;break;
        case 2: y--;break;
        case 3: x++;break;
      }
      minX = x < minX ? x : minX
      minY = y < minY ? y : minY
      if (grid[x] === undefined) {
        grid[x] = []
      }
      grid[x][y] = i++
    }
    // turn left
    direction = (direction + 1) % 4
  }

  // printgrid(grid)

  for (var i = 0; i < input.length; i++) {
    var distance = 0
    var xd = undefined
    var yd = undefined
    var inNum = Number(input[i])
    for (var gi = minX; gi < grid.length; gi++) {
      for (var gj = minY; gj < grid[gi].length; gj++) {
        var num = grid[gi][gj]
        if (num === inNum) {
          xd = gi
          yd = gj
          break
        }
      }
      if (xd && yd) {
        break
      }
    }
    // console.log(xd, yd)

    distance = Math.abs(xd) + Math.abs(yd)

    // console.log(distance)
    $('#day3').append(input[i])
      .append('<br>&emsp;')
      .append(distance)
      .append('<br>')
  }
}

var day3Part2 = function () {

  var numInputs = $.map(input, function(val) {
    return Number(val)
  })
  var numInputIdx = 0
  var results = []

  var gridSize = 20
  var i = 1
  var grid = []
  grid[0] = []
  grid[0][0] = 1
  var x = 0
  var y = 0
  var minX = 0
  var minY = 0
  var steps = 1
  var repeat = true
  var direction = 3 // 0^ 1< 2V 3>
  while (i++ < gridSize) {
    var stepsLeft = steps
    if (!repeat) {
      steps++
    }
    repeat = !repeat
    while (stepsLeft--) {
      switch (direction) {
        case 0: y++;break;
        case 1: x--;break;
        case 2: y--;break;
        case 3: x++;break;
      }
      minX = x < minX ? x : minX
      minY = y < minY ? y : minY
      if (grid[x] === undefined) {
        grid[x] = []
      }
      var surroundingSum = 0
      if (grid[x-1]) {
        surroundingSum += grid[x-1][y-1] ? grid[x-1][y-1] : 0
        surroundingSum += grid[x-1][y] ? grid[x-1][y] : 0
        surroundingSum += grid[x-1][y+1] ? grid[x-1][y+1] : 0
      }
      surroundingSum += grid[x][y-1] ? grid[x][y-1] : 0
      surroundingSum += grid[x][y+1] ? grid[x][y+1] : 0
      if (grid[x+1]) {
        surroundingSum += grid[x+1][y-1] ? grid[x+1][y-1] : 0
        surroundingSum += grid[x+1][y] ? grid[x+1][y] : 0
        surroundingSum += grid[x+1][y+1] ? grid[x+1][y+1] : 0
      }
      grid[x][y] = surroundingSum
      if (surroundingSum > numInputs[numInputIdx]) {
        results.push(surroundingSum)
        numInputIdx++
      }

    }
    // turn left
    direction = (direction + 1) % 4
  }

  // printgrid(grid)

  for (var i = 0; i < input.length; i++) {

    larger = results[i]

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(larger)
      .append('<br>')
  }

}

var printgrid = function(grid) {
  var all = ''
  for (var i = -4; i < grid.length; i++) {
    var line = ''
    if (grid[i] === undefined) {
      continue
    }
    for (var j = -4; j < grid.length; j++) {
      line += '\t' + (grid[i][j] === undefined ? '' : grid[i][j])
    }
    all += line + '\n'
  }
  console.log(all)
}

$(function (){
  $('#main').append('<div id="day3"><h2>day #3</h2></div>')
  day3()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day3Part2()
  $('#main').append('<br>')
})
