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

var inputV2 = [
`snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`
,puzzleInput
]

var p1Send = 0

var messsageQueues = [
  [], // 0
  []  // 1
]

var ComputerV2 = function (pId) {
  this.p = pId
  this.pId = pId
  this.otherPId = pId===0?1:0
  this.pc = 0
  this.wait = false
  this.snd = function (r) {
    var val = Number.isInteger(r) ? r : this[r]
    messsageQueues[this.otherPId].push(val)
    this.pc++
    if (this.pId===1){
      p1Send++
    }
  }
  this.rcv = function (r) {
    if (messsageQueues[this.pId].length > 0) {
      this[r] = messsageQueues[this.pId].shift()
      this.pc++
      this.wait = false
    } else {
      this.wait = true
    }
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
  this.jmp = function (offset) { // doesn't exist. It's here only for reference
    this.pc += offset
  }
  this.jgz = function (r, offset) {
    var parsedOffset = Number.isInteger(offset) ? offset : this[offset]
    if (Number.isInteger(r) && r > 0) {
      this.pc += offset
    } else if (this[r] > 0) {
      this.pc += parsedOffset
    } else {
      this.pc++
    }
  }
}


var day18Part2 = function () {

  for (var i = 0; i < inputV2.length; i++) {
    var com0 = new ComputerV2(0)
    var com1 = new ComputerV2(1)
    messsageQueues = [
      [], // 0
      []  // 1
    ]
    p1Send = 0

    var program = []
    var inputInstrs = inputV2[i].split(/\n/)
    $.each(inputInstrs, function(idx, val) {
      var instr = val.split(/\s/)
      var fun = instr[0]
      var p1 = instr[1]
      var p2 = instr[2]
      if (Number.isInteger(Number(p1))) {
        p1 = Number(p1)
      } else if (com0[p1] === undefined) {
        com0[p1] = 0
        com1[p1] = 0
      }
      if (p2 !== undefined){
        if (Number.isInteger(Number(p2))) {
          p2 = Number(p2)
        } else if (com0[p2] === undefined) {
          com0[p2] = 0
          com1[p2] = 0
        }
      }

      program.push({
        fun: fun,
        p1: p1,
        p2: p2
      })
    })

    // console.log(com0, com1)
    // console.log(program)
    var terminate = false
    while (!terminate) {
      // com0
      var term0 = com0.pc >= program.length || com0.pc < 0
      if (!term0) {
        var instr = program[com0.pc]
        com0[instr.fun](instr.p1, instr.p2)
      }
      // com1
      var term1 = com1.pc >= program.length || com1.pc < 0
      if (!term1) {
        var instr = program[com1.pc]
        com1[instr.fun](instr.p1, instr.p2)
      }

      var deadlock =
      // both programs waiting and no message in the queue
      ((com0.wait && messsageQueues[0].length === 0)
        && (com1.wait && messsageQueues[1].length === 0))
        // one of the programs waiting for message while the other has finished
        || (term0 && (com1.wait && messsageQueues[1].length === 0))
        || (term1 && (com0.wait && messsageQueues[0].length === 0))

      terminate = (term0 && term1) || deadlock
    }

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(p1Send)
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
