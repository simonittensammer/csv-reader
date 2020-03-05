
var lines = [];
var currentLine = -1;

function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
		toggleBoxes();
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
    // Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);             
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Cannot read file");
	}
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    while (allTextLines.length) {
		lines.push(allTextLines.shift().split(';'));
    }
    console.log(lines);
    drawNextLine();
}

function toggleBoxes() {
	document.getElementById("csvFileInput").style.display = "none";
	document.getElementById("controls").style.display = "block";
}

function drawNextLine() {
    currentLine++;
    drawLine();
}

function drawPreviousLine() {
    currentLine--;
    drawLine();
}

function drawSpecificLine(line) {
	currentLine = parseInt(document.getElementById("specificLine").value);
	drawLine();
}

function previewLine() {
	line = parseInt(document.getElementById("specificLine").value);
	console.log(line);
	document.getElementById("input1").innerHTML = lines[line][1];
	document.getElementById("input2").innerHTML = lines[line][3];
}

function drawLine() {
    document.getElementById("durchgang").innerHTML = lines[currentLine][0];

    document.getElementById("gruppe1").innerHTML = lines[currentLine][1];
    document.getElementById("gruppe2").innerHTML = lines[currentLine][3];

    document.getElementById("zeit1").innerHTML = lines[currentLine][2];
    document.getElementById("zeit2").innerHTML = lines[currentLine][4];

    document.getElementById("next1").innerHTML = lines[currentLine +1][1];
    document.getElementById("next2").innerHTML = lines[currentLine +1][3];
}