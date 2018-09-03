(function() {
    window.cqrbdp = {};
    cqrbdp.getScaleAndLocation = function(width, height) {
            // 用于"transform": "scale(" + scale + ")",
            var scale = 1;
            // 缩放后居中的位置,
            var location = {
                    x: 0,
                    y: 0
                }
                // var clientWidth = document.body.clientWidth;
                // var clientHeight = document.body.clientHeight;
            var clientWidth = window.innerWidth;
            var clientHeight = window.innerHeight;
            if (clientWidth / clientHeight < width / height) {
                scale = clientWidth / width;
                location.y = (clientHeight - height * scale) / 2;
            } else {
                scale = clientHeight / height;
                location.x = (clientWidth - width * scale) / 2;
            }
            return {
                scale: scale,
                location: location
            };
        }
        //子列表切换显示的时间间隔
    cqrbdp.switchInterval = 8000;
})();
