
var stickerImg; //This is our global Sticker variable that is passed between the on click function and out main function


function StickerTool() {
    // This image is from https://icons8.com/ 
    this.icon = ("assets/stickerTool.png");
    this.name = "stickerTool"
    var stickerSize;
    var nstickerSlider;
    var prevMouseX = 0; //ensure that these are null before calling the draw method
    var prevMouseY = 0;


    this.draw = function () {
        if (stickerImg != null)  //check if there is an image loaded
        {
            if (mouseIsPressedInCanvas()) {
                //get the value selected on the sticker sliders to create the stickers
                nstickerSlider = document.getElementById('nostickers').value; //get the value from html slider
                stickerSize = document.getElementById('stickersize').value; //get the value from the html slider
                nstickerSlider = parseInt(nstickerSlider);//These values are read as strings and must be converted to integers
                stickerSize = parseInt(stickerSize);

                //To do: fix this so that if one sticker is chosen on slider only one is drawn to the screen
                //I added this mouse functionality in so that the stickers don't run on a loop when the user isn't moving their cursor
                if (prevMouseX != mouseX && prevMouseY != mouseY) {
                    for (var i = 0; i < nstickerSlider; i++) {
                        var stickerX = random((mouseX - stickerSize / 2) - 30, (mouseX - stickerSize / 2) + 30);
                        var stickerY = random((mouseY - stickerSize / 2) - 30, (mouseY - stickerSize / 2) + 30);

                        image(stickerImg, stickerX, stickerY, stickerSize, stickerSize);
                        prevMouseX = mouseX;
                        prevMouseY = mouseY;
                    }
                }

            }
        }
    }

    this.populateOptions = function () {
        // We don't need any of the colour controls for this tool
        colourP.destroyPalette();

        //Remove any elements that were previously occupying the options area
        DestroyOptions();

        //create a skeleton table to add our elements to 
        createTable();

        //create a list element for the stickersize input
        li2 = document.createElement("li");
        //Add another row in table to hold the input
        td2 = document.createElement("td")

        //add the label for the number of the sticker
        label = document.createElement("label");
        //add the input for the number of sickers
        input = document.createElement("input");

        //add the label for the sticker size
        label2 = document.createElement("label");
        //add the input for the sticker size
        input2 = document.createElement("input");

        //Access the List element in the options table
        li = document.querySelector("#li_options");

        //Add attributes to the number of stickers elements
        label.id = "nostickerslabel";
        label.for = "nostickers";
        label.innerText = "Number of Stickers";

        // add the abel to the list element
        li.append(label);

        //Give attributes to the input for number of stickers
        input.type = "range";
        input.min = "1";
        input.max = "100";
        input.value = "1";
        input.id = "nostickers";

        //add the input for number of stickers to the list element
        li.append(input);

        // Add our second list to the unordered list
        ul.append(li2);


        //Add all the attributes and details for sticker size similarly to sicker numver
        label2.id = "stickersizelabel";
        label2.for = "stickersize";
        label2.innerText = "Sticker Size";

        li2.append(label2);

        input2.type = "range";
        input2.min = "1";
        input2.max = "200";
        input2.value = "50";
        input2.id = "stickersize";

        li2.append(input2);
        tr.append(td2);

        // This piece of code dynamically creates our stickers so that we don't have to code so many html elements, all we need is the image name

        //a temporary array to hold our image elements
        var imgElements = [];

        for (var i = 0; i < myImages.length; i++) {
            var img = null;
            img = document.createElement("img");
            img.id = i;
            img.src = "assets/" + myImages[i];
            img.width = "100";
            img.width = "100";
            img.value = "0";
            imgElements.push(img);
        }

        //Here we are appending the newly generated images to the HTML code
        for (var i = 0; i < imgElements.length; i++) {
            td2.append(imgElements[i]);
        }

        //Adding the event handler was a real issue, when it is inside a loop it just wants to keep the last element id for some reason
        // I tried to work around this by adding another loop. This ended up working, I found inspiration for this workaround on 
        // stackover flow: https://stackoverflow.com/questions/36946159/adding-addeventlistener-in-loop-only-works-for-last-button 

        for (let i = 0; i < myImages.length; i++) {
            var element = document.getElementById(i);
            element.addEventListener('click', function () { getImage(i) }, false);
        }
    }

}

//allows us to get the image that was clicked so we can draw with it
function getImage(id) {

    stickerImg = loadedStickers[id];
    document.getElementById(id).style.cursor.url = "assets/" + myImages[id];

} 