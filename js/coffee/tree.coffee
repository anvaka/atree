class Tree
  rate = 1 / (2 * Math.PI)
  factor = rate / 3

  constructor: (elem, config) ->
    @elem = document.getElementById(elem)
    @ctx = @elem.getContext '2d'

    @spirals = [
      new Spiral '#ff0000', Math.PI, factor
      new Spiral '#660000', Math.PI * 0.95, factor * 0.93
      new Spiral '#220000', Math.PI * 0.92, factor * 0.9
      new Spiral '#00ffcc', 0, factor
      new Spiral '#003322', -Math.PI * 0.05, factor * 0.93
      new Spiral '#002211', -Math.PI * 0.08, factor * 0.9
    ]

  run: ->
    @render()

  render: =>
    @requestAnimationFrame()
    @renderFrame()

  renderFrame: ->
    @ctx.clearRect 0, 0, 500, 500
    @ctx.beginPath()
    spiral.render @ctx for spiral in @spirals

  requestAnimationFrame: ->
    window.setTimeout(@render, 1000 / 24)

tree = new Tree 'scene', {}
tree.run()
