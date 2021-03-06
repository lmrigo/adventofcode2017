var input = [
`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`
,puzzleInput
]

var nodes = {}

var day12 = function() {

  for (var i = 0; i < input.length; i++) {

    nodes = {}
    var lines = input[i].split(/\n/)
    for (var l = 0; l < lines.length; l++) {
      var parts = lines[l].split(/\s/)
      var src = parts[0]
      var node = {
        'n': src,
        'links': []
      }
      for (var p = 2; p < parts.length; p++) {
        var n = parts[p].replace(',','')
        node.links.push(n)
      }
      nodes[src] = node
    }
    // console.log(nodes)

    var zeroCount = countZeroLinks()

    $('#day12').append(input[i])
      .append('<br>&emsp;')
      .append(zeroCount)
      .append('<br>')
  }
}

var countZeroLinks = function() {
  var history = {}
  countLinks(nodes['0'], history)
  // console.log(history)
  return Object.keys(history).length
}

var countLinks = function(node, hist) {
  if (hist[node.n] === undefined) {
    hist[node.n] = true
    $.each(node.links, (idx, link) => {
      countLinks(nodes[link], hist)
    })
  }
}


var day12Part2 = function () {

  for (var i = 0; i < input.length; i++) {

    nodes = {}
    var lines = input[i].split(/\n/)
    for (var l = 0; l < lines.length; l++) {
      var parts = lines[l].split(/\s/)
      var src = parts[0]
      var node = {
        'n': src,
        'links': []
      }
      for (var p = 2; p < parts.length; p++) {
        var n = parts[p].replace(',','')
        node.links.push(n)
      }
      nodes[src] = node
    }
    // console.log(nodes)
    var groups = 0

    var nodeNames = Object.keys(nodes)
    var nodesLeft = {}
    $.each(nodeNames, (idx, n) => {
      nodesLeft[n] = true
    })
    $.each(nodeNames, (idx, n) => {
      if (nodesLeft[n]) {
        var history = {}
        countLinks(nodes[n], history)
        $.each(Object.keys(history), (hidx, hn) => {
          nodesLeft[hn] = false
        })
        groups++
      }
    })


    $('#part2').append(input[i])
      .append('<br>&emsp;')
      .append(groups)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day12"><h2>day #12</h2></div>')
  day12()
  $('#main').append('<br><div id="part2"><h2>part 2</h2></div>')
  day12Part2()
  $('#main').append('<br>')
})
