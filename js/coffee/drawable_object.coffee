class DrawableObject
  constructor: (@objects = [], @period = period) ->
    @computedLineSegments = @computeLineSegments()

  lineSegments: (offset) ->
    lineSegments = []
    for object in @objects
      lineSegments = lineSegments.concat object.lineSegments(offset)
    lineSegments.concat @computedLineSegments[offset]

  computeLineSegments: ->
    lineSegments = []
    for offset in [0...-@period]
      lineSegments[offset] = []
    lineSegments
