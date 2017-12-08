var input = [
`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`
,puzzleInput
]



var day8 = function() {

  for (var i = 0; i < input.length; i++) {
    var com = {
      pc: 0
    }
    var instructions = input[i].split(/\n/)
    for (com.pc = 0; com.pc < instructions.length; com.pc++) {
      var insparts = instructions[com.pc].split(/\s+/)
      var reg = insparts[0]
      var oper = insparts[1]
      var param = Number(insparts[2])
      //if = insparts[3]
      var ifreg = insparts[4]
      var ifoper = insparts[5]
      var ifparam = Number(insparts[6])

      if (com[reg] === undefined) {
        com[reg] = 0
      }
      if (com[ifreg] === undefined) {
        com[ifreg] = 0
      }
      var ifresult = false
      switch (ifoper) {
        case '>':  ifresult = (com[ifreg] > ifparam); break;
        case '>=':  ifresult = (com[ifreg] >= ifparam); break;
        case '==':  ifresult = (com[ifreg] == ifparam); break;
        case '!=':  ifresult = (com[ifreg] != ifparam); break;
        case '<=':  ifresult = (com[ifreg] <= ifparam); break;
        case '<':  ifresult = (com[ifreg] < ifparam); break;
      }
      if (ifresult) {
        if (oper === 'inc') {
          com[reg] += param
        } else {
          com[reg] -= param
        }
      }
    }
    //console.log(com)
    var max = Number.MIN_SAFE_INTEGER
    $.each(Object.keys(com), function(idx, reg) {
      if (reg === 'pc') {
        return true
      }
      if (com[reg] > max) {
        max = com[reg]
      }
    })

    $('#day8').append(input[i])
      .append('<br>&emsp;')
      .append(max)
      .append('<br>')
  }
}

var day8Part2 = function () {

  for (var i = 0; i < input.length; i++) {
    var com = {
      pc: 0
    }
    var max = Number.MIN_SAFE_INTEGER

    var instructions = input[i].split(/\n/)
    for (com.pc = 0; com.pc < instructions.length; com.pc++) {
      var insparts = instructions[com.pc].split(/\s+/)
      var reg = insparts[0]
      var oper = insparts[1]
      var param = Number(insparts[2])
      //if = insparts[3]
      var ifreg = insparts[4]
      var ifoper = insparts[5]
      var ifparam = Number(insparts[6])

      if (com[reg] === undefined) {
        com[reg] = 0
      }
      if (com[ifreg] === undefined) {
        com[ifreg] = 0
      }
      var ifresult = false
      switch (ifoper) {
        case '>':  ifresult = (com[ifreg] > ifparam); break;
        case '>=':  ifresult = (com[ifreg] >= ifparam); break;
        case '==':  ifresult = (com[ifreg] == ifparam); break;
        case '!=':  ifresult = (com[ifreg] != ifparam); break;
        case '<=':  ifresult = (com[ifreg] <= ifparam); break;
        case '<':  ifresult = (com[ifreg] < ifparam); break;
      }
      if (ifresult) {
        if (oper === 'inc') {
          com[reg] += param
        } else {
          com[reg] -= param
        }
        if (com[reg] > max) {
          max = com[reg]
        }
      }
    }
    //console.log(com)

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(max)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day8"><h2>day #8</h2></div>')
  day8()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day8Part2()
  $('#main').append('<br>')
})
