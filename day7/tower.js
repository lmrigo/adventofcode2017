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

var programs = []

var day7 = function() {

  for (var i = 0; i < input.length; i++) {
    programs = []
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
    var treeRoot = findRoot(programs)
    // console.log(treeRoot)

    // console.log()
    $('#day7').append(input[i])
      .append('<br>&emsp;')
      .append(treeRoot.name)
      .append('<br>')
  }
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
    programs = []
    var lines = input[i].split(/\n/)
    $.each(lines, function(idx, val) {
      var line = val.split(/\s/)
      var name = line[0]
      var weight = Number(line[1].replace(/\(|\)/g,''))
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
    var treeRoot = findRoot(programs)
    buildTree(treeRoot)
    //console.log(treeRoot)
    // follow the false
    var falseNode = findLastFalse(treeRoot)
    //console.log('falso: ', falseNode.name)
    // get the children difference and subtract from own weight
    var big = -1
    var normal = Number.MAX_SAFE_INTEGER
    $.each(falseNode.children, function(idx, child) {
      if (child.accWeight < normal) {
        normal = child.accWeight
      }
      if (child.accWeight > big) {
        big = child.accWeight
      }
    })
    var targetNode = falseNode.children.find(function(val) {
      return val.accWeight === big
    })
    var difference = big - normal
    var targetWeight = targetNode.weight - difference

    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(targetWeight)
      .append('<br>')
  }

}


var buildTree = function(root) {
  root.accWeight = root.weight
  if (root.children.length <= 0) {
    root.ok = true
    return root
  } else {
    var childNames = root.children
    root.children = programs.filter(function(prog) {
      return childNames.includes(prog.name)
    })
    $.each(root.children, function(idx, child) {
      buildTree(child)
      root.accWeight += child.accWeight
    })
    var ok = true
    for (var i = 1; i < root.children.length; i++) {
      ok = ok && (root.children[i-1].accWeight === root.children[i].accWeight)
    }
    root.ok = ok
    return root
  }
}

var findLastFalse = function(node) {
  var last = false
  while (!last) {
    var falseChild = node.children.find(function(child) {
      return child.ok === false
    })
    if (falseChild) {
      node = falseChild
    } else {
      last = true
    }
  }
  return node
}

$(function (){
  $('#main').append('<div id="day7"><h2>day #7</h2></div>')
  day7()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day7Part2()
  $('#main').append('<br>')
})
