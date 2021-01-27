/* Boot startup */

console.log(
	"+----------------------+\n| Discord.js Framework |\n|                      |\n|    Version a1.0.0    |\n+----------------------+\n\n+----------------------+\n|    Head Developers   |\n+----------------------+\n|    Richard Condra    |\n|                      |\n+----------------------+\n\n+----------------------+\n|      Developers      |\n+----------------------+\n|     Johan Boshoff    |\n|     Evan Cavalier    |\n|    Taylor Sorrells   |\n|                      |\n+----------------------+"
);



/* Loading "Node Modules" */

console.log("\nLoading Node Modules...");

let modules = {};
let moduleNames = {
	"bettersqlitepool": "better-sqlite-pool",
	"bodyParser":"body-parser",
	"Discord": "discord.js",
	"electron": "electron",
	"enmap": "enmap",
	"express": "express",
	"fs": "fs",
	"http":"http",
	"os":"os",
	"socketio":"socket.io"
};

for (let i of Object.keys(moduleNames)) {
	modules[i] = loadFile(moduleNames[i]);
}
console.log("Node Modules have been loaded.");


/* Managing Cache */

resetJson = {
	"users":0,
	"online-users":0,
	"guilds":0,
	"ping":0,
	"system-memory":0,
	"system-memory-usage":0,
	"system-uptime":null,
	"system-status":{
		"discord":"offline",
		"electron":"offline",
		"express":"offline"
	}
}

data = getJson("cache/data.json");

for (i=0;i<data.length;i++) {
	if (i !== 7) {
		data[i] = resetJson[i];
	}
}

writeJson("cache/data.json", data);



/* Loading "bin" Modules */

console.log("\nLoading bin files...");

let binFiles = modules.fs.readdirSync("./bin/");

for (let i of binFiles) {
	Rewrite(" [./bin/" + i + "/init.js]: Loading...");
	require("./bin/" + i + "/init.js");
	Relog(" [./bin/" + i + "/init.js]: Loaded");
}

console.log("bin files have been loaded.");


/* Makes a request to require a file/module */

function loadFile(file) {
	Rewrite(" [" + file + "]: Loading...");
	let output = require(file);
	Relog(" [" + file + "]: Loaded");
	return output;
}


/* Json Handler */

function getJson(file) {
	Rewrite(" [" + file + "]: Loading...");
	let output = JSON.parse(modules.fs.readFileSync(file, "utf-8"));
	Rewrite(" [" + file + "]: Loaded");
	return output;
}

function writeJson(f, d) {
	Rewrite(" [" + f + "]: Writing...");
	modules.fs.writeFileSync(f, JSON.stringify(d));
	Relog(" [" + f + "]: Written. ");
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