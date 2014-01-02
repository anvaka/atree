#= require Spiral
class Tree extends DrawableObject
  period = 5
  width = 500
  height = 500

  colors = [
    '#ff0000',
    '#d4a017',
    '#00ff00',
    '#ffffff',
  ]

  constructor: ->
    @spirals = []
    dtheta = Math.PI * 2 / colors.length
    for color, i in colors
      @spirals.push new Spiral color, dtheta * i, period
    super

  computeLineSegments: ->
    lineSegments = []
    lineSegments[i] = [] for i in [0...-period]
    for spiral in @spirals
      for i in [0...-period]
        lineSegments[i] = lineSegments[i].concat spiral.lineSegments(i)
    lineSegments
