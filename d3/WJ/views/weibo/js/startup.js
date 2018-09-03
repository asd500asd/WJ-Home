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

$(function() {
    cqrbdp.resizePage();
    $(window).resize(cqrbdp.resizePage);
    cqrbdp.setClockHour();
    cqrbdp.showInfoItems();
});
