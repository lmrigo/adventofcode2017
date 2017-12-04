var input = [
`5 1 9 5
7 5 3
2 4 6 8`,
`5 9 2 8
9 4 7 3
3 8 6 5`,
  puzzleInput
]

var day2 = function() {

  for (var i = 0; i < input.length; i++) {
    var sum = 0
    var spreadsheet = input[i]
    var lines = spreadsheet.split('\n')
    for (var l = 0; l < lines.length; l++) {
      var numbers = lines[l].split(/\s+/)
      var min = Number.MAX_SAFE_INTEGER
      var max = 0
      for (var n = 0; n < numbers.length; n++) {
        var num = Number(numbers[n])
        if (num > max) {
          max = num
        }
        if (num < min) {
          min = num
        }
      }
      var diff = max - min
      sum += diff
    }

    // console.log(sum)
    $('#day2').append(input[i])
      .append('<br>&emsp;')
      .append(sum)
      .append('<br>')
  }
}

var day2Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var sum = 0
    var spreadsheet = input[i]
    var lines = spreadsheet.split('\n')
    for (var l = 0; l < lines.length; l++) {
      var numbers = lines[l].split(/\s+/)
      var div = 0
      for (var ni = 0; ni < numbers.length; ni++) {
        for (var nj = ni+1; nj < numbers.length; nj++) {
          var numi = Number(numbers[ni])
          var numj = Number(numbers[nj])
          var d
          if ((numi/numj) > 1) {
            d = numi/numj
          } else {
            d = numj/numi
          }
          if (Number.isInteger(d)) {
            div = d
            break
          }
        }
        if (div !== 0) {
          break
        }
      }
      sum += div
    }

    // console.log(sum)
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(sum)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day2"><h2>day #1</h2></div>')
  day2()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day2Part2()
  $('#main').append('<br>')
})
