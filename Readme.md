jQuery Fit Image to Container (fitc)
====================================

Version 1.0

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
        overflow:hidden;
    }

### Javascript
    $(document).ready(function() {
        $('.thumb').fitc({
            fit: false,                     // Fit image to parent, fill if false
            before: function(element) {     // Called when done
                // do something before the image is loaded
                // element return the parent of the image
            },
            complete: function(element) {   // Called when done
                // do something when image is loaded and fit to its container
                // element return the parent of the image completed
            }
        });
    });


Changelog
-------
V1.0: 
* New name: Fitc instead of the old ugly long name "Fit Image To Container"
* Tabs converted to 2 spaces
* New examples
* New function before
* jsLint test passed

V0.3: Image load event listener function switched to "one();" instead of "bind();"

V0.2: console.log() removed from the onComplete function.
