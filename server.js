var express = require('express');
var pug = require('pug');
var sass = require('sass');
var fs = require('fs');

var app = express();

var __DEV__ = true;

app.use(express.static("www"));

var index = pug.compileFile("templates/index.pug");
var notFound = pug.compileFile("templates/404.pug");

sass2css("www/css/main.css", sass.renderSync({
    file: "sass/main.sass"
}));

sass2css("www/css/404.css", sass.renderSync({
    file: "sass/404.sass"
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

app.get("*", (req, res) => {
    if(__DEV__){
        sass2css("www/css/404.css", sass.renderSync({
            file: "sass/404.sass"
        }));
        res.send(pug.compileFile("templates/404.pug")({}));
    }
    else{
        res.send(notFound({}));
    }
});

app.listen(80);

function sass2css(path, res) {
    fs.writeFileSync(path, res.css.toString());
}