// This is the eraser constructor function, it aims to "erase" by colouring with the background colour
// This is a new tool in the drawing app

function EraserTool() {
	this.icon = "assets/eraser.png";
	this.name = "eraserTool";

	var oldMouseX = -1;
	var oldMouseY = -1;

	this.draw = function () {
		//if the mouse is pressed
		if (mouseIsPressed) {
			// if oldmouseX or Y are -1 then set them to the original mouseX.
			if (oldMouseX == -1) {
				oldMouseX = mouseX;
				oldMouseY = mouseY;
			}
			//if we already have values for oldX and Y we can draw a line from 
			//there to the current mouse location
			else {
				// start new drawing state to keep stroke settings local
				push();
				stroke(255, 255, 255);
				line(oldMouseX, oldMouseY, mouseX, mouseY);
				pop(); // restroke original state
				oldMouseX = mouseX;
				oldMouseY = mouseY;
			}
		}
		// when the user releases the mouse the values are reset to the -1
		else {
			oldMouseX = -1;
			oldMouseY = -1;
		}
	};

	this.populateOptions = function () {

		// I want to just destroy the colour and alpha options and just add the stroke weight option
		colourP.destroyPalette();
		colourP.strokeChoice();
		//Remove anything in options
		DestroyOptions();
	}

}
