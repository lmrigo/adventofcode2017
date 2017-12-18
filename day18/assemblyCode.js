var input = [
`set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`
,puzzleInput
]

var Computer = function () {
  this.pc = 0
  this.freq = 0
  this.snd = function (r) {
    this.freq = this[r]
    this.pc++
  }
  this.set = function (r, val) {
    if (Number.isInteger(val)) {
      this[r] = val
    } else {
      this[r] = this[val]
    }
    this.pc++
  }
  this.add = function (r, val) {
    if (Number.isInteger(val)) {
      this[r] = this[r] + val
    } else {
      this[r] = this[r] + this[val]
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
  }
  this.mod = function (r, val) {
    if (Number.isInteger(val)) {
      this[r] = this[r] % val
    } else {
      this[r] = this[r] % this[val]
    }
    this.pc++
  }
  this.rcv = function (r) {
    if (this[r] !== 0) {
      this.pc = -1 // terminate program
    } else {
      this.pc++
    }
  }
  this.jmp = function (offset) { // doesn't exist. It's here only for reference
    this.pc += offset
  }
  this.jgz = function (r, offset) {
    if (Number.isInteger(r) && r > 0) {
      this.pc += offset
    } else if (this[r] > 0) {
      this.pc += offset
    } else {
      this.pc++
    }
  }
}


var day18 = function() {

  for (var i = 0; i < input.length; i++) {
    var com = new Computer()

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

    $('#day18').append(input[i])
      .append('<br>&emsp;')
      .append(com.freq)
      .append('<br>')
  }
}

var day18Part2 = function () {

  for (var i = 1; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day18"><h2>day #18</h2></div>')
  day18()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day18Part2()
  $('#main').append('<br>')
})
