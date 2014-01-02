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

  lineSegments: (offset) ->
    lineSegments = []
    for spiral in @spirals
      lineSegments = lineSegments.concat spiral.lineSegments(offset)
    lineSegments.concat @computeLineSegments()

  computeLineSegments: ->
    []
