

// ||------------------------------------
// |     GREYSCALE
// ||-------------------------------------

var btn = document.createElement("button");
btn.innerHTML = "greyscale";
$(".toolbar").append(btn);
btn.onclick = function() {
canvas.ctx.putImageData(greyscale(), 0 , 0);
}

function greyscale() {
  var d = canvas.ctx.getImageData(0,0,canvas.width,canvas.height);
for (var i=0; i<d.data.length; i+=4) {
var r = d.data[i];
var g = d.data[i+1];
var b = d.data[i+2];
// CIE luminance for the RGB
// The human eye is bad at seeing red and blue, so we de-emphasize them.
var v = 0.2126*r + 0.7152*g + 0.0722*b;
d.data[i] = d.data[i+1] = d.data[i+2] = v
}
return d;
}

// ||------------------------------------
// |     brightness
// ||-------------------------------------

var btn = document.createElement("button");
btn.innerHTML = "brightness";
$(".toolbar").append(btn);
btn.onclick = function() {
canvas.ctx.putImageData(brightness(60), 0 , 0);
}

var brightness = function(adjustment) {
    var pixels = canvas.ctx.getImageData(0,0,canvas.width,canvas.height);
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
      d[i] += adjustment;
      d[i+1] += adjustment;
      d[i+2] += adjustment;
    }
    return pixels;
  };

  
// ||------------------------------------
// |     treshold
// ||-------------------------------------
var btn = document.createElement("button");
btn.innerHTML = "treshold";
$(".toolbar").append(btn);
btn.onclick = function() {
canvas.ctx.putImageData(treshold(30), 0 , 0);
}

var threshold = function(threshold) {
    var pixels = canvas.ctx.getImageData(0,0,canvas.width,canvas.height);
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
      var r = d[i];
      var g = d[i+1];
      var b = d[i+2];
      var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
      d[i] = d[i+1] = d[i+2] = v
    }
    return pixels;
  };








// ||------------------------------------
// |     sharpness
// ||-------------------------------------
var btn = document.createElement("button");
btn.innerHTML = "sharpness";
$(".toolbar").append(btn);
btn.onclick = function() {
canvas.ctx.putImageData(convolute([1,2,2,3,4],1), 0 , 0);
}


  var convolute = function(weights, opaque) {
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);
    var pixels = canvas.ctx.getImageData(0,0,canvas.width,canvas.height);    
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = Filters.createImageData(w, h);
    var dst = output.data;
    // go through the destination image pixels
    var alphaFac = opaque ? 1 : 0;
    for (var y=0; y<h; y++) {
      for (var x=0; x<w; x++) {
        var sy = y;
        var sx = x;
        var dstOff = (y*w+x)*4;
        // calculate the weighed sum of the source image pixels that
        // fall under the convolution matrix
        var r=0, g=0, b=0, a=0;
        for (var cy=0; cy<side; cy++) {
          for (var cx=0; cx<side; cx++) {
            var scy = sy + cy - halfSide;
            var scx = sx + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = (scy*sw+scx)*4;
              var wt = weights[cy*side+cx];
              r += src[srcOff] * wt;
              g += src[srcOff+1] * wt;
              b += src[srcOff+2] * wt;
              a += src[srcOff+3] * wt;
            }
          }
        }
        dst[dstOff] = r;
        dst[dstOff+1] = g;
        dst[dstOff+2] = b;
        dst[dstOff+3] = a + alphaFac*(255-a);
      }
    }
    return output;
  };