class Spiral
  period = 5
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

  constructor: (@foreground, @angleoffset, @factor, config = {}) ->
    @period = config.period || period
    @spacing = config.spacing || 1 / 30
    @rate = config.rate || 1 / (2 * Math.PI)
    @offset = 0
    @linelength = config.linelength || linelength
    @lineSegments = computeLineSegments(@)

  render: (ctx) ->
    @offset -= 1
    @offset += @period if @offset <= -@period
    for lineSegment in @lineSegments[@offset]
      @drawLineSegment ctx, lineSegment

  drawLineSegment: (ctx, segment) ->
    stroke ctx, @foreground, segment.start.alpha
    ctx.moveTo(segment.start.x, segment.start.y)
    ctx.lineTo(segment.end.x, segment.end.y)

  stroke = (ctx, color, alpha) ->
    ctx.closePath()
    ctx.stroke()
    ctx.strokeStyle = color
    ctx.globalAlpha = alpha
    ctx.beginPath()

  computeLineSegments = (s) ->
    lineSegments = {}
    offset = 0
    while offset > -s.period
      lineSegments[offset] = lines = []
      theta = thetamin + getdtheta(thetamin, offset * s.spacing / s.period, s.rate, s.factor)
      while theta < thetamax
        inc = getdtheta(theta, linespacing, rate, factor)
        thetaold = if theta >= thetamin then theta else thetamin
        thetanew = theta + getdtheta(theta, linelength, rate, factor)
        theta += inc
        continue if thetanew <= thetamin
        lines.push
          start : getPointByAngle(thetaold, s.factor, s.angleoffset, s.rate)
          end:    getPointByAngle(thetanew, s.factor, s.angleoffset, s.rate)
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
