let resources = require('../../cache/resources.js');

const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('../../client'));

port = 3040;

/* Events */

app.get('/', function(req, res, next) {
	console.log('\napp.get("/", [Function:[req,res,next]])');
	res.sendFile('index.html', { root: 'client' }, function(err) {
		if (err) next(err);
	});
});

app.get('/home', function(req, res, next) {
	console.log('\napp.get("/home", [Function:[req,res,next]])');
	return res.sendFile('index.html', { root: 'client' }, function(err) {
		if (err) next(err);
	});
});

app.get('*', function(req, res) {
	console.log('\napp.get("*", [Function:[req,res]])');
	let url = req.path;
	if (url.endsWith('.html')) url = url.substring(0, url.length - 5);
	if (url.endsWith('/')) url = url.substring(0, url.length - 1);

	console.log('url: ' + url);

	if (
		req.path.split('/')[req.path.split('/').length - 1].split('.').length > 1
	) {
		res.sendFile(url, { root: 'client' }, function(err) {
			if (err) {
				url = url.split('/');
				url.splice(url.length - 2, 1);
				url = url.join('/');
				res.sendFile(url, { root: 'client' }, function(err) {
					if (err) console.log("[server] Couldn't find file '" + url + "'");
				});
			}
		});
	} else {
		res.sendFile(url + '.html', { root: 'client' }, function(err) {
			if (err)
				res.sendFile('' + url + '/index.html', { root: 'client' }, function() {
					res.sendFile('404.html', { root: 'client' });
				});
		});
	}
});

/* Pushing the webserver to a port */

http.listen(port, () => console.log('[server]: Listening on port ' + port));


/* JSON handler */

function getJson(path) {
	return JSON.parse(fs.readFileSync(path));
}

function writeJson(path, json) {
	fs.writeFileSync(path, JSON.stringify(json));
}


/* Socket.io */

io.on("connection", function (socket) {
	console.log("\nio.on(\"connection\", [Function:[socket]])");
	
	socket.on("connect", function (user) {
		console.log("\nsocket.on(\"connect\", [Function:[user]])");
		
		return;
	});
	
	socket.on("get monitor data", function () {
		return socket.emit("send monitor data", getJson("./cache/data.json"));
	});
})