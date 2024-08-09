//a tool for drawing straight lines to the screen. Allows the user to preview
//the line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool() {
	this.icon = "assets/lineTo.png";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//draws the line to the screen 
	this.draw = function () {

		//only draw when mouse is clicked
		if (mouseIsPressed) {
			//if it's the start of drawing a new line
			if (startMouseX == -1) {
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}

			else {
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				updatePixels();
				//draw the line
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if (drawing) {
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}

	};

	this.populateOptions = function () {
		//================================================================
		// COLOUR PALETTE CODE
		//================================================================
		// We always quicly destroy whatever is present in the colourPalette so we can add what we need to
		// I always destroy before I create just incase some items are still present
		colourP.destroyPalette();
		colourP.colourChoice();
		colourP.alphaChoice();
		colourP.strokeChoice();

		//Remove anything in options
		DestroyOptions();
		//================================================================
		// END OF COLOUR PALETTE CODE
		//================================================================
	}

}
