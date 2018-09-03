(function() {
    window.cqrbdp = {};
    cqrbdp.getScaleAndLocation = function() {
        // 用于"transform": "scale(" + scale + ")",
        var scale = 1;
        // 缩放后居中的位置,
        var location = {
            x: 0,
            y: 0
        }
        var width = document.body.clientWidth;
        var height = document.body.clientHeight;
        // console.log(width + " * " + height);
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


    cqrbdp.getTime = function() {
        var date = new Date();
        var result = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hours: date.getHours()
        };
        return result;
    }
    cqrbdp.toDayString = function(spt) {
        var spt = spt ? spt : "-";
        var time = cqrbdp.getTime();
        var month = time.month < 10 ? "0" + time.month : time.month;
        var day = time.day < 10 ? "0" + time.day : time.day;
        return time.year + spt + month + spt + day;
    }

    //分类数据刷新间隔--毫秒
    cqrbdp.flFreshTimeInterval = 10000;

    //采集总量刷新间隔--毫秒
    cqrbdp.totalFreshTimeInterval = 5000;

    //各条目运行的时长，值越小走的越快
    cqrbdp.infoItemDur = 20000;

    // 各条目间隔时间，值越小两个之间间隔时间越短，容易发生重叠现象
    cqrbdp.timeDely = 1500;

})();
