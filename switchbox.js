(function($){
'use strict';
 
 var createBox = function(boxMargin, boxWidth, boxHeight, number){

 	var boxWidth = boxWidth || 20;
 	var boxHeight = boxHeight || 20;
 	var boxMargin = boxMargin || 0; 
 	var number = number || 0;

 	//return $(this.box).html(this.number).css({margin:this.boxMargin, padding: this.boxPadding});
 	return '<li style="margin:'+boxMargin+'px;width:'+boxWidth+'px;height:'+boxHeight+'px;"><span>'+number+'</span></li>';
 }

 var boxMaker = function(leftCotainer, rightContainer, margin, width, height){

 	if(!leftCotainer || !rightContainer ) {
 		throw new Error("left and right container are missing!");
 	}	

 	this.leftCotainer = $(leftCotainer);
 	this.rightContainer = $(rightContainer);
 	this.margin = margin || 0;
 	this.width = width || 20; 
 	this.height = height || 20;

 	return this;

 }

 boxMaker.prototype.constructBox = function(){

 	var self = this,
 		width =  self.width,
 		height = self.height,
 		margin = self.margin,
 		leftCotainer = self.leftCotainer,
 		rightContainer = self.rightContainer,
 		numberOfBox = Math.floor(leftCotainer.width() / (margin * 2 + width + 2) ) * Math.floor( leftCotainer.height() / (margin * 2 + height + 2) ),	 //get the nearest number
 		box = [];

 		for(var i =0; i < numberOfBox; i++){
 			box.push(createBox(margin, width, height, i+1));
 		}
 		$("ul", leftCotainer).append(box.join(''));

 		self.eventHandler();
 }

 boxMaker.prototype.eventHandler = function(){

 	var self = this;	

 	var handlerObject = (function(){

 		return {
 			boxHandler : function(e){
 				
 				var current = $(this),
 					sourceTop = current.offset().top - self.leftCotainer.offset().top,
 					sourceLeft = current.offset().left - self.leftCotainer.offset().left,
 					destinationTop = self.rightContainer.offset().top,
 					destinationLeft = self.rightContainer.offset().left,
 					clone = current.clone();

 				clone.appendTo(current).css({position:'absolute', top: sourceTop, left: sourceLeft}).animate({left:destinationLeft + sourceLeft},
 				1000, function(){
 					clone.appendTo(self.rightContainer.find('ul')).css({position:'absolute',left: sourceLeft , top: sourceTop});
 					current.css('visibility','hidden').find('li').remove();	//remov the current
 				});
 			}
 		}

 	}());	

 	$(this.leftCotainer).on("click", "li", handlerObject.boxHandler)

 }

 $(document).ready(function(){
	 var box = new boxMaker("#container-left", "#container-right", 2, 30, 30);
 	 box.constructBox();
 });

}(jQuery));