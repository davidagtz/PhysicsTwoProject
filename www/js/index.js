var imgs = ['aviator.jpg', 'trump.png', 'mont.jpg', 'sat.jpg'];

window.onload = ()=>{
    window.onresize = () => {
        var width = 0;
        $("#buttons").children().each((i, child) => {
            width += $(child).width();
        });
        if(width > $("#buttons").width()){
            var scale = $("#buttons").width() / width;
            $("#buttons").height($("#buttons").height() * scale);
        }
    }

    fit = () => {
        let s = $("#shown");
        s.css("margin-top", (s.parent().height() - $("#buttons").height() - s.height()) / 2 + "px")
    }

    var path = "/res/slideshow/";
    var on = 0;

    for(var i = 0; i < imgs.length; i++) {
        let img = $("<img>");
        img.attr("src",  path + imgs[i]);

        img.click((handler) => {
            set(img);
        });

        imgs[i] = img;

        $('#buttons').append(img);
        if(i == 0){
            set(imgs[i])
        }
    }

    window.onresize();

    setInterval(() => {
        set(imgs[on]);
        on++;
        on %= imgs.length;
    }, 1000);

    function set(img) {
        $("#shown").attr("src", $(img).attr("src"));
        fit();
        on = imgs.indexOf(img);
    }
}

