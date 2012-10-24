Fit Image to Container jQuery
========================

Version 0.3

Author: Etienne Tremel

Author URL: http://www.etiennetremel.net

Description
-----------

Allow you to fit an image to its parent.

Browser compatibility
---------------------

Tested on IE8+, Chrome, FF 15+ (early version not tested yet), Safari 5.1+ (early version not tested yet)


Usage
-------
Check the example folder to set it up!

### HTML
	<div class="thumb">
		<img src="my_image.jpg" />
	</div>

### CSS
	.thumb {
		width:100px;
		height:100px;
	}

### Javascript
	$(document).ready(function() {
		$('.thumb').fitImageToContainer({
			fit: true,			//Fit image to parent
			complete: function(element) {	//Called when done
				//your code...
				//element return the parent of the image completed
			}
		});
	});


Changelog
-------
V0.3: Image load event listener function switched to "one();" instead of "bind();"

V0.2: console.log() removed from the onComplete function.