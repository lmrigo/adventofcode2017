var input = [
  '1122',
  '1111',
  '1234',
  '91212129',
  puzzleInput
]

var day1 = function() {

  for (var i = 0; i < input.length; i++) {
    var numbers = input[i]
    var sum = 0
    for (var n = 0; n < numbers.length; n++) {
      var nextIndex = (n+1) % numbers.length
      if (numbers[n] == numbers[nextIndex]) {
        sum += Number(numbers[n])
      }
    }

    // console.log(floor)
    $('#day1').append(input[i])
      .append('<br>&emsp;')
      .append(sum)
      .append('<br>')
  }
}

var day1Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day1"><h2>day #1</h2></div>')
  day1()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day1Part2()
  $('#main').append('<br>')
})
