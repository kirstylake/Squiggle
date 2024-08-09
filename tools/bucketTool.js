// I created a bucket tool that clicks a pixel and then uses recursion to check all the neighbouring pixels and change their colour to the same colour
// that was selected. There is a good resource for this here:
//https://stackoverflow.com/questions/63803791/flood-fill-tool-p5-js

//I also chose some images to colour in using the native p5.js ability to load an image as pixels,
//this is like a colouring in book and gives the users choices between preselected colouring in pictures.

//We need to import an image and see if it can be filled this is a good reference: https://p5js.org/reference/#/p5.Image

var bucket;

function BucketTool() {
    //We have to use self to replace this in the BucketTool because we use this too often in the self.ColourConvert function which can cause confusion
    let self = this;
    //set an icon and a name for the object
    this.icon = 'assets/bucketTool.png';
    this.name = 'bucketTool';

    d = pixelDensity();

    self.draw = function () {
        if (mouseIsPressed) {
            self.floodFill(mouseX, mouseY);
        }
        //Convert the colour into an easier to understand format for the fill functionality
        // I take the colour which is set in the sketch file and go to the levels objects to obtain my r,g,b and alpha 
        self.colour = self.ColourConvert(c.levels[0], c.levels[1], c.levels[2], c.levels[3]);
        var options = document.querySelector("select");
        var picture = options.value;


        // This is a case statement that intends to import a colouring in picture depending on which picture option
        // is selected from the dropdown box
        switch (picture) {
            case 'Mandala':
                if (loadedImage == false) {
                    //clearing the background before placing the picture
                    background(255, 255, 255);
                    // I divide the width by 2 because the picture is a portrait image and if I don't do this it becomes distorted
                    // This image is from https://www.dreamstime.com/mandala-coloring-page-adult-color-book-decorative-round-ornament-anti-stress-therapy-pattern-weave-design-element-yoga-logo-image131567053
                    image(loadedImages[0], 0, 0, width / 2, height);
                    // We need to have a toggle for loadedImages
                    loadedImage = true;
                    break;
                }
            case 'Fruit':
                if (loadedImage == false) {
                    background(255, 255, 255);
                    //This image is from https://www.pngwing.com/es/free-png-sfinz 
                    image(loadedImages[1], 0, 0, width / 2, height);
                    loadedImage = true;
                    break;
                }
            case 'Fish':
                if (loadedImage == false) {
                    background(255, 255, 255);
                    //This image is from https://www.kindpng.com/imgv/hJhixi_coloring-pages-fish-easy-hd-png-download/
                    image(loadedImages[2], 0, 0, width / 2, height);
                    loadedImage = true;
                    break;
                }
            case 'Unicorn':
                if (loadedImage == false) {
                    background(255, 255, 255);
                    //This image is from https://coloringbay.com/unicorn-coloring-pages/unicorn-donut-coloring-page
                    image(loadedImages[3], 0, 0, width / 2, height);
                    loadedImage = true;
                    break;
                }

        }
    };

    //set the colour to whatever is fed into the function
    self.setColour = function (col) {
        self.colour = col;
    };

    //Compare the colours of the new pixel and the colour that was selected
    self.matchColour = function (pos, oldColour) {
        var current = self.getPixelData(pos.x, pos.y);
        return (current[0] === oldColour[0] && current[1] === oldColour[1]
            && current[2] === oldColour[2] && current[3] === oldColour[3]);
    }

    //Format the position to the correct key (this key is our own index for the pixelList object so we can find our refernces to pixels easier)
    // We use this key to refer to pixels and set their value to 1 if they are going to be filled
    self.getKey = function (pos) {
        return "" + pos.x + "_" + pos.y;
    }

    //checks the positionSet input and whether this object has the key as its own property and not as an inherited hasOwnProperty
    // if the pixel does have its own key the function should return false
    self.checkPixel = function (pos, positionSet) {
        return !positionSet.hasOwnProperty(self.getKey(pos));
    }

    self.floodFill = function (xPos, yPos) {

        //create an empty stack
        var stack = [];

        //create an empty pixelList object
        var pixelList = {};

        //create the first object, this holds the position of xPos and yPos entered into the floodFill function
        var first = { 'x': xPos, 'y': yPos };

        //adds the first object to the top of the stack
        stack.push(first);

        //adds the key of the first pixel to the pixelList object
        pixelList[self.getKey(first)] = 1;

        loadPixels();

        //Retrieves the colour of the pixel that was selected
        var firstColour = self.getPixelData(xPos, yPos);

        //This loop continues until the stack is completely empty, which means we pop the elements every time we run the loop
        while (stack.length > 0) {

            //Take the top element of the stack and assign it to the variable pos1
            var pos1 = stack.pop();

            //Sets the pixel colour of that first element to the colour selected for the fill function
            self.setPixelData(pos1.x, pos1.y, self.colour);

            //Now we need to find the values of the pixels above, below, left and right of the pixel that was selected
            //We find the pixel above by subtracting one from the y position
            var up = { 'x': pos1.x, 'y': pos1.y - 1 };
            //We find the pixel below by adding 1 to the y position
            var dn = { 'x': pos1.x, 'y': pos1.y + 1 };
            //We find the pixel to the left by subtracting one from the x position
            var le = { 'x': pos1.x - 1, 'y': pos1.y };
            //We find the pixel to the right by adding 1 to the x position
            var ri = { 'x': pos1.x + 1, 'y': pos1.y };

            //Now we need to check that the x and y values are within the frame of the canvas, they also need to be different from the 
            // Selected colour, this is why the matchColour is called and compares the pixel to the original fill colour
            //Then we call the addPixelToDraw function which pushes these pixels to the stack and sets the key of that pixel to 1.
            if (0 <= up.y && up.y < height && self.matchColour(up, firstColour)) addPixelToDraw(up);
            if (0 <= dn.y && dn.y < height && self.matchColour(dn, firstColour)) addPixelToDraw(dn);
            if (0 <= le.x && le.x < width && self.matchColour(le, firstColour)) addPixelToDraw(le);
            if (0 <= ri.x && ri.x < width && self.matchColour(ri, firstColour)) addPixelToDraw(ri);
        }

        //update the pixel array
        updatePixels();

        //Since this function is only called within draw, I call it as a normal function
        function addPixelToDraw(pos) {

            //We check that the pixel has a key by using the CheckPixel function
            if (self.checkPixel(pos, pixelList)) {
                //If the pixel does have its key we push this pixels x and y information to the stack
                stack.push(pos);
                //We then set value of the pixel key within the PixelList to 1, this one indicates that we must fill this pixel 
                pixelList[self.getKey(pos)] = 1;
            }
        }
    }

    
    //Converts the colour to a form that can be used
    self.ColourConvert = function (r, g, b, a) {
        var self = (this !== window ? this : {});
        if (arguments.length === 0) {
            self['0'] = 0; self['1'] = 0; self['2'] = 0; self['3'] = 0;
        } else if (arguments.length === 1) {
            self['0'] = r[0]; self['1'] = r[1]; self['2'] = r[2]; self['3'] = r[3];
        } else if (arguments.length === 4) {
            self['0'] = r; self['1'] = g; self['2'] = b; self['3'] = a;
        } else {
            return null;
        }
        console.log(self);
        return self;
    }

    self.getPixelData = function (x, y) {
        // Gets the colour values r,g,b,a for each pixel and sets these values to the colour array
        var colour = [];
        for (var i = 0; i < d; ++i) {
            for (var j = 0; j < d; ++j) {
                let idx = 4 * ((y * d + j) * width * d + (x * d + i)); //moves through the pixels array along the width
                colour[0] = pixels[idx]; // this sets the red value of the pixel
                colour[1] = pixels[idx + 1]; //sets the green value of the pixel
                colour[2] = pixels[idx + 2]; // sets the blue value of the pixel
                colour[3] = pixels[idx + 3]; // sets the alpha value of the pixel
            }
        }
        return colour;
    }


    self.setPixelData = function (x, y, colour) {
        //Similar to the get pixel data, this sets the pixels in the pixel array to the colour chosen and set to the colour array
        for (var i = 0; i < d; ++i) {
            for (var j = 0; j < d; ++j) {
                let idx = 4 * ((y * d + j) * width * d + (x * d + i));
                pixels[idx] = colour[0];
                pixels[idx + 1] = colour[1];
                pixels[idx + 2] = colour[2];
                pixels[idx + 3] = colour[3];
            }
        }
    }

    //This function poluates the DOM elements
    self.populateOptions = function () {
        DestroyOptions();
        colourP.destroyPalette();
        colourP.colourChoice();
        colourP.alphaChoice();

        DestroyOptions();
        createTable();


        //Populate the Options
        li = document.querySelector("#li_options");
        label = document.createElement("label");
        selectEl = document.createElement("select");

        label.id = "label";
        label.for = "myList";
        label.innerText = "Colouring In Picture:";
        label.style.marginRight = "5px";

        li.append(label);
        li.append(selectEl);

        selectEl.id = "myList";

        // an array with our options that we want to fill the array with
        options = ["Choose a Picture", "Mandala", "Fruit", "Fish", "Unicorn"];
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

        selectEl.addEventListener("change", function () { loadedImage = false });
    }

}


