function map(num, in_min, in_max, out_min, out_max) {
	return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

function createModal(id) {}

function clog(text) {
	let line = document.createElement("li");
	line.innerHTML = "- "+text;
	document.getElementById("console").children[0].appendChild(line);
	console.log(text);
}