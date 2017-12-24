var input = [
// '',
puzzleInput
]

var Computer = function () {
  this.mulCount = 0
  this.pc = 0
  this.set = function (r, val) {
    if (Number.isInteger(val)) {
      this[r] = val
    } else {
      this[r] = this[val]
    }
    this.pc++
  }
  this.sub = function (r, val) {
    if (Number.isInteger(val)) {
      this[r] = this[r] - val
    } else {
      this[r] = this[r] - this[val]
    }
    this.pc++
  }
  this.mul = function (r, val) {
    if (Number.isInteger(val)) {
      this[r] = this[r] * val
    } else {
      this[r] = this[r] * this[val]
    }
    this.pc++
    this.mulCount++
  }
  this.jnz = function (r, offset) {
    var parsedOffset = Number.isInteger(offset) ? offset : this[offset]
    if (Number.isInteger(r) && r !== 0) {
      this.pc += offset
    } else if (this[r] !== 0) {
      this.pc += parsedOffset
    } else {
      this.pc++
    }
  }
}

var day23 = function() {

  for (var i = 0; i < input.length; i++) {
    var com = new Computer()
    com.a = 0
    com.b = 0
    com.c = 0
    com.d = 0
    com.e = 0
    com.f = 0
    com.g = 0
    com.h = 0

    var program = []
    var inputInstrs = input[i].split(/\n/)
    $.each(inputInstrs, function(idx, val) {
      var instr = val.split(/\s/)
      var fun = instr[0]
      var p1 = instr[1]
      var p2 = instr[2]
      if (Number.isInteger(Number(p1))) {
        p1 = Number(p1)
      } else if (com[p1] === undefined) {
        com[p1] = 0
      }
      if (p2 !== undefined){
        if (Number.isInteger(Number(p2))) {
          p2 = Number(p2)
        } else if (com[p2] === undefined) {
          com[p2] = 0
        }
      }

      program.push({
        fun: fun,
        p1: p1,
        p2: p2
      })
    })
    // console.log(com)
    // console.log(program)

    while (com.pc < program.length && com.pc >= 0) {
      var instr = program[com.pc]
      com[instr.fun](instr.p1, instr.p2)
    }

    $('#day23').append(input[i])
      .append('<br>&emsp;')
      .append(com.mulCount)
      .append('<br>')
  }
}

var day23Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day23"><h2>day #23</h2></div>')
  day23()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day23Part2()
  $('#main').append('<br>')
})