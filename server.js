var express = require('express');
var pug = require('pug');
var sass = require('sass');
var fs = require('fs');
var dddos = require('dddos');

var app = express();

var __DEV__ = true;

app.use(new dddos({
    logFunction: (IP, path, weight, rule) => {
        console.log(IP);
    }
}).express('ip', 'path'));

app.use(express.static("www"));

var index = pug.compileFile("templates/index.pug");
var notFound = pug.compileFile("templates/404.pug");
var aboutme = pug.compileFile("templates/aboutme.pug");
var lab = pug.compileFile("templates/lab.pug");
var apreview = pug.compileFile("templates/apreview.pug");


sass2css("sass/main.sass", "www/css/main.css");
sass2css("sass/404.sass", "www/css/404.css");
sass2css("sass/lab.sass", "www/css/lab.css");
sass2css("sass/apreview.sass", "www/css/apreview.css");
sass2css("sass/index.sass", "www/css/index.css");

app.get("/", (req, res) => {
    if(__DEV__){
        sass2css("sass/main.sass", "www/css/main.css");
        sass2css("sass/index.sass", "www/css/index.css");
        res.send(pug.compileFile("templates/index.pug")({}));
    }
    else
        res.send(index({}));
});

app.get("/apreview", (req, res) => {
    if(__DEV__){
        sass2css("sass/main.sass", "www/css/main.css");
        sass2css("sass/apreview.sass", "www/css/apreview.css");
        res.send(pug.compileFile("templates/apreview.pug")({}));
    }
    else {
        res.send(apreview({}));
    }
});

app.get("/lab/:id", (req, res) => {
    if (__DEV__) {
        sass2css("sass/main.sass", "www/css/main.css");
        sass2css("sass/lab.sass", "www/css/lab.css");
        res.send(pug.compileFile("templates/lab.pug")({
            file: "lab" + req.params.id
        }));
    }
    else
        res.send(lab({
            file: "lab" + req.params.id
        }));
});

app.get("*", (req, res) => {
    if(__DEV__){
        sass2css("sass/404.sass", "www/css/404.css");
        sass2css("sass/main.sass", "www/css/main.css");
        res.send(pug.compileFile("templates/404.pug")({}));
    }
    else{
        res.send(notFound({}));
    }
});

var port = process.env.PORT || 80;
app.listen(port, ()=>{
    console.log("Server is running on "+port);
});

function sass2css(path, res) {
    fs.writeFileSync(res, sass.renderSync({
        file:path
    }).css.toString());
}