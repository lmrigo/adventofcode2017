var input = [
'flqrgnkx'
,puzzleInput
]

var day14 = function() {

  for (var i = 0; i < input.length; i++) {

    var gridSize = 128
    var hashInputs = []
    for (var h = 0; h < gridSize; h++) {
      hashInputs.push(knotHash(input[i]+'-'+h))
    }
    // console.log(hashInputs)
    var bitOutputs = []
    for (var b = 0; b < hashInputs.length; b++) {
      bitOutputs[b] = hashInputs[b].split('').reduce((acc, val) => {
        var num = ("000"+Number.parseInt(val,16).toString(2)).slice(-4)
        return acc + num
      },'')
    }
    // console.log(bitOutputs)
    var usedSquares = bitOutputs.reduce((acc, val) => {
      var usedInLine = val.split('').reduce((lacc, lval) => {
        return lacc + (lval === '1' ? 1 : 0)
      }, 0)
      return acc + usedInLine
    }, 0)

    $('#day14').append(input[i])
      .append('<br>&emsp;')
      .append(usedSquares)
      .append('<br>')
  }
}


var day14Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

var knotHash = function(input) {
    var listLength = 256;
    var list = []
    for (var l = 0; l < listLength; l++) {
      list[l] = l
    }
    var originalLengths = $.map(input.split(''),(v) => {return v.charCodeAt(0)})
    originalLengths.push(17, 31, 73, 47, 23)
    var skipSize = 0
    var pos = 0
    var rounds = 64
    for (var r = 0; r < rounds; r++) {
      var lengths = originalLengths.slice(0)

      while (lengths.length > 0) {
        var len = lengths.shift()
        var sub
        //check circular
        if (pos+len < listLength) {
          sub = list.slice(pos, pos+len)
        } else {
          var a = list.slice(pos)
          var b = list.slice(0, ((pos+len)-listLength))
          sub = a.concat(b)
        }
        sub.reverse()
        for (var s = 0; s < sub.length; s++) {
          list[(pos + s) % listLength] = sub[s]
        }
        pos = (pos + len + skipSize) % listLength
        skipSize++
      }
    }
    // xors
    var xors = []
    for (var xi = 0; xi < list.length; xi = xi + 16) {
      var accum = list[xi + 0] ^ list[xi + 1]
       ^ list[xi + 2] ^ list[xi + 3] ^ list[xi + 4]
        ^ list[xi + 5] ^ list[xi + 6] ^ list[xi + 7]
         ^ list[xi + 8] ^ list[xi + 9] ^ list[xi + 10]
          ^ list[xi + 11] ^ list[xi + 12] ^ list[xi + 13]
           ^ list[xi + 14] ^ list[xi + 15]
      xors.push(accum)
    }

    var hexString = $.map(xors, (v)=>{
      return ("0"+Number(v).toString(16)).slice(-2)
    }).join('')
    return hexString
}

$(function (){
  $('#main').append('<div id="day14"><h2>day #14</h2></div>')
  day14()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day14Part2()
  $('#main').append('<br>')
})
