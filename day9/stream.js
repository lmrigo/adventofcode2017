var input = [
'{}',
'{{{}}}',
'{{},{}}',
'{{{},{},{{}}}}',
'{<a>,<a>,<a>,<a>}',
'{{<ab>},{<ab>},{<ab>},{<ab>}}',
'{{<!!>},{<!!>},{<!!>},{<!!>}}',
'{{<a!>},{<a!>},{<a!>},{<ab>}}',
'{{!}!{}}'

,puzzleInput
]



var day9 = function() {

  for (var i = 0; i < input.length; i++) {
    var score = 0
    var str = input[i]
    var idx = 0
    var level = 1
    var garbage = false
    while (idx < str.length) {
      var ch = str[idx]
      if (ch === '!') {
        idx++
      } else if (ch === '>') {
        garbage = false
      } else if (garbage) {
        // garbage
      } else if (ch === '<') {
        garbage = true
      } else if (ch === '{') {
        score += level
        level++
      } else if (ch === '}') {
        level--
      }
      idx++
    }

    $('#day9').append(input[i])
      .append('<br>&emsp;')
      .append(score)
      .append('<br>')
  }
}


var day9Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day9"><h2>day #9</h2></div>')
  day9()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day9Part2()
  $('#main').append('<br>')
})
