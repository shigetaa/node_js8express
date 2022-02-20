const port = 3000;
const express = require("express");
const app = express();

// 
app.get("/", (req, res) => {
	console.log(req.params);
	console.log(req.body);
	console.log(req.url);
	console.log(req.query);
	res.send("Hello World!");
}).listen(port, () => {
	console.log("server start http://localhost:%d/", port);
});