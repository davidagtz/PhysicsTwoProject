var express = require('express');
var pug = require('pug');
var sass = require('sass');
var fs = require('fs');

var app = express();

var __DEV__ = true;

app.use(express.static("www"));

var index = pug.compileFile("templates/index.pug");
var notFound = pug.compileFile("templates/404.pug");
var aboutme = pug.compileFile("templates/aboutme.pug");
var lab = pug.compileFile("templates/lab.pug");
var apreview = pug.compileFile("templates/apreview.pug");

sass2css("www/css/main.css", sass.renderSync({
    file: "sass/main.sass"
}));

sass2css("www/css/404.css", sass.renderSync({
    file: "sass/404.sass"
}));
sass2css("www/css/lab.css", sass.renderSync({
    file: "sass/lab.sass"
}));
sass2css("www/css/apreview.css", sass.renderSync({
    file: "sass/apreview.sass"
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

app.get("/apreview", (req, res) => {
    if(__DEV__){
        sass2css("www/css/apreview.css", sass.renderSync({
            file: "sass/apreview.sass"
        }));
        res.send(pug.compileFile("templates/apreview.pug")({}));
    }
    else {
        res.send(apreview({}));
    }
});

app.get("/lab/:id", (req, res) => {
    if (__DEV__) {
        sass2css("www/css/main.css", sass.renderSync({
            file: "sass/main.sass"
        }));
        sass2css("www/css/lab.css", sass.renderSync({
            file: "sass/lab.sass"
        }));
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
        sass2css("www/css/404.css", sass.renderSync({
            file: "sass/404.sass"
        }));
        res.send(pug.compileFile("templates/404.pug")({}));
    }
    else{
        res.send(notFound({}));
    }
});

var port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log("Server is running on "+port);
});
// app.listen(80);

function sass2css(path, res) {
    fs.writeFileSync(path, res.css.toString());
}