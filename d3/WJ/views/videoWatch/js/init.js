(function() {
    window.video = {};
    video.getScaleAndLocation = function() {
        // 用于"transform": "scale(" + scale + ")",
        var scale = 1;
        // 缩放后居中的位置,
        var location = {
            x: 0,
            y: 0
        }
        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        if (width / height < 1920 / 1080) {
            scale = width / 1920;
            location.y = (height - 1080 * scale) / 2;
        } else {
            scale = height / 1080;
            location.x = (width - 1920 * scale) / 2;
        }
        return {
            scale: scale,
            location: location
        };
    }

    video.resizePage = function() {
        var scaleAndLocation = video.getScaleAndLocation();
        if (scaleAndLocation.scale != 1) {
            $("#video_watch").css({
                "transform-origin": "left top",
                "-webkit-transform-origin": "left top",
                "transform": "scale(" + scaleAndLocation.scale + ")",
                "-webkit-transform": "scale(" + scaleAndLocation.scale + ")",
                "transform-origin": "left top",
                "-webkit-transform-origin": "left top",
                "margin-left": scaleAndLocation.location.x + "px",
                "margin-top": scaleAndLocation.location.y + "px"
            });
        }
    }
	video.configData = {
        drawBarInterval: 10,//s  柱图重绘时间间隔
   }


})();
