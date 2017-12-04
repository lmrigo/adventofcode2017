var input = [
 `aa bb cc dd ee
 aa bb cc dd aa
 aa bb cc dd aaa`,
 `abcde fghij
 abcde xyz ecdab
 a ab abc abd abf abj
 iiii oiii ooii oooi oooo
 oiii ioii iioi iiio`,
  puzzleInput
]

var day4 = function() {

  for (var i = 0; i < input.length; i++) {
    var lines = input[i].split(/\n/)
    var validPhrases = 0
    for (var l = 0; l < lines.length; l++) {
      var words = lines[l].split(/\s/)
      var dict = {}
      var size = Object.keys(dict).length
      var valid = true
      for (var w = 0; w < words.length; w++) {
        dict[words[w]] = true
        var newSize = Object.keys(dict).length
        if (newSize === size) {
          valid = false
          break
        } else {
          size = newSize
        }
      }
      if (valid) {
        validPhrases++
      }
    }

    // console.log()
    $('#day4').append(input[i])
      .append('<br>&emsp;')
      .append(validPhrases)
      .append('<br>')
  }
}

var day4Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var lines = input[i].split(/\n/)
    var validPhrases = 0
    for (var l = 0; l < lines.length; l++) {
      var words = lines[l].split(/\s/)
      var dict = {}
      var size = Object.keys(dict).length
      var valid = true
      for (var w = 0; w < words.length; w++) {
        var sortedWord = words[w].split('').sort().join('')
        dict[sortedWord] = true
        var newSize = Object.keys(dict).length
        if (newSize === size) {
          valid = false
          break
        } else {
          size = newSize
        }
      }
      if (valid) {
        validPhrases++
      }
    }

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(validPhrases)
      .append('<br>')
  }

}


$(function (){
  $('#main').append('<div id="day4"><h2>day #4</h2></div>')
  day4()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day4Part2()
  $('#main').append('<br>')
})
