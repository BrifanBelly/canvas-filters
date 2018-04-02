function canvasLayer(location, id) {

this.width = $(window).width() / 2;
this.height = $(window).height() / 2;
this.element = document.createElement('canvas');

$(this.element)
   .attr('id', id)
   .text('unsupported browser')
   .width(this.width)
   .height(this.height)
   .appendTo(location);

this.ctx = this.element.getContext("2d");
}

var canvas  = new canvasLayer("body", "myCanvas");

canvasLayer.prototype.loadImage = function(path) {
    // load image
}

canvasLayer.prototype.displayImage = function(htmlNode) {
   htmlNode.append(this.element);
}   

canvasLayer.prototype.loadImg = function(img) {
    this.ctx.drawImage(img,0,0, this.element.width , this.element.height );
}

canvasLayer.prototype.getPixelData = function() {
    return this.ctx.getImageData(0,0, this.element.width, this.element.height)
}