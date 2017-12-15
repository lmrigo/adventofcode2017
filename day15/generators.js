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
  this.matchLowest16Bits = function(other) {
    //65535 (16 0 and 16 1)
    var ref = 65535
    return (this.val & ref) === (other.val & ref)
  }
  this.multipleOf = function(x) {
    return (this.val % x) === 0
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

    var rounds = 40 * 1000 * 1000
    // console.log(genA.val, genB.val)
    for (var r = 0; r < rounds; r++) {
      if (genA.matchLowest16Bits(genB)) {
        judgeCounter++
      }
      genA.nextVal()
      genB.nextVal()
      if (r % 10000000 === 0) {
        // console.log(r, judgeCounter)
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

var day15Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var inits = $.map(input[i].split(/\n/), (x) => {
      return Number(x.replace(/\D/g, ''))
    })
    var genA = new Generator(16807, inits[0])
    var genB = new Generator(48271, inits[1])

    var judgeCounter = 0
    var AVals = []
    var BVals = []

    var rounds = 5 * 1000 * 1000
    var valsLength = AVals.length < BVals.length ? AVals.length : BVals.length

    while (valsLength < rounds) {
      if (genA.multipleOf(4)) {
        AVals.push(genA.val)
      }
      if (genB.multipleOf(8)) {
        BVals.push(genB.val)
      }
      genA.nextVal()
      genB.nextVal()
      valsLength = AVals.length < BVals.length ? AVals.length : BVals.length
    }
    // console.log(AVals, BVals)

    var judgeCompare = function(aval, bval) {
      //65535 (16 0 and 16 1)
      var ref = 65535
      return (aval & ref) === (bval & ref)
    }

    for (var v = 0; v < valsLength; v++) {
      if (judgeCompare(AVals[v], BVals[v])) {
        judgeCounter++
      }
      if (v % 1000000 === 0) {
        console.log(v, judgeCounter)
      }
    }

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(judgeCounter)
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
