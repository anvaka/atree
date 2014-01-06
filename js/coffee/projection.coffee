class Projection
  xscreenoffset = 260
  yscreenoffset = 300
  xscreenscale = 360
  yscreenscale = 360
  ycamera = 2
  zcamera = -3

  constructor: (config) ->
    @xscreenoffset = config.xscreenoffset or yscreenoffset
    @yscreenoffset = config.yscreenoffset or yscreenoffset
    @xscreenscale  = config.xscreenscale or xscreenscale
    @yscreenscale  = config.yscreenscale or yscreenscale
    @ycamera = config.ycamera or ycamera
    @zcamera = config.zcamera or zcamera

  to2d: (x, y, z) ->
    x: @xscreenoffset + @xscreenscale * (x / (z - @zcamera))
    y: @yscreenoffset + @yscreenscale * ((y - @ycamera) / (z - @zcamera))
