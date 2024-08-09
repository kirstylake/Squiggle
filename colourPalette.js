//Complete overhaul of the colour Palette functionality, nothing of the original template is left

function ColourPalette() {
// Here we are dynamically adding some code to create some more functionality to our color application.
// First we are creating an unordered list that will be injected into the colour palette class.

this.colourChoice = function ()
{
    var li1 = document.createElement("li");
    var label = document.createElement("label");
    var input = document.createElement("input");


    //Since we are dynamically destroying and adding the unordered list we need to check if it exists before adding an element
    // if it doesn't exist then we go into our function to create it
    var ul = document.getElementById("colourOptions");
    if(ul){
        ul = document.getElementById("colourOptions");
    }else{
        ul = this.createColourBox();
    }

    //Here we are adding some attributes for our label element
    label.id = "mycolorlabel";
    label.for ="mycolor";
    label.innerText = "Color:";

    //We do the same for our input element
    input.type = "color";
    input.id = "mycolor";

    ul.append(li1);
    li1.append(label);
    li1.append(input);
}

this.strokeChoice = function ()
{
    //These work exactly the same as the colourChoice function
    var li2 = document.createElement("li");
    var label2 = document.createElement("label");
    var input2 = document.createElement("input");

    //Check if the colour palette exists
    var ul = document.getElementById("colourOptions");
    if(ul){
        ul = document.getElementById("colourOptions");
    }else{
        ul = this.createColourBox();
    }


        label2.id = "myweightlabel";
        label2.for ="myweight";
        label2.innerText = "Stroke:";
    
        input2.type = "range";
        input2.id = "weight";
        input2.min = "2";
        input2.max = "100";
        input2.value = "3";
    
    
        ul.append(li2);
        li2.append(label2);
        li2.append(input2);
    

}

    this.alphaChoice = function ()
    {
        var li3 = document.createElement("li");
        var label3 = document.createElement("label");
        var input3 = document.createElement("input");

        var ul = document.getElementById("colourOptions");
        if(ul){
            ul = document.getElementById("colourOptions");
        }else{
            ul = this.createColourBox();
        }

        label3.id = "myalphalabel";
        label3.for ="myalpha";
        label3.innerText = "Alpha:";
    
        input3.type = "range";
        input3.id = "myalpha";
        input3.min = "0";
        input3.max = "255";
        input3.value = "255";

        ul.append(li3);
        li3.append(label3);
        li3.append(input3);

    
    }

    this.destroyPalette = function ()
    {
        //Check to see if the element exists first
        var ul = document.getElementById("colourOptions");
        if(ul){
            ul.remove();
        }
    }
    

    this.createColourBox = function ()
    {
        var ul = document.createElement("ul");
        var colourPalette = document.querySelector(".colourPalette");
        ul.style.listStyle = "none";
        ul.id = "colourOptions";
        colourPalette.append(ul);
        return ul;
    }
}




