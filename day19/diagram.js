var input = [
`     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
                `
,puzzleInput
]

var grid = []

var isLetter = function(x) {
  return x.match(/\w/) !== null
}

var day19 = function() {

  for (var i = 0; i < input.length; i++) {
    var lines = input[i].split(/\n/)
    grid = []
    $.each(lines, function(idx, val) {
      grid.push(val.split(''))
    })
    // console.log(grid)
    // find starting point
    var startIdx = grid[0].findIndex((x) => {return x==='|'})
    // console.log(startIdx)
    var letters = grid.reduce((accline, line) => {
      return accline + line.reduce((acc, val) => { 
        return acc + (isLetter(val) ? val : '')
      }, '')
    }, '')
    // console.log(letters)
    var passedLetters = ''
    var initState = {'x': 0, 'y': startIdx, 'dir': 'D'}
    var nextStates = [initState]
    while (passedLetters.length < letters.length && nextStates.length > 0) {
      var state = nextStates.shift()
      var val = grid[state.x][state.y]
      if (isLetter(val)) {
        passedLetters += val
      }
      nextStates.push(...genNextStates(state))
    }

    $('#day19').append(input[i])
      .append('<br>&emsp;')
      .append(passedLetters)
      .append('<br>')
  }
}

var isWalkable = function(x) {
  return x.match(/\w|\||-|\+/) !== null
}

var canWalk = function(st, dir) {
  var can = false
  switch(dir) {
    case 'U': can = isWalkable(grid[st.x-1][st.y]); break;
    case 'D': can = isWalkable(grid[st.x+1][st.y]); break;
    case 'L': can = isWalkable(grid[st.x][st.y-1]); break;
    case 'R': can = isWalkable(grid[st.x][st.y+1]); break;
  }
  return can
}

var genState = function(st, dir) {
  var newSt = {}
  switch(dir) {
    case 'U': newSt = {'x':st.x-1, 'y':st.y, 'dir':'U'}; break;
    case 'D': newSt = {'x':st.x+1, 'y':st.y, 'dir':'D'}; break;
    case 'L': newSt = {'x':st.x, 'y':st.y-1, 'dir':'L'}; break;
    case 'R': newSt = {'x':st.x, 'y':st.y+1, 'dir':'R'}; break;
  }
  return newSt
}

var genNextStates = function(st) {
  var newStates = []

  // check if can continue the same direction
  // otherwise check other directions
  if (canWalk(st, st.dir)) {
    newStates.push(genState(st, st.dir))
  } else {
    if (st.dir === 'D' || st.dir === 'U') { // left and right      
      if (canWalk(st, 'L')) {
        newStates.push(genState(st, 'L'))
      }
      if (canWalk(st, 'R')) {
        newStates.push(genState(st, 'R'))
      }
    } else if (st.dir === 'R' || st.dir === 'L') { // up and down
      if (canWalk(st, 'U')) {
        newStates.push(genState(st, 'U'))
      }
      if (canWalk(st, 'D')) {
        newStates.push(genState(st, 'D'))
      }
    }
  }
  return newStates
}

var day19Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day19"><h2>day #19</h2></div>')
  day19()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day19Part2()
  $('#main').append('<br>')
})
