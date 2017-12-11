var input = [
'3,4,1,5'
,puzzleInput
]

var day10 = function() {

  for (var i = 0; i < input.length; i++) {
    var listLength = i==0?5:256;
    var list = []
    for (var l = 0; l < listLength; l++) {
      list[l] = l
    }
    var lengths = $.map(input[i].split(/,/), (s) => {return Number(s)})
    var skipSize = 0
    var pos = 0
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

    var result = list[0] * list[1]
    $('#day10').append(input[i])
      .append('<br>&emsp;')
      .append(result)
      .append('<br>')
  }
}


var day10Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day10"><h2>day #10</h2></div>')
  day10()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day10Part2()
  $('#main').append('<br>')
})
