cqrbdp.resizePage = function() {
    var scaleAndLocation = cqrbdp.getScaleAndLocation();
    if (scaleAndLocation.scale != 1) {
        $(".pro-main-container").css({
            "transform-origin": "left top",
            "-webkit-transform-origin": "left top",
            "transform": "scale(" + scaleAndLocation.scale + ")",
            "-webkit-transform": "scale(" + scaleAndLocation.scale + ")",
            "transform-origin": "left top",
            "-webkit-transform-origin": "left top",
            "margin-left": scaleAndLocation.location.x + "px",
            "margin-top": scaleAndLocation.location.y + "px"
        });
        $(".datepicker-container").css({
            "transform": "scale(" + scaleAndLocation.scale + ")",
            "-webkit-transform": "scale(" + scaleAndLocation.scale + ")",
            "margin-left": scaleAndLocation.location.x + "px",
        });
    }
}
cqrbdp.resizeBottom = function() {
    var scaleAndLocation = cqrbdp.getScaleAndLocation();
    var scale = scaleAndLocation.scale;
    var bottomHeight = 133 * scale;
    var axisContainerWidth = 1846 * scale;
    var axisContainerHeight = 80 * scale;

    $(".con-time-axis").height(bottomHeight);
    $(".axis-container").css({
        'width': axisContainerWidth + 'px',
        'height': axisContainerHeight + 'px',
    });
}

/**
 * 用于更新显示的时间
 * 1.当显示的日期为当前日期时，
 */
cqrbdp.setShowingHour = function() {
    var hour = cqrbdp.getTime().hours;
    if (hour > 21) {
        cqrbdp.showingEndHour = hour;
        cqrbdp.showingStartHour = hour - 2;
    } else {
        cqrbdp.showingStartHour = hour;
        cqrbdp.showingEndHour = hour + 2;
    }
}

//判断当前显示的日期是否是当天
cqrbdp.isToday = function() {
    return cqrbdp.showingDate == cqrbdp.toDayString('.');
}

$(function() {
    cqrbdp.resizePage();
    cqrbdp.resizeBottom();
    $(window).resize(function() {
        cqrbdp.resizePage();
        cqrbdp.resizeBottom();
        cqrbdp.initTrackSize($(".axis-container").width());
    });
    //当前显示数据的日期及时间
    cqrbdp.showingDate = cqrbdp.toDayString('.');
    cqrbdp.setShowingHour();

    cqrbdp.showInfoItems(cqrbdp.showingDate, cqrbdp.showingStartHour, cqrbdp.showingEndHour); //可增加时间日期

    cqrbdp.showTimeAxis($(".axis-container").width(), cqrbdp.showingStartHour, cqrbdp.showingEndHour);

    cqrbdp.initDatePicker();

    /**
     * 当选择日期后
     * 1.如果与当前显示的日期相比，未改变，则不做操作；
     * 2.如果反生了改变：
     *    1）选择的为今天，则根据当前时间设置查询的数据、显示底部滚动条位置
     *    2）选择的不是今天，默认查询显示10-12时的数据和滚动条位置
     */
    $('.datepicker-container input').change(function() {
        var newDate = $('.datepicker-container input').val();
        if (newDate != cqrbdp.showingDate) {
            // console.log(newDate);
            //XXX执行数据查询和显示操作
            cqrbdp.showingDate = newDate;
            // console.log(cqrbdp.isToday());
            cqrbdp.showingStartHour = 10;
            cqrbdp.showingEndHour = 12;
            cqrbdp.loadInfoItems(cqrbdp.showingDate, cqrbdp.showingStartHour, cqrbdp.showingEndHour); //可增加时间日期

            cqrbdp.showTimeAxis($(".axis-container").width(), cqrbdp.showingStartHour, cqrbdp.showingEndHour);
        }

    });
});
