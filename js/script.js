
var lines = [];
var currentLine = -1;

function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
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
        lines.push(allTextLines.shift().split(','));
    }
	console.log(lines);
	//drawOutput(lines);
}

function drawOutput(lines){
	//Clear previous data
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	for (var i = 0; i < lines.length; i++) {
		var row = table.insertRow(-1);
		for (var j = 0; j < lines[i].length; j++) {
			var firstNameCell = row.insertCell(-1);
			firstNameCell.appendChild(document.createTextNode(lines[i][j]));
		}
	}
	document.getElementById("output").appendChild(table);
}

function drawNextLine() {
    currentLine++;
    //document.getElementById("outputLine").innerHTML = lines[currentLine];
    drawLine();
}

function drawPreviousLine() {
    currentLine--;
    //document.getElementById("outputLine").innerHTML = lines[currentLine];
    drawLine();
}

function drawLine() {
    document.getElementById("gruppe1").innerHTML = lines[currentLine][1];
    document.getElementById("gruppe2").innerHTML = lines[currentLine][3];

    document.getElementById("zeit1").innerHTML = lines[currentLine][2];
    document.getElementById("zeit2").innerHTML = lines[currentLine][4];
}