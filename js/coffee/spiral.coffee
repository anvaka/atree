class Spiral
  thetamin = 0
  thetamax = 6 * Math.PI
  rate = 1 / (2 * Math.PI)
  factor = rate / 3

  linespacing = 1 / 30
  linelength = linespacing / 2

  xscreenoffset = 260
  yscreenoffset = 300
  xscreenscale = 360
  yscreenscale = 360

  ycamera = 2
  zcamera = -3

  class SpiralShadow
    constructor: (@offset, @factor_rate, @color_rate) ->

  spiralShadows = [
    new SpiralShadow 0, 1, 0
    new SpiralShadow Math.PI * 0.05, 0.93, -0.7
    new SpiralShadow Math.PI * 0.08, 0.9, -0.85
  ]

  constructor: (@foreground, @angleoffset, @period, config = {}) ->
    @spacing = config.spacing or 1 / 30
    @rate = config.rate or 1 / (2 * Math.PI)
    @offset = 0
    @factor = config.factor or factor
    @linelength = config.linelength or linelength
    @computedLineSegments = computeLineSegments(@)

  lineSegments: (offset) ->
    @computedLineSegments[offset]

  computeLineSegments = (s) ->
    lineSegments = {}
    offset = 0
    while offset > -s.period
      lineSegments[offset] = lines = []
      for spiralShadow in spiralShadows
        theta  = thetamin + getdtheta(thetamin, offset * s.spacing / s.period, s.rate, s.factor * spiralShadow.factor_rate)
        while theta < thetamax
          inc = getdtheta(theta, linespacing, rate, factor)
          thetaold = if theta >= thetamin then theta else thetamin
          thetanew = theta + getdtheta(theta, linelength, rate, factor)
          theta += inc
          continue if thetanew <= thetamin
          lines.push
            start : getPointByAngle(thetaold, s.factor * spiralShadow.factor_rate, s.angleoffset - spiralShadow.offset, s.rate)
            end:    getPointByAngle(thetanew, s.factor * spiralShadow.factor_rate, s.angleoffset - spiralShadow.offset, s.rate)
            color:  shapeColor s.foreground, spiralShadow.color_rate
      offset--
    lineSegments

  getPointByAngle = (theta, factor, offset, rate) ->
    x = theta * factor * Math.cos(theta + offset)
    y = rate * theta
    z = - theta * factor * Math.sin(theta + offset)
    point = projectTo2d(x, y, z)
    point.alpha = Math.atan((y * factor / rate * 0.1 + 0.02 - z) * 40) * 0.35 + 0.65
    point

  projectTo2d = (x, y, z) ->
    x: xscreenoffset + xscreenscale * (x / (z - zcamera))
    y: yscreenoffset + yscreenscale * ((y - ycamera) / (z - zcamera))

  getdtheta = (theta, lineLength, rate, factor) ->
    lineLength / Math.sqrt(rate * rate + factor * factor * theta * theta)

  shapeColor = (hex, lum) ->
    hex = String(hex).replace(/[^0-9a-f]/g, "")
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]  if hex.length < 6
    lum = lum or 0
    rgb = "#"
    i = 0
    for i in [0...3]
      c = parseInt(hex.substr(i * 2, 2), 16)
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
      rgb += ("00" + c).substr(c.length)
    rgb
