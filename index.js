console.log("+----------------------+\n| Discord.js Framework |\n|                      |\n|    Version a0.0.1    |\n+----------------------+\n\n+----------------------+\n|    Head Developers   |\n+----------------------+\n|    Richard Condra    |\n|                      |\n+----------------------+\n\n+----------------------+\n|      Developers      |\n+----------------------+\n|     Johan Boshoff    |\n|     Evan Cavalier    |\n|    Taylor Sorrells   |\n|                      |\n+----------------------+");



/* Loading "Node Modules" */
console.log("\nLoading Node Modules...");

let modules = require("./cache/modules.js");
let moduleNames = {
	"bettersqlitepool":"better-sqlite-pool",
	"Discord":"discord.js",
	"electron":"electron",
	"enmap":"enmap",
	"express":"express",
	"fs":"fs"
};

for (let i of Object.keys(moduleNames)) {
	modules[i] = loadFile(moduleNames[i]);
}
console.log("Node Modules have been loaded.");


/* Loading "bin" Modules */
console.log("\nLoading bin files...")

let binFiles = modules.fs.readdirSync("./bin/");

for (let i of binFiles) {
	loadFile("./bin/"+i+"/init.js");
}

console.log("bin files have been loaded.")


/* Makes a request to require a file/module */

function loadFile(file) {
	Rewrite(" ["+file+"]: Loading...");
	let output = require(file);
	Relog(" ["+file+"]: Loaded");
	return output;
}


/* Gets a file as plain text */

function getData(file) {
	Rewrite(" ["+file+"]: Loading...");
	let output = modules.fs.readFileSync(file, "utf-8");
	Relog(" ["+file+"]: Loaded");
	return output;
}


/* Transforms .cfg files into runnable nodejs code, then executes it */

function parseCfgFile(data) {
	let lines = data.split("\n");
	let output = "";
	for (let line of lines) {
		/* Comment removal */
		
		line = line.split(/(\/\*)/g);
		
		
		
		/* databases */
		
		let args = line.split(" ");
		
		switch(args[0]) {
			case "new":
				
				break;
			
		}
	}
}


/* Removes all content from previous line then rewrites as a stdout write */

function Rewrite(text) {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	process.stdout.write(text);
}


/* Removes all content from previous line then rewrites as a console log */

function Relog(text) {
	process.stdout.clearLine();
	process.stdout.cursorTo(0);
	console.log(text);
}