const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");

const app = express();
const http = createServer(app);

const io = new Server(http, {
	cors: {
		origin: "*"
	}
});

io.on("connection", (socket) => {
	socket.on("message", (data) => {
		io.emit("message", data);
	});
});

http.listen(8080);