class Tree
  period = 5
  width = 500
  height = 500

  constructor: (elem, config) ->
    @elem = document.getElementById elem
    @width = config.width or width
    @height = config.height or height
    @offset = 0
    @elem.setAttribute 'width', "#{@width}px"
    @elem.setAttribute 'height',"#{@height}px"

    @ctx = @elem.getContext '2d'

    @spirals = [
      new Spiral '#ff0000', Math.PI, period
      new Spiral '#00ffcc', 0, period
    ]

  run: ->
    @requestAnimationFrame()
    @renderFrame()

  renderFrame: ->
    @ctx.clearRect 0, 0, @width, @height
    @ctx.beginPath()
    @offset -= 1
    @offset += period if @offset <= -period
    for spiral in @spirals
      @renderObject spiral.lineSegments(@offset)

  renderObject: (segments) ->
    for segment in segments
      @stroke segment.color, segment.start.alpha
      @ctx.moveTo segment.start.x, segment.start.y
      @ctx.lineTo segment.end.x, segment.end.y

  stroke: (color, alpha) ->
    @ctx.closePath()
    @ctx.stroke()
    @ctx.strokeStyle = color
    @ctx.globalAlpha = alpha
    @ctx.beginPath()

  requestAnimationFrame: ->
    window.setTimeout( =>
      @run()
    , 1000 / 24)

  spiralWithShadow = (color, period, offset) ->

tree = new Tree 'scene', {}
tree.run()
