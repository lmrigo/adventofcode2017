var input = [
`pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`
 ,puzzleInput
]

var day7 = function() {

  for (var i = 0; i < input.length; i++) {
    var programs = []
    var lines = input[i].split(/\n/)
    $.each(lines, function(idx, val) {
      var line = val.split(/\s/)
      var name = line[0]
      var weight = Number(line[1].substr(1,2))
      var children = []
      if (line[2] === '->') {
        for (var w = 3; w < line.length; w++) {
          children.push(line[w].replace(',',''))
        }
      }
      programs.push({
        name: name,
        weight: weight,
        children: children
      })
    })
    var treeRoot = buildTree(programs)
    console.log(treeRoot)

    // console.log()
    $('#day7').append(input[i])
      .append('<br>&emsp;')
      .append(treeRoot.name)
      .append('<br>')
  }
}

var buildTree = function(programs) {
  var root = findRoot(programs)
  // var progsLeft = $map.(programs, function (val) {
  //   return val.name
  // })
  // while (progsLeft.length > 0) {
  //   var idx = programs.findIndex(function (val) {
  //     return val.children.length > 0
  //   })
  //   if (idx >= 0) {
  //     progsLeft.splice(idx, 1)
  //     var next = programs[idx]
  //     if (!root) {
  //       root = next
  //     }


  //   } else {

  //   }
  // }
  return root
}

var findRoot = function(programs) {
  var progs = programs.filter(function (val) {
    return val.children.length > 0
  })
  var progsLeft = $.map(progs, function (val) {
    return val.name
  })
  $.each(progs, function(idx, parent) {
    progsLeft = progsLeft.filter(function(val) {
      return !parent.children.includes(val)
    })
  })
  return programs.find(function(val) {
    return val.name === progsLeft[0]
  })
}

var day7Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}


$(function (){
  $('#main').append('<div id="day7"><h2>day #7</h2></div>')
  day7()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day7Part2()
  $('#main').append('<br>')
})
