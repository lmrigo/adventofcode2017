var input = [
`p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`,
`p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>
p=<3,0,0>, v=<-1,0,0>, a=<0,0,0>`
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
        v: {
          x: Number(vel[0]),
          y: Number(vel[1]),
          z: Number(vel[2])
        },
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

    // find the min absolute acceleration
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
        v: {
          x: Number(vel[0]),
          y: Number(vel[1]),
          z: Number(vel[2])
        },
        a: {
          x: Number(acc[0]),
          y: Number(acc[1]),
          z: Number(acc[2])
        }
      }
      particles.push(particle)
    })
    // console.log(particles)

    var grid = {}
    // init grid
    $.each(particles, (idx, part) => {
      var key = part.p.x+','+part.p.y+','+part.p.z
      if (grid[key] === undefined) {
        grid[key] = idx
      }
    })

    var timeout = 10000
    while (--timeout) {
      // update particles
      $.each(particles, (idx, part) => {
        if (!part) {
          return true
        }
        var key = part.p.x+','+part.p.y+','+part.p.z
        grid[key] = undefined
        // move particles
        part.v.x += part.a.x
        part.v.y += part.a.y
        part.v.z += part.a.z
        part.p.x += part.v.x
        part.p.y += part.v.y
        part.p.z += part.v.z
      })

      var remove = []
      // check collision
      $.each(particles, (idx, part) => {
        if (!part) {
          return true
        }
        var key = part.p.x+','+part.p.y+','+part.p.z
        if (grid[key] === undefined) {
          grid[key] = idx
        } else {
          if (!remove.includes(grid[key])) {
            remove.push(grid[key])
          }
          remove.push(idx)
        }
      })
      while (remove.length > 0) {
        var idx = remove.shift()
        var part = particles[idx]
        var key = part.p.x+','+part.p.y+','+part.p.z
        grid[key] = undefined
        particles[idx] = undefined
      }
      // if (timeout%10000===0) {
      //   var count = particles.reduce((acc, val) => {
      //     return acc + (val?1:0)
      //   }, 0)
      //   console.log(timeout, count)
      // }
    }

    var count = particles.reduce((acc, val) => {
      return acc + (val?1:0)
    }, 0)

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(count)
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
