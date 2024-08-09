//create a paint tool that simulates wet paint and brings pixels together to simulate wet paint

function PaintTool() {

    this.icon = "assets/paintbrush.png";
    this.name = "paintTool";

    //this code was be inspired and adapted from the resource : https://editor.p5js.org/StevesMakerspace/sketches/Ezi6W7dwX
    // what is changed is our colours are retrieved from the colour slider coded in html and the stroke weight uses our html options.
    // I also added a rainbow paint option to allow the user to paint with a rainbow colour scheme 
    // I also changed the code to allow it to be formatted for a constructor function instead of seperate functions
    // I also changed the structure of the paint array to account for the drawings already present in the pixel array
    // The method of the paint mixing has been left the same as the example resource


    //I removed the buttons as I didn't need this code to be as complex as it was originally
    var defaultTime = 0.0012; // large = quick dry
    var runnyColors = false;
    var backgrd = 255; // 255 white; 0 black
    var dryTime = defaultTime;
    var prevMouseX, prevMouseY;
    var colorPicked;
    var paint = [];
    var tempPaint1 = [];
    var tempPaint2 = [];

    pixelDensity(1);
    var d = pixelDensity()

    // fill the arrays with white color
    var i = 0;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            paint.push(backgrd, backgrd, backgrd, 0);
        }

    }
    tempPaint1 = paint;
    tempPaint2 = paint;

    this.draw = function () {

        //This is additional code that I added, it updates the paint array with current pixel values,
        //The original code only forced the paint array to be the colour white, this wouldn't have worked
        // because this is a drawing app where we switch between tools, this makes our app work smoother
        loadPixels();
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var pix = (x + y * width) * 4;
                var arrayPos = (x + y * width) * 4;
                paint[arrayPos] = pixels[pix];
                paint[arrayPos + 1] = pixels[pix + 1];
                paint[arrayPos + 2] = pixels[pix + 2];
            }
        }
        updatePixels();

        //We don't need the extra functionalities that the example code has so I reduced the paint tool to just have a default dry time.
        dryTime = defaultTime;

        //I adjusted how the paint drop works so that the painting can be mixed more, this allows gradients to be created
        //This new adjustment allows the user to choose the stroke weight which can make the paint expand more
        var strokeInput = document.getElementById('weight');
        strokeInput.min = "20"; //ensure that the minimum strokeWeight chosen on the DOM is 20 (this blends better)
        //Convert the value taken from the stroke slider to an integer as it is being used in calculations
        paintDrop = parseInt(strokeInput.value);


        //This is my own addition, it adds a rainbow colour effect when the rainbowMode option is selected
        //First we must check if the rainbow mode is selected
        var rainbowCheck = document.querySelector("#rainbowCheck").checked;
        //Declare the paintColour variable to be used later
        var paintColour;
        //Get the colour wheel elements to toggle the visibility depending on if the checkbox is selected
        var colourVis = document.querySelector("#mycolor");
        var colourVisLabel = document.querySelector("#mycolorlabel");
        //Check if the rainbowCheck is selected
        if (rainbowCheck == true) {
            //If it is selected then set the colour to be random
            paintColour = color(random(255), random(255), random(255), random(255));
            //Hide the colour wheel
            colourVis.style.visibility = "hidden";
            colourVisLabel.style.visibility = "hidden";

        } else {
            // If it is not in rainbow mode then just set the paint colour to be the colour chosen in the colour wheel
            paintColour = c;
            //Show the colour wheel
            colourVis.style.visibility = "visible";
            colourVisLabel.style.visibility = "visible";
        }

        colorPicked = paintColour;
        this.addPaint();
        this.update();
        this.render();
    }

    // add paint when clicking - start with dragging
    this.addPaint = function () {
        if (
            mouseIsPressed &&
            mouseX >= 0 &&
            mouseX <= width &&
            mouseY >= 0 &&
            mouseY <= height
        ) {
            var distance = dist(prevMouseX, prevMouseY, mouseX, mouseY);
            var numPoints = floor(distance / 1); // larger number = more gaps and fewer points; these two lines from George Profenza, noted below.
            this.drawLinePoints(prevMouseX, prevMouseY, mouseX, mouseY, numPoints);

            // add paint when clicking in one place
            if (mouseX == prevMouseX && mouseY == prevMouseY) {
                this.renderPoints(mouseX, mouseY);
            }
        }
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        // preventing a wrap around error when dragging off canvas and back on
        if (mouseIsPressed && mouseX < 0) {
            prevMouseX = 0;
        }
        if (mouseIsPressed && mouseX > width - 1) {
            prevMouseX = width - 1;
        }
        if (mouseIsPressed && mouseY < 0) {
            prevMouseY = 0;
        }
        if (mouseIsPressed && mouseY > height - 1) {
            prevMouseY = height - 1;
        }
    }

    // calculate points when dragging
    // This function from George Profenza on stackoverflow https://stackoverflow.com/questions/63959181/how-do-you-draw-a-line-in-a-pixel-array
    this.drawLinePoints = function (x1, y1, x2, y2, points) {
        for (var i = 0; i < points; i++) {
            var t = map(i, 0, points, 0.0, 1.0);
            var x = round(lerp(x1, x2, t));
            var y = round(lerp(y1, y2, t));
            this.renderPoints(x, y);
        }
    }

    // replace array points when drawing
    this.renderPoints = function (x, y) {
        var arrayPos = (x + y * width) * 4;
        var newR = (paint[arrayPos + 0] + colorPicked.levels[0]) / 2;
        var newG = (paint[arrayPos + 1] + colorPicked.levels[1]) / 2;
        var newB = (paint[arrayPos + 2] + colorPicked.levels[2]) / 2;
        var newN = paint[arrayPos + 3] + paintDrop;
        paint.splice(arrayPos, 4, newR, newG, newB, newN); // replace the current pixel color with the newly calculated color
    }

    // if there's a lot of color in one place, spread it around
    //This is what creates the mixing of paint effect
    this.update = function () {
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var arrayPos = (x + y * width) * 4;
                if (paint[arrayPos + 3] > 4) {
                    tempPaint1[arrayPos + 3] = paint[arrayPos + 3] - 4;

                    // mix pixel to right
                    if (x < width - 1) {
                        tempPaint1[arrayPos + 4] =
                            (paint[arrayPos + 4] + paint[arrayPos]) / 2;
                        tempPaint1[arrayPos + 5] =
                            (paint[arrayPos + 5] + paint[arrayPos + 1]) / 2;
                        tempPaint1[arrayPos + 6] =
                            (paint[arrayPos + 6] + paint[arrayPos + 2]) / 2;
                        tempPaint1[arrayPos + 7] = paint[arrayPos + 7] + 1;
                    }

                    // mix pixel to left
                    if (x > 0) {
                        tempPaint1[arrayPos - 4] =
                            (paint[arrayPos - 4] + paint[arrayPos]) / 2;
                        tempPaint1[arrayPos - 3] =
                            (paint[arrayPos - 3] + paint[arrayPos + 1]) / 2;
                        tempPaint1[arrayPos - 2] =
                            (paint[arrayPos - 2] + paint[arrayPos + 2]) / 2;
                        tempPaint1[arrayPos - 1] = paint[arrayPos - 1] + 1;
                    }

                    // mix pixel below
                    tempPaint1[arrayPos + width * 4] =
                        (paint[arrayPos + width * 4] + paint[arrayPos]) / 2;
                    tempPaint1[arrayPos + width * 4 + 1] =
                        (paint[arrayPos + width * 4 + 1] + paint[arrayPos + 1]) / 2;
                    tempPaint1[arrayPos + width * 4 + 2] =
                        (paint[arrayPos + width * 4 + 2] + paint[arrayPos + 2]) / 2;
                    tempPaint1[arrayPos + width * 4 + 3] =
                        paint[arrayPos + width * 4 + 3] + 1;

                    // mix pixel above
                    tempPaint1[arrayPos - width * 4] =
                        (paint[arrayPos - width * 4] + paint[arrayPos]) / 2;
                    tempPaint1[arrayPos - width * 4 + 1] =
                        (paint[arrayPos - width * 4 + 1] + paint[arrayPos + 1]) / 2;
                    tempPaint1[arrayPos - width * 4 + 2] =
                        (paint[arrayPos - width * 4 + 2] + paint[arrayPos + 2]) / 2;
                    tempPaint1[arrayPos - width * 4 + 3] =
                        paint[arrayPos - width * 4 + 3] + 1;
                }

                // gradually dry paint
                tempPaint1[arrayPos + 3] = paint[arrayPos + 3] - dryTime;
                if (tempPaint1[arrayPos + 3] < 0) {
                    tempPaint1[arrayPos + 3] = 0;
                }
            }
        }

        //Allows the paint colours to mix
        if (runnyColors == true) {
            paint = tempPaint1;
        }
        else {
            for (var x = width; x > 0; x--) {
                for (var y = height; y > 0; y--) {
                    var arrayPos = (x + y * width) * 4; // Moving through the a temporary array to place the colour
                    if (paint[arrayPos + 3] > 4) {
                        tempPaint2[arrayPos + 3] = paint[arrayPos + 3] - 4;

                        // mix pixel to right
                        if (x < width - 1) {
                            tempPaint2[arrayPos + 4] =
                                (paint[arrayPos + 4] + paint[arrayPos]) / 2;
                            tempPaint2[arrayPos + 5] =
                                (paint[arrayPos + 5] + paint[arrayPos + 1]) / 2;
                            tempPaint2[arrayPos + 6] =
                                (paint[arrayPos + 6] + paint[arrayPos + 2]) / 2;
                            tempPaint2[arrayPos + 7] = paint[arrayPos + 7] + 1;
                        }

                        // mix pixel to left
                        if (x > 0) {
                            tempPaint2[arrayPos - 4] =
                                (paint[arrayPos - 4] + paint[arrayPos]) / 2;
                            tempPaint2[arrayPos - 3] =
                                (paint[arrayPos - 3] + paint[arrayPos + 1]) / 2;
                            tempPaint2[arrayPos - 2] =
                                (paint[arrayPos - 2] + paint[arrayPos + 2]) / 2;
                            tempPaint2[arrayPos - 1] = paint[arrayPos - 1] + 1;
                        }

                        // mix pixel below
                        tempPaint2[arrayPos + width * 4] =
                            (paint[arrayPos + width * 4] + paint[arrayPos]) / 2;
                        tempPaint2[arrayPos + width * 4 + 1] =
                            (paint[arrayPos + width * 4 + 1] + paint[arrayPos + 1]) / 2;
                        tempPaint2[arrayPos + width * 4 + 2] =
                            (paint[arrayPos + width * 4 + 2] + paint[arrayPos + 2]) / 2;
                        tempPaint2[arrayPos + width * 4 + 3] =
                            paint[arrayPos + width * 4 + 3] + 1;

                        // mix pixel above
                        tempPaint2[arrayPos - width * 4] =
                            (paint[arrayPos - width * 4] + paint[arrayPos]) / 2;
                        tempPaint2[arrayPos - width * 4 + 1] =
                            (paint[arrayPos - width * 4 + 1] + paint[arrayPos + 1]) / 2;
                        tempPaint2[arrayPos - width * 4 + 2] =
                            (paint[arrayPos - width * 4 + 2] + paint[arrayPos + 2]) / 2;
                        tempPaint2[arrayPos - width * 4 + 3] =
                            paint[arrayPos - width * 4 + 3] + 1;
                    }

                    // gradually dry paint, slowly stops the spread of the paint in the pixel array
                    tempPaint2[arrayPos + 3] = paint[arrayPos + 3] - dryTime;
                    if (tempPaint2[arrayPos + 3] < 0) {
                        tempPaint2[arrayPos + 3] = 0;
                    }
                }
            }
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    var arrayPos = (x + y * width) * 4;
                    paint[arrayPos] = (tempPaint1[arrayPos] + tempPaint2[arrayPos]) / 2;
                }
            }
        }
    }

    // render all pixels by transferring the values from the paint array into the pixels array
    this.render = function () {
        loadPixels();
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var pix = (x + y * width) * 4;
                var arrayPos = (x + y * width) * 4;
                pixels[pix] = paint[arrayPos];
                pixels[pix + 1] = paint[arrayPos + 1];
                pixels[pix + 2] = paint[arrayPos + 2];
            }
        }
        updatePixels();
    }

    //Populates the colour, stroke and alpha options in the DOM, refer to colourPalette.js to view how this works
    this.populateOptions = function () {
        DestroyOptions();
        colourP.destroyPalette();
        colourP.colourChoice();
        colourP.alphaChoice();
        colourP.strokeChoice();

        //We are going to add a rainbow paint option checkbox
        DestroyOptions();
        createTable();

        label = document.createElement('label');
        check = document.createElement('input');
        ul = document.querySelector("#optionsul");
        li = document.createElement('li');

        label.id = "label2";
        label.for = "myRadio";
        label.innerText = "Rainbow Mode:";
        label.style.marginRight = "5px";

        check.type = "checkbox";
        check.id = "rainbowCheck";

        li.append(label);
        li.append(check);

        ul.append(li);
    }


}

