var input = [
`p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`
,puzzleInput
]

var day20 = function() {

  for (var i = 0; i < input.length; i++) {
    var particles = []
    var lines = input[i].split(/\n/)
    $.each(lines, (idx, val) => {
      var parts = val.split(', ')
      var pos = parts[0].replace(/p=<|>/g,'').split(',')
      var vel = parts[1].replace(/v=<|>/g,'').split(',')
      var acc = parts[2].replace(/a=<|>/g,'').split(',')
      var particle = {
        p: {
          x: Number(pos[0]),
          y: Number(pos[1]),
          z: Number(pos[2])
        },
        // po: {
        //   x: Number(pos[0]),
        //   y: Number(pos[1]),
        //   z: Number(pos[2])
        // },
        v: {
          x: Number(vel[0]),
          y: Number(vel[1]),
          z: Number(vel[2])
        },
        // vo: {
        //   x: Number(vel[0]),
        //   y: Number(vel[1]),
        //   z: Number(vel[2])
        // },
        a: {
          x: Number(acc[0]),
          y: Number(acc[1]),
          z: Number(acc[2])
        },
        distance: function () {
          return this.p.x + this.p.y + this.p.z
        },
        speed: function () {
          return this.v.x + this.v.y + this.v.z
        },
        acceleration: function () {
          return this.a.x + this.a.y + this.a.z
        },
        absDistance: function () {
          return Math.abs(this.p.x) + Math.abs(this.p.y) + Math.abs(this.p.z)
        },
        absAcceleration: function () {
          return Math.abs(this.a.x) + Math.abs(this.a.y) + Math.abs(this.a.z)
        },
        minDist: Number.MAX_SAFE_INTEGER
      }
      particles.push(particle)
    })
    // console.log(particles)

    var timeout = 100
    var skipIdxs = []
    // var t = 1
    while (--timeout && skipIdxs.length < particles.length) {
      // update particles
      $.each(particles, (idx, part) => {
        var absDist = part.absDistance()
        if (part.minDist > Math.abs(absDist)) {
          part.minDist = Math.abs(absDist)
        }
        // move particles
        
        part.v.x += part.a.x
        part.v.y += part.a.y
        part.v.z += part.a.z
        part.p.x += part.v.x
        part.p.y += part.v.y
        part.p.z += part.v.z
        
        /*
        // V = Vo + a*t
        part.v.x = part.v.x + part.a.x * t
        part.v.y = part.v.y + part.a.y * t
        part.v.z = part.v.z + part.a.z * t
        // S = So + Vo*t + (a*t^2)/2
        part.p.x = part.po.x + part.vo.x*t + (part.a.x*(t*t))/2
        part.p.y = part.po.y + part.vo.y*t + (part.a.y*(t*t))/2
        part.p.z = part.po.z + part.vo.z*t + (part.a.z*(t*t))/2

        t++
        */
      })
    }
    var minIdx = -1
    var minAcc = Number.MAX_SAFE_INTEGER
    $.each(particles, (idx, part) => {
      if (minAcc > part.absAcceleration()) {
        minAcc = part.absAcceleration()
        minIdx = idx
      }
    })
    // console.log(minAcc)

    $('#day20').append(input[i])
      .append('<br>&emsp;')
      .append(minIdx)
      .append('<br>')
  }
}


var day20Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    // var initState = {'x': 0, 'y': startIdx, 'dir': 'D'}
    // var nextStates = [initState]
    // var steps = 0
    // while (passedLetters.length < letters.length && nextStates.length > 0) {
    //   steps++
    //   var state = nextStates.shift()
    //   var val = grid[state.x][state.y]
    //   if (isLetter(val)) {
    //     passedLetters += val
    //   }
    //   nextStates.push(...genNextStates(state))
    // }

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day20"><h2>day #20</h2></div>')
  day20()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day20Part2()
  $('#main').append('<br>')
})
