/* Loading modules and cached resources */

let resources = require("../../cache/resources.js");

const Discord = require("discord.js");
const enmap = require("enmap");
const fs = require("fs");
const os = require("os");

let data = getJson("cache/data.json");


/* Making a new bot client instance */

const client = new Discord.Client({presence: {status: "dnd", afk: false, activity: {name: "Under Development", type: "PLAYING"}}});
resources.client = client;


/* Enmap management */

const userTrackerDefaults = {
	level: 0,
	xp: 0,
	
	highestRole: "",
	permissions: ["everyone"],
	donator: false,
	tester: false,
	
	blacklisted: false,
	
	trustability: 0,
	autoMod: false
}

const guildTrackerDefaults = {
	level: 0,
	xp: 0,
	
	universalPermissions: ["everyone"],
	boosted: false,
	testServer: false,
	
	blacklisted: false,
	
	settings: {
		prefix: "!",
		
		roles: {
			administrator: null,
			moderator: null,
			booster: null,
			everyone: null
		},
		roleOverrides: {
			
		},
		
		welcome: {
			channel: null,
			message: "{embed: {title: 'Welcome, {{user}}!', img: {{avatarURL}}, footer: '{{members}} | {{date}}'}}"
		},
		logging: {
			channel: null,
			
			channelCreate: null,
			channelDelete: null,
			channelPinsUpdate: null,
			channelUpdate: null,
			
			userJoin: null,
			userLeave: null,
			userBan: null,
			userUnban: null,
			userKick: null,
			
			guildUpdate: null,
			
			inviteCreate: null,
			
			messageDelete: null,
			messageDeleteBulk: null,
			messageUpdate: null,
			
			roleCreate: null,
			roleDelete: null,
			roleChange: null
		}, 
		
		blacklist: {},
		whitelist: {},
		
		
	}
}

client.userTracker = new enmap({
	name: "userSettings",
	fetchAll: false,
	autoFetch: true,
	dataDir: "./data",
	cloneLevel: "deep",
	polling: false
});

client.guildTracker = new enmap({
	name:"guildSettings",
	fetchAll: false,
	autoFetch: true,
	dataDir: "./data",
	cloneLevel: "deep",
	polling: false
});

/*  Blacklist/Whitelist
*   
*   Map by id of channel/user
*   give whether id is a user or channel in Object
*   mark restrictions
*   
*   - Richard
*/

/*  Role Overrides
*   
*   Map by id of user
*   mark role override permissions
*   
*   - Richard
*/

/*  Logging Messages
*   
*   Someone needs to make all the default embeds for the settings.
*   Reference the example of the welcome.message in the Object above.
*   If you will need any information from the code, like user.id, then just type {{user.id}} and then when I make the message parser it'll replace that with the user's id. 
*   As always, reference https://discord.js.org version ^12.5.1 if you need any help. 
*   
*   - Richard
*/


/* Bot events */

client.on("ready", function () {
	let tick = setInterval(function () {
		updateData();
	}, 1000);
	
	client.guilds.cache.each(guild => {
		client.guildTracker.ensure(guild.id, guildTrackerDefaults);
	});
	client.users.cache.each(user => {
		client.userTracker.ensure(user.id, userTrackerDefaults);
	});
	
	console.log(client.user.username+" emitted an event: 'ready'");
});

client.on("presenceUpdate", function (oldPresence, newPresence) {
	updateData();
})

client.on("message", function (message) {
	console.log("["+(message.member.nickname||message.author.username)+"]: "+message.content);
	
});


/* Connecting the bot to discord.com */

client.login(process.env.token);


/* Functions */

function updateData() {
	data = getJson("cache/data.json");
	data["users"] = client.users.cache.size;
	data["online-users"] = client.users.cache.filter(user => ["online", "dnd"].includes(user.presence.status)).size;
	data["guilds"] = client.guilds.cache.size;
	data["ping"] = client.ws.ping;
	data["system-memory"] = os.totalmem();
	data["system-memory-usage"] = (os.totalmem() - os.freemem());
	data["system-uptime"] = []
	data["system-status"]["discord"] = "online";
	
	writeJson("cache/data.json", data);
}

function getJson(f) {
	return JSON.parse(fs.readFileSync(f));
}

function writeJson(f, d) {
	fs.writeFileSync(f, JSON.stringify(d));
}