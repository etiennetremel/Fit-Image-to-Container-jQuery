/*
    Fit Image To Container
    Version 1.0
    Plugin created by Etienne TREMEL
    http://www.etiennetremel.net
    
    Allow you to fit an image to its parent.

    USAGE:
    
    <style>
        .thumb {
            width:100px;
            height:100px;
            overflow:hidden;
        }
    </style>
    
    <script>
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
    </script>
    
    <div class="thumb">
        <img src="my_image.jpg" />
    </div>
*/

;(function ($) {
  'use strict';
  var methods = {
    init : function (options) {
      console.log('init');
      var defaults = {
          fit: false,
          before: function (element) {},
          complete: function (element) {}
        },
        settings = $.extend({}, defaults, options);

      return this.each(function () {
        var $container = $(this),
            $image = $container.find('img');

        //Callback before start
        if (typeof settings.before === 'function') {
          settings.before($container);
        }

        $image.one('load', function () {
          var $this = $(this);

          //Remove css style:
          $this.css({
            'width': '',
            'height': '',
            'margin-left': '',
            'margin-top': ''
          });

          var width = $this.width(),
              height = $this.height(),
              containerWidth = $container.innerWidth(),
              containerHeight = $container.innerHeight(),
              ratioWidth,
              ratioHeight,
              top,
              left;

          if (settings.fit) {
            if (width >= containerWidth && height >= containerHeight) {
              ratioWidth = 1 / (width / containerWidth);
              ratioHeight = 1 / (height / containerHeight);
            } else {
              ratioWidth = containerWidth / width;
              ratioHeight = containerHeight / height;
            }

            //Define ratio:
            if (ratioWidth < ratioHeight) {
              width = ratioHeight * width;
              height = ratioHeight * height;
            } else {
              width = ratioWidth * width;
              height = ratioWidth * height;
            }

            //Centering:
            if (width > containerWidth) {
              left = (containerWidth - width) / 2;
              $this.css('margin-left', left + 'px');
            } else {
              top = (containerHeight - height) / 2;
              $this.css('margin-top', top + 'px');
            }
          } else {
            ratioWidth = containerWidth / width;
            ratioHeight = containerHeight / height;

            //Define ratio:
            if (ratioWidth > ratioHeight) {
              width = ratioHeight * width;
              height = ratioHeight * height;
            } else {
              width = ratioWidth * width;
              height = ratioWidth * height;
            }

            //Centering:
            if (width < containerWidth) {
              left = (containerWidth - width) / 2;
              $this.css('margin-left', left + 'px');
            } else {
              top = (containerHeight - height) / 2;
              $this.css('margin-top', top + 'px');
            }
          }

          //Resizing:
          $this.width(width);
          $this.height(height);

          //Callback when finished
          if (typeof settings.complete === 'function') {
            settings.complete($container);
          }
        }).each(function () {
          if (this.complete) {
            $image.load();
          }
        });
      });
    }
  };

  $.fn.fitc = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.fitc');
    }
  };
})(jQuery);