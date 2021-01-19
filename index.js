console.log("Discord.js Framework");
console.log("By Richard Condra");



/* Loading "Node Modules" */
console.log("\nLoading Node Modules...");

let modules = {};
let moduleNames = {
	"bettersqlitepool":"better-sqlite-pool",
	"Discord":"discord.js",
	"enmap":"enmap",
	"express":"express",
	"fs":"fs"
};

for (let i of Object.keys(moduleNames)) {
	modules[i] = loadFile(moduleNames[i]);
}
console.log("Node Modules have been loaded.");


/* Loading "cache" files */
console.log("\nLoading cache files...")

let cache = {};
let cachefiles = modules.fs.readdirSync("./cache/");
for (let i of cachefiles) {
	cache[i] = loadFile("./cache/"+i);
}
console.log("cache Files have been loaded.");


/* Loading "cfg" files */
console.log("\nLoading cfg files...");

let cfg = {};
let cfgfiles = modules.fs.readdirSync("./cfg/");
for (let i of cfgfiles) {
	cfg[i] = getData("./cfg/"+i);
}
console.log("cfg files Have been loaded.");


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