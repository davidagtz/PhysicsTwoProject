var express = require('express');
var pug = require('pug');
var sass = require('sass');
var fs = require('fs');

var app = express();

app.use(express.static("www"));

var index = pug.compileFile("templates/index.pug");

sass2css("www/css/main.css", sass.renderSync({
    file: "sass/main.sass"
}));


app.get("/", (req, res) => {
    res.send(index({}));
});

app.listen(80);

function sass2css(path, res) {
    fs.writeFileSync(path, res.css.toString());
}