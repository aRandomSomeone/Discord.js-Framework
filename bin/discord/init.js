let modules = require("../../cache/modules.js");
let cache = require("../../cache/resources.js");

const Discord = modules.Discord;
const enmap = modules.enmap;
const fs = modules.fs;

const client = new Discord.Client();

cache.client = client;

client.on("ready", function () {
	console.log(client.user.username+" emitted 'ready' event.");
});

client.on("message", function (message) {
	console.log("["+(message.member.nickname||message.author.username)+"]: "+message.content);
});

client.login(process.env.token);