var input = [
// `12/34 => ##./#../...
// 123/456/789 => #..#/..../..../#..#`
`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`
,puzzleInput
]

var startingPattern =
`.#.
..#
###`;
// `#.
// ..`;

var day21 = function() {


  for (var i = 0; i < input.length; i++) {
    var rules = {}
    var linesRules = input[i].split(/\n/)
    $.each(linesRules, (idx,val) => {
      var parts = val.split(/\s/)
      var inputRule = parts[0]
      var outputRule = parts[2]
      // do this {rules[inputRule] = outputRule} for all combos
      // parse input rule
      // rotate input
      // 12 31 43 24
      // 34 42 21 13
      // flip input
      // 12 21 34
      // 34 43 12
      // rotate and flip
      // 31 13 42| 43 34 21 | 24 42 13
      // 42 24 31| 21 12 43 | 13 31 24
      var inrlines = inputRule.split('/')
      var inGrid = []
      $.each(inrlines, (inrlIdx, inrlVal) => {
        inGrid[inrlIdx] = inrlVal.split('')
      })
      var inRuleStr = ''
      // normal
      for (var ri = 0; ri < inGrid.length; ri++) {
        for (var rj = 0; rj < inGrid[ri].length; rj++) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // flip horizontally
      inRuleStr = ''
      for (var ri = inGrid.length-1; ri >= 0; --ri) {
        for (var rj = 0; rj < inGrid[ri].length; rj++) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // flip vertically
      inRuleStr = ''
      for (var ri = 0; ri < inGrid.length; ri++) {
        for (var rj = inGrid[ri].length-1; rj >= 0; --rj) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate right x1
      inRuleStr = ''
      for (var rj = 0; rj < inGrid[0].length; rj++) {
        for (var ri = inGrid.length-1; ri >= 0; --ri) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate right x2
      inRuleStr = ''
      for (var ri = inGrid.length-1; ri >= 0; --ri) {
        for (var rj = inGrid[ri].length-1; rj >= 0; --rj) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate right x3
      inRuleStr = ''
      for (var rj = inGrid[0].length-1; rj >= 0; --rj) {
        for (var ri = 0; ri < inGrid.length; ri++) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate rx1 flip h
      inRuleStr = ''
      for (var rj = 0; rj < inGrid[0].length; rj++) {
        for (var ri = 0; ri < inGrid.length; ri++) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate rx1 flip v
      inRuleStr = ''
      for (var rj = inGrid[0].length-1; rj >= 0; --rj) {
        for (var ri = inGrid.length-1; ri >= 0; --ri) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate rx2 flip h
      // rotate rx2 flip v
      // rotate rx3 flip h
      // rotate rx3 flip v
      // these should've already been generated

    })
    // console.log(rules)

    var toInputRule = function(inSquare) {
      var rule = inSquare.reduce((acc, val) => {
        return acc + val.join('') + '/'
      }, '')
      return rule.substr(0,rule.length-1)
    }
    var toGridSquare = function(str) {
      var square = []
      $.each(str.split(/\//), (idx, line) => {
        square[idx] = line.split('')
      })
      return square
    }

    // init grid
    var grid = []
    $.each(startingPattern.split(/\n/), (idx, line) => {
      grid[idx] = line.split('')
    })
    // console.log(grid)

    var iterations = i===0?2:5
    while(iterations-- > 0) {
      var newGrid = []
      if (grid.length % 2 === 0) {
        // each 2x2 square
        for (var gi = 0; gi < grid.length; gi+=2) {
          for (var gj = 0; gj < grid[gi].length; gj+=2) {
            var inSquare = [ [grid[gi][gj], grid[gi+1][gj]],
                              [grid[gi][gj+1],grid[gi+1][gj+1]] ]
            var inRule = toInputRule(inSquare)
            var outSquare = toGridSquare(rules[inRule])
            var ngi = (gi/2)*3
            var ngj = (gj/2)*3
            if (!newGrid[ngi+0]) {
              newGrid[ngi+0] = []
            }
            newGrid[ngi+0][ngj+0] = outSquare[0][0]
            newGrid[ngi+0][ngj+1] = outSquare[0][1]
            newGrid[ngi+0][ngj+2] = outSquare[0][2]
            if (!newGrid[ngi+1]) {
              newGrid[ngi+1] = []
            }
            newGrid[ngi+1][ngj+0] = outSquare[1][0]
            newGrid[ngi+1][ngj+1] = outSquare[1][1]
            newGrid[ngi+1][ngj+2] = outSquare[1][2]
            if (!newGrid[ngi+2]) {
              newGrid[ngi+2] = []
            }
            newGrid[ngi+2][ngj+0] = outSquare[2][0]
            newGrid[ngi+2][ngj+1] = outSquare[2][1]
            newGrid[ngi+2][ngj+2] = outSquare[2][2]
          }
        }
      } else if (grid.length % 3 === 0) {
        // each 3x3 square
        for (var gi = 0; gi < grid.length; gi+=3) {
          for (var gj = 0; gj < grid[gi].length; gj+=3) {
            var inSquare = [ [grid[gi][gj], grid[gi+1][gj], grid[gi+2][gj]],
                              [grid[gi][gj+1],grid[gi+1][gj+1],grid[gi+2][gj+1]],
                              [grid[gi][gj+2],grid[gi+1][gj+2],grid[gi+2][gj+2]] ]
            var inRule = toInputRule(inSquare)
            var outSquare = toGridSquare(rules[inRule])
            var ngi = (gi/3)*4
            var ngj = (gj/3)*4
            if (!newGrid[ngi+0]) {
              newGrid[ngi+0] = []
            }
            newGrid[ngi+0][ngj+0] = outSquare[0][0]
            newGrid[ngi+0][ngj+1] = outSquare[0][1]
            newGrid[ngi+0][ngj+2] = outSquare[0][2]
            newGrid[ngi+0][ngj+3] = outSquare[0][3]
            if (!newGrid[ngi+1]) {
              newGrid[ngi+1] = []
            }
            newGrid[ngi+1][ngj+0] = outSquare[1][0]
            newGrid[ngi+1][ngj+1] = outSquare[1][1]
            newGrid[ngi+1][ngj+2] = outSquare[1][2]
            newGrid[ngi+1][ngj+3] = outSquare[1][3]
            if (!newGrid[ngi+2]) {
              newGrid[ngi+2] = []
            }
            newGrid[ngi+2][ngj+0] = outSquare[2][0]
            newGrid[ngi+2][ngj+1] = outSquare[2][1]
            newGrid[ngi+2][ngj+2] = outSquare[2][2]
            newGrid[ngi+2][ngj+3] = outSquare[2][3]
            if (!newGrid[ngi+3]) {
              newGrid[ngi+3] = []
            }
            newGrid[ngi+3][ngj+0] = outSquare[3][0]
            newGrid[ngi+3][ngj+1] = outSquare[3][1]
            newGrid[ngi+3][ngj+2] = outSquare[3][2]
            newGrid[ngi+3][ngj+3] = outSquare[3][3]
          }
        }
      } else {
        newGrid = grid
      }
      grid = newGrid
    }
    // console.log(grid)

    // reduce grid to count #
    var count = grid.reduce((lacc, lval) => {
      return lacc + lval.reduce((acc, val) => {
        return acc + (val==='#'?1:0)
      },0)
    },0)

    $('#day21').append(input[i])
      .append('<br>&emsp;')
      .append(count)
      .append('<br>')
  }
}


var day21Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var rules = {}
    var linesRules = input[i].split(/\n/)
    $.each(linesRules, (idx,val) => {
      var parts = val.split(/\s/)
      var inputRule = parts[0]
      var outputRule = parts[2]
      // do this {rules[inputRule] = outputRule} for all combos
      // parse input rule
      // rotate input
      // 12 31 43 24
      // 34 42 21 13
      // flip input
      // 12 21 34
      // 34 43 12
      // rotate and flip
      // 31 13 42| 43 34 21 | 24 42 13
      // 42 24 31| 21 12 43 | 13 31 24
      var inrlines = inputRule.split('/')
      var inGrid = []
      $.each(inrlines, (inrlIdx, inrlVal) => {
        inGrid[inrlIdx] = inrlVal.split('')
      })
      var inRuleStr = ''
      // normal
      for (var ri = 0; ri < inGrid.length; ri++) {
        for (var rj = 0; rj < inGrid[ri].length; rj++) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // flip horizontally
      inRuleStr = ''
      for (var ri = inGrid.length-1; ri >= 0; --ri) {
        for (var rj = 0; rj < inGrid[ri].length; rj++) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // flip vertically
      inRuleStr = ''
      for (var ri = 0; ri < inGrid.length; ri++) {
        for (var rj = inGrid[ri].length-1; rj >= 0; --rj) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate right x1
      inRuleStr = ''
      for (var rj = 0; rj < inGrid[0].length; rj++) {
        for (var ri = inGrid.length-1; ri >= 0; --ri) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate right x2
      inRuleStr = ''
      for (var ri = inGrid.length-1; ri >= 0; --ri) {
        for (var rj = inGrid[ri].length-1; rj >= 0; --rj) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate right x3
      inRuleStr = ''
      for (var rj = inGrid[0].length-1; rj >= 0; --rj) {
        for (var ri = 0; ri < inGrid.length; ri++) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate rx1 flip h
      inRuleStr = ''
      for (var rj = 0; rj < inGrid[0].length; rj++) {
        for (var ri = 0; ri < inGrid.length; ri++) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate rx1 flip v
      inRuleStr = ''
      for (var rj = inGrid[0].length-1; rj >= 0; --rj) {
        for (var ri = inGrid.length-1; ri >= 0; --ri) {
          inRuleStr += inGrid[ri][rj]
        }
        inRuleStr += '/'
      }
      inRuleStr = inRuleStr.substr(0, inRuleStr.length-1) // remove last '/'
      rules[inRuleStr] = outputRule

      // rotate rx2 flip h
      // rotate rx2 flip v
      // rotate rx3 flip h
      // rotate rx3 flip v
      // these should've already been generated

    })
    // console.log(rules)

    var toInputRule = function(inSquare) {
      var rule = inSquare.reduce((acc, val) => {
        return acc + val.join('') + '/'
      }, '')
      return rule.substr(0,rule.length-1)
    }
    var toGridSquare = function(str) {
      var square = []
      $.each(str.split(/\//), (idx, line) => {
        square[idx] = line.split('')
      })
      return square
    }

    // init grid
    var grid = []
    $.each(startingPattern.split(/\n/), (idx, line) => {
      grid[idx] = line.split('')
    })
    // console.log(grid)

    var iterations = i===0?2:18
    while(iterations-- > 0) {
      var newGrid = []
      if (grid.length % 2 === 0) {
        // each 2x2 square
        for (var gi = 0; gi < grid.length; gi+=2) {
          for (var gj = 0; gj < grid[gi].length; gj+=2) {
            var inSquare = [ [grid[gi][gj], grid[gi+1][gj]],
                              [grid[gi][gj+1],grid[gi+1][gj+1]] ]
            var inRule = toInputRule(inSquare)
            var outSquare = toGridSquare(rules[inRule])
            var ngi = (gi/2)*3
            var ngj = (gj/2)*3
            if (!newGrid[ngi+0]) {
              newGrid[ngi+0] = []
            }
            newGrid[ngi+0][ngj+0] = outSquare[0][0]
            newGrid[ngi+0][ngj+1] = outSquare[0][1]
            newGrid[ngi+0][ngj+2] = outSquare[0][2]
            if (!newGrid[ngi+1]) {
              newGrid[ngi+1] = []
            }
            newGrid[ngi+1][ngj+0] = outSquare[1][0]
            newGrid[ngi+1][ngj+1] = outSquare[1][1]
            newGrid[ngi+1][ngj+2] = outSquare[1][2]
            if (!newGrid[ngi+2]) {
              newGrid[ngi+2] = []
            }
            newGrid[ngi+2][ngj+0] = outSquare[2][0]
            newGrid[ngi+2][ngj+1] = outSquare[2][1]
            newGrid[ngi+2][ngj+2] = outSquare[2][2]
          }
        }
      } else if (grid.length % 3 === 0) {
        // each 3x3 square
        for (var gi = 0; gi < grid.length; gi+=3) {
          for (var gj = 0; gj < grid[gi].length; gj+=3) {
            var inSquare = [ [grid[gi][gj], grid[gi+1][gj], grid[gi+2][gj]],
                              [grid[gi][gj+1],grid[gi+1][gj+1],grid[gi+2][gj+1]],
                              [grid[gi][gj+2],grid[gi+1][gj+2],grid[gi+2][gj+2]] ]
            var inRule = toInputRule(inSquare)
            var outSquare = toGridSquare(rules[inRule])
            var ngi = (gi/3)*4
            var ngj = (gj/3)*4
            if (!newGrid[ngi+0]) {
              newGrid[ngi+0] = []
            }
            newGrid[ngi+0][ngj+0] = outSquare[0][0]
            newGrid[ngi+0][ngj+1] = outSquare[0][1]
            newGrid[ngi+0][ngj+2] = outSquare[0][2]
            newGrid[ngi+0][ngj+3] = outSquare[0][3]
            if (!newGrid[ngi+1]) {
              newGrid[ngi+1] = []
            }
            newGrid[ngi+1][ngj+0] = outSquare[1][0]
            newGrid[ngi+1][ngj+1] = outSquare[1][1]
            newGrid[ngi+1][ngj+2] = outSquare[1][2]
            newGrid[ngi+1][ngj+3] = outSquare[1][3]
            if (!newGrid[ngi+2]) {
              newGrid[ngi+2] = []
            }
            newGrid[ngi+2][ngj+0] = outSquare[2][0]
            newGrid[ngi+2][ngj+1] = outSquare[2][1]
            newGrid[ngi+2][ngj+2] = outSquare[2][2]
            newGrid[ngi+2][ngj+3] = outSquare[2][3]
            if (!newGrid[ngi+3]) {
              newGrid[ngi+3] = []
            }
            newGrid[ngi+3][ngj+0] = outSquare[3][0]
            newGrid[ngi+3][ngj+1] = outSquare[3][1]
            newGrid[ngi+3][ngj+2] = outSquare[3][2]
            newGrid[ngi+3][ngj+3] = outSquare[3][3]
          }
        }
      } else {
        newGrid = grid
      }
      grid = newGrid
    }
    // console.log(grid)

    // reduce grid to count #
    var count = grid.reduce((lacc, lval) => {
      return lacc + lval.reduce((acc, val) => {
        return acc + (val==='#'?1:0)
      },0)
    },0)

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(count)
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day21"><h2>day #21</h2></div>')
  day21()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day21Part2()
  $('#main').append('<br>')
})

// rotate input
// x0  x1  x2  x3
// 123 741 987 369
// 456 852 654 258
// 789 963 321 147
// flip input
// n   h   v
// 123 321 789
// 456 654 456
// 789 987 123
// rotate and flip
// x1  x1h x1v  x2  x2h x2v  x3  x3h x3v
// 741 147 963| 987 789 321| 369 963 147
// 852 258 852| 654 456 654| 258 852 258
// 963 369 741| 321 123 987| 147 741 369