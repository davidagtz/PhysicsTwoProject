var imgs = ['andres.jpg', 'barco.jpg', 'good.png', 'sat.jpg', 'pinata.jpg'];
var origH;

window.onload = () => {
	origH = ($("#buttons").height() / $("#slideshow").height()) * 100 + "%";
    window.onresize = () => {
		$("#buttons").height(origH);
		var notFit = false;
		while (true) {
			var imgswidth = 0;
			$("#buttons").children().each((i, child) => {
				imgswidth += $(child).width();
			});
			let barWidth = $("#buttons").width();
			if (imgswidth < barWidth) {
				$("#buttons :first-child").css("margin-left", ((barWidth - imgswidth) / 2) + "px");
			}
			else if (imgswidth > barWidth) {
				var scale = $("#buttons").width() / imgswidth;
				$("#buttons").height($("#buttons").height() * scale);
				if (imgswidth > barWidth) {
					$("#buttons").height($("#buttons").height() - 1);
					continue;
				}
			}
			$("#shown").css("max-height", $("#slideshow").height() - $("#buttons").height());
			break;	
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


