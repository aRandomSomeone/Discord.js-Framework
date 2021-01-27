let users;
let onlineUsers;
let guilds;
let ping;
let systemMemory;
let systemMemoryUsage;
let systemUptime;
let systemStatus;


$().ready(function() {
	try {
		let url = window.location.host;
		client = io.connect(url);
		
		let tick;
		
		client.on("connect", function () {
			clog("io");
			tick = setInterval(function () {
				client.emit("get monitor data");
			}, 500);
		});
		
		client.on("send monitor data", function (data) {
			users = data["users"];
			onlineUsers = data["online-users"];
			guilds = data["guilds"];
			ping = data["ping"];
			systemMemory = data["system-memory"];
			systemMemoryUsage = data["system-memory-usage"];
			systemUptime = data["system-uptime"];
			systemStatus = data["system-status"];
			
			elems = document.getElementsByClassName('monitor-parent');
			monitors = [];
			for (let i of elems) {
				monitors.push(i.id);
			}
	
			let min = 1000;
			let max = 814.75;
			
			
			/* Users */
			
			monitor = document.getElementById("users").children[1];
			monitor.children[0].innerHTML = onlineUsers;
			monitor.children[1].innerHTML = Math.round((onlineUsers / users) * 100)+"%";
			monitor.children[2].children[1].style.strokeDashoffset = (map(onlineUsers, 0, users, min, max)) + "%";
			
			
			/* guilds */
			
			monitor = document.getElementById("guilds").children[1];
			monitor.children[0].innerHTML = guilds;
			monitor.children[1].innerHTML = Math.round((guilds / 100) * 100)+"%";
			monitor.children[2].children[1].style.strokeDashoffset = (map(guilds, 0, 100, min, max)) + "%";
			
			
			/* Ping */
			
			monitor = document.getElementById("ping").children[1];
			monitor.children[0].innerHTML = ping;
			monitor.children[1].innerHTML = Math.round((ping / 500) * 100)+"%";
			monitor.children[2].children[1].style.strokeDashoffset = (map(ping, 0, 500, min, max)) + "%";
			
			
			/* Memory */
			
			monitor = document.getElementById("system-memory").children[1];
			monitor.children[0].innerHTML = Math.floor(systemMemoryUsage / 1073741824) + "GB";
			monitor.children[1].innerHTML = Math.round((systemMemoryUsage / systemMemory) * 100)+"%";
			monitor.children[2].children[1].style.strokeDashoffset = (map(systemMemoryUsage, 0, systemMemory, min, max)) + "%";
		});
	} catch (err) {
		clog(err);
	}
});
