var http = require("http");
var terminal = require("child_process").spawn;
var hook = require("github-webhook-handler");
var webHook = hook({path: "/hook", secret: "test"});
http.createServer((req, res) => {
    webHook(req, res, (err) => {
        res.statusCode = 404;
        res.end("not such location")
    })
}).listen(8888);
webHook.on("push", (event) => {
    console.log("push");
    terminal("./AutoPull.sh");
});
