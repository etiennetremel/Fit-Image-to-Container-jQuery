/*
	Plugin created by Etienne TREMEL
	http://www.etiennetremel.net
	
	Allow you to fit an image to its parent.

	USAGE:
	
	<style>
		.thumb {
			width:100px;
			height:100px;
		}
	</style>
	
	<script>
		$(document).ready(function() {
			$('.thumb').fitImageToContainer({
				fit: true,						//Fit image to parent
				complete: function(element) {	//Called when done
					//your code...
					//element return the parent of the image completed
				}
			});
		});
	</script>
	
	<div class="thumb">
		<img src="my_image.jpg" />
	</div>
*/

(function($){
	 var methods = {
	 	init : function( options ) {
	 		var defaults = {
				fit: true,
				complete: function(element) {
					//Do something
				}
	       		};
	        
	        	var settings = $.extend({}, defaults, options);
        
			return this.each(function(){
				
				var container = $(this);
				var image = container.find('img');
				
				image.one('load', function() {
					
					//Remove css style:
					$(this).css({
						'width':'',
						'height':'',
						'margin-left':'',
						'margin-top':''
					});
			
					var width = $(this).width();
					var height = $(this).height();		
					var containerWidth = container.innerWidth();
					var containerHeight = container.innerHeight();
					
					var ratioWidth, ratioHeight;
					
					if(settings.fit) {
						if(width>=containerWidth && height>=containerHeight) {
							ratioWidth = 1/(width / containerWidth);
							ratioHeight = 1/(height / containerHeight);
						} else {
							ratioWidth = containerWidth / width;
							ratioHeight = containerHeight / height;
						}
						
						//Define ratio:
						if(ratioWidth<ratioHeight) {
							width = parseInt(ratioHeight*width);
							height = parseInt(ratioHeight*height);
						} else {
							width = parseInt(ratioWidth*width);
							height = parseInt(ratioWidth*height);
						}
						
						//Centering:
						if(width > containerWidth) {
							var left = parseInt((containerWidth - width)/2);
							$(this).css('margin-left', left+'px');
						} else {
							var top = parseInt((containerHeight - height)/2);
							$(this).css('margin-top', top+'px');
						}
					} else {
						ratioWidth = containerWidth / width;
						ratioHeight = containerHeight / height;
						
						//Define ratio:
						if(ratioWidth>ratioHeight) {
							width = parseInt(ratioHeight*width);
							height = parseInt(ratioHeight*height);
						} else {
							width = parseInt(ratioWidth*width);
							height = parseInt(ratioWidth*height);
						}
						
						//Centering:
						if(width < containerWidth) {
							var left = parseInt((containerWidth - width)/2);
							$(this).css('margin-left', left+'px');
						} else {
							var top = parseInt((containerHeight - height)/2);
							$(this).css('margin-top', top+'px');
						}
					}
		
					//Resizing:
					$(this).width(width);
					$(this).height(height);
					
					
					//Callback
					if(typeof settings.complete=='function') settings.complete($(this));
					
				}).each(function() {
					 if(this.complete) image.load();
				});				
			});
		}
	};

	$.fn.fitImageToContainer = function( method ) {
		if ( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.fitImageToContainer' );
		}    
	};

})(jQuery);