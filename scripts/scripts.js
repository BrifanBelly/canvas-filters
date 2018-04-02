var		
		// Store the first HTML5 video element in the document
        video = document.querySelector('img'),
        
        btn = video = document.querySelector('button'),
		// We use this to time how long things are taking. Not that important..
		time_dump = document.getElementById("elapsed_time"),
		// Create a new image that will be our goofy glasses
		glasses = new Image(),
		// Store the canvas so we can write to it
		canvas  = canvas;
		// Get the canvas 2d Context
		ctx = canvas.ctx;
		// Finally set the source of our new glasses img element
        glasses.src = "i/glasses.png";
        

        function html5glasses() {
            console.log(canvas);
            // Start the clock 
         //   var elapsed_time = (new Date()).getTime();
        
            // Draw the video to canvas
          //  ctx.drawImage(video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height);
        
            // use the face detection library to find the face
            var comp = ccv.detect_objects({ "canvas" : canvas,
                                            "cascade" : cascade,
                                            "interval" : 5,
                                            "min_neighbors" : 1 });
        
            // Stop the clock
         //   time_dump.innerHTML = "Process time : " + ((new Date()).getTime() - elapsed_time).toString() + "ms";
        
            // Draw glasses on everyone!
            console.log(comp);
            for (var i = 0; i < comp.length; i++) {
                // ctx.drawImage(glasses, comp[i].x, comp[i].y,comp[i].width, comp[i].height);
                ctx.beginPath();
                ctx.lineWidth="4";
                ctx.strokeStyle="red";
                ctx.rect(comp[i].x,comp[i].y,comp[i].width,comp[i].height);
                ctx.stroke();

            }
        }

        // btn.addEventListener('click', function() {
        //     vidInterval = html5glasses();
        // });

        video.addEventListener('click', function() {
            vidInterval = html5glasses();
        });
        
