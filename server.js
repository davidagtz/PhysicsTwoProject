var express = require('express');
var pug = require('pug');
var sass = require('sass');
var fs = require('fs');

var app = express();

var __DEV__ = true;

app.use(express.static("www"));

var index = pug.compileFile("templates/index.pug");

sass2css("www/css/main.css", sass.renderSync({
    file: "sass/main.sass"
}));


app.get("/", (req, res) => {
    if(__DEV__){
        sass2css("www/css/main.css", sass.renderSync({
            file: "sass/main.sass"
        }));
        res.send(pug.compileFile("templates/index.pug")({}));
    }
    else
        res.send(index({}));
});

app.listen(80);

function sass2css(path, res) {
    fs.writeFileSync(path, res.css.toString());
}