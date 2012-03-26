Plugin created by Etienne Tremel
Version 0.1
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
			fit: true, //Fit image to parent
			complete: function(element) { //Called when done
				//your code...
				//element return the parent of the image completed
			}
		});
	});
</script>

<div class="thumb">
	<img src="my_image.jpg" />
</div>