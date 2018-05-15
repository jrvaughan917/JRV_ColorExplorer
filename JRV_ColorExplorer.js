/*
	JRV_ColorExplorer by James R. Vaughan
		
	Tired of converting RGB to HEX?
	Tired of using other peoples' colors?
	Hate using tiny color wheels to find colors?
	
	This powerful tool makes finding amazing colors easy!
	
	The black background makes the colors really pop!
	Use the palette to make a color scheme of up to 16 colors!
	
	Yes, it has grayness! Rather than draining saturation, you're adding a touch of gray!
*/

var ColorTable = document.querySelector('.ColorTable');

var RedInput = document.querySelector('.RedInput');
var GreenInput = document.querySelector('.GreenInput');
var BlueInput = document.querySelector('.BlueInput');
var LightnessInput = document.querySelector('.LightnessInput');
var GraynessInput = document.querySelector('.GraynessInput');
var WhitenessInput = document.querySelector('.WhitenessInput');
var HueInput = document.querySelector('.HueInput');

var ViewRGBColor = document.querySelector('.ViewRGBColor');

var HexInput = document.querySelector('.HexInput');
var ViewHexColor = document.querySelector('.ViewHexColor');

var ViewRandomColor = document.querySelector('.ViewRandomColor');
var ResetPage = document.querySelector('.ResetPage');

RedInput.addEventListener('change', DisplayRGBColor);
BlueInput.addEventListener('change', DisplayRGBColor);
GreenInput.addEventListener('change', DisplayRGBColor);
LightnessInput.addEventListener('change', DisplayRGBColor);
GraynessInput.addEventListener('change', DisplayRGBColor);
WhitenessInput.addEventListener('change', DisplayRGBColor);
HueInput.addEventListener('change', DisplayRGBColor);

HexInput.addEventListener('change', DisplayHexColor);

ViewRandomColor.addEventListener('click', DisplayRandomColor);
ResetPage.addEventListener('click', ResetControlsAndDisplayColor);

function DisplayRGBColor() {
	$( ".ColorTable" ).html
	( 	  
		  //"<tr style='height: auto;'><td class='ColorTableItem' style='height:35px; width:100%; background-image: linear-gradient(to right, gray, #" + fullColorHex() + " );'></td></tr>" 
		"<tr style='height: 30px;'><td><table><tr>        <td class='ColorTableItem' style='height: 100px; width: 50%; color: black; background-color: #" + fullColorHex() + ";'><strong><u>EXAMPLE - TEXT</u></strong> Lorem ipsum dolor amet retro food truck tumeric, kale chips.</br></br><span style='color:#808080;'>Trust fund celiac art party skateboard farm-to-table meh shoreditch biodiesel microdosing cardigan. </br></br><i><span style='color: white;'>Blue bottle raclette etsy aesthetic hammock next level tilde af ugh echo park bitters.</span></i></td><td class='ColorTableItem' style='font-size: 35px; font-family: sans-serif; background-color: white; color: #" + fullColorHex() + ";'><strong>EXAMPLE TEXT </strong>Lorem ipsum dolor amet cray swag venmo art party celiac.</td></tr></table>              </td></tr>" 
		+ "<tr style='height: auto;'><td class='ColorTableItem' style='height:35px; width:100%; background-image: linear-gradient(to right, black, #" + fullColorHex() + ", white );'></td></tr>" 
		+ "<tr style='height: auto;'><td class='ColorTableItem' style='color: #" + fullColorHex() + ";'>The Quick Brown Fox Jumps Over the Lazy Dog</td></tr>" 
		+ "<tr style='height: auto;'><td class='ColorTableItem' style='color: #" + fullColorHex() + ";'>Cozy lummox gives smart squid who asks for job pen.</td></tr>" 
		+ "<tr style='height: auto;'><td class='ColorTableItem' style='padding: 0px; height: 1px; background-color: #" + fullColorHex() + ";'></td></tr>" 
		+ "<tr style='height: auto;'><td class='ColorTableItem' style='font-size: 80px; color: #" + fullColorHex() + ";'>EXAMPLE TEXT</td></tr>" 
		+ "<tr style='height: auto;'><td class='ColorTableItem' style='height:200px; width:200px; background-image: radial-gradient(black 0%, #" + fullColorHex() + " 85%);'></td></tr>" 
	);
	
	$( ".HexInput" ).val
	(
		"#" + fullColorHex()
	);
	
	$( ".RGBInput" ).val
	(
		fullColorRGB()
	);
};

function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

function DisplayHexColor() {
	
	ResetControls();
	
	$( ".RedInput" ).val(
		hexToRGB(HexInput.value).r
	);

	$( ".GreenInput" ).val(
		hexToRGB(HexInput.value).g
	);

	$( ".BlueInput" ).val(
		hexToRGB(HexInput.value).b
	);

	DisplayRGBColor();
};

function DisplayRandomColor() {
	
	ResetControls();
	
	$( ".RedInput" ).val(
		getRandomInt(256)
	);

	$( ".GreenInput" ).val(
		getRandomInt(256)
	);

	$( ".BlueInput" ).val(
		getRandomInt(256)
	);
	
	DisplayRGBColor();
}



