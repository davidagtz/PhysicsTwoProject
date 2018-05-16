var express = require('express');
var pug = require('pug');

var app = express();

app.use(express.static("www"));

var index = pug.compileFile("templates/index.pug");

app.get("/", (req, res) => {
    res.send(index({
        name: "Jakob"
    }));
});

app.listen(80);