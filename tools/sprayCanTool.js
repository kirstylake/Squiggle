//Extension: I just added a spread slider and a point slider that allows the user to adjust how the spray can sprays
function SprayCanTool() {

	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.png";

	this.draw = function () {
		var r = random(5, 10);
		var spread = document.getElementById("mySlider").value; //this returns a string 
		var points = document.getElementById("myPoints").value
		spread = parseInt(spread); //This should parse the string into an integer
		points = parseInt(points);
		if (mouseIsPressedInCanvas()) {
			for (var i = 0; i < points; i++) {
				//The spread value is used here to spread the dots from one another
				point(random(mouseX - spread, mouseX + spread), random(mouseY - spread, mouseY + spread));
			}
		}
	};

	this.populateOptions = function () {
		//================================================================
		// COLOUR PALETTE CODE
		//================================================================
		// We always quickly destroy whatever is present in the colourPalette so we can add what we need to
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

		createTable();

		//Populate the Options
		li = document.querySelector("#li_options");
		label = document.createElement("label");

		label.id = "label";
		label.for = "mySlider";
		label.innerText = "Spread:";
		label.style.marginRight = "5px";

		li.append(label);

		input = document.createElement("input");

		input.id = "mySlider";
		input.type = "range";
		input.min = "1";
		input.max = "50";
		input.value = "10";

		li.append(input);


		li2 = document.createElement("li");
		label2 = document.createElement("label");
		ul = document.querySelector("#optionsul");

		label2.id = "label";
		label2.for = "myPoints";
		label2.innerText = "Points:";
		label2.style.marginRight = "5px";
		label2.marginLeft = "5px";

		li2.append(label2);

		input2 = document.createElement("input");

		input2.id = "myPoints";
		input2.type = "range";
		input2.min = "1";
		input2.max = "50";
		input2.value = "13";

		li2.append(input2);

		ul.append(li2);


	}
}