var rgbToHex = function (rgb,l,g,w) {
  
  // Grayness
  var GraynessRatio = g/255;
  var perfectGray = (parseInt(RedInput.value) + parseInt(GreenInput.value) + parseInt(BlueInput.value))/3;
  rgb = rgb*(1-GraynessRatio) + perfectGray*(GraynessRatio); 
  
  // whiteness
  var whiteness = w-128;
  rgb = rgb + whiteness;
  
  // lightness
  rgb = Math.round(rgb*( l / 128));
  
  if (rgb > 255) {rgb = 255;}
  if (rgb < 0) {rgb = 0;}
  
  var hex = Number(rgb).toString(16);
  
  if (hex.length < 2) {
       hex = "0" + hex;
  }
 
  return hex.toUpperCase();
};

var fullColorHex = function() {   
	var Red = RedInput.value;
	var Green = GreenInput.value;
	var Blue = BlueInput.value;
	var l = LightnessInput.value;
	var gr = GraynessInput.value;
	var w = WhitenessInput.value;
	
	var v = HueInput.value;
	v = v-128;
	if (v < 0) {v = 255 + v;}
	
	var r = RotateRGB(Red, Green, Blue, v);
	var g = RotateRGB(Green, Blue, Red, v);
	var b = RotateRGB(Blue, Red, Green, v);

  var red = rgbToHex(r,l,gr,w);
  var green = rgbToHex(g,l,gr,w);
  var blue = rgbToHex(b,l,gr,w);
  return String(red)+String(green)+String(blue);
};

var fullColorRGB = function() {
  return "R: " + String(hexToRGB(HexInput.value).r)+ " G: "+ String(hexToRGB(HexInput.value).g) + " B: " + String(hexToRGB(HexInput.value).b);
};



// var HueRotate = function() {
	// var v = HueInput.value;
	
	// var r = RedInput.value;
	// var g = GreenInput.value;
	// var b = BlueInput.value;
	
	// var Red   = RotateRGB(r, g, b, v);
	// var Green = RotateRGB(g, b, r, v);
	// var Blue  = RotateRGB(b, r, g, v);
// }

var RotateRGB = function(a, b, c, v) {
	if (v >= 0 && v <= 84)
	{
		a = ((84-v)/84)*a + 0*b + (v/84)*c
	}		
	else if (v >= 85 && v <= 169)
	{
		a = 0*a + ((v-85)/84)*b + ((169-v)/84)*c
	}
	else if (v >= 170 && v <= 254)
	{
		a = ((v-170)/85)*a + ((255-v)/85)*b + 0*c
	}
	
	a = Math.round(a);
	if (a < 0) {a = 0;}
	if (a > 255) {a = 255;}
	
	return a;
}  




var RGBInput = document.querySelector('.RGBInput');
RGBInput.addEventListener('click', function() {
	var r = prompt("R:");
	var g = prompt("G:");
	var b = prompt("B:");
	
	if (!(!r || !g || !b))
	{
		ResetControls();
		
		$( ".RedInput" ).val(
		r
		);

		$( ".GreenInput" ).val(
			g
		);

		$( ".BlueInput" ).val(
			b
		);
		
		DisplayRGBColor();
	}
	
	
});


$('.PaletteSquare').click(function(event)
{
	var currentValue = event.target.value;
	if (currentValue == "") { currentValue = "#" + fullColorHex(); }
	
	var newColor = prompt("Hex:", currentValue);
	
	if (newColor != null)
	{
		$(event.target).val(newColor);
		event.target.style.backgroundColor = newColor;
		event.target.style.color = newColor;
		
		$( ".HexInput" ).val(newColor);
		DisplayHexColor();
	}
});


// "#" + fullColorHex()

function ResetControlsAndDisplayColor()
{
	ResetControls();
	DisplayRGBColor();
}

function ResetControls() {
	$( ".RedInput" ).val(
		128
	);

	$( ".GreenInput" ).val(
		128
	);

	$( ".BlueInput" ).val(
		128
	);
	
	$( ".LightnessInput" ).val(
		128
	);
	
	$( ".GraynessInput" ).val(
		0
	);
	
	$( ".WhitenessInput" ).val(
		128
	);
	
	$( ".HueInput" ).val(
		128
	);
};

var ExportButton = document.querySelector('.ExportButton');
ExportButton.addEventListener('click', ExportHexValues);
function ExportHexValues() {
	//var PaletteExport = document.querySelector(".PaletteExport");
	
	//var PaletteExport = $(".PaletteExport")[0];
	
	var HexValues = "";
	
	// $('PaletteExport td').each(function() {
		// HexValues += $(this).find(".PaletteSquare").html();
	// });
	
	$('.PaletteSquare').each(function() {
		if ($(this).val())
		{
			HexValues += $(this).val() + " ";
		}
	});
	
	prompt("Hex values:", HexValues);
	
	// for (var i = 0, row; row = PaletteExport.rows[i]; i++) {
		// for (var j = 0, col; col = row.cells[j]; j++) {
		   // var cell = PaletteExport.rows[row].cells[col];
			// HexValues += " " + $(cell).find('.PaletteSquare').val();
		  
		   
		// }  
	// }
}

var AboutButton = document.querySelector('.AboutButton');
AboutButton.addEventListener('click', function() {
	alert("JRV_ColorExplorer by James R. Vaughan\n\nTired of converting RGB to HEX?\nTired of using other peoples' colors?\nHate using tiny color wheels to find colors?\n\nThis powerful tool makes finding amazing colors easy!\n\nThe black background makes the colors really pop!\nUse the palette to make a color scheme of up to 16 colors!\n\nYes, it has grayness! Rather than draining saturation, you're adding a touch of gray!");
});


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}




function mypluginloadevent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
mypluginloadevent(function(){
	DisplayRGBColor();
});


































































/* JRV_ColorExplorer by James R. Vaughan, 2018 */
