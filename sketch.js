// I did a tutorial on DOM elements through this source: https://www.youtube.com/watch?v=y17RuWkWdn8 and also used the W3 schools documentation to learn about DOM manipulation
//Please also look at the additional CSS that I added to create a hover effect on all my icons, I learned this through my Web Development module

var toolbox = null;
var helpers = null;
var colourVisibility = 'visible';
var c; //colourChosen
var reloadImg;
var stickerVisibility = 'collapse';
var myCanvas; //holds the details for the canvas

//These are the names of the images that we are using, we need to preload them into p5.js
var myImages = ["hamburger.png", "pizza-slice.png", "cupcake.png", "nachos.png", "french-fries.png", "bread.png", "hot-dog.png"]; 
var loadedStickers = [];
var colourinImages = ["mandala.jpg", "Fruit.png", "Fish.png","Unicorn.jpg"];
var loadedImages = []

//This is the global variable for the constructor function ColourPalette
//It has to be global because it is called from multiple constructor functions
var colourP; 

//===========PRELOAD===============================================
//We have to preload our images otherwise they will NOT work when we try to call them later
function preload() {
    //Here I dynamically create the source based on the arrays with the image names, this is so that it is easy
    //to add and remove images in future adaptations
    for (var i = 0; i < myImages.length; i++) {
        loadedStickers[i] = loadImage('./assets/' + myImages[i]);
    }
    for (var i = 0; i < colourinImages.length; i++) {
        loadedImages[i] = loadImage('./assets/' + colourinImages[i]);
    }
}

//==============SETUP================================================
function setup() {
    //create a canvas to fill the content div from index.html
    canvasContainer = select('#content');
    myCanvas = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    myCanvas.parent("content");

    //create helper functions and the colour palette
    helpers = new HelperFunctions();
    colourP = new ColourPalette();

    //create a toolbox for storing the tools
    toolbox = new Toolbox();

    //add the tools to the toolbox.
    //All icons are from icons8.com
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new EraserTool());
    toolbox.addTool(new StickerTool());
    toolbox.addTool(new PaintTool());
    toolbox.addTool(new AutoDrawTool());
    toolbox.addTool(new SpirographTool());
    toolbox.addTool(new BucketTool());
    background(255);

}

//===============DRAW==================================================
function draw() {
    //call the draw function from the selected tool.
    //hasOwnProperty is a javascript function that tests
    //if an object contains a particular method or property
    //if there isn't a draw method the app will alert the user
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    } else {
        alert("it doesn't look like your tool has a draw method!");
    }


    //We need to check if the DOM element is created then we can set the color, weight and alpha accordingly
    var colorInput = document.getElementById('mycolor');
    if (colorInput != null) {
        var alphaInput = document.getElementById('myalpha');
        c = color(colorInput.value); //The color function converts the value given from the html element into a form understood by p5.js
        c.setAlpha(alphaInput.value);
        fill(c);
        stroke(c);
    }

    //Set the stroke weight according to the selection made on the stroke weight slider
    var strokeInput = document.getElementById('weight');
    if (strokeInput != null) {
        strokeWeight(strokeInput.value);
    }
}


// =================DESTROY OPTIONS =======================================

//This is to destroy any additional Options that are in the Options HTML
//This is mainly used when switching between tools and we want to erase whatever was in the options HTML
//to start with a fresh slate
function DestroyOptions() {
    table = document.getElementById("optionsTable")
    if (table) {
        table.remove();
    }
}

// ================MOUSEPRESSED IN CANVAS ===================================

// This is to check if the click is within the boundaries of the canvas before implementing the draw class
function mouseIsPressedInCanvas(){
    if( mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
        return true;
    }else{
        return false;
    };
}

//===================CREATE TABLE=============================================
//Create a table in the DOM to add options to (this speeds up formatting)
// This almost acts as a skeleton where we can add additional elements to the table 
//This helps to stop repeat code

function createTable(){
    table = document.createElement("table");
    tr = document.createElement("tr");
    ul = document.createElement("ul");
    li = document.createElement("li");
    td = document.createElement("td");
    options = document.querySelector(".options");

    table.id = "optionsTable";
    options.append(table);
    tr.id = "stickerpalette";
    table.append(tr);
    tr.append(td);
    ul.style.listStyle = "none";
    ul.id = "optionsul";
    td.append(ul);
    li.style.marginBottom = "20px";
    li.id ="li_options"
    ul.append(li);
}