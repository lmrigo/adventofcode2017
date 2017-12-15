var input = [
`Generator A starts with 65
Generator B starts with 8921`
,puzzleInput
]

function Generator (factor, val) {
  this.factor = factor
  this.val = val
  this.nextVal = function() {
    this.val = (this.val * this.factor) % 2147483647
  }
  this.last16Bits = function(x) {
    return ("0000000000000000"+x.toString(2)).slice(-16)
  }
  this.matchLowest16Bits = function(other) {
    return this.last16Bits(this.val) === this.last16Bits(other.val)
    //65535 (16 0 and 16 1)
    // var ref = 65535
    // return (this.val & ref) === (other.val & ref)
  }
}

var day15 = function() {

  for (var i = 0; i < input.length; i++) {
    var inits = $.map(input[i].split(/\n/), (x) => {
      return Number(x.replace(/\D/g, ''))
    })
    var genA = new Generator(16807, inits[0])
    var genB = new Generator(48271, inits[1])

    var judgeCounter = 0

    var rounds = 5// 40 * 1000 * 1000
    // console.log(genA.val, genB.val)
    for (var r = 0; r < rounds; r++) {
      if (genA.matchLowest16Bits(genB)) {
        judgeCounter++
      }
      genA.nextVal()
      genB.nextVal()
      if (r % 10000000 === 0) {
        console.log(r, judgeCounter)
      }
      // console.log(genA.val, genB.val)
    }
    // console.log(genA.val, genB.val)

    $('#day15').append(input[i])
      .append('<br>&emsp;')
      .append(judgeCounter)
      .append('<br>')
  }
}

var nextVal = function(gen) {
  var next = (gen.val * gen.factor) % 2147483647
  return next
}


var day15Part2 = function () {

  for (var i = 0; i < input.length; i++) {
/*
          var nextSquares = [{'x': bi, 'y':bj, 'region': 'r'+rc}]
          var timeout = 1000
          while (nextSquares.length > 0 && --timeout) {
            var sq = nextSquares.shift()
            // check if already marked
            if (bitOutputs[sq.x][sq.y] === sq.region) {
              continue
            } else {
              if (bitOutputs[sq.x][sq.y] !== '1') {
                console.error('ai meu deus do cel', bitOutputs[sq.x][sq.y])
              }
              bitOutputs[sq.x][sq.y] = sq.region
            }
            // generate next squares in the four directions
            //W
            if (sq.x-1 >= 0 && bitOutputs[sq.x-1][sq.y] === '1') {
              nextSquares.push({'x': sq.x-1, 'y':sq.y, 'region': sq.region})
            }
            //E
            if (sq.x+1 < gridSize && bitOutputs[sq.x+1][sq.y] === '1') {
              nextSquares.push({'x': sq.x+1, 'y':sq.y, 'region': sq.region})
            }
            //S
            if (sq.y-1 >=0 && bitOutputs[sq.x][sq.y-1] === '1') {
              nextSquares.push({'x': sq.x, 'y':sq.y-1, 'region': sq.region})
            }
            //N
            if (sq.y+1 < gridSize && bitOutputs[sq.x][sq.y+1] === '1') {
              nextSquares.push({'x': sq.x, 'y':sq.y+1, 'region': sq.region})
            }
          }
          if (!timeout) {
            console.log('timeout!')
          }
          // next region
          regions.push(rc)
          rc++
        }
*/

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day15"><h2>day #15</h2></div>')
  day15()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day15Part2()
  $('#main').append('<br>')
})
