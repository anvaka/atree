class DrawableObject
  constructor: ->
    @computedLineSegments = @computeLineSegments()

  lineSegments: (offset) ->
    @computedLineSegments[offset]

  computeLineSegments: ->
    []
