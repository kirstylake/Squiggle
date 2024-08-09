/*
1. Plot out a shape as a series of vertices
    * Add a button switching between creating new vertices and editing
    * Click the canvas to add a vertex
    * Don't draw right away add vertex to an array then draw but don't save to canvas
2. Edit the vertices using a mouse drag
    * If editing is on
    * Highlight the location of the vertices
    * When mouse pressed is near vertex( use the distance function) updtae the vertex x and y with the mouseX and mouseY
3. Confirm the final shape
*/

//The extension I added was to add in a triangle or square depending on what was selected from the dropdown box
//The user can then edit this using the edit shape and move their vertices

//This has to be a global variable so it is passed effectively between functions
var editMode = false;

function AutoDrawTool() {
    this.icon = 'assets/autoDrawTool.png'
    this.name = "autoDrawTool"

    var currentShape = [];

    noFill();
    loadPixels();

    this.draw = function () {
        noFill();
        updatePixels();
        var shapeWidth = 100; // the width of the shape chosen drawn to the canvas
        var shapeHeight = 100; // the height of the shape chosen drawn to the canvas
        if (mouseIsPressedInCanvas()) {
            if (!editMode) {


                // Change the code according to which shape was chosen from the dropdown box
                var options = document.querySelector("select");
                var shape = options.value;
                switch (shape) {
                    case 'Please Select': // When no shape is selected just draw as usual
                        currentShape.push({
                            x: mouseX,
                            y: mouseY
                        });
                        break;
                    case 'Square': // Manually adding the x and y coordinates to the array for a square
                        currentShape.push({
                            x: mouseX,
                            y: mouseY
                        })
                        currentShape.push({
                            x: mouseX + shapeWidth,
                            y: mouseY
                        })
                        currentShape.push({
                            x: mouseX + shapeWidth,
                            y: mouseY + shapeHeight
                        })
                        currentShape.push({
                            x: mouseX,
                            y: mouseY + shapeHeight
                        })
                        break;
                        case 'Triangle': // Manually adding the x and y coordinates to the array for a triangle
                            currentShape.push({
                                x: mouseX,
                                y: mouseY
                            })
                            currentShape.push({
                                x: mouseX + shapeWidth,
                                y: mouseY + shapeHeight
                            })
                            currentShape.push({
                                x: mouseX + shapeWidth,
                                y: mouseY + shapeHeight
                            })
                            currentShape.push({
                                x: mouseX - shapeWidth,
                                y: mouseY + shapeHeight
                            })
                            break;

                }
            }
            else {
                for (var i = 0; i < currentShape.length; i++) {
                    if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15) {
                        currentShape[i].x = mouseX;
                        currentShape[i].y = mouseY;
                    }
                }



            }

        }

        beginShape();
        for (var i = 0; i < currentShape.length; i++) {
            vertex(currentShape[i].x,
                currentShape[i].y);
            if (editMode) //Add a red elipse on vertices to make dragging more intuitive
            {
                fill('red');
                ellipse(currentShape[i].x, currentShape[i].y, 10);
                noFill();
            }
        }
        endShape();
    }

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
        //Remove anything from options
        DestroyOptions()
        //================================================================
        // END OF COLOUR PALETTE CODE
        //================================================================

        //create the skeleton for the options area, this function is present in the sketch.js file for reference
        createTable();

        //create the elements
        label = document.createElement("label");
        button = document.createElement("button");
        button2 = document.createElement("button");
        li = document.querySelector("#li_options");

        button.id = "Edit_Shape";
        button.innerText = "Edit Shape";
        button.type = "button";
        button2.id = "Fin_Shape";
        button2.innerText = "Finish Shape";
        button2.type = "button";

        button.style.marginRight = "5px";
        li.append(button);
        li.append(button2);

        button.addEventListener("click", function () {
            var button = document.querySelector("#Edit_Shape");
            if (editMode) {
                editMode = false;
                button.innerText = "Edit Shape"; //changes what is written on the button
            }
            else {
                editMode = true;
                button.innerText = "Add Vertices";
            }
        });


        button2.addEventListener("click", function () {
            editMode = false;
            // we need to call the draw function of the selected tool because we cannot
            //  refer to it as this.draw when it is inside an event listener
            toolbox.selectedTool.draw()
            //will make sure the edit vertices spots are not there
            loadPixels();
            currentShape = [];
        });


        li = document.querySelector("#li_options");
        label = document.createElement("label");
        selectEl = document.createElement("select");

        label.id = "label";
        label.for = "myList";
        label.innerText = "Insert Shape:";
        label.style.marginRight = "5px";
        label.style.marginLeft = "20px";

        li.append(label);
        li.append(selectEl);

        selectEl.id = "myList";

        // an array with our options that we want to fill the array with
        options = ["Please Select", "Square", "Triangle"];
        // an array to temporarily hold our option elements that are created
        optionElements = [];

        //Fill up the options dropdown
        for (var i = 0; i < options.length; i++) {
            var option = null;
            option = document.createElement("option");
            option.innerText = options[i];
            option.id = options[i];
            optionElements.push(option);
        };

        //Populate the Select Element
        for (var i = 0; i < optionElements.length; i++) {
            selectEl.append(optionElements[i]);
        };


    }

}